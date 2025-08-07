// Emotions as detected by face-api.js (typically)
export interface EmotionScores {
  neutral: number; // 0-1
  happy: number; // 0-1
  sad: number; // 0-1
  angry: number; // 0-1
  fearful: number; // 0-1
  disgusted: number; // 0-1
  surprised: number; // 0-1
}

export interface BigFiveScoreDetail {
  score: number; // 0-100
  explanation: string; // AI-generated explanation for the score
}

export type BigFiveProfile = Record<BigFiveTrait, BigFiveScoreDetail>;


export enum BigFiveTrait {
  Openness = "openness",
  Conscientiousness = "conscientiousness",
  Extraversion = "extraversion",
  Agreeableness = "agreeableness",
  Neuroticism = "neuroticism",
}

export enum AppStateStatus {
  Idle = 'idle',
  Initializing = 'initializing', // For loading models
  Processing = 'processing',
  Done = 'done',
  Error = 'error',
}

export interface AppState {
  status: AppStateStatus;
  message?: string;
}

export interface FaceProcessorResult {
  overallPersonalityData: BigFiveProfile | null;
  videoDescription: string | null;
}

// For face-api.js detections
export interface FaceApiDetection {
  detection: { 
    box: { x: number; y: number; width: number; height: number; };
    imageWidth: number;
    imageHeight: number;
   };
  expressions: EmotionScores;
  landmarks?: any; // face-api landmarks, if needed
}

export type Language = 'en' | 'fa';

export type AnalysisMode = 'video' | 'text';