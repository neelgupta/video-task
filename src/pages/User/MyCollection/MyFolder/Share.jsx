import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { addWhitenessToHex, creteImgFilter } from "../../../../utils/helpers";
import { icons } from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import { showSuccess, throwError } from "../../../../store/globalSlice";

function Share({ show, handleClose, shareUrl }) {
  const dispatch = useDispatch();
  const [selectOption, setSelectOption] = useState("");
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
              <div
                className="w-80 h-80 f-center share-option"
                style={{
                  background: addWhitenessToHex(
                    selectOption === "embed" ? "#8000ff" : "#000000",
                    0.9
                  ),
                  border: `1px solid ${
                    selectOption === "embed" ? "#8000ff" : "#000000"
                  }`,
                }}
                onClick={() => {
                  setSelectOption("embed");
                }}
              >
                <img
                  src={icons.html}
                  alt=""
                  className="fit-image w-70"
                  style={{
                    filter: creteImgFilter(
                      selectOption === "embed" ? "#8000ff" : "#000000"
                    ),
                  }}
                />
              </div>
              <div
                className="w-80 h-80 f-center share-option"
                style={{
                  background: addWhitenessToHex(
                    selectOption === "link" ? "#8000ff" : "#000000",
                    0.9
                  ),
                  border: `1px solid ${
                    selectOption === "link" ? "#8000ff" : "#000000"
                  }`,
                }}
                onClick={() => {
                  setSelectOption("link");
                }}
              >
                <img
                  src={icons.link}
                  alt=""
                  className="fit-image w-50"
                  style={{
                    filter: creteImgFilter(
                      selectOption === "link" ? "#8000ff" : "#000000"
                    ),
                  }}
                />
              </div>
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
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default Share;
