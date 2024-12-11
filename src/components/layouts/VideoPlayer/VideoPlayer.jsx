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
  const [isMute, setIsMute] = useState(true);
  useEffect(() => {
    const video = videoRef.current;
    // default video controls
    video.volume = 0;
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Force video reload when videoUrl changes
    }
  }, [videoUrl]);

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

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
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
        }}
      >
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
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
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
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
            fontSize: textSize,
            opacity: textReveal >= currentTime ? "1" : "0",
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
            max={duration}
            value={currentTime}
            onChange={handleProgressBarChange}
            onMouseDown={handleDragRange}
            onMouseUp={handleDragRange}
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
    </div>
  );
};

export default VideoPlayer;
