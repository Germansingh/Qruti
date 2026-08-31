import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from("documents")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: "NAME_REQUIRED",
                        message: "Document name is required",
                    },
                },
                { status: 400 }
            );
        }

        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from("documents")
            .insert({
                name: body.name,
                type: body.type || "PDF",
                status: "UPLOADED",
            })
            .select()
            .single();
        if (error) {
            console.error("SUPABASE INSERT ERROR:", error);

            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Invalid request body",
            },
            { status: 400 }
        );
    }
}