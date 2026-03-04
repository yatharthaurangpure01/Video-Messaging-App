# Express Backend - Video Processing Server

Real-time video processing server with Socket.IO, Google Cloud Storage, and AI-powered transcription.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Start production server
npm start
```

## 📋 Features

- ✅ Real-time video chunk streaming via Socket.IO
- ✅ Google Cloud Storage integration
- ✅ AI-powered title and summary generation (Gemini)
- ✅ Audio transcription support (optional)
- ✅ Automatic file cleanup
- ✅ PRO plan features

## 🎙️ Audio Transcription

This server supports audio transcription for generating accurate video titles and summaries.

### Quick Setup (5 minutes)

```bash
# Run the setup wizard
node install-transcription.js
```

### Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get transcription working in 5 minutes
- **[TRANSCRIPTION_SETUP.md](./TRANSCRIPTION_SETUP.md)** - Detailed setup guide
- **[TRANSCRIPTION-FLOW.md](./TRANSCRIPTION-FLOW.md)** - Visual flow diagrams
- **[README-TRANSCRIPTION.md](./README-TRANSCRIPTION.md)** - Complete overview

### Test Your Setup

```bash
# Test transcription
node test-transcription.js

# Compare methods
node compare-transcription-methods.js
```

## 🔧 Configuration

### Required Environment Variables

```env
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_KEY_FILE=./gcp-key.json
GOOGLE_CLOUD_BUCKET_NAME=your-bucket-name
GEMINI_API_KEY=your-gemini-api-key
NEXT_API_HOST=http://localhost:3000/api
ELECTRON_HOST=http://localhost:5173
```

### Optional (for transcription)

```env
# Google Speech-to-Text (uses same GCP credentials)
# No additional key needed!

# Or use AssemblyAI
ASSEMBLYAI_API_KEY=your-assemblyai-api-key

# Or use OpenAI Whisper
OPENAI_API_KEY=your-openai-api-key
```

## 📁 Project Structure

```
Express-Backend/
├── server.js                          # Main server (current)
├── server-with-google-speech.js       # Production-ready with transcription
├── enhanced-server-with-speech.js     # Alternative implementation
├── package.json                       # Dependencies
├── .env                              # Environment variables
├── gcp-key.json                      # Google Cloud credentials
├── temp_upload/                      # Temporary video storage
│
├── Documentation/
│   ├── README.md                     # This file
│   ├── QUICKSTART.md                 # 5-minute setup guide
│   ├── TRANSCRIPTION_SETUP.md        # Detailed transcription guide
│   ├── TRANSCRIPTION-FLOW.md         # Visual flow diagrams
│   ├── README-TRANSCRIPTION.md       # Transcription overview
│   └── .env.example                  # Environment template
│
└── Scripts/
    ├── install-transcription.js      # Setup wizard
    ├── test-transcription.js         # Test your setup
    └── compare-transcription-methods.js  # Compare options
```

## 🔄 How It Works

```
Desktop App (Electron)
    ↓ Socket.IO
Express Backend
    ├─► Save chunks to temp_upload/
    ├─► Upload to Google Cloud Storage
    ├─► Transcribe audio (optional)
    ├─► Generate AI title/summary (Gemini)
    └─► Send to Next.js API
        ↓
Next.js API
    └─► Save to database
```

## 🎯 Transcription Options

| Method | Setup | Cost | Accuracy |
|--------|-------|------|----------|
| Placeholder | None | Free | Low |
| Google Speech-to-Text | 5 min | 60 min/month free | High |
| AssemblyAI | 10 min | Limited free | High |
| OpenAI Whisper | 10 min | $0.006/min | Excellent |

**Recommended:** Google Speech-to-Text (you already have GCP setup!)

## 📡 Socket.IO Events

### Client → Server

- `video-chunks` - Send video chunk data
- `process-video` - Trigger video processing
- `disconnect` - Client disconnected

### Server → Client

- `connection` - Client connected
- Processing status updates (via Next.js API)

## 🔐 Security

- CORS configured for Electron app
- Environment variables for sensitive data
- Temporary files automatically deleted
- File size limits enforced (25MB for transcription)

## 🐛 Troubleshooting

### "Socket is not connected"
- Check ELECTRON_HOST in .env
- Verify port 5000 is available
- Check CORS configuration

### "Upload failed"
- Verify GCP credentials
- Check bucket permissions
- Ensure bucket exists

### "Transcription failed"
- See [TRANSCRIPTION_SETUP.md](./TRANSCRIPTION_SETUP.md)
- Run `node test-transcription.js`
- Check API is enabled in GCP Console

### "AI generation failed"
- Verify GEMINI_API_KEY
- Check API quota
- Review console logs for details

## 📊 Performance

- Handles multiple concurrent uploads
- Automatic chunk buffering
- Efficient file streaming
- Cleanup on completion

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### With PM2
```bash
pm2 start server.js --name video-backend
pm2 logs video-backend
```

## 📚 API Endpoints (Next.js)

The server communicates with these Next.js API routes:

- `POST /api/recording/[id]/processing` - Start processing
- `POST /api/recording/[id]/transcribe` - Save transcription
- `POST /api/recording/[id]/complete` - Complete processing

## 🔄 Upgrade Path

### Current: Placeholder Mode
```javascript
// Works immediately, generic titles
transcribeAudio() returns filename
```

### Upgrade: Real Transcription
```bash
# 1. Choose your service
node install-transcription.js

# 2. Follow the prompts
# 3. Restart server
npm run dev
```

## 💡 Tips

- Start with placeholder mode to test the pipeline
- Enable transcription once everything works
- Monitor your GCP usage in Cloud Console
- Use good microphone quality for best results
- Keep videos under 25MB for transcription

## 📖 Additional Resources

- [Google Cloud Storage Docs](https://cloud.google.com/storage/docs)
- [Google Speech-to-Text Docs](https://cloud.google.com/speech-to-text/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Socket.IO Docs](https://socket.io/docs/)

## 🤝 Support

Need help?
1. Check the troubleshooting sections
2. Run test scripts to diagnose issues
3. Review console logs for errors
4. See documentation files for detailed guides

## 📝 License

ISC

---

**Status:** ✅ Ready to use!  
**Transcription:** 📝 Optional (see QUICKSTART.md)  
**Server:** 🚀 Running on port 5000
