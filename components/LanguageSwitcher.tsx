import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import type { Language } from '../types';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const languages: { code: Language, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'fa', name: 'فارسی' },
  ];

  const inactiveStyle = "px-4 py-1.5 text-sm font-medium text-gray-400 bg-gray-700/50 rounded-md hover:bg-gray-600/50 transition-colors";
  const activeStyle = "px-4 py-1.5 text-sm font-medium text-white bg-purple-600 rounded-md shadow-lg cursor-default";

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-800 p-1.5 rounded-lg shadow-inner">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={language === lang.code ? activeStyle : inactiveStyle}
          aria-pressed={language === lang.code}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};
