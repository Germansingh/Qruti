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
    summary: 'Document Saar (Essential Summary)',
    keyClauses: 'Key Clauses',
    risks: 'Risks & Red Flags',
    obligations: 'Obligations',
    dates: 'Dates & Deadlines',
    rawText: 'Extracted Text',
    notSpecified: 'Not specified in the document.',
    groundingWarning: 'I checked your document carefully, but this specific information isn\'t mentioned in your file.',
    chatWelcome: 'Greetings! I am your Virtual AI Legal Advocate for',
    chatPrompt: 'Ask me anything about this document: What does it mean? What action can be taken against you if you don\'t respond? What exact step should you take first?',
    askPlaceholder: 'Ask your AI Advocate a question about this notice or contract...',
    suggested: 'Quick Advocate Questions:',
    backToDashboard: 'Back to Dashboard',
    chatWithAi: 'Ask AI Advocate',
    realAiBanner: 'Instant Real AI Analysis Engine: Simplified for fast understanding.',
    whatDocSays: 'What This Document Says (Simple Meaning)',
    actionRequired: 'What Action Is Required From You',
    issuingDepartment: 'Issuing Department / Organization',
    dateInformation: 'Issue & Deadline Dates',
    keyRequirements: 'Key Rules & Requirements',
    advocateTitle: 'Virtual AI Legal Advocate',
    advocateSubtitle: 'Your personal AI Lawyer explaining notices, risks, and next steps in simple words.',
  },
  pa: {
    selectLanguage: 'ਭਾਸ਼ਾ',
    summary: 'ਦਸਤਾਵੇਜ਼ ਦਾ ਸਾਰ (Document Saar)',
    keyClauses: 'ਮਹੱਤਵਪੂਰਨ ਧਾਰਾਵਾਂ (Key Clauses)',
    risks: 'ਖਤਰੇ ਅਤੇ ਚੇਤਾਵਨੀਆਂ (Risks & Red Flags)',
    obligations: 'ਜ਼ਿੰਮੇਵਾਰੀਆਂ (Obligations)',
    dates: 'ਮਹੱਤਵਪੂਰਨ ਮਿਤੀਆਂ (Dates & Deadlines)',
    rawText: 'ਅਸਲ ਲਿਖਤ (Extracted Text)',
    notSpecified: 'ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਨਹੀਂ ਦਿੱਤਾ ਗਿਆ।',
    groundingWarning: 'ਮੈਨੂੰ ਤੁਹਾਡੇ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਇਸ ਬਾਰੇ ਕੋਈ ਜਾਣਕਾਰੀ ਨਹੀਂ ਮਿਲੀ। ਮੈਂ ਸਿਰਫ਼ ਤੁਹਾਡੇ ਅੱਪਲੋਡ ਕੀਤੇ ਦਸਤਾਵੇਜ਼ ਦੇ ਆਧਾਰ \'ਤੇ ਹੀ ਜਵਾਬ ਦਿੰਦਾ ਹਾਂ।',
    chatWelcome: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਵਰਚੁਅਲ AI ਕਾਨੂੰਨੀ ਸਲਾਹਕਾਰ (Advocate) ਹਾਂ',
    chatPrompt: 'ਇਸ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ: ਇਸਦਾ ਕੀ ਮਤਲਬ ਹੈ? ਜੇਕਰ ਮੈਂ ਜਵਾਬ ਨਾ ਦਿੱਤਾ ਤਾਂ ਮੇਰੇ \'ਤੇ ਕੀ ਕਾਰਵਾਈ ਹੋਵੇਗੀ? ਮੈਨੂੰ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਕਦਮ ਚੁੱਕਣਾ ਚਾਹੀਦਾ ਹੈ?',
    askPlaceholder: 'ਆਪਣੇ AI ਵਕੀਲ ਨੂੰ ਇਸ ਨੋਟਿਸ ਜਾਂ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਸਵਾਲ ਪੁੱਛੋ...',
    suggested: 'ਵਕੀਲ ਵਲੋਂ ਸੁਝਾਏ ਸਵਾਲ:',
    backToDashboard: 'ਡੈਸ਼ਬੋਰਡ \'ਤੇ ਵਾਪਸ ਜਾਓ',
    chatWithAi: 'AI ਵਕੀਲ ਨਾਲ ਗੱਲ ਕਰੋ',
    realAiBanner: 'ਤੁਰੰਤ ਅਸਲ AI ਦਸਤਾਵੇਜ਼ ਵਿਸ਼ਲੇਸ਼ਣ: ਆਮ ਇਨਸਾਨ ਲਈ ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ।',
    whatDocSays: 'ਇਹ ਦਸਤਾਵੇਜ਼ ਕੀ ਕਹਿ ਰਿਹਾ ਹੈ (ਸਰਲ ਮਤਲਬ)',
    actionRequired: 'ਤੁਹਾਡੇ ਵਲੋਂ ਕੀ ਕਰਨ ਦੀ ਲੋੜ ਹੈ (ਕੀ ਕਦਮ ਚੁੱਕਣਾ ਹੈ)',
    issuingDepartment: 'ਜਾਰੀ ਕਰਨ ਵਾਲਾ ਵਿਭਾਗ / ਭੇਜਣ ਵਾਲੀ ਪਾਰਟੀ',
    dateInformation: 'ਲਿਖਣ / ਭੇਜਣ ਦੀ ਮਿਤੀ ਅਤੇ ਆਖਰੀ ਤਾਰੀਖ',
    keyRequirements: 'ਮੁੱਖ ਸ਼ਰਤਾਂ ਅਤੇ ਜ਼ਰੂਰਤਾਂ',
    advocateTitle: 'ਵਰਚੁਅਲ AI ਕਾਨੂੰਨੀ ਸਲਾਹਕਾਰ (Virtual Advocate)',
    advocateSubtitle: 'ਤੁਹਾਡਾ ਆਪਣਾ AI ਵਕੀਲ ਜੋ ਨੋਟਿਸ, ਖਤਰੇ ਅਤੇ ਅਗਲੇ ਕਦਮ ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਉਂਦਾ ਹੈ।',
  },
  hi: {
    selectLanguage: 'भाषा',
    summary: 'दस्तावेज़ का सार (Document Saar)',
    keyClauses: 'मुख्य धाराएं (Key Clauses)',
    risks: 'जोखिम और चेतावनी (Risks & Red Flags)',
    obligations: 'दायित्व और जिम्मेदारियां (Obligations)',
    dates: 'महत्वपूर्ण तिथियां (Dates & Deadlines)',
    rawText: 'मूल पाठ (Extracted Text)',
    notSpecified: 'दस्तावेज़ में निर्दिष्ट नहीं है।',
    groundingWarning: 'मुझे आपके दस्तावेज़ में इसके बारे में कोई जानकारी नहीं मिली। मैं केवल आपकी फ़ाइल के पाठ पर आधारित उत्तर देता हूँ।',
    chatWelcome: 'नमस्ते! मैं आपका वर्चुअल AI कानूनी सलाहकार (Legal Advocate) हूँ',
    chatPrompt: 'इस दस्तावेज़ के बारे में कुछ भी पूछें: इसका क्या अर्थ है? यदि आप उत्तर नहीं देते हैं तो आपके खिलाफ क्या कार्रवाई होगी? आपको सबसे पहले क्या कदम उठाना चाहिए?',
    askPlaceholder: 'अपने AI वकील से इस नोटिस या दस्तावेज़ के बारे में प्रश्न पूछें...',
    suggested: 'वकील द्वारा सुझाए गए प्रश्न:',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    chatWithAi: 'AI वकील से बात करें',
    realAiBanner: 'त्वरित वास्तविक AI विश्लेषण: सामान्य व्यक्ति के लिए सरल भाषा में।',
    whatDocSays: 'यह दस्तावेज़ क्या कह रहा है (सरल अर्थ)',
    actionRequired: 'आपसे क्या करने की आवश्यकता है (क्या कदम उठाना है)',
    issuingDepartment: 'जारीकर्ता विभाग / भेजने वाली संस्था',
    dateInformation: 'जारी तिथि एवं अंतिम समय सीमा',
    keyRequirements: 'मुख्य नियम एवं आवश्यकताएं',
    advocateTitle: 'वर्चुअल AI कानूनी सलाहकार (Virtual Advocate)',
    advocateSubtitle: 'आपका अपना AI वकील जो नोटिस, जोखिम और अगले कदम सरल शब्दों में समझाता है।',
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
