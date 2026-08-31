export type SupportedLanguage = 'en' | 'pa' | 'hi';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    selectLanguage: 'Language',
    summary: 'Executive Summary',
    keyClauses: 'Key Clauses',
    risks: 'Risks & Red Flags',
    obligations: 'Obligations',
    dates: 'Dates & Deadlines',
    rawText: 'Extracted Text',
    notSpecified: 'Not specified in the document.',
    groundingWarning: 'I could not find information about that in your document. As an AI legal document assistant, I only answer questions grounded directly in the content of your uploaded document.',
    chatWelcome: 'Hello! I am your AI Legal Assistant for',
    chatPrompt: 'Ask me any question about the clauses, notice periods, payment terms, or risks in this document. My answers are strictly grounded in your file\'s text.',
    askPlaceholder: 'Ask a question about this document...',
    suggested: 'Suggested:',
    backToDashboard: 'Back to Dashboard',
    chatWithAi: 'Chat With Document AI',
    realAiBanner: 'Real AI Document Analysis Engine: Analyzed from actual document text.',
  },
  pa: {
    selectLanguage: 'ਭਾਸ਼ਾ',
    summary: 'ਮੁੱਖ ਸੰਖੇਪ (Executive Summary)',
    keyClauses: 'ਮਹੱਤਵਪੂਰਨ ਧਾਰਾਵਾਂ (Key Clauses)',
    risks: 'ਖਤਰੇ ਅਤੇ ਚੇਤਾਵਨੀਆਂ (Risks & Red Flags)',
    obligations: 'ਜ਼ਿੰਮੇਵਾਰੀਆਂ (Obligations)',
    dates: 'ਮਹੱਤਵਪੂਰਨ ਮਿਤੀਆਂ (Dates & Deadlines)',
    rawText: 'ਅਸਲ ਲਿਖਤ (Extracted Text)',
    notSpecified: 'ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ।',
    groundingWarning: 'ਮੈਨੂੰ ਤੁਹਾਡੇ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਇਸ ਬਾਰੇ ਕੋਈ ਜਾਣਕਾਰੀ ਨਹੀਂ ਮਿਲੀ। ਇੱਕ AI ਕਾਨੂੰਨੀ ਸਹਾਇਕ ਵਜੋਂ, ਮੈਂ ਸਿਰਫ਼ ਤੁਹਾਡੇ ਅੱਪਲੋਡ ਕੀਤੇ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਮੌਜੂਦ ਜਾਣਕਾਰੀ ਦੇ ਆਧਾਰ \'ਤੇ ਹੀ ਜਵਾਬ ਦਿੰਦਾ ਹਾਂ।',
    chatWelcome: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਕਾਨੂੰਨੀ ਸਹਾਇਕ ਹਾਂ',
    chatPrompt: 'ਇਸ ਦਸਤਾਵੇਜ਼ ਦੀਆਂ ਧਾਰਾਵਾਂ, ਨੋਟਿਸ ਪੀਰੀਅਡ, ਭੁਗਤਾਨ ਦੀਆਂ ਸ਼ਰਤਾਂ ਜਾਂ ਜੋਖਮਾਂ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ। ਮੇਰੇ ਜਵਾਬ ਸਖਤੀ ਨਾਲ ਤੁਹਾਡੀ ਫਾਈਲ ਦੇ ਟੈਕਸਟ \'ਤੇ ਆਧਾਰਿਤ ਹਨ।',
    askPlaceholder: 'ਇਸ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਸਵਾਲ ਪੁੱਛੋ...',
    suggested: 'ਸੁਝਾਏ ਗਏ ਸਵਾਲ:',
    backToDashboard: 'ਡੈਸ਼ਬੋਰਡ \'ਤੇ ਵਾਪਸ ਜਾਓ',
    chatWithAi: 'AI ਨਾਲ ਗੱਲਬਾਤ ਕਰੋ',
    realAiBanner: 'ਅਸਲ AI ਦਸਤਾਵੇਜ਼ ਵਿਸ਼ਲੇਸ਼ਣ: ਅਸਲ ਦਸਤਾਵੇਜ਼ੀ ਲਿਖਤ ਤੋਂ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ।',
  },
  hi: {
    selectLanguage: 'भाषा',
    summary: 'कार्यकारी सारांश (Executive Summary)',
    keyClauses: 'मुख्य धाराएं (Key Clauses)',
    risks: 'जोखिम और चेतावनी (Risks & Red Flags)',
    obligations: 'दायित्व और जिम्मेदारियां (Obligations)',
    dates: 'महत्वपूर्ण तिथियां (Dates & Deadlines)',
    rawText: 'मूल पाठ (Extracted Text)',
    notSpecified: 'दस्तावेज़ में निर्दिष्ट नहीं है।',
    groundingWarning: 'मुझे आपके दस्तावेज़ में इसके बारे में कोई जानकारी नहीं मिली। AI कानूनी सहायक के रूप में, मैं केवल आपके अपलोड किए गए दस्तावेज़ की सामग्री के आधार पर ही उत्तर देता हूँ।',
    chatWelcome: 'नमस्ते! मैं आपका AI कानूनी सहायक हूँ',
    chatPrompt: 'इस दस्तावेज़ की धाराओं, नोटिस अवधि, भुगतान शर्तों या जोखिमों के बारे में कोई भी प्रश्न पूछें। मेरे उत्तर कड़ाई से आपकी फ़ाइल के पाठ पर आधारित हैं।',
    askPlaceholder: 'इस दस्तावेज़ के बारे में प्रश्न पूछें...',
    suggested: 'सुझाए गए प्रश्न:',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    chatWithAi: 'AI से बात करें',
    realAiBanner: 'वास्तविक AI दस्तावेज़ विश्लेषण: मूल दस्तावेज़ पाठ से विश्लेषित।',
  },
};

