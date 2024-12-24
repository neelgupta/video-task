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
import NotFoundErrorPage from "./NotFoundErrorPage";

function WebcamRecorder({ show, handleClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [camStatus, setCamStatus] = useState("");
  const [permissionsGranted, setPermissionsGranted] = useState(false); // New state for permissions
  const [deviceError, setDeviceError] = useState(null); // New state for device disconnection errors
  const [mediaUrl, setMediaUrl] = useState(null); // New state for device disconnection errors
  const [isUpload, setIsUpload] = useState(false);
  const finalVideoObject = useRef(null);
  const videoStreamRef = useRef(null); // Store webcam stream
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

  useEffect(() => {
    setMediaUrl(mediaBlobUrl);
  }, [mediaBlobUrl]);

  // Check camera and microphone permissions on load
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoStreamRef.current = stream;
        monitorDeviceDisconnection(stream);
        setPermissionsGranted(true);
      } catch (err) {
        console.error(
          "Permissions denied or error accessing media devices.",
          err
        );
        setDeviceError("Permissions denied or error accessing media devices.");
        dispatch(
          throwError("Permissions denied or error accessing media devices.")
        );
        setPermissionsGranted(false);
      }
    };

    checkPermissions();

    return () => {
      // Cleanup: stop webcam tracks
      if (videoStreamRef.current) {
        const tracks = videoStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        videoStreamRef.current = null;
      }
    };
  }, [show]);

  // Handle recording errors
  useEffect(() => {
    if (error) {
      setDeviceError(`Recording Error:`);
      setPermissionsGranted(false);
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

  useEffect(() => {
    setCamStatus(status);
  }, [status]);

  // Monitor for device disconnections
  const monitorDeviceDisconnection = (stream) => {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.onended = () => {
        console.error(`error`);
        setDeviceError(`Your ${track.kind} device was disconnected.`);
        setPermissionsGranted(false);
        dispatch(throwError(`Your ${track.kind} device was disconnected.`));
        handleStop(); // Stop recording if a device is disconnected
      };
    });
  };

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

  const handleModalClose = () => {
    handleStop();
    handleClose();

    if (videoStreamRef.current) {
      const tracks = videoStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      videoStreamRef.current = null;
    }
  };

  const handleWebcamSubmit = async () => {
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();

      if (blob.size / 1024 / 1024 > 4) {
        dispatch(throwError("File size must be less than 4 MB."));
        return;
      }

      dispatch(
        setWebcamModelConfig({
          isShow: false,
          blobFile: blob,
          blobUrl: mediaUrl,
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
    dispatch(
      setWebcamModelConfig({
        isShow: false,
        blobFile: null,
        blobUrl: "",
      })
    );
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
        {permissionsGranted ? (
          (camStatus === "stopped" || isUpload) && mediaUrl ? (
            <>
              <video
                ref={finalVideoObject}
                src={mediaUrl}
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
                <img
                  src={icons.closeSvg}
                  alt=""
                  className="fit-image w-20"
                  style={{ filter: creteImgFilter("#ffffff") }}
                />
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
                <LivePreview
                  setDeviceError={setDeviceError}
                  setPermissionsGranted={setPermissionsGranted}
                />
              ) : camStatus === "recording" ? (
                <VideoPreview
                  stream={previewStream}
                  setDeviceError={setDeviceError}
                  setPermissionsGranted={setPermissionsGranted}
                />
              ) : null}
            </>
          )
        ) : (
          <NotFoundErrorPage
            setIsUpload={setIsUpload}
            errorText={deviceError}
            setMediaUrl={setMediaUrl}
            setDeviceError={setDeviceError}
            setPermissionsGranted={setPermissionsGranted}
          />
        )}
      </div>
    </Modal>
  );
}

export default WebcamRecorder;

const LivePreview = ({ setDeviceError, setPermissionsGranted }) => {
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
        setPermissionsGranted(false);
        setDeviceError("Error accessing media devices.");
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