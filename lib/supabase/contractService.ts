import { createSupabaseAdminClient } from '../supabase-admin';

export interface JargonTermItem {
  term: string;
  definition: string;
  riskLevel: string;
}

export interface ContractRecord {
  id?: string;
  user_id?: string;
  file_name: string;
  summary: string;
  jargon_terms?: JargonTermItem[];
  original_text?: string;
  created_at?: string;
}

export async function saveContractToDb(contract: ContractRecord) {
  try {
    const supabase = createSupabaseAdminClient();

    // Insert into contracts table
    const { data, error } = await supabase
      .from('contracts')
      .insert({
        file_name: contract.file_name,
        summary: contract.summary,
        original_text: contract.original_text || '',
        jargon_terms: contract.jargon_terms || [],
        user_id: contract.user_id || 'guest',
      })
      .select()
      .single();

    if (error) {
      console.warn('Contracts table save warning:', error.message);
      // Fallback: save to documents table if contracts table schema differs
      const { data: docData } = await supabase
        .from('documents')
        .insert({
          name: contract.file_name,
          extracted_text: contract.original_text || contract.summary,
          status: 'PROCESSED',
        })
        .select()
        .single();

      return docData || { id: `doc-${Date.now()}`, ...contract };
    }

    return data;
  } catch (err) {
    console.warn('Database save exception:', err);
    return { id: `local-${Date.now()}`, ...contract };
  }
}
