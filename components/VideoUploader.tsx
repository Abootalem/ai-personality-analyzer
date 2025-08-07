import React, { useState, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

interface VideoUploaderProps {
  onVideoUploaded: (file: File) => void;
  disabled?: boolean;
}

const MAX_DURATION_S = 15;

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUploaded, disabled = false }) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setErrorKey(null);
    const file = event.target.files?.[0];

    // Clear previous selection
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    event.target.value = ''; // Allow re-selecting the same file

    if (file) {
      if (!file.type.startsWith('video/')) {
        setErrorKey('error.invalidVideoFile');
        return;
      }
      
      const tempUrl = URL.createObjectURL(file);
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      videoElement.src = tempUrl;
      
      videoElement.onloadedmetadata = () => {
        if (videoElement.duration > MAX_DURATION_S) {
            setErrorKey('error.videoTooLong');
            URL.revokeObjectURL(tempUrl);
        } else {
            setSelectedFile(file);
            setPreviewUrl(tempUrl);
        }
      };
      
      videoElement.onerror = () => {
        setErrorKey('error.videoMetadata');
        URL.revokeObjectURL(tempUrl);
      };
    }
  }, [previewUrl, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled || !selectedFile) return;
    onVideoUploaded(selectedFile);
  }, [selectedFile, onVideoUploaded, disabled]);

  return (
    <div className={`p-6 bg-gray-700/60 rounded-lg shadow-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <h3 className="text-2xl font-semibold mb-6 text-center text-purple-300">{t('videoUploader.title')}</h3>
      <div className="mb-6">
        <label
          htmlFor="videoUpload"
          className={`block w-full px-4 py-6 text-center border-2 border-dashed border-gray-500 rounded-lg 
                      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:border-purple-400 transition-colors'}`}
        >
          <span className="text-gray-400">{t('videoUploader.dragAndDrop')}</span>
           <p className="text-xs text-gray-500 mt-1">{t('videoUploader.maxDuration', { duration: MAX_DURATION_S })}</p>
          <input
            id="videoUpload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
        </label>
      </div>

      {errorKey && <p className="text-red-400 text-sm mb-4 text-center">{t(errorKey as any)}</p>}

      {previewUrl && (
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2 text-gray-300">{t('videoUploader.selectedVideo')}:</h4>
          <div className="relative aspect-video overflow-hidden rounded-md shadow bg-black">
            <video src={previewUrl} className="w-full h-full object-contain" controls playsInline />
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || disabled}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('button.analyzeVideo')}
      </button>
      <p className="text-xs text-gray-500 mt-3 text-center">
        {t('videoUploader.aiHint')}
      </p>
    </div>
  );
};