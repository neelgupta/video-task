import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./UpdateTagsModal.scss";
import { icons } from "../../../../../../utils/constants";

const UpdateTagsModal = ({ show, handleClose }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  return (
    <Modal show={show} onHide={handleClose} centered className="updateTagModal">
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
          <div className="text-11-600">Update Tag:</div>
          <div>
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
          >
            Update
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTagsModal;