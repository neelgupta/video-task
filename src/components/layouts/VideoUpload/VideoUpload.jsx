import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./VideoUpload.scss"; // Make sure to create the CSS file for styling
import { creteImgFilter } from "../../../utils/helpers";
import { icons } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { throwError } from "../../../store/globalSlice";
const acceptVideoType = ["mp4", "avchd", "mpc", "aac"];
const VideoUpload = ({ setFileValue, videoFile }) => {
  const [file, setFile] = useState(videoFile ? videoFile : null);
  const [uploadProgress, setUploadProgress] = useState(videoFile ? 100 : 0);
  const dispatch = useDispatch();
  useEffect(() => {
    setFileValue && setFileValue(file);
    // eslint-disable-next-line
  }, [file]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (!file) {
        const selectedFile = acceptedFiles[0];
        const { size, type } = selectedFile;
        if (parseInt(size / 1024 / 1024) > 4) {
          dispatch(throwError("File size must be less than 4 MB."));
          return;
        }
        if (
          !acceptVideoType.includes(type.split("/")?.[1].toLocaleLowerCase())
        ) {
          dispatch(
            throwError(
              "Invalid file type. Please upload a file in one of the following formats: video/mp4, video/avchd, video/mpc, or audio/aac."
            )
          );
          return;
        }
        setFile(selectedFile);
        uploadFile(selectedFile);
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
    }, 10);
  };

  return (
    <div className="video-upload-container">
      <div
        {...getRootProps({ className: "upload-box" })}
        style={file ? { cursor: "not-allowed" } : {}}
      >
        {!file && <input {...getInputProps()} accept="video/*" />}
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
        <p className="supported-formats">
          Supported formats: MP4, AVCHD, MPC, AAC
        </p>
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
};

export default VideoUpload;
