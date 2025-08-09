import { useState, useCallback } from 'react';
import { detectEmotions, isEmotionModelLoaded } from '../services/emotionService';
import { getBigFivePersonalityProfile, getVideoDescription } from '../services/geminiService';
import type { BigFiveProfile, EmotionScores, FaceApiDetection, FaceProcessorResult, Language } from '../types';

const MAX_VIDEO_DURATION_S = 15;
const FRAMES_PER_SECOND = 2;
const FRAMES_FOR_DESCRIPTION_ANALYSIS = 5;

export const useFaceProcessor = (apiKey: string | null, language: Language = 'en') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState('');

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  };

  const extractFramesFromVideo = (videoFile: File, fps: number): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.muted = true;
      video.preload = 'metadata';
      const videoUrl = URL.createObjectURL(videoFile);
      video.src = videoUrl;

      video.addEventListener('loadedmetadata', () => {
        if (video.duration > MAX_VIDEO_DURATION_S) {
          URL.revokeObjectURL(videoUrl);
          reject(new Error('error.videoTooLong'));
          return;
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          URL.revokeObjectURL(videoUrl);
          reject(new Error("error.canvasContext"));
          return;
        }
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const frames: string[] = [];
        const interval = 1 / fps;
        let currentTime = 0;
        
        video.currentTime = 0;

        const seekAndCapture = () => {
          if (currentTime <= video.duration) {
              context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
              frames.push(canvas.toDataURL('image/jpeg'));
              currentTime += interval;
              video.currentTime = currentTime;
          } else {
              video.removeEventListener('seeked', seekAndCapture);
              URL.revokeObjectURL(videoUrl);
              resolve(frames);
          }
        };

        video.addEventListener('seeked', seekAndCapture);
        
        // Kick off the process
        video.currentTime = 0; // First seek
      });

      video.addEventListener('error', (e) => {
        URL.revokeObjectURL(videoUrl);
        reject(new Error('error.videoLoadFailed'));
      });
    });
  };

  const analyzeVideo = useCallback(async (file: File): Promise<FaceProcessorResult> => {
    setIsLoading(true);
    setError(null);
    setProgressMessage('progress.initializing');

    if (!isEmotionModelLoaded()) {
        const errorKey = "error.modelNotLoaded";
        setError(errorKey);
        setIsLoading(false);
        throw new Error(errorKey);
    }

    const allDetectedEmotions: EmotionScores[] = [];
    let frameDataUrls: string[] = [];
    
    try {
        setProgressMessage('progress.extractingFrames');
        frameDataUrls = await extractFramesFromVideo(file, FRAMES_PER_SECOND);
    } catch (err) {
        const errorMessageKey = err instanceof Error ? err.message : 'error.frameExtraction';
        setError(errorMessageKey);
        setIsLoading(false);
        throw new Error(errorMessageKey);
    }

    for (let i = 0; i < frameDataUrls.length; i++) {
        const dataUrl = frameDataUrls[i];
        setProgressMessage(`progress.analyzingFrame`); // Generic key
        
        try {
            const imageElement = await loadImage(dataUrl);
            const detections: FaceApiDetection[] = await detectEmotions(imageElement);
            if (detections && detections.length > 0) {
                // Use emotions from the most prominent face detected
                allDetectedEmotions.push(detections[0].expressions);
            }
        } catch (err) {
            console.warn(`Could not process frame ${i + 1}:`, err);
        }
    }

    if (allDetectedEmotions.length === 0) {
        const errorKey = "error.noFaceDetected";
        setError(errorKey);
        setIsLoading(false);
        throw new Error(errorKey);
    }
    
    let overallPersonalityData: BigFiveProfile | null = null;
    let videoDescription: string | null = null;

    if (apiKey) {
      setProgressMessage('progress.callingAI');
      try {
        // Select evenly spaced frames for video description
        const frameIndices = Array.from({ length: Math.min(frameDataUrls.length, FRAMES_FOR_DESCRIPTION_ANALYSIS) }, 
          (_, i) => Math.floor(i * (frameDataUrls.length / Math.min(frameDataUrls.length, FRAMES_FOR_DESCRIPTION_ANALYSIS)))
        );
        const framesForDescription = frameIndices.map(index => frameDataUrls[index]);

        const [personalityResult, descriptionResult] = await Promise.all([
          getBigFivePersonalityProfile(allDetectedEmotions, apiKey, language),
          getVideoDescription(framesForDescription, apiKey, language)
        ]);
        
        overallPersonalityData = personalityResult;
        videoDescription = descriptionResult;

      } catch (aiError) {
        console.error("AI service call failed:", aiError);
        const errMessageKey = aiError instanceof Error ? aiError.message : 'error.aiServiceGeneric';
        setError(errMessageKey);
        setIsLoading(false);
        throw new Error(errMessageKey);
      }
    } else {
        const errorKey = "error.apiKeyMissing";
        console.warn("AI service API key not provided. Skipping Big Five personality analysis.");
        setError(errorKey);
        setIsLoading(false);
        throw new Error(errorKey);
    }

    setProgressMessage('progress.complete');
    setIsLoading(false);
    return { overallPersonalityData, videoDescription };
  }, [apiKey, language]);

  return { analyzeVideo, isLoading, error, progressMessage };
};
