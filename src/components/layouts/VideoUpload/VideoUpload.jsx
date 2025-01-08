import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./VideoUpload.scss"; // Make sure to create the CSS file for styling
import { addWhitenessToHex, creteImgFilter } from "../../../utils/helpers";
import { icons } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { throwError } from "../../../store/globalSlice";
import { useTranslation } from "react-i18next";
const acceptVideoType = ["mp4", "avchd", "mpc", "aac"];
const VideoUpload = ({ setFileValue, videoFile, flowStyle }) => {
  const { t } = useTranslation();
  const [uploadProgress, setUploadProgress] = useState(videoFile ? 100 : 0);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (!videoFile) {
        const selectedFile = acceptedFiles[0];
        const { size, type } = selectedFile;
        if (parseInt(size / 1024 / 1024) > 4) {
          dispatch(throwError(t("videoUpload.fileSizeError")));
          return;
        }
        if (
          !acceptVideoType.includes(type.split("/")?.[1].toLocaleLowerCase())
        ) {
          dispatch(throwError(t("videoUpload.fileTypeError")));
          return;
        }
        setFileValue(selectedFile);
        uploadFile();
      }
    },
  });
  const handleRemoveFile = () => {
    setFileValue(null);
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
    <div className="video-upload-container">
      <div
        {...getRootProps({ className: "upload-box" })}
        style={{
          ...(flowStyle?.primary_color
            ? {
                border: `2px dashed ${flowStyle?.primary_color}`,
                background: addWhitenessToHex(flowStyle?.primary_color, 0.95),
              }
            : {
                border: "2px dashed #6c5eca",
                background: addWhitenessToHex("#6c5eca", 0.95),
              }),
          ...(videoFile ? { cursor: "not-allowed" } : {}),
        }}
      >
        {!videoFile && <input {...getInputProps()} accept="video/*" />}
        <img
          src={icons.Upload}
          alt="Upload Icon"
          className="fit-image upload-icon"
          style={{
            filter: creteImgFilter(
              flowStyle?.primary_color ? flowStyle.primary_color : "#6C5ECB"
            ),
          }}
        />
        <p className="upload-text">
          <strong
            style={{
              ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
            }}
          >
            {t("videoUpload.Drag_&_drop_files_or")}{" "}
          </strong>
          <span
            className="browse"
            style={{
              ...(flowStyle
                ? {
                    fontFamily: `${flowStyle.font}`,
                    color: flowStyle.primary_color,
                  }
                : {}),
            }}
          >
            {t("videoUpload.Browse")}
          </span>
        </p>
        <p
          className="supported-formats"
          style={{
            ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
          }}
        >
          {t("videoUpload.Supported_formats_MP4_AVCHD_MPC_AAC")}
        </p>
      </div>
      {videoFile && (
        <div className="footer text-14-500" style={{ color: "#666666" }}>
          <div
            style={{
              ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
            }}
          >
            {t("videoUpload.Uploading_files")}
          </div>
          <div
            style={{
              ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
            }}
          >
            {t("videoUpload.Max_limit")}
          </div>
        </div>
      )}
      {videoFile && (
        <div className="fileProgressContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="text-14-500" style={{ color: "#1B2559" }}>
              {videoFile.name}
            </span>
            <button className="removeFileButton" onClick={handleRemoveFile}>
              <img src={icons.close} alt="" className="fit-image w-10" />
            </button>
          </div>
          <div className="progressBar">
            <div
              className="progress"
              style={{
                width: `${uploadProgress}%`,
                background: flowStyle?.primary_color || "#7b5aff",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
