import { useState } from "react";
import "./FileUpload.scss";
const FileUpload = ({
  fileType,
  label,
  // isRequired,
  // labelClass,
  error,
  onChange,
  id,
  fileText,
  btnText,
  placeholder,
  multiple = false,
  onRemoveFile = () => {},
}) => {
  const [dragging, setDragging] = useState(false);
  const handleFileChange = (event) => {
    onChange(id, multiple ? event.target.files : event.target.files[0]);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    onChange(
      id,
      multiple ? event.dataTransfer.files : event.dataTransfer.files[0]
    );
  };

  const acceptFileType = (fileType) => {
    let returnValue = "";
    switch (fileType) {
      case "image":
        returnValue = "image/png, image/jpeg, image/jpg";
        break;
      case "file":
        returnValue = "";
        break;
      case "all":
        returnValue = "";
        break;
      case "pdf":
        returnValue = "application/pdf";
        break;
      case "pdf&doc":
        returnValue =
          "application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;

      default:
        returnValue = "";
        break;
    }
    return returnValue;
  };
  const inputFileType = acceptFileType(fileType || "");

  return (
    <div className="w-100">
      {label && (
        <>
          {/* <Label label={label} required={isRequired} className={labelClass} /> */}
        </>
      )}
      <div className="file-upload-and-drag-container">
        <div
          className={`file-drop-area ${dragging ? "dragging" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {fileText ? (
            <div className="file-name-block">
              <p className="mb-0">{fileText}</p>
              <span className="delete-img" onClick={onRemoveFile}>
                {/* <img src={icons.trash} className="fit-image" alt="delete" /> */}
              </span>
            </div>
          ) : (
            <div className="fb-center flex-nowrap w-100 cpe-5">
              <span className="place-holder flex-grow-1 overflow-hidden text-nowrap">
                {placeholder}
              </span>
              <button className=" btn-upload text-16-400 pointer text-nowrap">
                {btnText}
              </button>
            </div>
          )}
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
            accept={inputFileType}
            disabled={fileText}
            multiple={multiple}
          />
        </div>
      </div>
      {error && (
        <span className="text-14-400 pt-1 d-flex align-items-center gap-2 color-dc35">
          {error}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
