import React from "react";
import "./ShareModal.scss";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { icons } from "../../../../../../utils/constants";

const ShareModal = ({ show, handleClose }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  return (
    <Modal show={show} onHide={handleClose} centered className="shareModal">
      <Modal.Header closeButton>
        <div className="text-24-700" style={{ color: "#1B2559" }}>
          Share
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="text-11-600 mb-7">Share individual answer</div>

          <div>
            <div className="input-group mb-10">
              <input
                type="text"
                className="form-control"
                style={{
                  borderRight: "0px",

                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              />
              <div className="input-group-append pointer">
                <span
                  className="input-group-text"
                  style={{
                    borderLeft: "0px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                >
                  <img src={icons.copyIcon} alt="Copy Icon" />
                </span>
              </div>
            </div>
          </div>
          <div className="text-11-600 mb-7">Share entire conversation</div>

          <div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                style={{
                  borderRight: "0px",

                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              />
              <div className="input-group-append pointer">
                <span
                  className="input-group-text"
                  style={{
                    borderLeft: "0px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                >
                  <img src={icons.copyIcon} alt="Copy Icon" />
                </span>
              </div>
            </div>
          </div>
          <div className="text-11-600 mb-7">
            Share all conversations(from lead generation)
          </div>

          <div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                style={{
                  borderRight: "0px",

                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              />
              <div className="input-group-append pointer">
                <span
                  className="input-group-text"
                  style={{
                    borderLeft: "0px",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                >
                  <img src={icons.copyIcon} alt="Copy Icon" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            onClick={handleClose}
            iconColor="#ffffff"
            style={{
              background: `linear-gradient(to right, ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
              border: "none",
              color: "white",
              width: "150px",
            }}
            className="text-14-500"
          >
            Done
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
