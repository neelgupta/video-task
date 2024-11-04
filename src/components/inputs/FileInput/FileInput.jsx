import { icons } from "../../../utils/constants";
import Label from "../Label";
import "./FileInput.scss";

const FileInput = ({ label, required, labelClass, value, placeholder }) => {
  return (
    <div id="fileinput-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <div className="file-input-block">
        {value ? (
          <span className="text-16-500 color-1923 un">
            {value || "logo-image.png"}
          </span>
        ) : (
          <span className="text-16-400 color-757f un">
            {placeholder || "Select file"}
          </span>
        )}
        <span className="d-flex pointer position-relative">
          <img
            src={icons.fileUpload}
            alt="fileUpload"
            className="d-flex h-18 w-18"
          />
          <input type="file" className="file_upload" onChange={() => {}} />
        </span>
      </div>
    </div>
  );
};

export default FileInput;
