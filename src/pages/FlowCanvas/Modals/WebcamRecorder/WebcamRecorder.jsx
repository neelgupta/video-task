/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useReactMediaRecorder } from "react-media-recorder";
import "./WebcamRecorder.scss";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  setQueModelConfig,
  setWebcamModelConfig,
  throwError,
} from "../../../../store/globalSlice";

function WebcamRecorder({ show, handleClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [camStatus, setCamStatus] = useState("");
  const [permissionsGranted, setPermissionsGranted] = useState(false); // New state for permissions
  const [deviceError, setDeviceError] = useState(null); // New state for device disconnection errors
  const finalVideoObject = useRef(null);
  const dispatch = useDispatch();

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    previewStream,
    error,
  } = useReactMediaRecorder({ video: true, audio: true });

  // Check camera and microphone permissions on load
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        monitorDeviceDisconnection(stream);
        setPermissionsGranted(true);
      } catch (err) {
        console.error(
          "Permissions denied or error accessing media devices.",
          err
        );
        dispatch(handelCatch(err));
        setPermissionsGranted(false);
      }
    };

    checkPermissions();
  }, []);

  // Monitor for device disconnections
  const monitorDeviceDisconnection = (stream) => {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.onended = () => {
        console.error(`Device disconnected: ${track.kind}`);
        setDeviceError(`Your ${track.kind} device was disconnected.`);
        dispatch(throwError(`Your ${track.kind} device was disconnected.`));

        handleStop(); // Stop recording if a device is disconnected
      };
    });
  };

  // Handle recording errors
  useEffect(() => {
    if (error) {
      console.error("Recording Error:", error);
      dispatch(handelCatch(error));
    }
  }, [error]);

  // Timer for recording
  useEffect(() => {
    let timer;
    if (isRecording && !isPaused && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else if (timeLeft === 0) {
      handleStop();
    }
    return () => clearInterval(timer);
  }, [isRecording, isPaused, timeLeft]);

  const handleStartPauseResume = () => {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
      setIsPaused(false);
      setTimeLeft(300); // Reset timer to 5 minutes
    } else if (isPaused) {
      resumeRecording();
      setIsPaused(false);
    } else {
      pauseRecording();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (isRecording) {
      stopRecording();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    setCamStatus(status);
  }, [status]);

  const handleModalClose = () => {
    handleStop();
    handleClose();
  };

  const handleWebcamSubmit = async () => {
    try {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();

      if (blob.size / 1024 / 1024 > 4) {
        dispatch(throwError("File size must be less than 4 MB."));
        return;
      }

      dispatch(
        setWebcamModelConfig({
          isShow: false,
          blobFile: blob,
          blobUrl: mediaBlobUrl,
        })
      );
      dispatch(setQueModelConfig({ isShow: true }));
    } catch (err) {
      console.error("Error during file submission:", err);
      dispatch(handelCatch(err));
      handleRestartWebcam();
    }
  };

  const handleRestartWebcam = () => {
    startRecording();
    pauseRecording();
    setIsRecording(false);
    setIsPaused(false);
  };

  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      className="webcamRecorder-modal-container"
      onHide={handleModalClose}
    >
      <div className="wp-100 hp-100 webcamRecorder">
        {deviceError ? (
          <div className="stream-error-message">
            <div className="text-20-600" style={{ color: "red" }}>
              {deviceError}
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(
                    setWebcamModelConfig({
                      isShow: false,
                      blobFile: null,
                      blobUrl: "",
                    })
                  );
                }}
                style={{
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "white",
                  color: "black",
                  padding: "8px 15px",
                  margin: "20px 0px",
                  boxShadow: "none",
                }}
              >
                Go back
              </button>
            </div>
          </div>
        ) : permissionsGranted ? (
          camStatus === "stopped" && mediaBlobUrl ? (
            <>
              <video
                ref={finalVideoObject}
                src={mediaBlobUrl}
                autoPlay
                loop
                id="finalVideoObject"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="webcam-title">Like it?</div>
              <div className="webcam-conform-btn-group">
                <div className="conform-btn" onClick={handleWebcamSubmit}>
                  Yes
                </div>
                <div className="reject-btn" onClick={handleRestartWebcam}>
                  No
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="webcam-close-btn" onClick={handleModalClose}>
                <img src={icons.closeSvg} alt="" className="fit-image w-20" />
              </div>
              <div className="play-stop-control">
                <div className="control-button">
                  <button
                    className="webcam-btn play-btn"
                    onClick={handleStartPauseResume}
                  >
                    <img
                      src={
                        icons[
                          !isRecording ? "push" : isPaused ? "push" : "play"
                        ]
                      }
                      alt=""
                      className="fit-image"
                      style={{ filter: creteImgFilter("#ffffff") }}
                    />
                  </button>
                  <div style={{ color: "white", fontSize: "16px" }}>
                    {!isRecording ? "Start" : isPaused ? "Resume" : "Pause"}
                  </div>
                </div>
                <div className="control-button">
                  <button className="stop-btn webcam-btn" onClick={handleStop}>
                    <img
                      src={icons.finish}
                      alt=""
                      className="fit-image"
                      style={{ filter: creteImgFilter("#FF0000") }}
                    />
                  </button>
                  <div style={{ color: "white", fontSize: "16px" }}>Stop</div>
                </div>
              </div>

              {isRecording && (
                <div className="timer-display">
                  <div className="timer">{formatTime(timeLeft)}</div>
                </div>
              )}

              {camStatus === "idle" || camStatus === "paused" ? (
                <LivePreview />
              ) : camStatus === "recording" ? (
                <VideoPreview stream={previewStream} />
              ) : null}
            </>
          )
        ) : (
          <div className="permissions-error">
            <div className="text-20-600" style={{ color: "red" }}>
              Please enable camera and microphone permissions to use the
              recorder.
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(
                    setWebcamModelConfig({
                      isShow: false,
                      blobFile: null,
                      blobUrl: "",
                    })
                  );
                }}
                style={{
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "white",
                  color: "black",
                  padding: "8px 15px",
                  margin: "20px 0px",
                  boxShadow: "none",
                }}
              >
                Go back
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default WebcamRecorder;

const LivePreview = () => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        dispatch(handelCatch(err));
      }
    };

    getMedia();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width="100%"
      autoPlay
      muted
      style={{ objectFit: "contain" }}
    />
  );
};

LivePreview.displayName = "LivePreview";

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);
  const isStreamAssigned = useRef(false);

  useEffect(() => {
    if (videoRef.current && stream && !isStreamAssigned.current) {
      videoRef.current.srcObject = stream;
      isStreamAssigned.current = true;
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width="100%"
      autoPlay
      muted
      style={{ objectFit: "contain" }}
    />
  );
};

VideoPreview.displayName = "VideoPreview";
