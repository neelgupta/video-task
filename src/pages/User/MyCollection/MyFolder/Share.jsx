import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { addWhitenessToHex, creteImgFilter } from "../../../../utils/helpers";
import { icons } from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import { showSuccess, throwError } from "../../../../store/globalSlice";
import Editor from "@monaco-editor/react";

function Share({ show, handleClose, shareUrl }) {
  const dispatch = useDispatch();
  const [selectOption, setSelectOption] = useState("link");
  const code = `<iframe
  src="https://www.videoask.com/f9fc0hjmg"
  allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
  width="100%"
  height="600px"
  style="border: none; border-radius: 24px"
></iframe>`;
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      dispatch(showSuccess("Copied to clipboard!"));
    } catch (err) {
      dispatch(throwError("Failed to copy password. Please try again."));
    }
  };
  return (
    <Modal
      show={show}
      backdrop="static"
      onHide={handleClose}
      className="share-live-url-container"
      centered
    >
      <div className="p-30">
        <Modal.Header closeButton className="p-0 share-live-url-header">
          <div className="text-20-600" style={{ color: "#1B2559" }}>
            Share
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="share-live-url-content">
            <div className="mb-20 share-option-container">
              <ShareOption
                option="embed"
                currentOption={selectOption}
                icon={icons.html}
                onClick={() => setSelectOption("embed")}
              />
              <ShareOption
                option="link"
                currentOption={selectOption}
                icon={icons.link}
                onClick={() => setSelectOption("link")}
              />
            </div>
            {selectOption === "link" && (
              <div className="copyInput">
                <div
                  className={`text-12-600 mb-5`}
                  style={{ color: "#666666" }}
                >
                  Flow-AI link :
                </div>
                <div className="wp-100 InputBox">
                  <div className="share-icon">
                    <img
                      src={icons.link}
                      alt=""
                      className="fit-image w-25"
                      // style={{ filter: creteImgFilter("#8000ff") }}
                    />
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={shareUrl}
                    placeholder="Enter title"
                    className=""
                  />

                  <Button className="copy-btn" onClick={handleCopyText}>
                    <div>Copy</div>
                    <img
                      src={icons.copy}
                      alt=""
                      className="fit-image w-25"
                      style={{ filter: creteImgFilter("#ffffff") }}
                    />
                  </Button>
                </div>
              </div>
            )}
            {selectOption === "embed" && (
              <Editor
                height="300px" // Editor height
                defaultLanguage="html" // Language mode
                value={code} // Code to display
                options={{
                  readOnly: true, // Makes the editor read-only
                  domReadOnly: true, // Ensures no DOM-level edits
                  minimap: { enabled: true }, // Hides the minimap
                  lineNumbers: "on", // Enables line numbers
                  scrollBeyondLastLine: false, // Avoid scrolling beyond the last line
                  copyWithSyntaxHighlighting: true, // Copies code with syntax highlighting
                  renderWhitespace: "all", // Optionally renders whitespace
                  fontSize: 12, // Adjust font size
                  fontFamily: "JetBrains Mono, monospace", // Custom font
                  wordWrap: "on", // Enables word wrap
                }}
              />
            )}
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default Share;

const ShareOption = ({ option, currentOption, icon, onClick }) => {
  const isSelected = currentOption === option;
  const color = isSelected ? "#8000ff" : "#000000";

  return (
    <div
      className="w-80 h-80 f-center share-option"
      style={{
        background: addWhitenessToHex(color, isSelected ? 0.9 : 0.95),
        border: `1px solid ${color}`,
      }}
      onClick={onClick}
    >
      <img
        src={icon}
        alt=""
        className="fit-image w-60 h-60"
        style={{ filter: creteImgFilter(color) }}
      />
    </div>
  );
};
