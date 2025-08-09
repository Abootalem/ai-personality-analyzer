import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

interface ApiKeyInputProps {
  onSave: (apiKey: string) => void;
  onCancel: () => void;
  currentKey: string | null;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave, onCancel, currentKey }) => {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState(currentKey || '');
  const [isVisible, setIsVisible] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  const handleRemove = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('gemini_api_key');
      localStorage.removeItem('api_key');
    }
    onSave('');
  };

  return (
    <div className="bg-gray-700/80 p-6 rounded-lg border border-gray-600">
      <h3 className="text-xl font-semibold mb-4 text-purple-300">{t('apiKeyInput.title')}</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
            {t('apiKeyInput.label')}
          </label>
          <div className="relative">
            <input
              id="apiKey"
              type={isVisible ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={t('apiKeyInput.placeholder')}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {isVisible ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p className="mb-2">{t('apiKeyInput.instructions')}</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>{t('apiKeyInput.step1')}</li>
            <li>{t('apiKeyInput.step2')}</li>
            <li>{t('apiKeyInput.step3')}</li>
          </ol>
          <p className="mt-2 text-xs text-yellow-300">{t('apiKeyInput.privacy')}</p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-150 flex-1"
          >
            {t('button.save')}
          </button>
          
          {currentKey && (
            <button
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
            >
              {t('button.remove')}
            </button>
          )}
          
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
          >
            {t('button.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};
