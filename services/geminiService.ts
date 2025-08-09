import { BigFiveTrait, Language } from '../types';
import type { EmotionScores, BigFiveProfile } from '../types';

// Runtime API key detection
const getApiKeyFromWindow = (): any => {
  return (globalThis as any).window?.AIProvider || (globalThis as any).AIProvider;
};

const initializeAIService = (apiKey: string) => {
  const AIProvider = getApiKeyFromWindow();
  if (!AIProvider) {
    throw new Error("AI Provider SDK not loaded. Ensure it's included in index.html.");
  }
  if (!apiKey) {
    throw new Error("AI Service API key not provided for initialization.");
  }
  return new AIProvider({ apiKey });
};

const averageEmotionScores = (emotionProfiles: EmotionScores[]): EmotionScores => {
  const summedScores: EmotionScores = {
    neutral: 0, happy: 0, sad: 0, angry: 0, fearful: 0, disgusted: 0, surprised: 0,
  };
  const count = emotionProfiles.length;
  if (count === 0) return summedScores;

  emotionProfiles.forEach(profile => {
    (Object.keys(summedScores) as Array<keyof EmotionScores>).forEach(key => {
      summedScores[key] += profile[key] || 0;
    });
  });

  (Object.keys(summedScores) as Array<keyof EmotionScores>).forEach(key => {
    summedScores[key] /= count;
  });
  return summedScores;
};

const getLocalizedPersonalityPrompt = (emotionDataString: string, language: Language): string => {
  if (language === 'fa') {
    return `شما یک دستیار هوش مصنوعی در نقش یک تحلیلگر روانشناس خبره هستید.
وظیفه شما ارائه یک پروفایل شخصیتی پنج بزرگ (پذیرا بودن، وظیفه‌شناسی، برون‌گرایی، سازگاری، روان‌رنجوری) *فقط* بر اساس داده‌های میانگین احساسات چهره زیر است:
داده‌های میانگین احساسات چهره: ${emotionDataString}.

پاسخ شما باید یک شیء JSON معتبر باشد.
این شیء JSON باید کلیدهای 'openness', 'conscientiousness', 'extraversion', 'agreeableness', و 'neuroticism' را داشته باشد.
مقدار هر کلید باید یک شیء با دو کلید داخلی باشد:
1.  'score': یک عدد صحیح از 0 تا 100.
2.  'explanation': یک توضیح کوتاه و روشنگر (حدود 15-25 کلمه) برای امتیاز، که به زبان فارسی نوشته شده باشد. این توضیح باید جزئیات دهد که چگونه ترکیب خاص احساسات به امتیاز آن ویژگی کمک می‌کند.

هیچ متن، توضیح یا قالب‌بندی دیگری به جز شیء JSON در پاسخ خود نیاورید.
`;
  }
  return `You are an AI assistant adopting the persona of an expert psychological analyst.
Your task is to provide an illustrative Big Five personality profile (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) based *solely* on the following averaged facial emotion data:
Averaged Facial Emotion Data: ${emotionDataString}.

Your response MUST be a valid JSON object.
The JSON object must have keys 'openness', 'conscientiousness', 'extraversion', 'agreeableness', and 'neuroticism'.
Each key's value must be an object with two sub-keys:
1.  'score': An integer score from 0 to 100.
2.  'explanation': A concise, insightful explanation (around 15-25 words) for the score, written in English. This explanation should detail how the specific combination of emotions contributes to the trait score.

Do not include any other text, remarks, or markdown formatting around the JSON object.
`;
};

