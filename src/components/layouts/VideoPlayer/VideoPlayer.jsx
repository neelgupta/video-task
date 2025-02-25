import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../../utils/constants";
import { creteImgFilter, hexToRgb } from "../../../utils/helpers";
import "./VideoPlayer.scss";
import { getTrackBackground, Range } from "react-range";
import { useDispatch } from "react-redux";
import { handelCatch, throwError } from "../../../store/globalSlice";
import { processVideoMetadata } from "../../../pages/FlowCanvas/flowControl";
import { useTranslation } from "react-i18next";
const VideoPlayer = ({
  videoUrl,
  videoConfigForm,
  getCurrentTime,
  flowStyle,
  windowSizeTag = "desktop",
  allControlsDisabled = false,
  scaleCount,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const {
    alignVideo = false,
    overlayText,
    textSize,
    textReveal,
    videoPosition,
  } = videoConfigForm;

  const dispatch = useDispatch();
  const [aspectRatio, setAspectRatio] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(true);
  const [isRangeHover, setIsRangeHover] = useState(false);

  useEffect(() => {
    if (windowSizeTag === "desktop") {
      setAspectRatio(1);
    }
    if (windowSizeTag === "tablet") {
      setAspectRatio(0.8);
    }
    if (windowSizeTag === "mobile") {
      setAspectRatio(0.7);
    }
    if (windowSizeTag === "Widget-button") {
      setAspectRatio(0.7);
    }
    console.log("windowSizeTag", windowSizeTag);
  }, [windowSizeTag]);

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
          dispatch(
            throwError(
              error.response?.data?.message ||
                error?.message ||
                "Autoplay blocked or interrupted"
            )
          ); // Handle autoplay issues
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
    <div className="VideoPlayer-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems:
              !alignVideo && videoPosition && alignVideo !== undefined
                ? videoPosition.split(" ")[0]
                : "center",
            justifyContent:
              !alignVideo && videoPosition && alignVideo !== undefined
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
            onEnded={handleVideoEnd}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              togglePlay();
            }}
            className="video"
            style={{
              ...(alignVideo
                ? { objectFit: "contain" }
                : { objectFit: "cover" }),
            }}
          >
            {videoUrl && <source src={videoUrl} type="video/mp4" />}
          </video>
        </div>

        <div
          style={{
            display:
              !isPlaying || parseFloat(currentTime.toFixed(0)) === duration
                ? "flex"
                : "none",
            width: `${100 * aspectRatio}px`,
            height: `${100 * aspectRatio}px`,
          }}
          className="play-btn-center"
          onClick={togglePlay}
        >
          <img
            src={icons.pushIcon}
            alt=""
            className="fir-image"
            style={{
              filter: creteImgFilter("#ffffff"),
              width: `${80 * aspectRatio}px`,
              height: `${80 * aspectRatio}px`,
              zIndex: "100000000",
            }}
          />
        </div>

        {!allControlsDisabled && (
          <>
            <div className="control-box">
              <div
                className="video-range-control h-20"
                onMouseEnter={() => setIsRangeHover(true)}
                onMouseLeave={() => setIsRangeHover(false)}
              >
                {duration > 0 && (
                  <Range
                    step={0.1}
                    min={0}
                    max={duration}
                    values={[currentTime]}
                    onChange={(values) =>
                      handleProgressBarChange({ target: { value: values[0] } })
                    }
                    renderTrack={({ props, children }) => {
                      const percentage = (currentTime / duration) * 100;
                      return (
                        <div
                          onMouseEnter={(e) => {
                            handleDragRange(e);
                          }}
                          onMouseLeave={(e) => {
                            handleDragRange(e);
                          }}
                          {...props}
                          style={{
                            ...props.style,
                            height: isRangeHover ? "12px" : "8px",
                            marginTop: "0px",
                            width: "102%",
                            borderRadius: "0px",
                            background: `linear-gradient(90deg, #8000ff ${percentage}%, ${
                              isRangeHover
                                ? "rgba(0,0,0,0.8)"
                                : "rgba(0,0,0,0.2)"
                            } ${percentage}%)`,
                            transitionDuration: "0.3s",
                            transitionProperty: "height,background",
                          }}
                        >
                          {children}
                        </div>
                      );
                    }}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          display: "none",
                        }}
                      />
                    )}
                  />
                )}
              </div>

              <div
                className="all-control"
                style={{
                  gap: `${10 * aspectRatio}px`,
                }}
              >
                <span
                  className="duration-text"
                  style={{
                    fontSize: `${Math.floor(18 * aspectRatio)}px`,
                    ...(scaleCount
                      ? {
                          transform: `scale(${scaleCount})`,
                        }
                      : {}),
                  }}
                >
                  {parseInt(currentTime.toFixed(0))} / {duration} sec
                </span>
                <button
                  onClick={handleSpeedChange}
                  className="speed-btn"
                  style={{
                    ...(scaleCount
                      ? {
                          transform: `scale(${scaleCount})`,
                        }
                      : { transform: `scale(${100 * aspectRatio}%)` }),
                  }}
                >
                  {playbackSpeed}x
                </button>

                <button
                  onClick={handleVolume}
                  className="volume-control"
                  style={{
                    ...(scaleCount
                      ? {
                          transform: `scale(${scaleCount})`,
                        }
                      : { transform: `scale(${100 * aspectRatio}%)` }),
                  }}
                >
                  <img
                    src={icons[isMute ? "volumeOff" : "volumeOn"]}
                    alt=""
                    className="fit-image w-20 h-20 "
                  />
                </button>

                <button
                  onClick={() => videoRef.current.requestFullscreen()}
                  className="full-screen-btn me-10"
                  style={{
                    ...(scaleCount
                      ? {
                          transform: `scale(${scaleCount})`,
                        }
                      : { transform: `scale(${100 * aspectRatio}%)` }),
                  }}
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
            <div
              className={
                windowSizeTag === "desktop"
                  ? "flow-ai-video-logo-desktop"
                  : "flow-ai-video-logo-tablet"
              }
              style={{
                ...(scaleCount ? { transform: `scale(${scaleCount})` } : {}),
                background: `rgba(${hexToRgb(flowStyle.primary_color)}, 0.6)`,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: windowSizeTag === "desktop" ? "14px" : "12px",
                  fontWeight: "500",
                  fontFamily: `${flowStyle.font}`,
                  lineHeight: "1",
                }}
              >
                {t("Powered_by")}
              </div>
              <div
                style={{
                  color: "white",
                  lineHeight: "1",
                  fontSize: windowSizeTag === "desktop" ? "20px" : "16px",
                  fontWeight: "800",
                }}
              >
                Flōw AI
              </div>
            </div>

            {overlayText && (
              <div
                className="overlay-text"
                style={{
                  fontSize: textSize,
                  opacity: textReveal >= currentTime ? "1" : "0",
                  display: textReveal >= currentTime ? "block" : "none",
                  padding: `10px ${Math.floor(
                    50 * aspectRatio * ((scaleCount || 2) / 2)
                  )}px`,
                }}
                onClick={(e) => {
                  togglePlay();
                }}
              >
                {overlayText}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
