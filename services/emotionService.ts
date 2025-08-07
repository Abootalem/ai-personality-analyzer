
import type { FaceApiDetection, EmotionScores } from '../types';

// Make faceapi globally available (loaded via CDN)
declare const faceapi: any;

let modelsLoaded = false;
let loadingPromise: Promise<void> | null = null;

// Path to face-api.js models, now pointing to a public GitHub raw content URL.
// Note: Using raw.githubusercontent.com for models might be slow or rate-limited for production.
// It's suitable for development/demonstration to avoid local model hosting.
const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

export async function initializeEmotionModel(): Promise<void> {
  if (modelsLoaded) {
    return Promise.resolve();
  }
  if (loadingPromise) {
    return loadingPromise;
  }

  if (typeof faceapi === 'undefined') {
    console.error('face-api.js not loaded!');
    throw new Error('face-api.js not loaded. Ensure it is included in index.html.');
  }

  loadingPromise = (async () => {
    try {
      // Create a status element or use the one in index.html
      let statusDiv = document.getElementById('models-loading-status');
      if (!statusDiv) { // Fallback if not found
          statusDiv = document.createElement('div');
          statusDiv.id = 'models-loading-status-fallback';
          statusDiv.style.position = 'fixed';
          statusDiv.style.top = '10px';
          statusDiv.style.left = '10px';
          statusDiv.style.color = 'white';
          statusDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
          statusDiv.style.padding = '5px';
          statusDiv.style.zIndex = '10001';
          document.body.appendChild(statusDiv);
      }
      if(statusDiv) statusDiv.style.display = 'block';
      if(statusDiv) statusDiv.innerText = 'Loading emotion detection models... (from remote source)';
      
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        // faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL), // Not strictly needed for expressions only
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      modelsLoaded = true;
      console.log('face-api.js models loaded successfully from:', MODEL_URL);
      if(statusDiv) statusDiv.innerText = 'Emotion models loaded.';
      setTimeout(() => { if(statusDiv) statusDiv.style.display = 'none'; }, 2000);
    } catch (error) {
      console.error('Error loading face-api.js models from remote URL:', error);
      modelsLoaded = false; // Ensure it's reset on error
      if (document.getElementById('models-loading-status')) {
         (document.getElementById('models-loading-status') as HTMLElement).innerText = 'Error loading emotion models. Please refresh.';
      }
      throw new Error(`Failed to load face-api.js models from ${MODEL_URL}. Check console. Original error: ${error}`);
    } finally {
      loadingPromise = null;
    }
  })();
  return loadingPromise;
}

export function isEmotionModelLoaded(): boolean {
  return modelsLoaded;
}

export async function detectEmotions(imageElement: HTMLImageElement): Promise<FaceApiDetection[]> {
  if (!modelsLoaded) {
    // Attempt to load models if not already loaded, or throw error.
    // This could happen if detectEmotions is called before initializeEmotionModel completes
    // or if initialization failed.
    console.warn("Emotion models not loaded when detectEmotions called. Attempting to initialize...");
    await initializeEmotionModel(); // Wait for initialization
    if (!modelsLoaded) { // Check again after attempt
        throw new Error('Emotion detection models are not loaded. Cannot detect emotions.');
    }
  }

  try {
    const detections = await faceapi.detectAllFaces(imageElement)
                                   .withFaceLandmarks() // Optional, but often used with expressions
                                   .withFaceExpressions();
    
    // Map to EmotionScores, ensure all keys are present with 0 if not detected
    return detections.map((d: any) => ({
        detection: {
            box: d.detection.box,
            imageHeight: d.detection.imageHeight,
            imageWidth: d.detection.imageWidth,
        },
        expressions: {
            neutral: d.expressions.neutral || 0,
            happy: d.expressions.happy || 0,
            sad: d.expressions.sad || 0,
            angry: d.expressions.angry || 0,
            fearful: d.expressions.fearful || 0,
            disgusted: d.expressions.disgusted || 0,
            surprised: d.expressions.surprised || 0,
        } as EmotionScores,
    })) as FaceApiDetection[];

  } catch (error) {
    console.error('Error during face-api.js emotion detection:', error);
    throw error; // Re-throw to be handled by the caller
  }
}
