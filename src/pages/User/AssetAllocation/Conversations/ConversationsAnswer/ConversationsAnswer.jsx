import React, { useEffect, useRef, useState } from "react";
import "./ConversationsAnswer.scss";
import { icons } from "../../../../../utils/constants";
import dayjs from "dayjs";
import { VideoPlayer } from "../../../../../components";
import { creteImgFilter } from "../../../../../utils/helpers";
function ConversationsAnswer({ selectMetingCard }) {
  console.log("selectMetingCard", selectMetingCard);
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
              <div>
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
            {nodeDetails.answer_format.choices.length > 0 &&
              nodeDetails.answer_format.choices.map((choice, index) => {
                return (
                  <div
                    className={`option ${
                      answer_details.answer.includes(choice) && "active-option"
                    }`}
                    key={index}
                  >
                    <div
                      className="d-flex"
                      style={{ alignItems: "center", gap: "10px" }}
                    >
                      {answer_details.answer.includes(choice) && (
                        <div className="option-label"></div>
                      )}
                      <div>{choice}</div>
                    </div>
                    {answer_details.answer.includes(choice) && (
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
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioUrl) {
      audioRef.current.src = audioUrl;
    }
  });
  return (
    <div className="answer-audio-player-box">
      <audio className="answer-audio-player" ref={audioRef} controls>
        Your browser does not support the audio element.
      </audio>
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
