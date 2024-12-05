import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import "./VideoPlayer.scss";
import { getTrackBackground, Range } from "react-range";
const VideoPlayer = ({ videoUrl, videoConfigForm }) => {
  const videoRef = useRef(null);
  const { alignVideo, overlayText, textSize, textReveal, videoPosition } =
    videoConfigForm;
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCenterPlay, setShowCenterPlay] = useState(false);

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
    console.log("video.currentTime", video.currentTime);
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    console.log("video.duration", video.duration);
    setDuration(video.duration);
  };

  const handleProgressBarChange = (e) => {
    console.log("e", e);
    const video = videoRef.current;
    video.currentTime = e.target.value;
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
          alignItems: videoPosition.value.split(" ")[0],
          justifyContent: videoPosition.value.split(" ")[1],
          height: "100%",
          margin: "auto",
        }}
      >
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="video"
          style={{
            // backgroundPosition: videoPosition.value,

            ...(alignVideo
              ? { objectFit: "contain", height: "100%" }
              : {
                  objectFit: "cover",
                  height: "120%",
                }),
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <div
        style={{
          display:
            showCenterPlay ||
            !isPlaying ||
            Math.floor(currentTime) === Math.floor(duration)
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
            fontSize: textSize.value,
            opacity: textReveal >= currentTime ? "1" : "0",
          }}
        >
          {overlayText}
        </div>
      )}

      <div className="control-box">
        <button onClick={togglePlay} className="push-play-btn">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressBarChange}
          style={{
            flex: 1,
            margin: "0 10px",
          }}
        />

        <span className="duration-text">
          {Math.floor(currentTime)} / {Math.floor(duration)} sec
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
  );
};

export default VideoPlayer;
