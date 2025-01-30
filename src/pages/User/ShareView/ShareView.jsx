import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Editor from "@monaco-editor/react";
import "./ShareView.scss";
import { showSuccess, throwError } from "../../../store/globalSlice";
import { addWhitenessToHex, creteImgFilter } from "../../../utils/helpers";
import { icons } from "../../../utils/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EmbedShare from "./EmbedShare";
function ShareView({ show, handleClose, shareUrl }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      dispatch(showSuccess("Copied to clipboard!"));
    } catch (err) {
      dispatch(throwError("Failed to copy password. Please try again."));
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll('[aria-live="polite"]');

    // Iterate over the elements and set height to "unset"
    elements.forEach((element) => {
      element.style.height = "10px";
      element.style.margin = "0px";
      element.style.padding = "0px";
    });
  }, []);
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
          {selectedOption && (
            <div
              className="w-30 h-30 pointer fa-center"
              onClick={() => {
                setSelectedOption("");
              }}
            >
              <img src={icons.arrow_left} alt="" className="fit-image" />
            </div>
          )}

          <div className="text-20-600" style={{ color: "#1B2559" }}>
            {!selectedOption && "How would you like to share"}
            {selectedOption === "website" && "Embed in a website"}
          </div>
        </Modal.Header>
        <Modal.Body>
          {!selectedOption && (
            <div className="share-live-url-content">
              <div className="mb-20 share-option-container">
                <div
                  className="option-container"
                  onClick={() => {
                    setSelectedOption("website");
                  }}
                >
                  <div className="option-card-container">
                    <div className="card-header">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div
                      className="website-header"
                      style={{ margin: "0", padding: "0" }}
                    >
                      <Skeleton
                        height={5}
                        width={120}
                        baseColor="#f1f1f1"
                        highlightColor="rgba(0,0,0,0.1)"
                      />
                      <Skeleton
                        height={5}
                        width={80}
                        baseColor="#f1f1f1"
                        highlightColor="rgba(0,0,0,0.1)"
                      />
                    </div>
                    <div className="website-body">
                      <div className="embed-code-icon">
                        <img
                          src={icons.pushIcon}
                          alt=""
                          className="fit-image w-25 h-25 option-icon"
                          style={{ filter: "invert(100%)" }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <Skeleton
                          height={5}
                          width={80}
                          baseColor="#777"
                          highlightColor="#f1f1f1"
                        />
                        <Skeleton
                          height={5}
                          width={30}
                          baseColor="#777"
                          highlightColor="#f1f1f1"
                        />
                        <Skeleton
                          height={5}
                          width={10}
                          baseColor="#777"
                          highlightColor="#f1f1f1"
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0px 10px",
                          marginTop: "12px",
                        }}
                      >
                        <Skeleton
                          height={30}
                          width={40}
                          baseColor="lightgray"
                          highlightColor="#f1f1f1"
                        />

                        <Skeleton
                          height={30}
                          width={40}
                          baseColor="lightgray"
                          highlightColor="#f1f1f1"
                        />
                        <Skeleton
                          height={30}
                          width={40}
                          baseColor="lightgray"
                          highlightColor="#f1f1f1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="label-text">Embed in a website</div>
                </div>
              </div>
              <div className="divider"></div>
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
            </div>
          )}

          {selectedOption === "website" && <EmbedShare />}
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default ShareView;
