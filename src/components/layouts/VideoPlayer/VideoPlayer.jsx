import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import "./VideoPlayer.scss";
import { getTrackBackground, Range } from "react-range";
import { useDispatch } from "react-redux";
import { handelCatch } from "../../../store/globalSlice";
import { processVideoMetadata } from "../../../pages/FlowCanvas/flowControl";
const VideoPlayer = ({ videoUrl, videoConfigForm, getCurrentTime }) => {
  const videoRef = useRef(null);
  const { alignVideo, overlayText, textSize, textReveal, videoPosition } =
    videoConfigForm;
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCenterPlay, setShowCenterPlay] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const video = videoRef.current;
    getDuration();
    if (video) {
      // Reset the video to the beginning
      video.pause(); // Pause any ongoing playback
      video.currentTime = 0; // Ensure the video starts from the beginning
      video.volume = 0; // Start muted to allow autoplay
      video.load(); // Reload the video

      // Attempt autoplay with error handling
      video
        .play()
        .then(() => {
          setIsPlaying(true); // Update state to indicate the video is playing
        })
        .catch((error) => {
          dispatch(handelCatch(error)); // Handle autoplay issues
          console.warn("Autoplay blocked or interrupted:", error);
          setIsPlaying(false); // Update state to indicate autoplay failed
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  const getDuration = async () => {
    const newDuration = await processVideoMetadata(videoUrl);
    setDuration(newDuration);
  };

  useEffect(() => {
    if (duration && currentTime) {
      getCurrentTime && getCurrentTime({ currentTime, duration });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, duration]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSpeedChange = () => {
    const video = videoRef.current;
    const newSpeed = playbackSpeed === 1 ? 2 : 1; // Toggle between 1x and 2x
    video.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
  };

  const handleProgressBarChange = (e) => {
    const video = videoRef.current;
    video.currentTime = e.target.value;
  };

  const handleVolume = () => {
    const video = videoRef.current;
    if (isMute) {
      video.volume = 1;
      setIsMute(false);
      return;
    }
    setIsMute(true);
    video.volume = 0;
  };

  const handleDragRange = (event) => {
    const type = event.type;
    const video = videoRef.current;
    if (type === "mousedown") {
      video.pause();
      return;
    }
    if (isPlaying) {
      video.play();
    }
  };

  const handleVideoEnd = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div
      className="VideoPlayer-container"
      onMouseEnter={() => setShowCenterPlay(false)}
      onMouseLeave={() => setShowCenterPlay(!isPlaying)}
    >
      <div
        style={{
          display: "flex",
          alignItems:
            !alignVideo && videoPosition
              ? videoPosition.split(" ")[0]
              : "center",
          justifyContent:
            !alignVideo && videoPosition
              ? videoPosition.split(" ")[1]
              : "center",
          height: "100%",
          margin: "auto",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          // onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
          className="video"
          style={{
            ...(alignVideo
              ? { objectFit: "contain", height: "100%" }
              : {
                  objectFit: "cover",
                  height: "120%",
                }),
          }}
        >
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
        </video>
        <div className="flow-ai-video-logo-container">
          <div className="text-12-700" style={{ color: "white" }}>
            Powered by:
          </div>
          <div className="text-24-800" style={{ color: "white" }}>
            Flōw AI
          </div>
        </div>
      </div>

      <div
        style={{
          display:
            showCenterPlay ||
            !isPlaying ||
            parseFloat(currentTime.toFixed(0)) === duration
              ? "flex"
              : "none",
        }}
        className="play-btn-center"
        onClick={togglePlay}
      >
        <img
          src={icons.pushIcon}
          alt=""
          className="fir-image"
          style={{ filter: creteImgFilter("#ffffff") }}
        />
      </div>

      {overlayText && (
        <div
          className="overlay-text"
          style={{
            fontSize: textSize,
            opacity: textReveal >= currentTime ? "1" : "0",
            display: textReveal >= currentTime ? "block" : "none",
          }}
        >
          {overlayText}
        </div>
      )}

      <div className="control-box">
        <div className="control-volume">
          <div className="w-30 h-30 f-center pointer volume">
            <img
              src={icons[isMute ? "volumeOff" : "volumeOn"]}
              alt=""
              className="fit-image w-25 h-25 "
              onClick={handleVolume}
            />
          </div>
        </div>
        <div className="all-control">
          <button onClick={togglePlay} className="push-play-btn">
            {/* {currentTime === duration ? "Play" : isPlaying ? "Pause" : "Play"} */}
            <div className="w-40 h-40 f-center pointer">
              <img
                src={
                  icons[
                    currentTime === duration
                      ? "push"
                      : isPlaying
                      ? "play"
                      : "push"
                  ]
                }
                alt=""
                className="fit-image w-40 h-40"
                style={{ filter: creteImgFilter("#ffffff") }}
              />
            </div>
          </button>
          <input
            type="range"
            min="0"
            max={duration - 1}
            step="any" // Enable smooth scrolling with fractional steps
            value={currentTime}
            onInput={(e) => handleProgressBarChange(e)}
            onMouseDown={handleDragRange}
            onMouseUp={handleDragRange}
            style={{
              flex: 1,
              margin: "0 10px",
              cursor: "pointer",
            }}
          />

          <span className="duration-text">
            {parseInt(currentTime.toFixed(0))} / {duration} sec
          </span>
          <button onClick={handleSpeedChange} className="speed-btn">
            {playbackSpeed}x
          </button>
          <button
            onClick={() => videoRef.current.requestFullscreen()}
            className="full-screen-btn"
          >
            <img
              src={icons.fitView}
              alt=""
              className="fir-image"
              style={{ filter: creteImgFilter("#ffffff") }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
