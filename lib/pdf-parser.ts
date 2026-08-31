// Use pdf-parse/lib/pdf-parse.js to avoid pdf-parse index.js debug mode bug in Next.js
// @ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import Tesseract from "tesseract.js";

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    if (!buffer || buffer.length === 0) {
        throw new Error("File buffer is empty");
    }

    // Check if buffer is a PDF
    const isPdf = buffer.slice(0, 4).toString("ascii") === "%PDF";

    // ==========================================
    // STEP 1: Normal PDF text extraction
    // ==========================================
    if (isPdf) {
        try {
            const parserFn = typeof pdfParse === "function" ? pdfParse : (pdfParse as any).default;
            const result = await parserFn(buffer);

            if (result && typeof result.text === "string") {
                const text = result.text.trim();

                if (text.length >= 5) {
                    console.log("PDF TEXT EXTRACTION SUCCESS");
                    console.log("Extracted text length:", text.length);

                    return text;
                }
            }

            console.log(
                "PDF contains little/no selectable text. Starting OCR fallback..."
            );
        } catch (error) {
            console.warn(
                "Normal PDF text extraction failed. Starting OCR fallback:",
                error
            );
        }
    } else {
        console.log("Buffer is an image or non-PDF file. Attempting OCR...");
    }

    // ==========================================
    // STEP 2: OCR fallback
    // ==========================================
    return await extractTextUsingOCR(buffer, isPdf);
}

// ==========================================
// OCR FUNCTION
// ==========================================

async function extractTextUsingOCR(buffer: Buffer, isPdf: boolean): Promise<string> {
    console.log("=== OCR FALLBACK STARTED ===");

    if (isPdf) {
        // Tesseract.js does not support raw PDF buffers directly.
        // If pdfParse yielded no text for a PDF, return a descriptive error.
        throw new Error(
            "Could not extract selectable text from this PDF document. If it is a scanned PDF image, please upload it as an image file (PNG/JPEG) for OCR."
        );
    }

    let worker: Tesseract.Worker | null = null;

    try {
        // Safely get createWorker function
        const createWorkerFn =
            typeof Tesseract.createWorker === "function"
                ? Tesseract.createWorker
                : (require("tesseract.js") as typeof Tesseract).createWorker;

        worker = await createWorkerFn("eng");
        console.log("Tesseract worker created");

        const { data } = await worker.recognize(buffer);
        const text = data.text?.trim() || "";

        console.log("OCR TEXT LENGTH:", text.length);

        if (!text) {
            throw new Error("OCR could not extract text from this image");
        }

        console.log("=== OCR FALLBACK SUCCESS ===");
        return text;
    } catch (ocrError: any) {
        console.error("OCR Error:", ocrError);
        throw new Error(
            ocrError?.message || "OCR text extraction failed"
        );
    } finally {
        if (worker) {
            await worker.terminate();
            console.log("Tesseract worker terminated");
        }
    }
}