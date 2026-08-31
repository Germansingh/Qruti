import {
  LegalDocument,
  FileType,
  AnalysisResult,
} from "../types/document";
import { SEED_DOCUMENTS, DEMO_USER } from "./mockData";
import { aiService } from "./aiService";

const STORAGE_KEY = "legal_jargon_documents_v1";

export const documentService = {
  /**
   * Fetch all documents for demo user
   */
  async getDocuments(): Promise<LegalDocument[]> {
    if (typeof window === "undefined") {
      return SEED_DOCUMENTS;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(SEED_DOCUMENTS)
        );

        return SEED_DOCUMENTS;
      }

      return JSON.parse(stored);
    } catch (e) {
      console.warn(
        "LocalStorage error, returning default seed data:",
        e
      );

      return SEED_DOCUMENTS;
    }
  },

  /**
   * Fetch a single document by ID
   */
  async getDocumentById(
    id: string
  ): Promise<LegalDocument | null> {
    const docs = await this.getDocuments();

    return docs.find((d) => d.id === id) || null;
  },

  /**
   * Validate uploaded file format and size
   */
  validateFile(
    file: File
  ): { isValid: boolean; error?: string } {
    const validExtensions = [
      "pdf",
      "jpg",
      "jpeg",
      "png",
    ];

    const fileNameParts = file.name.split(".");
    const ext =
      fileNameParts[fileNameParts.length - 1].toLowerCase();

    if (!validExtensions.includes(ext)) {
      return {
        isValid: false,
        error: `Unsupported file type ".${ext}". Please upload a PDF, JPG, or PNG document.`,
      };
    }

    const maxSizeBytes = 15 * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      return {
        isValid: false,
        error: `File size exceeds 15 MB limit (Your file: ${(file.size / (1024 * 1024)).toFixed(
          1
        )} MB).`,
      };
    }

    return {
      isValid: true,
    };
  },

  /**
   * Real document upload
   *
   * Flow:
   * 1. Upload file
   * 2. Process/OCR document
   * 3. Extract text
   * 4. Analyze document using AI
   * 5. Save document metadata locally
   *
   * IMPORTANT:
   * We do NOT create fake "doc-xxxxx" IDs.
   * The ID must come from Supabase as a UUID.
   */
  async createDocument(
    file: File,
    simulateFailure = false
  ): Promise<LegalDocument> {
    const ext = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const fileType: FileType =
      ext === "png"
        ? "png"
        : ext === "jpg" || ext === "jpeg"
          ? "jpg"
          : "pdf";

    const formattedSize =
      (file.size / (1024 * 1024)).toFixed(2) + " MB";

    /**
     * Demo failure mode
     */
    if (simulateFailure) {
      const failedDoc: LegalDocument = {
        id: `doc-fail-${Date.now()}`,
        ownerId: DEMO_USER.id,
        title: file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/_/g, " "),
        fileName: file.name,
        fileType,
        fileSizeFormatted: formattedSize,
        fileSizeBytes: file.size,
        uploadDate: new Date().toISOString(),
        status: "failed",
        processingProgress: 40,
        failureReason:
          "OCR text extraction failed due to low contrast/unreadable scan. Please retry with a clearer image or PDF.",
        category: "Uploaded Document",
      };

      const currentDocs = await this.getDocuments();

      this.saveDocuments([
        failedDoc,
        ...currentDocs,
      ]);

      return failedDoc;
    }

    try {
      /**
       * STEP 1
       * Upload file to backend
       */
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(
        "/api/documents/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadJson = await uploadRes.json();

      if (!uploadRes.ok || !uploadJson.success) {
        throw new Error(
          uploadJson.error ||
          "Upload to storage failed"
        );
      }

      /**
       * Get document created by Supabase
       *
       * IMPORTANT:
       * dbDoc.id should be a UUID.
       */
      const dbDoc = uploadJson.data?.document;

      if (!dbDoc?.id) {
        throw new Error(
          "Upload succeeded but no document ID was returned."
        );
      }

      const docId: string = dbDoc.id;

      console.log(
        "DOCUMENT CREATED WITH SUPABASE ID:",
        docId
      );

      /**
       * STEP 2
       * Process document / OCR
       */
      const processRes = await fetch(
        `/api/documents/${docId}/process`,
        {
          method: "POST",
        }
      );

      const processJson = await processRes.json();

      if (
        !processRes.ok ||
        !processJson.success
      ) {
        throw new Error(
          processJson.error ||
          "Document processing failed"
        );
      }

      /**
       * STEP 3
       * Get extracted text
       */
      const extractedText: string =
        processJson.data?.extractedText ||
        processJson.data?.document?.extracted_text ||
        "";

      if (!extractedText.trim()) {
        throw new Error(
          "No text could be extracted from this document."
        );
      }

      console.log(
        "EXTRACTED TEXT LENGTH:",
        extractedText.length
      );

      /**
       * STEP 4
       * AI document analysis
       */
      const analysis: AnalysisResult =
        await aiService.analyzeDocument(
          extractedText,
          file.name,
          "en"
        );

      /**
       * STEP 5
       * Create frontend document object
       *
       * Use Supabase UUID.
       */
      const newDoc: LegalDocument = {
        id: docId,
        ownerId: DEMO_USER.id,
        title: file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/_/g, " "),
        fileName: file.name,
        fileType,
        fileSizeFormatted: formattedSize,
        fileSizeBytes: file.size,
        uploadDate: new Date().toISOString(),
        status: "processed",
        processingProgress: 100,
        category: "Uploaded Document",
        analysis,
      };

      /**
       * STEP 6
       * Save locally for UI
       */
      const currentDocs =
        await this.getDocuments();

      const updatedDocs = [
        newDoc,
        ...currentDocs.filter(
          (doc) => doc.id !== docId
        ),
      ];

      this.saveDocuments(updatedDocs);

      return newDoc;
    } catch (err) {
      /**
       * IMPORTANT:
       * Do NOT create a fake local ID here.
       *
       * Fake IDs such as:
       * doc-1788000786517
       *
       * are not valid PostgreSQL UUIDs and cause:
       * "invalid input syntax for type uuid"
       */
      console.error(
        "Document upload/processing failed:",
        err
      );

      throw err instanceof Error
        ? err
        : new Error(
          "Document upload or processing failed"
        );
    }
  },

  /**
   * Delete document by ID
   */
  async deleteDocument(
    id: string
  ): Promise<boolean> {
    const docs = await this.getDocuments();

    const filtered = docs.filter(
      (d) => d.id !== id
    );

    this.saveDocuments(filtered);

    return true;
  },

  /**
   * Retry failed document processing
   */
  async retryProcessing(
    id: string
  ): Promise<LegalDocument | null> {
    const docs = await this.getDocuments();

    const target = docs.find(
      (d) => d.id === id
    );

    if (!target) {
      return null;
    }

    try {
      /**
       * Re-process document
       */
      const processRes = await fetch(
        `/api/documents/${id}/process`,
        {
          method: "POST",
        }
      );

      const processJson =
        await processRes.json();

      if (
        !processRes.ok ||
        !processJson.success
      ) {
        throw new Error(
          processJson.error ||
          "Document processing failed"
        );
      }

      /**
       * Get extracted text
       */
      const extractedText: string =
        processJson.data?.extractedText ||
        processJson.data?.document
          ?.extracted_text ||
        "";

      if (!extractedText.trim()) {
        throw new Error(
          "No text could be extracted from this document."
        );
      }

      /**
       * Re-run AI analysis
       */
      target.analysis =
        await aiService.analyzeDocument(
          extractedText,
          target.fileName,
          "en"
        );

      /**
       * Only mark processed AFTER
       * successful processing + analysis.
       */
      target.status = "processed";
      target.processingProgress = 100;
      target.failureReason = undefined;

      this.saveDocuments(docs);

      return target;
    } catch (e) {
      console.error(
        "Retry document processing failed:",
        e
      );

      /**
       * Do NOT incorrectly mark failed document
       * as processed.
       */
      target.status = "failed";
      target.processingProgress = 40;
      target.failureReason =
        e instanceof Error
          ? e.message
          : "Document processing failed.";

      this.saveDocuments(docs);

      return target;
    }
  },

  /**
   * Save documents to localStorage
   */
  saveDocuments(
    docs: LegalDocument[]
  ): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(docs)
        );
      } catch (e) {
        console.error(
          "Failed to save to localStorage:",
          e
        );
      }
    }
  },
};