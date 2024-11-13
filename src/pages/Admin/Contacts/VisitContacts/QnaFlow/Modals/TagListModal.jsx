import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { icons } from "../../../../../../utils/constants";
import "./TagListModal.scss";

const TagListModal = ({ show, handleClose }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  return (
    <Modal show={show} onHide={handleClose} centered className="tagListModal">
      <Modal.Header closeButton>
        <div className="d-flex gap-2">
          <div className={`pointer h-30 w-30}`}>
            <img src={icons.avatar} alt="avatar" className="fit-image" />
          </div>
          <div className="text-20-600" style={{ color: "#1B2559" }}>
            Tag Billy Bil
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="search-container wp-70">
            <img
              src={icons.search}
              alt="search"
              className="icon-color-1B2559"
              style={{ width: "14px", height: "14px" }}
            />
            <input type="text" placeholder="Search" />
          </div>
          <div className="text-11-600 mb-10">Recent:</div>
          <div className="d-flex gap-3 align-items-center">
            <div
              style={{
                width: "85%",
              }}
            >
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter Tag Name"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
              />
            </div>
            <div className="d-flex gap-2 mt-2">
              <div>
                <img
                  src={icons.editIcon}
                  alt="Edit icon"
                  style={{ height: "17px" }}
                />
              </div>
              <div>
                <img
                  src={icons.deleteIcon}
                  alt="Trash icon"
                  style={{ height: "19px" }}
                />
              </div>
            </div>
          </div>
          <div
            className="text-12-600 mt-2 text-end pointer"
            style={{ width: "85%", color: "#7B5AFF" }}
          >
            + New Tag
          </div>
          <div className="text-11-600 mb-10">Post:</div>
          {[1, 2, 3].map((ele, idx) => (
            <div key={idx} className="d-flex gap-3 align-items-center mb-5">
              <div
                style={{
                  width: "85%",
                }}
              >
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Enter Tag Name"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "12px",
                  }}
                />
              </div>
              <div className="d-flex gap-2">
                <div>
                  <img
                    src={icons.editIcon}
                    alt="Edit icon"
                    style={{ height: "17px" }}
                  />
                </div>
                <div>
                  <img
                    src={icons.deleteIcon}
                    alt="Trash icon"
                    style={{ height: "19px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            onClick={() => {}}
            iconColor="#ffffff"
            style={{
              background: `linear-gradient(180deg , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
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

export default TagListModal;
