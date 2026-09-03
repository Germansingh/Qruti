'use client';

import React, { useState, useEffect } from 'react';
import { LegalDocument, ChatMessage } from '@/lib/types/document';
import { aiService } from '@/lib/services/aiService';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/services/languageService';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { sanitizeFileName } from '@/lib/utils/sanitize';
import {
  Send,
  Bot,
  User,
  Sparkles,
  AlertCircle,
  FileText,
  Bookmark,
  Loader2,
} from 'lucide-react';

interface ChatInterfaceProps {
  document: LegalDocument;
  initialLanguage?: SupportedLanguage;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  document,
  initialLanguage = 'en',
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const cleanFileName = sanitizeFileName(document.fileName);
  const labels = UI_TRANSLATIONS[currentLanguage];

  useEffect(() => {
    const welcomeText = `${labels.chatWelcome} **${document.title}**.\n\n${labels.chatPrompt}`;
    setMessages([
      {
        id: `welcome-${currentLanguage}`,
        documentId: document.id,
        sender: 'ai',
        text: welcomeText,
        timestamp: 'Just now',
      },
    ]);
  }, [document.id, document.title, currentLanguage, labels.chatWelcome, labels.chatPrompt]);

  const getSuggestedQuestions = (lang: SupportedLanguage) => {
    if (lang === 'pa') {
      return [
        'ਜੇਕਰ ਮੈਂ ਇਸ ਦਾ ਜਵਾਬ ਨਾ ਦਿੱਤਾ ਤਾਂ ਮੇਰੇ \'ਤੇ ਕੀ ਕਾਰਵਾਈ ਹੋ ਸਕਦੀ ਹੈ?',
        'ਮੈਨੂੰ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਕਦਮ ਚੁੱਕਣਾ ਚਾਹੀਦਾ ਹੈ?',
        'ਇਹ ਕਿਹੜੇ ਵਿਭਾਗ ਵਲੋਂ ਆਇਆ ਹੈ ਅਤੇ ਆਖਰੀ ਤਾਰੀਖ ਕੀ ਹੈ?',
        'ਕੀ ਇਸ ਵਿੱਚ ਕੋਈ ਜ਼ੁਰਮਾਨਾ ਜਾਂ ਪੈਨਲਟੀ ਲਗਾਈ ਗਈ ਹੈ?',
      ];
    }
    if (lang === 'hi') {
      return [
        'यदि मैं इसका उत्तर नहीं देता तो मेरे खिलाफ क्या कार्रवाई हो सकती है?',
        'मुझे सबसे पहले क्या कदम उठाना चाहिए?',
        'यह किस विभाग से आया है और इसकी अंतिम तिथि क्या है?',
        'क्या इसमें कोई जुर्माना या पेनल्टी लगाई गई है?',
      ];
    }
    return [
      'What action can be taken against me if I don\'t respond to this notice?',
      'What exact step should I take first?',
      'Which department or authority issued this and when is the deadline?',
      'Are there any financial penalties, fines, or legal risks involved?',
    ];
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      documentId: document.id,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsThinking(true);

    try {
      const aiReply = await aiService.askDocumentQuestion(
        document,
        textToSend,
        messages,
        currentLanguage
      );
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('Chat AI Error:', err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-[780px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header Banner - Virtual AI Legal Advocate */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              {labels.advocateTitle}
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
                Legal Counselor Active
              </span>
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Analyzing: <strong className="text-slate-200">{cleanFileName}</strong></span>
            </p>
          </div>
        </div>

        {/* Language Selector */}
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={(lang) => setCurrentLanguage(lang)}
          compact
        />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-2">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Grounding Warning */}
                {msg.isGroundingWarning && (
                  <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>AI Grounding Active: Questions outside document context are declined.</span>
                  </div>
                )}

                {/* Citations Card */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5">
                    <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
                      <Bookmark className="w-3 h-3" /> Grounded Source Citation:
                    </div>
                    {msg.citations.map((c, i) => (
                      <div
                        key={i}
                        className="p-2 rounded bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300"
                      >
                        <strong className="text-slate-200 block">{c.clauseTitle}</strong>
                        <span className="italic text-slate-400">&quot;{c.snippet}&quot;</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-500 px-1 block">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {/* AI Typing Loader */}
        {isThinking && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              <span>Analyzing document context and formulating response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-6 py-2 bg-slate-950 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] flex items-center gap-1 shrink-0 font-medium">
            <Sparkles className="w-3 h-3 text-blue-400" /> {labels.suggested}
          </span>
          {getSuggestedQuestions(currentLanguage).map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              disabled={isThinking}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors shrink-0 text-xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={labels.askPlaceholder}
            disabled={isThinking}
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isThinking}
            className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-900/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
