import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No file provided",
                },
                { status: 400 }
            );
        }

        const supabase = await createSupabaseServerClient();

        // 1. Create a unique Storage path
        const filePath = `${Date.now()}-${file.name}`;

        // 2. Convert uploaded file to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 3. Upload file to Supabase Storage
        const { data: storageData, error: storageError } =
            await supabase.storage
                .from("documents")
                .upload(filePath, buffer, {
                    contentType: file.type || "application/octet-stream",
                    upsert: false,
                });

        if (storageError) {
            console.error(
                "SUPABASE STORAGE UPLOAD ERROR:",
                storageError
            );

            return NextResponse.json(
                {
                    success: false,
                    error: storageError.message,
                },
                { status: 500 }
            );
        }

        const finalStoragePath = storageData?.path || filePath;
        console.log("UPLOAD SUCCESSFUL. Saved storage path:", finalStoragePath);

        // 4. Save document information in PostgreSQL
        const { data: document, error: databaseError } =
            await supabase
                .from("documents")
                .insert({
                    name: file.name,
                    type: file.type || "application/octet-stream",
                    status: "UPLOADED",
                    file_path: finalStoragePath,
                })
                .select()
                .single();

        // 5. If database insert fails, remove the uploaded file
        if (databaseError) {
            console.error(
                "DOCUMENT DATABASE INSERT ERROR:",
                databaseError
            );

            await supabase.storage
                .from("documents")
                .remove([finalStoragePath]);

            return NextResponse.json(
                {
                    success: false,
                    error: databaseError.message,
                },
                { status: 500 }
            );
        }

        // 6. Return both Storage + database information
        return NextResponse.json({
            success: true,
            data: {
                document,
                path: finalStoragePath,
                fileName: file.name,
                size: file.size,
                type: file.type,
            },
        });
    } catch (error) {
        console.error("UPLOAD ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Upload failed",
            },
            { status: 500 }
        );
    }
}