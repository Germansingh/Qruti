# Legal Jargon — System Architecture & Technology Decisions (Step 6 & Step 7)

This document formalizes the technical architecture, component relationships, data flows, and technology stack selection for **Legal Jargon**, an AI-powered legal document understanding and assistance platform.

---

## 1. System Overview & Core Principles

Legal Jargon is designed as a modular, 7-layer full-stack application. The system prioritizes:

* **Separation of Concerns**: Strict decoupling between UI components, server API handlers, business services, database queries, and external AI providers.
* **Grounded AI Safety**: AI responses are bounded by uploaded document content, explicitly declining non-document questions to prevent legal hallucinations.
* **Service Boundaries**: All external dependencies (OCR, PDF text extraction, LLM APIs, file storage) are hidden behind modular TypeScript interfaces so providers can be swapped without rewriting client or server logic.
* **Post-Auth Readiness**: System structures all entities with explicit owner boundaries (`ownerId`), ensuring authentication (Postponed to Step 8+) can be added seamlessly.

---

## 2. High-Level System Architecture (Step 6)

```
+-------------------------------------------------------------------------+
|                                USER / BROWSER                           |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                        1. FRONTEND UI LAYER                             |
|          (Next.js App Router, React 19, Tailwind CSS, TypeScript)       |
|    Landing Page | Dashboard | Upload Dropzone | Analysis Hub | Chat UI  |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                    2. SERVER / API ROUTE LAYER                          |
|             (Next.js Server Actions & Route Handlers)                   |
|  Request Validation (Zod) | Rate Limiting | Ownership Verification      |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                    3. BUSINESS LOGIC & SERVICE LAYER                    |
|      (documentService, aiService, ocrService, storageService)           |
+-------------------------------------------------------------------------+
         /                          |                          \
        v                           v                           v
+-----------------------+ +--------------------+ +------------------------+
| 4. DATABASE LAYER     | | 5. FILE STORAGE    | | 6. DOCUMENT PROCESSOR  |
| PostgreSQL (Planned)  | | Supabase Storage   | | PDF Extraction /       |
| Users, Metadata,      | | PDF, JPG, PNG      | | Tesseract OCR         |
| Analysis, Conversations| | Binary Files      | | Clean Text Pipeline   |
+-----------------------+ +--------------------+ +------------------------+
                                                                |
                                                                v
                                                 +------------------------+
                                                 | 7. AI & RAG SERVICE    |
                                                 | Grounded LLM Provider  |
                                                 | Vector Search (Future) |
                                                 +------------------------+
```

---

## 3. Main System Components

### 1. Frontend UI Layer
* **Responsibility**: User interaction, drag-and-drop file upload, real-time stepper feedback, tabbed analysis visualization, grounded chat interface, loading and error states.
* **Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React icons.
* **Rule**: Zero direct API calls to LLM providers or databases from UI components.

### 2. Server / API Layer
* **Responsibility**: Entry point for document uploads, status polling, AI Q&A requests, and document deletions. Handles server-side validation, error wrapping, and credentials protection.
* **Implementation**: Next.js App Router API Routes (`/api/documents`, `/api/chat`).

### 3. Database Layer (Planned - Step 8)
* **Target DB**: Relational PostgreSQL via Supabase.
* **Entities**: `users`, `documents`, `document_analysis`, `key_clauses`, `risk_factors`, `conversations`, `messages`.

### 4. File Storage Layer (Planned)
* **Target Storage**: Supabase Storage buckets.
* **Storage Flow**: Relational DB stores file metadata (`file_path`, `file_size`, `mime_type`), while binary PDF/image files reside in secure object storage.

### 5. Document Processing Service (`ocrService`)
* **Responsibility**: Converts PDF documents and scanned images (JPG, PNG) into clean, plain UTF-8 text strings.
* **OCR Boundary**: Initial integration planned via Tesseract OCR engine with fallback to cloud document processing.

### 6. AI Service Abstraction (`aiService`)
Exposes standardized TypeScript methods independent of the underlying LLM vendor:

```typescript
export interface AIServiceInterface {
  generateSummary(documentText: string): Promise<ExecutiveSummary>;
  analyzeKeyClauses(documentText: string): Promise<KeyClause[]>;
  analyzeRisks(documentText: string): Promise<PotentialRisk[]>;
  extractObligations(documentText: string): Promise<UserObligation[]>;
  extractDeadlines(documentText: string): Promise<ImportantDate[]>;
  answerDocumentQuestion(
    documentContext: string,
    question: string,
    history: ChatMessage[]
  ): Promise<ChatMessage>;
}
```

