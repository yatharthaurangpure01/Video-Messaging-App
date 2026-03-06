const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const { Readable } = require("stream");
const { Storage } = require("@google-cloud/storage");
const speech = require("@google-cloud/speech");
const { Blob } = require("buffer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Handle GCP credentials from environment variable or file
const getGCPCredentials = () => {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  }
  return undefined; // Will use keyFilename
};

const gcpCredentials = getGCPCredentials();

const speechClient = new speech.SpeechClient(
  gcpCredentials 
    ? { credentials: gcpCredentials }
    : { keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE }
);

async function transcribeAudio(filePath, gcsUri = null) {
  try {
    console.log(`🎙️ Transcribing: ${filePath}`);

    const config = {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
    };

    // For videos > 1 minute, use longRunningRecognize with GCS URI
    if (gcsUri) {
      console.log(`📹 Using long-running transcription for: ${gcsUri}`);

      const [operation] = await speechClient.longRunningRecognize({
        audio: { uri: gcsUri },
        config: config,
      });

      console.log("⏳ Waiting for transcription to complete...");
      const [response] = await operation.promise();

      if (!response.results || response.results.length === 0) {
        console.log("⚠️ No speech detected");
        return `Video recording: ${filePath.split("/").pop()}`;
      }

      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");

      console.log(`✅ Transcription complete: ${transcription.substring(0, 100)}...`);
      return transcription;
    }

    // For videos < 1 minute, use regular recognize
    const audioBytes = fs.readFileSync(filePath).toString("base64");

    const [response] = await speechClient.recognize({
      audio: { content: audioBytes },
      config: config,
    });

    if (!response.results || response.results.length === 0) {
      console.log("⚠️ No speech detected");
      return `Video recording: ${filePath.split("/").pop()}`;
    }

    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    console.log(`✅ Transcription: ${transcription.substring(0, 100)}...`);
    return transcription;
  } catch (error) {
    console.error("❌ Transcription error:", error.message);
    return `Video recording from file: ${filePath}`;
  }
}

const server = http.createServer(app);

let recordedChunks = [];

const storage = new Storage(
  gcpCredentials
    ? {
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        credentials: gcpCredentials,
      }
    : {
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
      }
);
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

const io = new Server(server, {
  cors: {
    origin: process.env.ELECTRON_HOST,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket is Connected");

  socket.on("video-chunks", async (data) => {
    console.log("Video chunk is sent", {
      filename: data.filename,
      chunkSize: data.chunks?.size || 0,
      chunkType: typeof data.chunks,
    });

    // Append to file instead of overwriting
    const writestream = fs.createWriteStream("temp_upload/" + data.filename, { flags: 'a' });
    recordedChunks.push(data.chunks);
    
    // Convert the single chunk to buffer and append it
    const chunkBlob = new Blob([data.chunks], {
      type: "video/webm; codecs=vp9",
    });

    const buffer = Buffer.from(await chunkBlob.arrayBuffer());
    console.log("Buffer size:", buffer.length, "bytes");
    const readStream = Readable.from(buffer);
    readStream.pipe(writestream).on("finish", () => {
      console.log("Chunk Saved - Total chunks:", recordedChunks.length);
    });
  });

  socket.on("process-video", async (data) => {
    console.log("Processing video...");
    recordedChunks = [];

    // Prevent multiple processing calls for the same file
    if (data.processed) {
      console.log("Video already processed, skipping...");
      return;
    }

    fs.readFile("temp_upload/" + data.filename, async (err, file) => {
      const processing = await axios.post(
        `${process.env.NEXT_API_HOST}/recording/${data.userId}/processing`,
        { filename: data.filename },
      );

      if (processing.data.status !== 200) {
        console.log("API Error:", processing.data);
        return console.log(
          "Error: Something went wrong with creating the processing file",
        );
      }

      // Mark as processed to prevent duplicate calls
      data.processed = true;

      // Upload to Google Cloud Storage
      const fileName = data.filename;
      const file_upload = bucket.file(fileName);

      const stream = file_upload.createWriteStream({
        metadata: {
          contentType: "video/webm",
        },
      });

      stream.on("error", (uploadErr) => {
        console.error("GCS Upload error:", uploadErr);
        console.log("Error. Upload Failed! process aborted");
      });

      stream.on("finish", async () => {
        console.log("Video Uploaded to Google Cloud Storage");
        console.log("User plan:", processing.data.plan);

        if (processing.data.plan === "PRO") {
          fs.stat("temp_upload/" + data.filename, async (err, stat) => {
            if (!err) {
              // Build GCS URI for the uploaded file
              const gcsUri = `gs://${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`;

              // Use long-running transcription for all videos (safer approach)
              const transcription = await transcribeAudio(
                `temp_upload/${data.filename}`,
                gcsUri
              );

              const prompt = `Generate a title and summary for a video recording.
Context: ${transcription}
Filename: ${data.filename}

Create a professional title and description based on the available information.
Return ONLY a valid JSON object with this exact format (no markdown, no code blocks):
{"title": "your generated title", "summary": "your generated summary"}`;

              try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const generatedContent = response.text();

                const titleAndSummaryGenerated = await axios.post(
                  `${process.env.NEXT_API_HOST}/recording/${data.userId}/transcribe`,
                  {
                    filename: data.filename,
                    content: generatedContent,
                    transcript: transcription,
                  },
                );

                if (titleAndSummaryGenerated.data.status !== 200)
                  console.log(
                    "Error: Something went wrong when creating the title and description",
                  );
              } catch (aiError) {
                console.log(
                  "AI generation failed, using fallback:",
                  aiError.message,
                );
                // Fallback to test content if AI fails
                const generatedContent = JSON.stringify({
                  title: "Video Recording",
                  summary: "Recorded video content",
                });

                const titleAndSummaryGenerated = await axios.post(
                  `${process.env.NEXT_API_HOST}/recording/${data.userId}/transcribe`,
                  {
                    filename: data.filename,
                    content: generatedContent,
                    transcript: transcription,
                  },
                );
              }
            }
          });
        } else {
          console.log(`⚠️ Transcription skipped - User plan is "${processing.data.plan}" (requires PRO)`);
        }

        const stopProcessing = await axios.post(
          `${process.env.NEXT_API_HOST}/recording/${data.userId}/complete`,
          { filename: data.filename },
        );

        if (stopProcessing.data.status !== 200)
          console.log(
            "Error: Something went wrong when stopping the process and trying to complete the processing stage.",
          );

        if (stopProcessing.status === 200) {
          fs.unlink("temp_upload/" + data.filename, (err) => {
            if (!err)
              console.log(data.filename + " " + " deleted successfully");
          });
        }
      });

      // Start the upload
      stream.end(file);
    });
  });

  socket.on("disconnect", async (data) => {
    console.log("Socket.id is disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
