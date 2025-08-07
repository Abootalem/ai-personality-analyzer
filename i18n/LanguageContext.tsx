import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import type { Language } from '../types';
import { translations, TranslationKey } from './locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  const t = useCallback((key: TranslationKey, options?: { [key: string]: string | number }): string => {
    let text = translations[key]?.[language] || key;
     if (options) {
      Object.keys(options).forEach(k => {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(options[k]));
      });
    }
    return text;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
