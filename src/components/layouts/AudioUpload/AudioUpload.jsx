import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./AudioUpload.scss";
import { creteImgFilter } from "../../../utils/helpers";
import { icons } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { throwError } from "../../../store/globalSlice";
function AudioUpload({ audio, setAudio }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const audioFile = acceptedFiles[0];
      const { size, type } = audioFile;
      if (parseInt(size / 1024 / 1024) > 4) {
        dispatch(throwError("File size must be less than 4 MB."));
        return;
      }
      if (!audio) {
        if (!["audio/mpeg", "audio/wav", "audio/ogg"].includes(type)) {
          dispatch(throwError("File type is not valid"));
          return;
        }
        setAudio(acceptedFiles[0]);
        uploadFile();
      }
    },
  });
  const handleRemoveFile = () => {
    setAudio(null);
    setUploadProgress(0);
  };
  const uploadFile = () => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 10);
  };

  return (
    <div className="audio-container">
      <div
        {...getRootProps({ className: "upload-box" })}
        style={audio ? { cursor: "not-allowed" } : {}}
      >
        {!audio && <input {...getInputProps()} />}
        <img
          src={icons.Upload}
          alt="Upload Icon"
          className="fit-image upload-icon"
          style={{ filter: creteImgFilter("#6C5ECB") }}
        />
        <p className="upload-text">
          <strong>Drag & drop files or </strong>
          <span className="browse">Browse</span>
        </p>
        <p className="supported-formats">Supported formats MP3</p>
      </div>
      {audio && (
        <div className="footer text-12-600" style={{ color: "#666666" }}>
          <div>Uploading - 1/1 files</div>
          <div>Max Limit: 3MB</div>
        </div>
      )}
      {audio && (
        <div className="fileProgressContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="text-14-500" style={{ color: "#1B2559" }}>
              {audio.name}
            </span>
            <button className="removeFileButton" onClick={handleRemoveFile}>
              <img src={icons.close} alt="" className="fit-image w-10" />
            </button>
          </div>
          <div className="progressBar">
            <div
              className="progress"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioUpload;