const getLocalizedDescriptionPrompt = (language: Language): string => {
    if (language === 'fa') {
        return "فریم‌های ویدیویی زیر را تحلیل کن. یک توصیف کلی، یک جمله‌ای و مختصر از سوژه اصلی و کاری که انجام می‌دهد به زبان فارسی ارائه بده. تمرکز بر روی کاری باشد که شخص انجام می‌دهد (مثلا: 'شخصی در حال لبخند زدن به دوربین است'). به احساسات یا شخصیت اشاره نکن. هیچ متن مقدمه‌ای اضافه نکن.";
    }
    return "Analyze the following sequence of frames. Provide a concise, one-sentence, general description of the main subject and action in English. Focus on what a person is doing (e.g., 'A person is smiling while talking to the camera'). Do not mention emotions or personality. Do not add any introductory text.";
}

const getLocalizedTextAnalysisPrompt = (text: string, language: Language): string => {
    if (language === 'fa') {
        return `شما یک دستیار هوش مصنوعی در نقش یک تحلیلگر روانشناس خبره هستید.
وظیفه شما ارائه یک پروفایل شخصیتی پنج بزرگ (پذیرا بودن، وظیفه‌شناسی، برون‌گرایی، سازگاری، روان‌رنجوری) بر اساس متن خود-توصیفی زیر است که توسط یک کاربر نوشته شده:
متن کاربر: "${text}"

پاسخ شما باید یک شیء JSON معتبر باشد.
این شیء JSON باید کلیدهای 'openness', 'conscientiousness', 'extraversion', 'agreeableness', و 'neuroticism' را داشته باشد.
مقدار هر کلید باید یک شیء با دو کلید داخلی باشد:
1. 'score': یک عدد صحیح از 0 تا 100 که تخمین شما از سطح آن ویژگی شخصیتی است.
2. 'explanation': یک توضیح کوتاه و روشنگر (حدود 15-25 کلمه) برای آن امتیاز به زبان فارسی. این توضیح باید استدلال شما را بر اساس بخش‌هایی از متن کاربر توجیه کند.

هیچ متن، توضیح یا قالب‌بندی دیگری به جز شیء JSON در پاسخ خود نیاورید.`;
    }
    return `You are an AI assistant adopting the persona of an expert psychological analyst.
Your task is to provide an illustrative Big Five personality profile (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) based on the following self-descriptive text provided by a user:
User Text: "${text}"

Your response MUST be a valid JSON object.
The JSON object must have keys 'openness', 'conscientiousness', 'extraversion', 'agreeableness', and 'neuroticism'.
Each key's value must be an object with two sub-keys:
1. 'score': An integer score from 0 to 100, estimating the level of that trait.
2. 'explanation': A concise, insightful explanation (around 15-25 words) for the score, written in English, justifying your reasoning based on the user's text.

Do not include any other text, remarks, or markdown formatting around the JSON object.`;
};

const parseAndValidateProfile = (jsonStr: string, defaultProfile: BigFiveProfile): BigFiveProfile => {
    try {
        // Remove any potential code fences
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
          jsonStr = match[2].trim();
        }
        
        const parsedResponse = JSON.parse(jsonStr) as Partial<BigFiveProfile>;
        const validatedProfile: BigFiveProfile = { ...defaultProfile };

        const requiredTraits: BigFiveTrait[] = [
            BigFiveTrait.Openness, BigFiveTrait.Conscientiousness, BigFiveTrait.Extraversion, 
            BigFiveTrait.Agreeableness, BigFiveTrait.Neuroticism
        ];

        for (const trait of requiredTraits) {
          const traitData = parsedResponse[trait];
          if (
            traitData &&
            typeof traitData.score === 'number' &&
            traitData.score >= 0 &&
            traitData.score <= 100 &&
            typeof traitData.explanation === 'string' &&
            traitData.explanation.trim() !== ''
          ) {
            validatedProfile[trait] = {
                score: Math.round(traitData.score),
                explanation: traitData.explanation
            };
          } else {
            console.warn(`AI response for trait '${trait}' is invalid. Using default. Received:`, traitData);
          }
        }
        return validatedProfile;
    } catch (error) {
        console.error('Error parsing AI response:', error, 'Response:', jsonStr);
        return defaultProfile;
    }
}

