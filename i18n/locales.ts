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
  "progress.analyzingText": {
