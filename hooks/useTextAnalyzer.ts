import { useState, useCallback } from 'react';
import { getBigFiveProfileFromText } from '../services/geminiService';
import type { BigFiveProfile, Language } from '../types';

export const useTextAnalyzer = (apiKey: string | null, language: Language = 'en') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState('');

  const analyzeText = useCallback(async (text: string): Promise<BigFiveProfile | null> => {
    setIsLoading(true);
    setError(null);
    setProgressMessage('progress.analyzingText');

    if (!apiKey) {
      const errorKey = 'error.apiKeyMissing';
      setError(errorKey);
      setIsLoading(false);
      throw new Error(errorKey);
    }
    
    if (!text.trim()) {
      const errorKey = 'error.textEmpty';
      setError(errorKey);
      setIsLoading(false);
      throw new Error(errorKey);
    }

    try {
      const profile = await getBigFiveProfileFromText(text, apiKey, language);
      setProgressMessage('progress.complete');
      setIsLoading(false);
      return profile;
    } catch (err) {
      const errorMessageKey = err instanceof Error ? err.message : 'error.aiServiceGeneric';
      setError(errorMessageKey);
      setIsLoading(false);
      throw new Error(errorMessageKey);
    }
  }, [apiKey, language]);

  return { analyzeText, isLoading, error, progressMessage };
};
