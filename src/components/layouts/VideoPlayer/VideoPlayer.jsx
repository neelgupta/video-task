import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../../utils/constants";
import { creteImgFilter, hexToRgb } from "../../../utils/helpers";
import "./VideoPlayer.scss";
import { getTrackBackground, Range } from "react-range";
import { useDispatch } from "react-redux";
import { handelCatch } from "../../../store/globalSlice";
import { processVideoMetadata } from "../../../pages/FlowCanvas/flowControl";
import { useTranslation } from "react-i18next";
const VideoPlayer = ({
  videoUrl,
  videoConfigForm,
  getCurrentTime,
  flowStyle,
  windowSizeTag = "desktop",
  allControlsDisabled = false,
}) => {
  console.log("windowSizeTag", windowSizeTag);
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const {
    alignVideo = false,
    overlayText,
    textSize,
    textReveal,
    videoPosition,
  } = videoConfigForm;
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(true);
  const [isRangeHover, setIsRangeHover] = useState(false);
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
    console.log("e.target.value", e.target.value);
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
            width: ["Widget-mobile", "Widget-button"].includes(windowSizeTag)
              ? "50px"
              : "100px",
            height: ["Widget-mobile", "Widget-button"].includes(windowSizeTag)
              ? "50px"
              : "100px",
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
              width: ["Widget-mobile", "Widget-button"].includes(windowSizeTag)
                ? "50px"
                : "100px",
              height: ["Widget-mobile", "Widget-button"].includes(windowSizeTag)
                ? "50px"
                : "100px",
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
                style={
                  ["Widget-mobile", "Widget-button"].includes(windowSizeTag)
                    ? {
                        gap: "0px",
                        padding: "0px 5px",
                      }
                    : {
                        gap: "10px",
                        padding: "0px 10px",
                      }
                }
              >
                <span
                  className="duration-text"
                  style={{
                    transform: ["Widget-mobile", "Widget-button"].includes(
                      windowSizeTag
                    )
                      ? "scale(0.7)"
                      : "scale(1)",
                  }}
                >
                  {parseInt(currentTime.toFixed(0))} / {duration} sec
                </span>
                <button
                  onClick={handleSpeedChange}
                  className="speed-btn"
                  style={{
                    transform: ["Widget-mobile", "Widget-button"].includes(
                      windowSizeTag
                    )
                      ? "scale(0.7)"
                      : "scale(1)",
                  }}
                >
                  {playbackSpeed}x
                </button>

                <button
                  onClick={handleVolume}
                  className="volume-control"
                  style={{
                    transform: ["Widget-mobile", "Widget-button"].includes(
                      windowSizeTag
                    )
                      ? "scale(0.7)"
                      : "scale(1)",
                  }}
                >
                  <img
                    src={icons[isMute ? "volumeOff" : "volumeOn"]}
                    alt=""
                    className="fit-image w-20 h-20 "
                  />
                </button>
                {!["Widget-mobile", "Widget-button"].includes(
                  windowSizeTag
                ) && (
                  <button
                    onClick={() => videoRef.current.requestFullscreen()}
                    className="full-screen-btn me-10"
                  >
                    <img
                      src={icons.fitView}
                      alt=""
                      className="fir-image"
                      style={{ filter: creteImgFilter("#ffffff") }}
                    />
                  </button>
                )}
              </div>
            </div>
            <div
              className={
                windowSizeTag === "desktop"
                  ? "flow-ai-video-logo-desktop"
                  : "flow-ai-video-logo-tablet"
              }
              style={{
                background: `rgba(${hexToRgb(flowStyle.primary_color)}, 0.6)`,
              }}
            >
              <div
                className="text-14-500"
                style={{
                  color: "white",
                  fontSize: "12px",
                  fontFamily: `${flowStyle.font}`,
                  lineHeight: "1",
                }}
              >
                {t("Powered_by")}
              </div>
              <div
                className="text-20-800"
                style={{ color: "white", lineHeight: "1" }}
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

                  paddingLeft: ["Widget-mobile", "Widget-button"].includes(
                    windowSizeTag
                  )
                    ? "10px"
                    : "50px",
                  paddingRight: ["Widget-mobile", "Widget-button"].includes(
                    windowSizeTag
                  )
                    ? "10px"
                    : "20px",
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
