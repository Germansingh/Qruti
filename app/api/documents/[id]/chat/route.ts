import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { processGroundedQa } from "@/lib/services/groundedQaEngine";
import { sanitizeFileName } from "@/lib/utils/sanitize";

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

        const body = await request.json();
        const question = body.question || body.userQuery || "";
        const language = body.language || "en";
        const history = body.history || [];

        if (!question.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Question is required",
                },
                { status: 400 }
            );
        }

        const supabase = createSupabaseAdminClient();

        // 1. Fetch document record from PostgreSQL Supabase DB
        const { data: document, error: documentError } = await supabase
            .from("documents")
            .select("*")
            .eq("id", id)
            .single();

        if (documentError || !document) {
            console.error("CHAT API: DOCUMENT NOT FOUND ERROR:", documentError);
            return NextResponse.json(
                {
                    success: false,
                    error: "Document not found",
                },
                { status: 404 }
            );
        }

        const extractedText = document.extracted_text || "";
        const fileName = sanitizeFileName(document.name || "document.pdf");
        const contextLength = extractedText.length;

        // Server-Side Logging (Requirement H)
        console.log("=== SERVER CHAT REQUEST ===");
        console.log("DOCUMENT ID:", id);
        console.log("EXTRACTED TEXT LENGTH:", extractedText.length);
        console.log("USER QUESTION:", question);
        console.log("SELECTED LANGUAGE:", language);
        console.log("AI CONTEXT LENGTH:", contextLength);
        console.log("===========================");

        if (!extractedText.trim()) {
            return NextResponse.json({
                success: true,
                data: {
                    reply: language === "pa"
                        ? "ਇਸ ਦਸਤਾਵੇਜ਼ ਤੋਂ ਕੋਈ ਲਿਖਤ ਨਹੀਂ ਮਿਲੀ।"
                        : language === "hi"
                        ? "इस दस्तावेज़ से कोई पाठ नहीं मिला।"
                        : "No text could be extracted from this document to answer questions.",
                    citations: [],
                    isGroundingWarning: true,
                },
            });
        }

        // 2. Execute Grounded QA Engine
        const qaResult = await processGroundedQa({
            documentId: id,
            documentText: extractedText,
            fileName,
            question,
            language,
            history,
        });

        return NextResponse.json({
            success: true,
            data: {
                reply: qaResult.text,
                citations: qaResult.citations || [],
                isGroundingWarning: Boolean(qaResult.isGroundingWarning),
            },
        });
    } catch (error) {
        console.error("CHAT API UNCAUGHT ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Chat processing failed",
            },
            { status: 500 }
        );
    }
}