export const getBigFivePersonalityProfile = async (
  emotionProfiles: EmotionScores[],
  apiKey: string,
  language: Language = 'en'
): Promise<BigFiveProfile> => {
  if (!apiKey) throw new Error("error.apiKeyMissing");

  const defaultExplanation = language === 'fa' 
    ? "توضیح دقیق در دسترس نیست." : "Detailed explanation unavailable.";
  const defaultProfile: BigFiveProfile = {
    openness: { score: 50, explanation: defaultExplanation }, 
    conscientiousness: { score: 50, explanation: defaultExplanation },
    extraversion: { score: 50, explanation: defaultExplanation }, 
    agreeableness: { score: 50, explanation: defaultExplanation },
    neuroticism: { score: 50, explanation: defaultExplanation },
  };

  if (emotionProfiles.length === 0) return defaultProfile;

  const averagedEmotions = averageEmotionScores(emotionProfiles);
  const emotionDataString = (Object.keys(averagedEmotions) as Array<keyof EmotionScores>)
    .map(key => `${key}: ${(averagedEmotions[key] * 100).toFixed(1)}%`).join(', ');
  
  const prompt = getLocalizedPersonalityPrompt(emotionDataString, language);

  try {
    const ai = initializeAIService(apiKey);
    const model = ai.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return parseAndValidateProfile(response.text(), defaultProfile);
  } catch (error) {
    console.error("Error calling AI service (personality):", error);
    if (error instanceof Error) {
      if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
        throw new Error("error.invalidApiKey");
      }
    }
    return defaultProfile;
  }
};

export const getVideoDescription = async (
    frameDataUrls: string[], apiKey: string, language: Language = 'en'
): Promise<string> => {
    if (!apiKey) throw new Error("error.apiKeyMissing");

    if (frameDataUrls.length === 0) {
        return language === 'fa' ? "هیچ فریمی برای تحلیل ارائه نشده است." : "No frames provided for analysis.";
    }
    
    const promptText = getLocalizedDescriptionPrompt(language);
    const imageParts = frameDataUrls.map(dataUrl => ({
        inlineData: { 
            mimeType: 'image/jpeg', 
            data: dataUrl.split(',')[1] 
        }
    }));
    
    try {
        const ai = initializeAIService(apiKey);
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        const result = await model.generateContent([
            promptText,
            ...imageParts
        ]);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Error calling AI service (description):", error);
        if (error instanceof Error) {
            if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
                throw new Error("error.invalidApiKey");
            }
        }
        return language === 'fa' ? "تولید توضیحات ویدیو با خطا مواجه شد." : "Could not generate video description.";
    }
};

export const getBigFiveProfileFromText = async (
    text: string, apiKey: string, language: Language = 'en'
): Promise<BigFiveProfile> => {
  if (!apiKey) throw new Error("error.apiKeyMissing");
  
  const defaultExplanation = language === 'fa' ? "توضیح دقیق در دسترس نیست." : "Detailed explanation unavailable.";
  const defaultProfile: BigFiveProfile = {
    openness: { score: 50, explanation: defaultExplanation }, 
    conscientiousness: { score: 50, explanation: defaultExplanation },
    extraversion: { score: 50, explanation: defaultExplanation }, 
    agreeableness: { score: 50, explanation: defaultExplanation },
    neuroticism: { score: 50, explanation: defaultExplanation },
  };

  const prompt = getLocalizedTextAnalysisPrompt(text, language);

  try {
    const ai = initializeAIService(apiKey);
    const model = ai.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return parseAndValidateProfile(response.text(), defaultProfile);
  } catch (error) {
    console.error("Error calling AI service (text analysis):", error);
    if (error instanceof Error) {
      if (error.message.includes("API key not valid") || error.message.includes("API_KEY_INVALID")) {
        throw new Error("error.invalidApiKey");
      }
    }
    return defaultProfile;
  }
};