### 7. Document Chat / RAG Architecture (Planned)
* **Chunking**: Text split into 500-token semantic chunks with overlap.
* **Embeddings**: Vector embeddings generated for document chunks.
* **Retrieval**: Top-k relevant chunks retrieved based on cosine similarity to user query.
* **Grounded Answer**: LLM prompt combines retrieved chunks + user query. If no relevant chunks match, AI responds with explicit unanswerable grounding statement.

---

## 4. End-to-End Data Flows

### Document Upload & Processing Pipeline
```
[User] ──(Drop File)──> [Upload UI] ──(FormData)──> [Upload API]
                                                         │
                             ┌───────────────────────────┴───────────────────────────┐
                             ▼                                                       ▼
                      [File Storage]                                           [Database]
                    (Save PDF/Image)                                     (Create Doc Record: uploaded)
                             │                                                       │
                             └───────────────────────────┬───────────────────────────┘
                                                         ▼
                                             [Processing Service]
                                             (PDF Parsing / OCR)
                                                         │
                                                         ▼
                                                (Extracted Text)
                                                         │
                                                         ▼
                                                   [AI Service]
                                          (Summary, Clauses, Risks)
                                                         │
                                                         ▼
                                                     [Database]
                                           (Status: processed + Analysis)
                                                         │
                                                         ▼
                                                    [Frontend]
                                              (Render Analysis Hub)
```

### Grounded AI Chat Flow
```
[User] ──(Submit Question)──> [Chat UI] ──(POST /api/chat)──> [Chat API]
                                                                  │
                                                                  ▼
                                                      [Retrieve Doc Context]
                                                        (From DB / Vector)
                                                                  │
                                                                  ▼
                                                          [AI Service]
                                                 (Ground Query in Document)
                                                                  │
                                                                  ▼
                                                  [Grounded Answer / Citation]
                                                                  │
                                                                  ▼
                                                            [Save Message]
                                                                  │
                                                                  ▼
                                                         [Render in Chat UI]
```

---

## 5. Error Handling & Security Architecture

### Controlled Failure Principles
* **Upload Failure**: Returns validation error (unsupported format or size > 15MB); document record is not created.
* **Processing / OCR Failure**: Status marked as `failed`; document metadata preserved; user provided with clear error message and "Retry Processing" button.
* **AI Provider Failure**: Analysis marked as `failed`; document file remains accessible; user can trigger retry without re-uploading file.

### Post-Auth Security Boundaries
* **Client Secret Isolation**: API keys (OpenAI, Gemini, Supabase) never exposed to client bundles.
* **Input Validation**: All server payloads validated using Zod schemas.
* **Document Isolation**: All queries scoped by `ownerId` to enforce document privacy.

---

## 6. Technology Stack Matrix (Step 7)

| Layer | Selected Technology | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router) | Standardized full-stack React framework with server-side API capabilities. |
| **UI Library** | React 19 | Component-driven declarative UI. |
| **Language** | TypeScript | Strong typing, clear interfaces, prevention of runtime null errors. |
| **Styling** | Tailwind CSS | Utility-first CSS for fast, responsive, modern SaaS design. |
| **Database** (Planned) | PostgreSQL / Supabase | Relational structure for users, contracts, key clauses, and chat history. |
| **File Storage** (Planned) | Supabase Storage | Secure object storage for legal PDF and image assets. |
| **OCR Engine** (Planned) | Tesseract OCR | Open-source image-to-text processing bounded behind `ocrService`. |
| **AI Provider** | Modular Service Abstraction | Provider-agnostic interface supporting OpenAI, Gemini, or Anthropic. |
| **Input Validation** | Zod | Server-side schema validation for request payloads and AI outputs. |
| **Deployment** (Planned) | Vercel + Supabase | Native Next.js serverless execution paired with managed Postgres. |

---

## 7. Current Development Matrix & Postponement Status

