import { NextResponse } from 'next/server';
import { extractTextFromPdf } from '@/lib/pdf-parser';
import { aiService } from '@/lib/services/aiService';
import { saveContractToDb, JargonTermItem } from '@/lib/supabase/contractService';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No PDF contract file provided in request.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Uploaded file is empty.' },
        { status: 400 }
      );
    }

    // 1. Extract text using PDF parser with OCR fallback
    let extractedText = '';
    try {
      extractedText = await extractTextFromPdf(buffer);
    } catch (parseError: unknown) {
      console.error('PDF Parsing Error:', parseError);
      const msg = parseError instanceof Error ? parseError.message : 'PDF extraction failed.';
      return NextResponse.json(
        { success: false, error: msg },
        { status: 422 }
      );
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Could not extract text from document.' },
        { status: 422 }
      );
    }

    // 2. Perform AI Document Analysis (Executive Summary + Jargon Terms)
    const summaryResult = await aiService.generateSummary(extractedText, 'en');
    const keyClauses = await aiService.analyzeKeyClauses(extractedText, 'en');

    // Build structured jargon terms array
    const jargonTerms = buildJargonTerms(extractedText, keyClauses);
    const summaryText = summaryResult.executiveSummary || 'Extracted document text parsed successfully.';

    // 3. Store record in database
    const savedRecord = await saveContractToDb({
      file_name: file.name,
      summary: summaryText,
      original_text: extractedText,
      jargon_terms: jargonTerms,
    });

    return NextResponse.json({
      success: true,
      originalText: extractedText,
      summary: summaryText,
      jargonTerms,
      contractId: savedRecord?.id || `contract-${Date.now()}`,
    });
  } catch (error: unknown) {
    console.error('PARSE API UNCAUGHT ERROR:', error);
    const message = error instanceof Error ? error.message : 'Document processing failed.';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * Extract legal jargon terms with definitions and risk levels
 */
function buildJargonTerms(
  text: string,
  keyClauses: Array<{ title: string; simplifiedExplanation: string; riskLevel: string }>
): JargonTermItem[] {
  const lower = text.toLowerCase();

  const predefinedJargon: Array<{
    term: string;
    definition: string;
    riskLevel: string;
    keywords: string[];
  }> = [
    {
      term: 'Indemnification',
      definition: 'An obligation to compensate another party for loss, damage, or legal liability incurred.',
      riskLevel: 'High',
      keywords: ['indemnify', 'indemnification', 'hold harmless'],
    },
    {
      term: 'Limitation of Liability',
      definition: 'A clause that caps the maximum financial damages a party can claim in a legal dispute.',
      riskLevel: 'Moderate',
      keywords: ['limitation of liability', 'liability cap', 'consequential damages'],
    },
    {
      term: 'Termination Without Cause',
      definition: 'Allows either party to cancel the agreement at any time by giving advance written notice.',
      riskLevel: 'Moderate',
      keywords: ['termination without cause', 'convenience', 'written notice'],
    },
    {
      term: 'Severability',
      definition: 'Ensures that if one clause is invalidated by a court, the rest of the contract remains active.',
      riskLevel: 'Low',
      keywords: ['severability', 'invalidity', 'unenforceable'],
    },
    {
      term: 'Governing Law',
      definition: 'Designates which state or jurisdiction’s legal framework governs contract interpretation.',
      riskLevel: 'Low',
      keywords: ['governing law', 'jurisdiction', 'laws of'],
    },
    {
      term: 'Confidentiality',
      definition: 'Strict duty to protect proprietary data, commercial secrets, and private records from disclosure.',
      riskLevel: 'Low',
      keywords: ['confidentiality', 'confidential information', 'non-disclosure'],
    },
  ];

  const matched: JargonTermItem[] = [];

  for (const item of predefinedJargon) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      matched.push({
        term: item.term,
        definition: item.definition,
        riskLevel: item.riskLevel,
      });
    }
  }

  // Include top extracted key clauses as jargon terms if list is short
  if (matched.length < 3) {
    keyClauses.slice(0, 3).forEach((clause) => {
      matched.push({
        term: clause.title,
        definition: clause.simplifiedExplanation,
        riskLevel: clause.riskLevel === 'high' ? 'High' : clause.riskLevel === 'medium' ? 'Moderate' : 'Low',
      });
    });
  }

  if (matched.length === 0) {
    matched.push({
      term: 'General Provision',
      definition: 'Standard commercial agreement terms and conditions.',
      riskLevel: 'Low',
    });
  }

  return matched;
}
