# AI Personality Analyzer

## Overview

Get an illustrative Big Five personality profile by analyzing a short video of facial expressions or by providing self-descriptive text. This tool uses advanced AI including facial emotion recognition and Google's Gemini AI for personality analysis.

## Features

- 📹 **Video Analysis**: Upload a video (max 15 seconds) for facial emotion detection and personality analysis
- 📝 **Text Analysis**: Describe yourself in text for AI-powered personality profiling  
- 🧠 **Big Five Model**: Results based on the scientifically-backed Big Five personality traits
- 🌍 **Multi-language**: Support for English and Persian (Farsi)
- 🔒 **Privacy-First**: API keys stored locally, never sent to our servers

## Setup & Installation

### Prerequisites
- Node.js (version 16 or higher)
- A Google Gemini API key (free at https://aistudio.google.com/app/apikey)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-personality-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key** (Choose one method):
   
   **Method A: Environment file (recommended for development)**
   ```bash
   # Create .env.local file
   echo "GEMINI_API_KEY=your-api-key-here" > .env.local
   ```

   **Method B: Set in the UI**
   - Run the app without an API key
   - Click "Set API Key" button in the interface
   - Enter your Gemini API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to http://localhost:5173
   - The app will load and initialize the AI models

## Deployment

### Railway Deployment

1. **Connect your GitHub repository to Railway**
2. **Set environment variable in Railway dashboard:**
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```
3. **Deploy**: Railway will automatically build and deploy your app

### Netlify Deployment

1. **Connect your GitHub repository to Netlify**
2. **Set build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Set environment variable in Netlify dashboard:**
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```
4. **Deploy**: Netlify will build and deploy your app

### Vercel Deployment

1. **Connect your GitHub repository to Vercel**
2. **Set environment variable in Vercel dashboard:**
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```
3. **Deploy**: Vercel will automatically build and deploy

### Other Platforms

For other deployment platforms:

1. **Set the environment variable** `GEMINI_API_KEY` in your platform's dashboard
2. **Ensure the build command is**: `npm run build`  
3. **Ensure the output directory is**: `dist`

### API Key Priority

The app looks for API keys in the following order:

1. **User-provided** (via the UI, stored in localStorage) - **Highest priority**
2. **Environment variables**: `GEMINI_API_KEY`, `API_KEY`, `VITE_GEMINI_API_KEY`, `VITE_API_KEY`
3. **Runtime injection**: For server-side injection on deployment platforms

## Getting a Gemini API Key

1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with "AIza...")
5. Use it in your environment variable or enter it via the UI

## Troubleshooting

### API Key Issues
- **"API key not found"**: Make sure you've set the `GEMINI_API_KEY` environment variable or entered it via the UI
- **"Invalid API key"**: Verify your key is correct and hasn't expired
- **"Analysis unavailable"**: Click "Set API Key" to enter your key manually

### Model Loading Issues
- **"Failed to load emotion models"**: Refresh the page, models are loaded from CDN
- **Slow loading**: The facial recognition models are loaded from remote CDN on first visit

### Video Analysis Issues  
- **"No faces detected"**: Ensure your video clearly shows a face
- **"Video too long"**: Maximum video length is 15 seconds
- **"Invalid video file"**: Use common formats like MP4, MOV, AVI

### Performance Tips
- Use shorter videos (5-10 seconds) for faster analysis
- Ensure good lighting and clear facial visibility
- For text analysis, provide detailed self-descriptions for better results

## Technical Details

### Architecture
- **Frontend**: React + TypeScript + Tailwind CSS
- **Facial Recognition**: face-api.js + TensorFlow.js
- **AI Analysis**: Google Gemini API
- **Build Tool**: Vite
- **Deployment**: Static site compatible

### Privacy & Security
- API keys stored in browser localStorage only
- No data sent to our servers
- All analysis done via Google Gemini API directly
- Face detection runs locally in browser

### Browser Compatibility
- Modern browsers with ES2022 support
- WebRTC/Canvas API support required for video analysis
- Tested on: Chrome, Firefox, Safari, Edge

## License & Credits

© 2024 AI Personality Analyzer. Written by Abootaleb Moradi.

This project is for illustrative and educational purposes. AI personality assessment should not be used for making important life decisions.

## Contributing

Contributions are welcome! Please ensure any changes maintain compatibility with the deployment platforms and follow the existing code structure.

## Support

For issues with deployment or API key setup, please check:
1. Environment variable is correctly set on your platform
2. API key is valid and has proper permissions  
3. Build logs for any error messages

The app includes comprehensive error messaging to help diagnose issues.
