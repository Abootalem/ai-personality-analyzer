import React, { useState, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

interface TextAnalyzerProps {
  onAnalyze: (text: string) => void;
  disabled?: boolean;
}

export const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ onAnalyze, disabled = false }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const handleSubmit = useCallback(() => {
    setErrorKey(null);
    if (disabled) return;
    if (!text.trim()) {
        setErrorKey('error.textEmpty');
        return;
    }
    onAnalyze(text);
  }, [text, onAnalyze, disabled]);

  return (
    <div className={`p-6 bg-gray-700/60 rounded-lg shadow-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <h3 className="text-2xl font-semibold mb-4 text-center text-purple-300">{t('textAnalyzer.title')}</h3>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('textAnalyzer.placeholder')}
        className="w-full h-48 p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        disabled={disabled}
      />

      {errorKey && <p className="text-red-400 text-sm mt-2 text-center">{t(errorKey as any)}</p>}

      <button
        onClick={handleSubmit}
        disabled={!text.trim() || disabled}
        className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('button.analyzeText')}
      </button>
       <p className="text-xs text-gray-500 mt-3 text-center">
        {t('textAnalyzer.aiHint')}
      </p>
    </div>
  );
};
