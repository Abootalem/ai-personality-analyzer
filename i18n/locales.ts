import { Language } from "../types";

const translationData = {
  // App General
  appTitle: {
    en: "AI Personality Analyzer",
    fa: "تحلیلگر شخصیت با هوش مصنوعی",
  },
  appSubtitle: {
    en: "Analyze a short video or descriptive text to get an illustrative Big Five personality profile. By Abootaleb Moradi.",
    fa: "یک ویدیوی کوتاه یا متن توصیفی را تحلیل کنید تا پروفایل شخصیتی پنج بزرگ گویا دریافت کنید. اثر ابوطالب مرادی.",
  },
  resultsTitle: {
    en: "Analysis Results",
    fa: "نتایج تحلیل",
  },
  analyzedVideoTitle: {
    en: "Analyzed Video",
    fa: "ویدیوی تحلیل‌شده",
  },
  analyzedTextTitle: {
      en: "Analyzed Text",
      fa: "متن تحلیل‌شده"
  },
  aiDescriptionTitle: {
    en: "AI Description:",
    fa: "توصیف هوش مصنوعی:",
  },

  // Tabs
  "tab.video": {
      en: "Analyze Video",
      fa: "تحلیل ویدیو"
  },
  "tab.text": {
      en: "Analyze Text",
      fa: "تحلیل متن"
  },

  // API Key Input
  "apiKeyInput.title": {
    en: "Gemini API Key Required",
    fa: "کلید API جمینی مورد نیاز است"
  },
  "apiKeyInput.label": {
    en: "Enter your Gemini API Key:",
    fa: "کلید API جمینی خود را وارد کنید:"
  },
  "apiKeyInput.placeholder": {
    en: "Your Gemini API key (starts with AIza...)",
    fa: "کلید API جمینی شما (شروع با AIza...)"
  },
  "apiKeyInput.instructions": {
    en: "To get a free Gemini API key:",
    fa: "برای دریافت کلید API رایگان جمینی:"
  },
  "apiKeyInput.step1": {
    en: "Visit https://aistudio.google.com/app/apikey",
    fa: "به آدرس https://aistudio.google.com/app/apikey بروید"
  },
  "apiKeyInput.step2": {
    en: "Sign in with your Google account",
    fa: "با حساب گوگل خود وارد شوید"
  },
  "apiKeyInput.step3": {
    en: "Click 'Create API key' and copy it here",
    fa: "روی 'Create API key' کلیک کنید و آن را اینجا کپی کنید"
  },
  "apiKeyInput.privacy": {
    en: "Your API key is stored locally in your browser and never sent to our servers.",
    fa: "کلید API شما به صورت محلی در مرورگر ذخیره می‌شود و هرگز به سرورهای ما ارسال نمی‌شود."
  },

  // Buttons
  "button.analyzeVideo": {
    en: "Analyze Personality from Video",
    fa: "تحلیل شخصیت از روی ویدیو",
  },
  "button.analyzeText": {
    en: "Analyze Personality from Text",
    fa: "تحلیل شخصیت از روی متن",
  },
  "button.analyzeNew": {
    en: "Analyze Again",
    fa: "تحلیل مجدد",
  },
  "button.tryAgain": {
    en: "Try Again",
    fa: "تلاش مجدد",
  },
  "button.setApiKey": {
    en: "Set API Key",
    fa: "تنظیم کلید API"
  },
  "button.save": {
    en: "Save",
    fa: "ذخیره"
  },
  "button.remove": {
    en: "Remove",
    fa: "حذف"
  },
  "button.cancel": {
    en: "Cancel",
    fa: "لغو"
  },

  // Video Uploader
  "videoUploader.title": {
    en: "Upload Your Video",
    fa: "ویدیوی خود را بارگذاری کنید",
  },
  "videoUploader.dragAndDrop": {
    en: "Drag & drop a video here, or click to select",
    fa: "یک ویدیو را اینجا بکشید و رها کنید، یا برای انتخاب کلیک کنید",
  },
  "videoUploader.maxDuration": {
    en: "(Max {{duration}} seconds)",
    fa: "(حداکثر {{duration}} ثانیه)",
  },
  "videoUploader.selectedVideo": {
    en: "Selected Video",
    fa: "ویدیوی انتخاب‌شده",
  },
  "videoUploader.aiHint": {
    en: "The AI will analyze facial expressions throughout the video to generate a personality profile.",
    fa: "هوش مصنوعی حالات چهره در طول ویدیو را برای تولید پروفایل شخصیتی تحلیل خواهد کرد.",
  },

  // Text Analyzer
  "textAnalyzer.title": {
    en: "Describe Yourself",
    fa: "خودتان را توصیف کنید"
  },
  "textAnalyzer.placeholder": {
    en: "Write a few sentences about yourself, your hobbies, what you like or dislike, or how you see the world... The more detail, the better the analysis.",
    fa: "چند جمله در مورد خودتان، سرگرمی‌ها، علایق و بیزاری‌ها یا دیدگاهتان نسبت به دنیا بنویسید... هرچه جزئیات بیشتر باشد، تحلیل بهتر خواهد بود."
  },
  "textAnalyzer.aiHint": {
      en: "The AI will analyze the text to estimate a personality profile.",
      fa: "هوش مصنوعی این متن را برای تخمین یک پروفایل شخصیتی تحلیل خواهد کرد."
  },

  // Statuses
  "status.initializing": {
    en: "Loading AI models...",
    fa: "در حال بارگذاری مدل‌های هوش مصنوعی...",
  },
  "status.ready": {
    en: "Ready for analysis.",
    fa: "آماده برای تحلیل.",
  },
  "status.processing": {
    en: "Processing...",
    fa: "در حال پردازش...",
  },
  "status.initializingAnalysis": {
      en: "Initializing analysis...",
      fa: "در حال آماده‌سازی تحلیل..."
  },
  "status.analysisComplete": {
    en: "Analysis complete.",
    fa: "تحلیل کامل شد.",
  },
  
  // Progress Messages
  "progress.initializing": { en: "Initializing...", fa: "در حال آماده‌سازی...", },
  "progress.extractingFrames": { en: "Extracting frames...", fa: "در حال استخراج فریم‌ها...", },
  "progress.analyzingFrame": { en: "Analyzing frames...", fa: "در حال تحلیل فریم‌ها...", },
  "progress.callingAI": { en: "Calling AI service...", fa: "در حال ارتباط با سرویس هوش مصنوعی...", },
  "progress.analyzingText": { en: "Analyzing text with AI service...", fa: "در حال تحلیل متن با سرویس هوش مصنوعی..." },
  "progress.complete": { en: "Analysis complete.", fa: "تحلیل کامل شد.", },

  // Warnings
  "warning.apiKeyMissing": {
    en: "Warning: Gemini API Key is required for analysis. Click 'Set API Key' to add your key.",
    fa: "هشدار: کلید API جمینی برای تحلیل لازم است. روی 'تنظیم کلید API' کلیک کنید تا کلید خود را اضافه کنید.",
  },

  // Errors
  "error.title": { en: "Error", fa: "خطا" },
  "error.apiKeyMissing": { en: "Gemini API Key is missing. Analysis cannot be performed.", fa: "کلید API جمینی وجود ندارد. تحلیل امکان‌پذیر نیست.", },
  "error.modelLoadFailed": { en: "Failed to load facial analysis models. Please refresh.", fa: "بارگذاری مدل‌های تحلیل چهره با شکست مواجه شد. لطفاً صفحه را تازه‌سازی کنید.", },
  "error.unknown": { en: "An unknown error occurred.", fa: "یک خطای ناشناخته رخ داد.", },
  "error.invalidVideoFile": { en: "Please upload a valid video file.", fa: "لطفاً یک فایل ویدیویی معتبر بارگذاری کنید.", },
  "error.videoTooLong": { en: "Video is too long. Please upload a video shorter than 15 seconds.", fa: "ویدیو بیش از حد طولانی است. لطفاً یک ویدیوی کوتاه‌تر از ۱۵ ثانیه بارگذاری کنید.", },
  "error.videoMetadata": { en: "Could not read video metadata. The file may be corrupt.", fa: "خواندن اطلاعات ویدیو ممکن نبود. فایل ممکن است خراب باشد.", },
  "error.canvasContext": { en: "Could not create canvas context.", fa: "ایجاد زمینه بوم نقاشی (canvas) ممکن نبود." },
  "error.videoLoadFailed": { en: "Failed to load video file.", fa: "بارگذاری فایل ویدیو با شکست مواجه شد." },
  "error.modelNotLoaded": { en: "Emotion models not loaded. Please refresh.", fa: "مدل‌های تشخیص احساسات بارگذاری نشده‌اند. لطفاً صفحه را تازه‌سازی کنید." },
  "error.frameExtraction": { en: "Error during frame extraction.", fa: "خطا هنگام استخراج فریم‌ها." },
  "error.noFaceDetected": { en: "No faces were detected in the video.", fa: "هیچ چهره‌ای در ویدیو شناسایی نشد." },
  "error.aiServiceGeneric": { en: "Failed to get analysis from the AI service.", fa: "دریافت تحلیل از سرویس هوش مصنوعی با شکست مواجه شد." },
  "error.invalidApiKey": { en: "Invalid Gemini API Key. Check your API key and try again.", fa: "کلید API جمینی نامعتبر است. کلید خود را بررسی کنید و دوباره تلاش کنید." },
  "error.textEmpty": { en: "Text cannot be empty. Please write something.", fa: "متن نمی‌تواند خالی باشد. لطفاً چیزی بنویسید." },

  // Big Five Chart
  "bigFive.title": { en: "Illustrative Big Five Personality Profile", fa: "پروفایل شخصیتی پنج بزرگ گویا", },
  "bigFive.openness.label": { en: "Openness", fa: "پذیرا بودن", },
  "bigFive.openness.description": { en: "Imagination, creativity, and willingness to try new things.", fa: "تخیل، خلاقیت و تمایل به امتحان کردن چیزهای جدید.", },
  "bigFive.conscientiousness.label": { en: "Conscientiousness", fa: "وظیفه‌شناسی", },
  "bigFive.conscientiousness.description": { en: "Organization, responsibility, and dependability.", fa: "نظم، مسئولیت‌پذیری و قابل اعتماد بودن.", },
  "bigFive.extraversion.label": { en: "Extraversion", fa: "برون‌گرایی", },
  "bigFive.extraversion.description": { en: "Sociability, assertiveness, and emotional expressiveness.", fa: "اجتماعی بودن، قاطعیت و ابراز هیجانی.", },
  "bigFive.agreeableness.label": { en: "Agreeableness", fa: "سازگاری", },
  "bigFive.agreeableness.description": { en: "Cooperativeness, trustworthiness, and good-naturedness.", fa: "همکاری، قابل اعتماد بودن و خوش‌مشربی.", },
  "bigFive.neuroticism.label": { en: "Neuroticism", fa: "روان‌رنجوری", },
  "bigFive.neuroticism.description": { en: "Emotional stability, anxiety, and moodiness.", fa: "ثبات عاطفی، اضطراب و نوسانات خلقی.", },

  // Footer
  "footer.copyright": {
    en: `© ${new Date().getFullYear()} AI Personality Analyzer. Written by Abootaleb Moradi.`,
    fa: `© ${new Date().getFullYear()} تحلیلگر شخصیت با هوش مصنوعی. اثر ابوطالب مرادی.`,
  },
  "footer.disclaimer": {
    en: "For illustrative purposes. AI assessment is based on video expressions or text analysis via advanced facial recognition and natural language processing APIs.",
    fa: "برای اهداف نمایشی. ارزیابی توسط هوش مصنوعی بر اساس حالات چهره در ویدیو یا تحلیل متن از طریق APIهای پیشرفته تشخیص چهره و پردازش زبان طبیعی انجام می‌شود.",
  },
};

export type TranslationKey = keyof typeof translationData;

export const translations: Record<TranslationKey, Record<Language, string>> = translationData;