// Dictionary mappings for common legal terms and phrases
const dictionary: Record<SupportedLanguage, Record<string, string>> = {
  en: {},
  pa: {
    'Executive Summary': 'ਮੁੱਖ ਸੰਖੇਪ',
    'General Commercial Agreement': 'ਆਮ ਵਪਾਰਕ ਸਮਝੌਤਾ',
    'Employment / Resume Document': 'ਰੋਜ਼ਗਾਰ / ਰਿਜ਼ਿਊਮੇ ਦਸਤਾਵੇਜ਼',
    'Not specified in the document.': 'ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ।',
    'High': 'ਉੱਚ (High)',
    'Moderate': 'ਮੱਧਮ (Moderate)',
    'Low': 'ਘੱਟ (Low)',
    'Low Risk': 'ਘੱਟ ਜੋਖਮ',
    'Moderate Risk': 'ਮੱਧਮ ਜੋਖਮ',
    'High Risk': 'ਉੱਚ ਜੋਖਮ',
    'Notice Period': 'ਨੋਟਿਸ ਪੀਰੀਅਡ',
    'Payment Due': 'ਭੁਗਤਾਨ ਦੀ ਮਿਤੀ',
    'Expiration': 'ਮਿਆਦ ਖਤਮ',
    'Renewal': 'ਨਵੀਨੀਕਰਨ',
    'Review': 'ਸਮੀਖਿਆ',
    'Monthly': 'ਮਹੀਨਾਵਾਰ',
    'Annual': 'ਸਾਲਾਨਾ',
    'One-time': 'ਇੱਕ ਵਾਰ',
    'On Trigger': 'ਜ਼ਰੂਰਤ ਪੈਣ \'ਤੇ',
    'Termination': 'ਸਮਾਪਤੀ (Termination)',
    'Payment': 'ਭੁਗਤਾਨ (Payment)',
    'Liability': 'ਜ਼ਿੰਮੇਵਾਰੀ/ਦੇਣਦਾਰੀ (Liability)',
    'Privacy': 'ਗੋਪਨੀਯਤਾ (Privacy)',
    'IP': 'ਬੌਧਿਕ ਸੰਪਤੀ (IP)',
    'General': 'ਆਮ ਸ਼ਰਤਾਂ (General)',
    'user': 'ਤੁਹਾਡੀ ਜ਼ਿੰਮੇਵਾਰੀ (User)',
    'counterparty': 'ਦੂਜੀ ਪਾਰਟੀ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ (Counterparty)',
  },
  hi: {
    'Executive Summary': 'कार्यकारी सारांश',
    'General Commercial Agreement': 'सामान्य वाणिज्यिक समझौता',
    'Employment / Resume Document': 'रोजगार / बायोडाटा दस्तावेज़',
    'Not specified in the document.': 'दस्तावेज़ में निर्दिष्ट नहीं है।',
    'High': 'उच्च (High)',
    'Moderate': 'मध्यम (Moderate)',
    'Low': 'कम (Low)',
    'Low Risk': 'कम जोखिम',
    'Moderate Risk': 'मध्यम जोखिम',
    'High Risk': 'उच्च जोखिम',
    'Notice Period': 'नोटिस अवधि',
    'Payment Due': 'भुगतान तिथि',
    'Expiration': 'समाप्ति',
    'Renewal': 'नवीनीकरण',
    'Review': 'समीक्षा',
    'Monthly': 'मासिक',
    'Annual': 'वार्षिक',
    'One-time': 'एक बार',
    'On Trigger': 'आवश्यकता पर',
    'Termination': 'समाप्ति (Termination)',
    'Payment': 'भुगतान (Payment)',
    'Liability': 'दायित्व/देयता (Liability)',
    'Privacy': 'गोपनीयता (Privacy)',
    'IP': 'बौद्धिक संपदा (IP)',
    'General': 'सामान्य शर्तें (General)',
    'user': 'आपकी जिम्मेदारी (User)',
    'counterparty': 'दूसरी पार्टी की जिम्मेदारी (Counterparty)',
  },
};

const COMPILED_REGEX: Record<SupportedLanguage, Array<{ pattern: RegExp; replacement: string }>> = {
  en: [],
  pa: Object.entries(dictionary.pa).map(([key, val]) => ({
    pattern: new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    replacement: val,
  })),
  hi: Object.entries(dictionary.hi).map(([key, val]) => ({
    pattern: new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    replacement: val,
  })),
};

export function translateText(
  text: string,
  targetLang: SupportedLanguage
): string {
  if (targetLang === 'en' || !text) return text;

  const dict = dictionary[targetLang];
  if (dict && dict[text]) {
    return dict[text];
  }

  let translated = text;
  const rules = COMPILED_REGEX[targetLang];
  if (rules) {
    for (let i = 0; i < rules.length; i++) {
      translated = translated.replace(rules[i].pattern, rules[i].replacement);
    }
  }

  return translated;
}
