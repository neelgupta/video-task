import React, { useEffect, useRef, useState } from "react";
import "./ConversationsAnswer.scss";
import { icons } from "../../../../../utils/constants";
import dayjs from "dayjs";
import { VideoPlayer } from "../../../../../components";
import { creteImgFilter } from "../../../../../utils/helpers";
import WaveSurfer from "wavesurfer.js";

const npsColor = {
  1: "#D30027",
  2: "#EB0B0B",
  3: "#F13708",
  4: "#F87501",
  5: "#F8B300",
  6: "#F8DD00",
  7: "#CCDE0E",
  8: "#89D421",
  9: "#44BC38",
  10: "#12AD47",
};

function ConversationsAnswer({ selectMetingCard }) {
  const { node_answer_type, nodeDetails, answer_details } = selectMetingCard;
  const videoRef = useRef(null);
  const [isPlay, setIsPlay] = useState(true);
  useEffect(() => {
    if (node_answer_type === "open-ended" && answer_details?.type === "video") {
      videoRef.current.src = answer_details.answer;
      setIsPlay(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMetingCard]);

  const handelPlayVideo = () => {
    try {
      const video = videoRef.current;
      if (video) {
        if (isPlay) {
          setIsPlay(false);
          video.pause();
        } else {
          video.play().then(() => {
            setIsPlay(true);
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleVideoEnd = () => {
    const video = videoRef.current;
    setIsPlay(false);
    video.pause();
  };

  return (
    <div className="ConversationsAnswer-container">
      {node_answer_type === "open-ended" && (
        <>
          {answer_details?.type === "text" && (
            <div className="open-ended-text-box">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="ConversationsAnswer-icons-box">
                  <img src={icons.feedback} alt="" className="fit-image" />
                </div>
                <div className="answer-text">{answer_details.answer}</div>
              </div>
              <div className="text-10-400" style={{ color: "#888888" }}>
                {dayjs(answer_details?.createdAt).format("DD MMM YYYY | HH:mm")}
              </div>
              <DetailsComponent nodeDetails={nodeDetails} />
            </div>
          )}
          {answer_details?.type === "video" && (
            <div
              className="open-ended-video-box f-center"
              style={{ position: "relative" }}
              onClick={() => {
                handelPlayVideo();
              }}
            >
              {answer_details.answer && (
                <video
                  ref={videoRef}
                  className="answer-video"
                  autoPlay
                  onEnded={handleVideoEnd}
                  controls={false}
                />
              )}
              <div
                className="ConversationsAnswer-icons-box"
                style={{ position: "absolute", top: "10px", left: "10px" }}
              >
                <img
                  src={icons.feedback}
                  alt=""
                  className="fit-image"
                  style={{ filter: creteImgFilter("#ffffff") }}
                />
              </div>

              <div
                className="ConversationsAnswer-icons-box pointer"
                style={{
                  position: "absolute",
                  display: isPlay ? "none" : "block",
                  top: "45%",
                  left: "50%",
                  transform: "translate(-50% , -50%)",
                }}
              >
                <img
                  src={icons.pushIcon}
                  alt=""
                  className="fir-image"
                  style={{ filter: creteImgFilter("#ffffff") }}
                />
              </div>
              <DetailsComponent nodeDetails={nodeDetails} color={"#ffffff"} />
            </div>
          )}

          {answer_details?.type === "audio" && (
            <div className="open-ended-audio-box f-center">
              <div
                className="ConversationsAnswer-icons-box"
                style={{ position: "absolute", top: "10px", left: "10px" }}
              >
                <img
                  src={icons.feedback}
                  alt=""
                  className="fit-image"
                  style={{ filter: creteImgFilter("#000000") }}
                />
              </div>
              <div className="wp-80">
                <AudioPlayer audioUrl={answer_details.answer} />
              </div>
              <DetailsComponent nodeDetails={nodeDetails} color={"#000"} />
            </div>
          )}
        </>
      )}

      {node_answer_type === "multiple-choice" && (
        <div className="multiple-choice-box">
          <div
            className="ConversationsAnswer-icons-box"
            style={{ position: "absolute", top: "10px", left: "10px" }}
          >
            <img
              src={icons.feedback}
              alt=""
              className="fit-image"
              style={{ filter: creteImgFilter("#000000") }}
            />
          </div>
          <div className="option-box">
            {!!nodeDetails?.answer_format?.choices?.length &&
              nodeDetails?.answer_format?.choices.map((choice, index) => {
                return (
                  <div
                    className={`option ${
                      answer_details.answer.includes(choice?.option) &&
                      "active-option"
                    }`}
                    key={index}
                  >
                    <div
                      className="d-flex"
                      style={{ alignItems: "center", gap: "10px" }}
                    >
                      {answer_details.answer.includes(choice?.option) && (
                        <div className="option-label"></div>
                      )}
                      <div>{choice?.option}</div>
                    </div>
                    {answer_details.answer.includes(choice?.option) && (
                      <div className="w-30 h-30">
                        <img
                          src={icons.check}
                          alt=""
                          className="fir-image"
                          style={{ filter: creteImgFilter("#ffffff") }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <DetailsComponent nodeDetails={nodeDetails} />
        </div>
      )}

      {node_answer_type === "button" && (
        <div className="button-answer-box">
          <div
            className="ConversationsAnswer-icons-box"
            style={{ position: "absolute", top: "10px", left: "10px" }}
          >
            <img
              src={icons.feedback}
              alt=""
              className="fit-image"
              style={{ filter: creteImgFilter("#000000") }}
            />
          </div>
          <div className="answer-button">
            <div className="button-answer-label"></div>
            <div
              className="text-16-800"
              style={{ color: "white", textTransform: "uppercase" }}
            >
              Click
            </div>
            <div className="button-answer-icon">
              <img
                src={icons.check}
                alt=""
                className="fir-image w-30 h-30"
                style={{ filter: creteImgFilter("#ffffff") }}
              />
            </div>
          </div>
          <DetailsComponent nodeDetails={nodeDetails} />
        </div>
      )}

      {node_answer_type === "nps" && (
        <div className="nps-answer-box">
          <div
            className="ConversationsAnswer-icons-box"
            style={{ position: "absolute", top: "10px", left: "10px" }}
          >
            <img
              src={icons.feedback}
              alt=""
              className="fit-image"
              style={{ filter: creteImgFilter("#000000") }}
            />
          </div>
          <div className="nps-button-group">
            {(nodeDetails?.answer_format?.nps_choices || []).map((nps) => {
              const isBtnActive = nps.index === parseInt(answer_details.answer);
              return (
                <div
                  className={`nps-btn ${isBtnActive && "active-nps-btn"}`}
                  key={nps.index}
                  style={{ background: npsColor[nps.index] }}
                >
                  {nps.index}
                </div>
              );
            })}
          </div>
          <DetailsComponent nodeDetails={nodeDetails} />
        </div>
      )}

      {node_answer_type === "file-upload" && (
        <div className="file-upload-answer-box">
          <div
            className="ConversationsAnswer-icons-box"
            style={{ position: "absolute", top: "10px", left: "10px" }}
          >
            <img
              src={icons.feedback}
              alt=""
              className="fit-image"
              style={{ filter: creteImgFilter("#000000") }}
            />
          </div>
          <div
            style={{
              display: "flex",
              userSelect: "none",
            }}
          >
            <FileDisplay fileUrl={answer_details.answer} />
          </div>
          <DetailsComponent nodeDetails={nodeDetails} />
        </div>
      )}
    </div>
  );
}

export default ConversationsAnswer;

const DetailsComponent = ({ nodeDetails, color }) => {
  return (
    <div
      className="ConversationsAnswer-details"
      style={{ color: color || "#000000" }}
    >
      <div
        className="text-18-800"
        style={{ color: color || "#1B2559", textTransform: "capitalize" }}
      >
        {nodeDetails?.title || ""}
      </div>
      <div className="text-12-500" style={{ color: color || "#888888" }}>
        {dayjs(nodeDetails?.createdAt).format("DD MMM YYYY @ HH:mm")}
      </div>
    </div>
  );
};

const AudioPlayer = ({ audioUrl }) => {
  const waveSurferRef = useRef(null); // Reference to the Wavesurfer instance
  const containerRef = useRef(null); // Reference to the container where the waveform will be drawn
  const [volume, setVolume] = useState(1); // State to store volume level (range: 0 to 1)
  const [isPlay, setIsPlay] = useState(false);
  useEffect(() => {
    setIsPlay(false);
    // Initialize waveSurfer.js with custom options
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "white", // Color of the waveform
      progressColor: "hsl(261, 56%, 46%)", // Color of the progress
      cursorColor: "red", // Color of the cursor
      height: 100, // Height of the waveform
      barWidth: 1, // Width of bars if using 'bar' waveform type
      responsive: true,
      normalize: true, // Normalize audio volume
      backend: "MediaElement", // Audio backend (WebAudio or MediaElement)
      waveFormType: "bar", // Change to bar waveform
      cursorWidth: 2, // Make the cursor thicker
      minPxPerSec: 150, // Increase pixels per second for better resolution
      audioRate: 1.0, // Default playback rate
      hideScrollbar: true, // Hide scrollbar
      maxCanvasWidth: 1200, // Max width of the canvas
      pixelRatio: window.devicePixelRatio, // Set pixel ratio for retina displays
      progressives: true, // Progressive rendering
      partialRender: true, // Progressive rendering for large files
      preload: "auto", // Auto preload
      hideCursor: false, // Show the cursor while playing
      splitChannels: false, // Split stereo channels
    });

    // Load the audio file into waveSurfer
    waveSurfer.load(audioUrl);

    waveSurferRef.current = waveSurfer;

    waveSurfer.on("finish", () => {
      setIsPlay(false);
    });

    return () => {
      waveSurferRef.current.destroy();
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    const waveSurfer = waveSurferRef.current;
    if (waveSurfer.isPlaying()) {
      waveSurfer.pause();
      setIsPlay(false);
    } else {
      waveSurfer.play();
      setIsPlay(true);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const waveSurfer = waveSurferRef.current;
    waveSurfer.setVolume(newVolume);
  };

  const handelOnVolumeClick = () => {
    const newVolume = volume === 0 ? 1 : 0;
    setVolume(newVolume);
    const waveSurfer = waveSurferRef.current;
    waveSurfer.setVolume(newVolume);
  };

  return (
    <div className="audio-player-container">
      <div
        className="wp-100 hp-100"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: "60%",
            height: "120px",
            marginTop: "70px",
            position: "absolute",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <button onClick={handlePlayPause}>
          {isPlay ? (
            <img
              src={icons.play}
              alt=""
              className="fit-image w-30"
              style={{ filter: creteImgFilter("#ffffff") }}
            />
          ) : (
            <img
              src={icons.push}
              alt=""
              className="fit-image w-30"
              style={{ filter: creteImgFilter("#ffffff") }}
            />
          )}
        </button>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: "10px",
            padding: "5px 20px",
            borderRadius: "50px",
            background: "#9058f8",
            border: "2px solid white",
          }}
        >
          <label
            htmlFor="volume-slider w-25 "
            className="pointer"
            onClick={() => {
              handelOnVolumeClick();
            }}
          >
            <img
              src={icons.volumeOn}
              alt=""
              className="fit-image w-25"
              style={{ filter: creteImgFilter("#ffffff") }}
            />
          </label>
          <input
            type="range"
            id="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

const FileDisplay = ({ fileUrl }) => {
  // Utility function to get the file extension
  const getFileExtension = (url) => {
    const parts = url.split(".");
    return parts[parts.length - 1].toLowerCase();
  };

  // Define icons or styles for different file types
  const fileIcons = {
    pdf: "📄", // Emoji for simplicity, can be replaced with SVGs or icons
    mp4: "🎥",
    jpg: "🖼️",
    png: "🖼️",
    docx: "📃",
    default: "📁", // Default icon for unknown file types
  };
  const fileName = fileUrl.split("/").pop(); // Extract the file name
  const fileExtension = getFileExtension(fileUrl);
  const fileIcon = fileIcons[fileExtension] || fileIcons.default;

  const handleDownload = async () => {
    try {
      if (!fileUrl) return;
      // Fetch the video file from the URL
      const response = await fetch(fileUrl);

      // Ensure the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      // Get the video data as a Blob
      const videoBlob = await response.blob();

      // Create a URL for the Blob
      const videoUrl = URL.createObjectURL(videoBlob);

      // Create a download link and trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = `flow-ai.${fileExtension}`;
      downloadLink.click();

      URL.revokeObjectURL(videoUrl);
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  return (
    <div className="file-display-box">
      <div className="file-display-icon-box">
        <div className="file-icon">{fileIcon}</div>
        <div className="file-name">{fileName}</div>
      </div>
      <button className="file-download-btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};
