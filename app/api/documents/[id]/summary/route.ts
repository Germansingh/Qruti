import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { aiService } from "@/lib/services/aiService";
import { SupportedLanguage } from "@/lib/services/languageService";

export const runtime = "nodejs";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const language = (searchParams.get("lang") || "en") as SupportedLanguage;

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

        // Fetch document record from Supabase
        const { data: document, error: documentError } = await supabase
            .from("documents")
            .select("*")
            .eq("id", id)
            .single();

        if (documentError || !document) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Document not found",
                },
                { status: 404 }
            );
        }

        const extractedText = document.extracted_text || "";
        const analysis = await aiService.analyzeDocument(extractedText, document.name, language);

        return NextResponse.json({
            success: true,
            data: {
                documentId: id,
                fileName: document.name,
                status: document.status,
                analysis,
            },
        });
    } catch (error) {
        console.error("SUMMARY API ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Summary failed",
            },
            { status: 500 }
        );
    }
}
