// Written by Abootaleb Moradi
import React, { useState, useCallback, useEffect } from 'react';
import { VideoUploader } from './components/VideoUploader';
import { TextAnalyzer } from './components/TextAnalyzer';
import { BigFiveResultsChart } from './components/BigFiveResultsChart';
import { ApiKeyInput } from './components/ApiKeyInput';
import { Spinner } from './components/Spinner';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useFaceProcessor } from './hooks/useFaceProcessor';
import { useTextAnalyzer } from './hooks/useTextAnalyzer';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import type { BigFiveProfile, AppState, AnalysisMode } from './types';
import { AppStateStatus } from './types';
import { initializeEmotionModel } from './services/emotionService';

// Runtime API key detection
const getApiKey = (): string | null => {
  // Try different possible sources
  const sources = [
    // Environment variables that might be available at runtime
    (globalThis as any).process?.env?.GEMINI_API_KEY,
    (globalThis as any).process?.env?.API_KEY,
    (globalThis as any).process?.env?.VITE_GEMINI_API_KEY,
    (globalThis as any).process?.env?.VITE_API_KEY,
    // Try to get from window (injected by server)
    (globalThis as any).window?.GEMINI_API_KEY,
    (globalThis as any).window?.API_KEY,
    // Try localStorage (user provided)
    (typeof localStorage !== 'undefined') ? localStorage.getItem('gemini_api_key') : null,
    (typeof localStorage !== 'undefined') ? localStorage.getItem('api_key') : null,
  ];

  for (const source of sources) {
    if (source && typeof source === 'string' && source.trim().length > 0) {
      return source.trim();
    }
  }
  return null;
};

