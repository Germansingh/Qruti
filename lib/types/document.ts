export type ProcessingState = 'uploaded' | 'processing' | 'processed' | 'failed';

export type FileType = 'pdf' | 'jpg' | 'png';

export type RiskSeverity = 'high' | 'medium' | 'low';

export interface KeyClause {
  id: string;
  clauseNumber?: string;
  title: string;
  originalText: string;
  simplifiedExplanation: string;
  category: 'Termination' | 'Payment' | 'Liability' | 'Privacy' | 'IP' | 'General';
  riskLevel: RiskSeverity;
  tags: string[];
}

export interface PotentialRisk {
  id: string;
  title: string;
  severity: RiskSeverity;
  category: string;
  description: string;
  clauseReference?: string;
  recommendedAction: string;
}

export interface UserObligation {
  id: string;
  party: 'user' | 'counterparty';
  title: string;
  description: string;
  frequency?: 'One-time' | 'Monthly' | 'Annual' | 'On Trigger';
  consequenceOfBreach?: string;
}

export interface ImportantDate {
  id: string;
  title: string;
  date: string; // ISO date string or formatted date
  eventType: 'Notice Period' | 'Payment Due' | 'Expiration' | 'Renewal' | 'Review';
  actionRequired: string;
  isDaysCounted?: boolean;
  daysRemaining?: number;
}

export interface AnalysisResult {
  summary: {
    executiveSummary: string;
    keyTakeaways: string[];
    contractType: string;
    governingJurisdiction: string;
    totalEstimatedRiskScore: 'Low' | 'Moderate' | 'High';
  };
  keyClauses: KeyClause[];
  risks: PotentialRisk[];
  obligations: UserObligation[];
  importantDates: ImportantDate[];
  rawTextPreview: string;
}

export interface LegalDocument {
  id: string;
  ownerId: string; // Demo user ID
  title: string;
  fileName: string;
  fileType: FileType;
  fileSizeFormatted: string;
  fileSizeBytes: number;
  uploadDate: string;
  status: ProcessingState;
  processingProgress: number; // 0 to 100
  failureReason?: string;
  category: string;
  analysis?: AnalysisResult;
}

export interface ChatMessage {
  id: string;
  documentId: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: {
    clauseTitle: string;
    snippet: string;
  }[];
  isGroundingWarning?: boolean;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}
