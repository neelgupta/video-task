import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./AudioUpload.scss";
import { addWhitenessToHex, creteImgFilter } from "../../../utils/helpers";
import { icons } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { throwError } from "../../../store/globalSlice";
import { useTranslation } from "react-i18next";
function AudioUpload({ audio, setAudio, flowStyle }) {
  const { t } = useTranslation();
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const audioFile = acceptedFiles[0];
      const { size, type } = audioFile;
      if (parseInt(size / 1024 / 1024) > 4) {
        dispatch(throwError(t("audioUpload.fileSizeError")));
        return;
      }
      if (!audio) {
        if (!["audio/mpeg", "audio/wav", "audio/ogg"].includes(type)) {
          dispatch(throwError(t("audioUpload.fileTypeError")));
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
        style={{
          ...(audio ? { cursor: "not-allowed" } : {}),
          ...(flowStyle?.primary_color
            ? {
                border: `2px dashed ${flowStyle?.primary_color}`,
                background: addWhitenessToHex(flowStyle?.primary_color, 0.95),
              }
            : {
                border: "2px dashed #6c5eca",
                background: addWhitenessToHex("#6c5eca", 0.95),
              }),
        }}
      >
        {!audio && <input {...getInputProps()} />}
        <img
          src={icons.Upload}
          alt="Upload Icon"
          className="fit-image upload-icon"
          style={{
            filter: creteImgFilter(flowStyle?.primary_color || "#6C5ECB"),
          }}
        />
        <p className="upload-text">
          <strong
            style={{
              ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
            }}
          >
            {t("audioUpload.Drag_&_drop_files_or")}{" "}
          </strong>
          <span
            className="browse"
            style={{
              ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
              color: flowStyle?.primary_color || "#6c5eca",
            }}
          >
            {t("audioUpload.Browse")}
          </span>
        </p>
        <p
          className="supported-formats"
          style={{
            ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
          }}
        >
          {t("audioUpload.Supported_formats_MP3")}
        </p>
      </div>
      {audio && (
        <div className="footer text-14-500" style={{ color: "#666666" }}>
          <div
            style={{
              ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
            }}
          >
            {t("audioUpload.Uploading_files")}
          </div>
          <div
            style={{
              ...(flowStyle?.font ? { fontFamily: `${flowStyle.font}` } : {}),
            }}
          >
            {t("audioUpload.Max_limit")}
          </div>
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
}

export default AudioUpload;