const AppContent: React.FC = () => {
  const { t, language } = useTranslation();
  const [appState, setAppState] = useState<AppState>({ status: AppStateStatus.Initializing, message: 'status.initializing' });
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('video');
  
  // State for results
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDescription, setVideoDescription] = useState<string | null>(null);
  const [analyzedText, setAnalyzedText] = useState<string | null>(null);
  const [overallPersonality, setOverallPersonality] = useState<BigFiveProfile | null>(null);
  
  // API Key state
  const [currentApiKey, setCurrentApiKey] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Hooks for analysis
  const { analyzeVideo, isLoading: isVideoProcessing, error: videoError, progressMessage: videoProgress } = useFaceProcessor(currentApiKey, language);
  const { analyzeText, isLoading: isTextProcessing, error: textError, progressMessage: textProgress } = useTextAnalyzer(currentApiKey, language);

  // Check for API key on mount and when localStorage changes
  useEffect(() => {
    const checkApiKey = () => {
      const key = getApiKey();
      setCurrentApiKey(key);
      setShowApiKeyInput(!key);
    };

    checkApiKey();

    // Listen for storage events (when user sets API key in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'gemini_api_key' || e.key === 'api_key') {
        checkApiKey();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Initial model loading
  useEffect(() => {
    const modelsLoadingStatusDiv = document.getElementById('models-loading-status');
    if (appState.status === AppStateStatus.Initializing) {
      if (modelsLoadingStatusDiv) {
          modelsLoadingStatusDiv.style.display = 'block';
          modelsLoadingStatusDiv.innerText = t('status.initializing');
      }
    } else {
      if (modelsLoadingStatusDiv) modelsLoadingStatusDiv.style.display = 'none';
    }
  }, [appState.status, t]);

  useEffect(() => {
    if (analysisMode === 'video') {
      initializeEmotionModel()
        .then(() => {
          setAppState(prev => prev.status === AppStateStatus.Initializing ? 
                              { status: AppStateStatus.Idle, message: 'status.ready' } : 
                              prev);
        })
        .catch(err => {
          console.error("Failed to load emotion models:", err);
          setAppState({ status: AppStateStatus.Error, message: 'error.modelLoadFailed' });
        });
    } else {
        setAppState({ status: AppStateStatus.Idle, message: 'status.ready' });
    }
  }, [analysisMode]);

  const handleApiKeySave = (apiKey: string) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('gemini_api_key', apiKey);
    }
    setCurrentApiKey(apiKey);
    setShowApiKeyInput(false);
  };

  const handleVideoAnalysis = useCallback(async (file: File) => {
    if (!file || !currentApiKey) {
        setAppState({ status: AppStateStatus.Error, message: 'error.apiKeyMissing' });
        return;
    }
    setAppState({ status: AppStateStatus.Processing, message: 'status.initializingAnalysis' });
    if(videoUrl) URL.revokeObjectURL(videoUrl);
    
    setVideoUrl(URL.createObjectURL(file));
    setOverallPersonality(null);
    setVideoDescription(null);
    setAnalyzedText(null);

    try {
      const { overallPersonalityData, videoDescription } = await analyzeVideo(file);
      setOverallPersonality(overallPersonalityData);
      setVideoDescription(videoDescription);
      setAppState({ status: AppStateStatus.Done, message: 'status.analysisComplete' });
    } catch (err) {
      console.error("Error during video analysis:", err);
      const errorMessageKey = err instanceof Error ? err.message : 'error.unknown';
      setAppState({ status: AppStateStatus.Error, message: errorMessageKey });
    }
  }, [analyzeVideo, currentApiKey, videoUrl]);

  const handleTextAnalysis = useCallback(async (text: string) => {
      if (!text || !currentApiKey) {
        setAppState({ status: AppStateStatus.Error, message: 'error.apiKeyMissing' });
        return;
      }
      setAppState({ status: AppStateStatus.Processing, message: 'status.initializingAnalysis' });
      setAnalyzedText(text);
      setOverallPersonality(null);
      setVideoUrl(null);
      setVideoDescription(null);

      try {
        const result = await analyzeText(text);
        setOverallPersonality(result);
        setAppState({ status: AppStateStatus.Done, message: 'status.analysisComplete' });
      } catch (err) {
        console.error("Error during text analysis:", err);
        const errorMessageKey = err instanceof Error ? err.message : 'error.unknown';
        setAppState({ status: AppStateStatus.Error, message: errorMessageKey });
      }
  }, [analyzeText, currentApiKey]);

  const resetApp = () => {
    setAppState({ status: AppStateStatus.Idle, message: 'status.ready' });
    if(videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
    setVideoDescription(null);
    setAnalyzedText(null);
    setOverallPersonality(null);
    if(analysisMode === 'video'){
        initializeEmotionModel().catch(err => {
            console.error("Failed to reload emotion models:", err);
            setAppState({ status: AppStateStatus.Error, message: 'error.modelLoadFailed' });
        });
    }
  };
  
  const currentError = analysisMode === 'video' ? videoError : textError;
  useEffect(() => {
    if (currentError) {
      setAppState({ status: AppStateStatus.Error, message: currentError });
    }
  }, [currentError]);

  const isLoading = isVideoProcessing || isTextProcessing;
  const progressMessage = analysisMode === 'video' ? videoProgress : textProgress;

  const TabButton: React.FC<{mode: AnalysisMode; label: string}> = ({ mode, label }) => (
    <button
      onClick={() => {
        if (appState.status === AppStateStatus.Idle) {
            setAnalysisMode(mode);
        }
      }}
      className={`w-1/2 py-2.5 text-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400
        ${analysisMode === mode
          ? 'bg-purple-600 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }
        ${appState.status !== AppStateStatus.Idle ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={appState.status !== AppStateStatus.Idle}
      aria-pressed={analysisMode === mode}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-5xl mb-8 text-center">
        <div className="flex justify-between items-center mb-4">
            <div className="w-32"></div> {/* Spacer */}
            <LanguageSwitcher />
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md transition-colors"
              title={currentApiKey ? 'Change API Key' : 'Set API Key'}
            >
              {currentApiKey ? '🔑 ✓' : '🔑 Set'}
            </button>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {t('appTitle')}
        </h1>
        <p className="text-lg text-gray-400 mt-2">
          {t('appSubtitle')}
        </p>
      </header>

      <main className="w-full max-w-5xl bg-gray-800 shadow-2xl rounded-lg p-6 sm:p-8">
        {showApiKeyInput && (
          <div className="mb-6">
            <ApiKeyInput onSave={handleApiKeySave} onCancel={() => setShowApiKeyInput(false)} currentKey={currentApiKey} />
          </div>
        )}

        {(appState.status === AppStateStatus.Initializing || appState.status === AppStateStatus.Processing || isLoading) && (
           <div className="text-center py-10">
            <Spinner />
            <p className="mt-4 text-xl">{t(progressMessage as any) || t(appState.message as any)}</p>
          </div>
        )}
        
        {appState.status === AppStateStatus.Error && (
          <div className="text-center py-10">
            <p className="text-xl text-red-400">{t('error.title')}: {t(appState.message as any)}</p>
            {appState.message === 'error.apiKeyMissing' && (
              <button
                onClick={() => setShowApiKeyInput(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-150 mr-2"
              >
                {t('button.setApiKey')}
              </button>
            )}
            <button
              onClick={resetApp}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-150"
            >
              {t('button.tryAgain')}
            </button>
          </div>
        )}

        {appState.status === AppStateStatus.Idle && (
          <>
            <div className="bg-gray-900/50 p-1 rounded-lg flex mb-6">
              <TabButton mode="video" label={t('tab.video')} />
              <TabButton mode="text" label={t('tab.text')} />
            </div>

            {!currentApiKey && (
              <div className="p-4 mb-4 text-sm text-yellow-300 bg-yellow-800/50 rounded-lg text-center" role="alert">
                {t('warning.apiKeyMissing')}
                <button
                  onClick={() => setShowApiKeyInput(true)}
                  className="ml-2 underline hover:no-underline"
                >
                  {t('button.setApiKey')}
                </button>
              </div>
            )}
            
            {analysisMode === 'video' && <VideoUploader onVideoUploaded={handleVideoAnalysis} disabled={!currentApiKey}/>}
            {analysisMode === 'text' && <TextAnalyzer onAnalyze={handleTextAnalysis} disabled={!currentApiKey}/>}
          </>
        )}
        
        {appState.status === AppStateStatus.Done && overallPersonality && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center text-purple-300">{t('resultsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                    {analysisMode === 'video' && videoUrl && (
                      <>
                        <h3 className="text-xl font-semibold mb-2 text-center text-purple-300">{t('analyzedVideoTitle')}</h3>
                        <video src={videoUrl} className="w-full h-auto rounded-lg mb-4" controls loop autoPlay playsInline/>
                        {videoDescription && (
                          <div className="bg-gray-800 p-3 rounded-md">
                              <h4 className="font-semibold text-purple-300 mb-1">{t('aiDescriptionTitle')}</h4>
                              <p className="text-sm text-gray-300 italic">"{videoDescription}"</p>
                          </div>
                        )}
                      </>
                    )}
                    {analysisMode === 'text' && analyzedText && (
                      <>
                        <h3 className="text-xl font-semibold mb-2 text-center text-purple-300">{t('analyzedTextTitle')}</h3>
                        <div className="bg-gray-800 p-4 rounded-md max-h-80 overflow-y-auto">
                            <p className="text-sm text-gray-300 whitespace-pre-wrap">"{analyzedText}"</p>
                        </div>
                      </>
                    )}
                </div>
                <BigFiveResultsChart profile={overallPersonality} />
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={resetApp}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-150"
              >
                {t('button.analyzeNew')}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full max-w-5xl mt-12 text-center text-gray-500 text-sm">
        <p>{t('footer.copyright')}</p>
        <p>{t('footer.disclaimer')}</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
