import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { creteImgFilter } from "../../../../utils/helpers";
import { icons } from "../../../../utils/constants";

function AudioUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4, video/avchd, video/mpc, audio/aac",
    onDrop: (acceptedFiles) => {
      if (!file) {
        setFile(acceptedFiles[0]);
        uploadFile(acceptedFiles[0]);
      }
    },
  });
  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
  };
  const uploadFile = (file) => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  return (
    <div className="audio-container">
      <div
        {...getRootProps({ className: "upload-box" })}
        style={file ? { cursor: "not-allowed" } : {}}
      >
        {!file && <input {...getInputProps()} />}
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
      {file && (
        <div className="footer text-12-600" style={{ color: "#666666" }}>
          <div>Uploading - 1/1 files</div>
          <div>Max Limit: 3MB</div>
        </div>
      )}
      {file && (
        <div className="fileProgressContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="text-14-500" style={{ color: "#1B2559" }}>
              {file.name}
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
