import React, { useRef } from "react";
import "./NotFoundErrorPage.scss";
import {
  setWebcamModelConfig,
  throwError,
} from "../../../../../store/globalSlice";
import { useDispatch } from "react-redux";
const acceptVideoTypes = ["mp4", "avchd", "mpc", "aac"];
function NotFoundErrorPage({
  errorText,
  setMediaUrl,
  setIsUpload,
  setPermissionsGranted,
  setDeviceError,
}) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Validate file type
      if (!acceptVideoTypes.includes(fileExtension)) {
        dispatch(
          throwError(
            `Invalid file type. Please upload a file of type: ${acceptVideoTypes.join(
              ", "
            )}.`
          )
        );
        return;
      }

      // Validate file size (4MB = 4 * 1024 * 1024 bytes)
      if (file.size > 4 * 1024 * 1024) {
        dispatch(
          throwError(`File size exceeds 4MB. Please upload a smaller file.`)
        );
        return;
      }
      console.log("Valid file:", file);
      const mediaBlobUrl = URL.createObjectURL(file);
      console.log("mediaBlobUrl", mediaBlobUrl);
      setMediaUrl(mediaBlobUrl);
      setIsUpload(true);
      setPermissionsGranted(true);
      setDeviceError("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="error-container">
      <h1 className="text-26-600 pb-30" style={{ color: "#1B2559" }}>
        {errorText}
      </h1>
      <h2 style={{ color: "#444444" }}>How to fix?</h2>
      <ol className="error-steps">
        <li>Connect a webcam.</li>
        <li>Check that your webcam is working.</li>
        <li>Restart device.</li>
      </ol>
      <p>Or...</p>
      <button className="upload-button" onClick={triggerFileInput}>
        ⬆ Upload a video file
      </button>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <p className="file-note">Max file size: 4MB</p>
      <button
        className="go-back-button"
        onClick={() => {
          dispatch(
            setWebcamModelConfig({
              isShow: false,
              blobFile: null,
              blobUrl: "",
            })
          );
        }}
      >
        ← Go back
      </button>
      <p className="help-text">
        <span className="error-details">
          NotFoundError - Requested device not found <br />
          CHROME - LINUX - DEVICE_NOT_FOUND_ERROR <br />
          Occurrence ID - 7c9562e7-fce5-4318-80db-237ede9e8cf2
        </span>
      </p>
    </div>
  );
}

export default NotFoundErrorPage;
