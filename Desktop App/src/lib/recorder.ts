import { hidePluginWindow } from "./utils";
import { v4 as uuid } from "uuid";
import io from 'socket.io-client'

let videoTransferFileName: string | undefined;
let mediaRecorder: MediaRecorder;
let userId: string;

const socket = io(import.meta.env.VITE_SOCKET_URL as string)

export const StartRecording = (onSources: {
  screen: string;
  audio: string;
  id: string;
}) => {
  if (!mediaRecorder) {
    console.error("MediaRecorder not initialized");
    return;
  }

  // Verify audio tracks are present
  const stream = mediaRecorder.stream;
  const audioTracks = stream.getAudioTracks();
  const videoTracks = stream.getVideoTracks();

  console.log("Starting recording with:", {
    audioTracks: audioTracks.length,
    videoTracks: videoTracks.length,
    audioEnabled: audioTracks.length > 0 ? audioTracks[0].enabled : false,
  });

  if (audioTracks.length === 0) {
    console.warn("⚠️ No audio tracks found! Recording will have no audio.");
  }

  hidePluginWindow(true);
  videoTransferFileName = `${uuid()}-${onSources?.id.slice(0, 8)}.webm`;
  mediaRecorder.start(1000);
};

export const onStopRecording = () => mediaRecorder.stop();

const stopRecording = () => {
  hidePluginWindow(false)
  socket.emit('process-video', {
    filename: videoTransferFileName,
    userId,
  })
}

export const onDataAvailable = (e: BlobEvent) => {
  socket.emit('video-chunks', {
    chunks: e.data,
    filename: videoTransferFileName,
  })
}


export const selectSources = async (
  onSources: {
    screen: string;
    audio: string;
    id: string;
    preset: "HD" | "SD";
  },
  videoElement: React.RefObject<HTMLVideoElement>,
) => {
  console.log("selectSources called with:", {
    screen: onSources?.screen,
    audio: onSources?.audio,
    id: onSources?.id,
    preset: onSources?.preset,
  });

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(d => d.kind === 'audioinput');

    console.log("Available audio devices:", audioDevices.map(d => ({
      id: d.deviceId,
      label: d.label,
    })));


  } catch (error) {
    console.error("Failed to enumerate devices:", error);
  }

  if (onSources && onSources.screen && onSources.id) {
    const constraints: any = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: onSources?.screen,
          minWidth: onSources.preset === "HD" ? 1920 : 1280,
          maxWidth: onSources.preset === "HD" ? 1920 : 1280,
          minHeight: onSources.preset === "HD" ? 1080 : 720,
          maxHeight: onSources.preset === "HD" ? 1080 : 720,
          frameRate: 30,
        },
      },
    };

    userId = onSources.id;
    //Creating the stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    //audio & webcam stream
    let audioStream: MediaStream | null = null;
    try {
      console.log("🎤 Requesting audio with device:", onSources?.audio || "default");
      audioStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: onSources?.audio
          ? { deviceId: { exact: onSources.audio } }
          : true, // Default to true to capture system audio if no specific device selected
      });
      console.log("✅ Audio stream obtained:", {
        tracks: audioStream.getAudioTracks().length,
        trackEnabled: audioStream.getAudioTracks()[0]?.enabled,
        trackLabel: audioStream.getAudioTracks()[0]?.label,
      });
    } catch (error) {
      console.error("❌ Failed to get audio stream:", error);
      // Continue without audio if permission denied or device not available
    }

    if (videoElement && videoElement.current) {
      videoElement.current.srcObject = stream;
      await videoElement.current.play();
    }

    // Combine video and audio tracks
    const tracks = [...stream.getTracks()];
    if (audioStream) {
      tracks.push(...audioStream.getTracks());
    }

    const combinedStream = new MediaStream(tracks);

    // Log track information for debugging
    console.log("Combined stream tracks:", {
      video: combinedStream.getVideoTracks().length,
      audio: combinedStream.getAudioTracks().length,
    });

    mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: "video/webm; codecs=vp9",
    });

    mediaRecorder.ondataavailable = onDataAvailable
    mediaRecorder.onstop = stopRecording
  }
};
