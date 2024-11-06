/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
// import FileUpload from "../../../../components/inputs/FileUpload/FileUpload";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import "./uploadVideo.scss";
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";
import Button from "../../../../components/inputs/Button";
import { Tooltip } from "react-tooltip";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Switch } from "../../../../components";

const UploadVideo = ({ onBack }) => {
  const [fit, setFit] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pushedAt, setPushedAt] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("Untitled"); // for video title
  // Toggle video size between full-fit and ratio mode
  const toggleFit = () => {
    setFit(!fit);
  };

  // Update playback speed and apply to video
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Toggle play/pause state
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update current time as the video plays
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setPushedAt(videoRef.current.currentTime);
    }
  };

  // Set total duration when video metadata is loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setTotalDuration(videoRef.current.duration);
    }
  };
  // Show play button when video ends
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  // Toggle mute/unmute state
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleBackButton = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };
  return (
    <>
      <div className="row g-0 hp-100 upload-bock">
        {/* left section */}
        <div className="col-md-6 d-md-block d-none bg-0000">
          <div className={`video-section `}>
            {!isPlaying && <div className="video-overlay"></div>}
            {/* playback manage */}
            <div className="playback-section">
              <div className="time-display color-ffff text-16-500">
                {pushedAt.toFixed(2)} / {totalDuration.toFixed(2)}
              </div>
              {isMuted ? (
                <button className="mute-button" onClick={toggleMute}>
                  <GoUnmute color="#ffffff" size={20} />
                </button>
              ) : (
                <button className="mute-button active" onClick={toggleMute}>
                  <BiVolumeMute color="#000000" size={20} />{" "}
                </button>
              )}
              {
                {
                  1: (
                    <button
                      className="manage-speed"
                      onClick={() => handleSpeedChange(1.5)}
                    >
                      1x
                    </button>
                  ),
                  1.5: (
                    <button
                      className="manage-speed active"
                      onClick={() => handleSpeedChange(2)}
                    >
                      1.5x
                    </button>
                  ),
                  2: (
                    <button
                      className="manage-speed active"
                      onClick={() => handleSpeedChange(1)}
                    >
                      2x
                    </button>
                  ),
                }[playbackSpeed]
              }
            </div>
            {title && (
              <div className="overlay-text">
                <img
                  src={icons.close}
                  alt="close"
                  className="fit-image h-18 w-18 pointer d-block "
                  style={{
                    filter: creteImgFilter("#8000ff"),
                  }}
                  onClick={() => setTitle("")}
                />
                <p className="text-40-500 color-ffff">{title}</p>
              </div>
            )}
            {videoSrc && (
              <div className={fit ? "fit" : "ratio"}>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="video"
                  onClick={togglePlayPause}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnd}
                ></video>
              </div>
            )}
            {!isPlaying && (
              <button className="play-button" onClick={togglePlayPause}>
                <svg
                  fill="none"
                  height="96"
                  width="96"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48z"
                    fill="#fff"
                    fillRule="evenodd"
                  ></path>
                  <path
                    clipRule="evenodd"
                    d="M37.326 33.822c0-2.408 2.695-3.835 4.687-2.481l20.862 14.178c1.752 1.19 1.752 3.772 0 4.963L42.013 64.66c-1.992 1.354-4.687-.072-4.687-2.48V33.821z"
                    fill="#000"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* right section */}
        <div className="col-md-6">
          <div className="d-flex flex-column hp-100">
            <div className="flex-grow-1 px-40 py-50">
              {step === 1 && <FileUploadBox setVideo={setVideoSrc} />}
              {step === 2 && (
                <>
                  <form className="form-content">
                    <label
                      htmlFor="video-title"
                      className="ms-4 text-18-500 mb-2"
                    >
                      Overlay text:
                    </label>
                    <div className="form-fields-card">
                      <textarea
                        id="video-title"
                        className="box-text-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add overlay text here... (optional)"
                      />
                    </div>
                    <div className="form-fields-card">
                      <p
                        className="mb-0 fa-center gap-2 text-15-500 py-13 "
                        data-tooltip-id={`tooltip-fit-video`}
                        data-tooltip-content={
                          "Always makes sure the entire video is shown by disabling auto- cropping. Warning: This will result in letterboxing."
                        }
                      >
                        <span>Fit video</span>
                        <AiFillQuestionCircle size={20} />
                      </p>
                      <Tooltip className="tooltip" id={`tooltip-fit-video`} />
                      <div>
                        <Switch isChecked={fit} onChange={toggleFit} />
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
            <div className="d-flex mt-auto">
              <button onClick={handleBackButton} className="btn-back ">
                <img
                  src={icons.lArrow}
                  className="w-22 h-22"
                  style={{
                    filter: creteImgFilter("#ffffff"),
                  }}
                />
                Back
              </button>
              <button
                onClick={() => {
                  setStep((prev) => prev + 1);
                }}
                className="btn-next "
              >
                Continue{" "}
                <img
                  src={icons.rArrow}
                  className="w-22 h-22"
                  style={{
                    filter: creteImgFilter("#ffffff"),
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FileUploadBox = ({ setVideo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      setVideo(files);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video")) {
      const blobUrl = URL.createObjectURL(file);
      setVideo(blobUrl);
    }
  };

  return (
    <div
      style={{
        border: isDragging ? "2px dashed #4a90e2" : "2px dashed #ccc",
        borderRadius: "8px",
        padding: "40px",
        textAlign: "center",
        width: "100%",
        margin: "0 auto",
        cursor: "pointer",
        backgroundColor: "#8080800a",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        style={{ cursor: "pointer", display: "block" }}
      >
        <div className="f-center gap-4 flex-nowrap ">
          <div>
            <Button
              btnStyle={"PD"}
              btnText={"Choose a file"}
              onClick={() => document.getElementById("file-upload").click()}
            />
          </div>

          <p
            style={{
              color: isDragging ? "#4a90e2" : "#999",
              margin: "0px",
            }}
          >
            OR
          </p>
          <p
            style={{
              color: isDragging ? "#4a90e2" : "#999",
              margin: "0px",
            }}
          >
            {" "}
            Drag & Drop here{" "}
          </p>
        </div>
      </label>
      <p className="text-16-500 mt-30">
        Works with .mp4, .mov & .webm. Max size 500MB!
      </p>
      <p
        className="text-15-500 f-center gap-1"
        data-tooltip-id={`tooltip-video`}
        data-tooltip-content={`VideoAsk will 'crop' your videos according to device screensize (unless you switch cropping off or are embedding in landscape dimensions).As a rule of thumb, it's always best to upload in landscape mode (1920x1080) to cover all cases, making sure the subject's eyes are always just above the center line and the main action is happening within the "portrait safe area.`}
      >
        <span>What resolution & ratio</span> <AiFillQuestionCircle size={20} />
      </p>
      <Tooltip className="tooltip" id={`tooltip-video`} />
    </div>
  );
};
export default UploadVideo;
