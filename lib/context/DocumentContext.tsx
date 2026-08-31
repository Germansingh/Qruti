'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LegalDocument, MockUser } from '../types/document';
import { documentService } from '../services/documentService';
import { DEMO_USER } from '../services/mockData';

interface DocumentContextType {
  documents: LegalDocument[];
  loading: boolean;
  currentUser: MockUser;
  refreshDocuments: () => Promise<void>;
  uploadDocument: (file: File, simulateFailure?: boolean) => Promise<LegalDocument>;
  deleteDocument: (id: string) => Promise<boolean>;
  retryProcessing: (id: string) => Promise<LegalDocument | null>;
  getDocumentById: (id: string) => LegalDocument | undefined;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocs = async () => {
    setLoading(true);
    const data = await documentService.getDocuments();
    setDocuments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const uploadDocument = async (file: File, simulateFailure = false): Promise<LegalDocument> => {
    const created = await documentService.createDocument(file, simulateFailure);
    await loadDocs();
    return created;
  };

  const deleteDocument = async (id: string): Promise<boolean> => {
    const success = await documentService.deleteDocument(id);
    if (success) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }
    return success;
  };

  const retryProcessing = async (id: string): Promise<LegalDocument | null> => {
    const updated = await documentService.retryProcessing(id);
    if (updated) {
      await loadDocs();
    }
    return updated;
  };

  const getDocumentById = (id: string): LegalDocument | undefined => {
    return documents.find((d) => d.id === id);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        loading,
        currentUser: DEMO_USER,
        refreshDocuments: loadDocs,
        uploadDocument,
        deleteDocument,
        retryProcessing,
        getDocumentById,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};
