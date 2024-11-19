import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import "./AudioUpload.scss";
const AudioUpload = () => {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "audio/mp3",
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      setFile(acceptedFiles[0]);
    },
  });

  return (
    <div className="AudioUpload-container">
      <div {...getRootProps({ className: "upload-box" })}>
        <input {...getInputProps()} />
        <img
          src={icons.Upload}
          alt="Upload Icon"
          className="fit-image upload-icon"
          style={{ filter: creteImgFilter("#6C5ECB") }}
        />
        <p className="supported-formats">Supported formats MP3</p>
      </div>
    </div>
  );
};

export default AudioUpload;
