import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { extractTextFromPdf } from "@/lib/pdf-parser";

export const runtime = "nodejs";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Document ID is required",
                },
                { status: 400 }
            );
        }

        const supabase = createSupabaseAdminClient();

        // 1. Get document from database
        const { data: document, error: documentError } =
            await supabase
                .from("documents")
                .select("*")
                .eq("id", id)
                .single();

        if (documentError || !document) {
            console.error("DOCUMENT NOT FOUND ERROR:", documentError);
            return NextResponse.json(
                {
                    success: false,
                    error: "Document not found",
                },
                { status: 404 }
            );
        }

        // 2. Check file path
        if (!document.file_path) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Document has no file path",
                },
                { status: 400 }
            );
        }

        console.log("Processing document:", document.name);
        console.log("DOCUMENT FILE PATH:", document.file_path);

        // Standardize file path (remove any accidental bucket prefix if present)
        const storagePath = document.file_path.startsWith("documents/")
            ? document.file_path.replace(/^documents\//, "")
            : document.file_path;

        // 3. Download file from Supabase Storage using admin client
        const { data: file, error: downloadError } =
            await supabase.storage
                .from("documents")
                .download(storagePath);

        if (downloadError || !file) {
            console.error("STORAGE DOWNLOAD ERROR:", downloadError);
            const isNotFound = downloadError?.message?.includes("not found") || (downloadError as { statusCode?: string })?.statusCode === "404";
            return NextResponse.json(
                {
                    success: false,
                    error: downloadError?.message || "Could not download file from storage",
                },
                { status: isNotFound ? 404 : 500 }
            );
        }

        // 4. Convert Blob to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log("File downloaded. Size:", buffer.length, "bytes");

        // 5. Extract text from PDF
        let extractedText = "";
        try {
            extractedText = await extractTextFromPdf(buffer);
        } catch (parseError) {
            console.error("PDF PARSING ERROR:", parseError);
            return NextResponse.json(
                {
                    success: false,
                    error:
                        parseError instanceof Error
                            ? parseError.message
                            : "Failed to parse PDF document",
                },
                { status: 422 }
            );
        }

        // 6. Check extracted text
        if (!extractedText) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No text could be extracted from this PDF",
                },
                { status: 422 }
            );
        }

        console.log("Extracted text length:", extractedText.length);

        // 7. Save extracted text in database
        const { data: updatedDocument, error: updateError } =
            await supabase
                .from("documents")
                .update({
                    extracted_text: extractedText,
                    status: "PROCESSED",
                })
                .eq("id", id)
                .select()
                .single();

        if (updateError) {
            console.error("DATABASE UPDATE ERROR:", updateError);
            return NextResponse.json(
                {
                    success: false,
                    error: updateError.message,
                },
                { status: 500 }
            );
        }

        // 8. Success response
        return NextResponse.json({
            success: true,
            data: {
                document: updatedDocument,
                extractedText,
            },
        });
    } catch (error) {
        console.error("PDF PROCESSING UNCAUGHT ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "PDF processing failed",
            },
            { status: 500 }
        );
    }
}