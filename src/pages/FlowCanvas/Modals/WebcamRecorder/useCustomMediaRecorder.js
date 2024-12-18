import { useState, useRef } from "react";

const useCustomMediaRecorder = ({ video = true, audio = true } = {}) => {
  const [status, setStatus] = useState("idle");
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [previewStream, setPreviewStream] = useState(null);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const recordedChunks = useRef([]);

  // Start Recording
  const startRecording = async () => {
    try {
      setStatus("acquiring_media");
      recordedChunks.current = [];

      // Access media devices
      const stream = await navigator.mediaDevices.getUserMedia({
        video,
        audio,
      });

      mediaStreamRef.current = stream;
      setPreviewStream(stream);
      setStatus("recording");

      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setMediaBlobUrl(url);

        // Clean up media stream
        stream.getTracks().forEach((track) => track.stop());
        setPreviewStream(null);
      };

      mediaRecorder.onerror = (e) => {
        setError(e);
        setStatus("error");
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setError(err);
      setStatus("error");
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setStatus("stopped");
    }
  };

  // Pause Recording
  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setStatus("paused");
    }
  };

  // Resume Recording
  const resumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setStatus("recording");
    }
  };

  return {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    previewStream,
    error,
  };
};

export default useCustomMediaRecorder;