| Feature / Module | Current Status | Notes |
| :--- | :--- | :--- |
| **Landing Page** | ✅ Complete | Public overview, target personas, workflow, legal disclaimer |
| **Dashboard** | ✅ Complete | Overview metrics, contract list, search, status filters |
| **Document Upload UI** | ✅ Complete | Drag-and-drop dropzone, stepper animation, retry handling |
| **Analysis Hub UI** | ✅ Complete | 5 Analysis tabs (Summary, Clauses, Risks, Obligations, Dates) |
| **Grounded Chat UI** | ✅ Complete | Grounded Q&A interface, prompt chips, clause citations |
| **Header UX** | ✅ Streamlined | Sleek logo, simplified navigation, clean demo user badge |
| **Authentication** | ❌ Postponed | Step 8+ requirement (Using mock identity `demo-user-1`) |
| **Production Database** | ❌ Postponed | Step 8 requirement (Using LocalStorage service layer) |
| **Production File Storage** | ❌ Postponed | Step 9 requirement (Using local blob simulation) |
| **Real AI / RAG Pipeline** | ❌ Postponed | Step 10 requirement (Using grounded mock AI responses) |


---

## 8. New Functional Requirements — Real Document Analysis & Language Support

### 8.1 Real AI Document Analysis

After a document is uploaded and its text is successfully extracted, Legal Jargon must automatically analyze the ACTUAL extracted document text before the user starts the grounded AI chatbot.

The system must NOT use mock/demo analysis for uploaded documents.

The existing extracted text stored in `documents.extracted_text` is the source of truth.

### Required Analysis

The AI analysis should identify and explain, when present:

- Executive Summary
- Document purpose
- Parties involved
- Important terms
- Key clauses
- Rights of each party
- Responsibilities / obligations
- Payment terms
- Fees and penalties
- Notice periods
- Termination conditions
- Confidentiality requirements
- Liability / indemnity
- Dispute resolution
- Governing law / jurisdiction
- Important dates and deadlines
- Risks and red flags
- Important points the user should know
- Other significant information found in the document

The AI must NEVER invent information.

If information is not present in the document, the system must clearly indicate:
"Not specified in the document."

### 8.2 Plain-Language Analysis

The analysis must be understandable to a normal user.

Legal jargon should be avoided where possible.

When an important legal term is unavoidable, provide a short plain-language explanation.

Example:

Legal term:
"Indemnification"

Explanation:
"This generally means one party may have to cover certain losses or claims suffered by the other party."

The analysis should use:

- Clear headings
- Short paragraphs
- Bullet points
- Cards/sections
- Risk badges
- Important-date sections

Avoid displaying the entire analysis as one large paragraph.

### 8.3 Analysis Before Chat

The required user flow is:

Upload Document
        ↓
Store File
        ↓
Extract Text
        ↓
Save extracted_text
        ↓
Analyze Actual Document
        ↓
Save Analysis
        ↓
Display Plain-Language Summary
        ↓
User Selects Preferred Language
        ↓
User Reviews Analysis
        ↓
Start Grounded AI Chat

The chatbot should NOT be the first place where the user discovers the document's contents.

The document analysis page must provide a useful summary of the complete document before the chatbot is opened.

### 8.4 Preferred Language Selection

Add a language selector to the document analysis experience.

Initial supported languages:

- English
- Punjabi
- Hindi

The architecture should allow additional languages to be added later.

The selected language should control the language of:

- Executive Summary
- Key Points
- Key Clauses
- Risks / Red Flags
- Obligations
- Dates and Deadlines explanations
- AI Chat responses

The original extracted document text must NEVER be permanently modified or replaced by the translated version.

Keep the original extracted text as the source of truth.

### 8.5 AI Service Interface Update

Extend the existing AI service abstraction where necessary.

The AI service should support language-aware analysis.

Example:

```ts
generateSummary(
  documentText: string,
  language?: string
): Promise<ExecutiveSummary>;

analyzeKeyClauses(
  documentText: string,
  language?: string
): Promise<KeyClause[]>;

analyzeRisks(
  documentText: string,
  language?: string
): Promise<PotentialRisk[]>;

extractObligations(
  documentText: string,
  language?: string
): Promise<UserObligation[]>;

extractDeadlines(
  documentText: string,
  language?: string
): Promise<ImportantDate[]>;

answerDocumentQuestion(
  documentContext: string,
  question: string,
  history: ChatMessage[],
  language?: string
): Promise<ChatMessage>;