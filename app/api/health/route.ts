import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
    return NextResponse.json({
        status: "ok",
        service: "Legal Jargon API",
        environment: {
            gemini: Boolean(process.env.GEMINI_API_KEY),
            groq: Boolean(process.env.GROQ_API_KEY),
            supabase: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
        },
    });
}