import React from "react";
import "./MediaLibrary.scss";
import { Button, Modal } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import FileUpload from "../../../../FlowCanvas/Modals/VideoGen/FileUpload";

function UploadMedia({ onHide, show, isEdit }) {
  return (
    <Modal onHide={onHide} show={show} centered className="UploadMedia-Model">
      <Modal.Body>
        <div style={{ width: "600px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="wp-100"
          >
            <div className="text-24-700" style={{ color: "#1B2559" }}>
              Upload Media
            </div>
            <div className="w-20 pointer" onClick={onHide}>
              <img src={icons.close} alt="" className="fit-image" />
            </div>
          </div>
          <div
            className="text-12-500 mt-5"
            style={{ color: "#989BA1", textAlign: "start" }}
          >
            Add new team members to collaborate and achieve your goals together.
          </div>
          <div className="mt-30">
            <FileUpload />
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Title:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="Title"
                  id="Title"
                  placeholder="Title"
                />
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Description::
              </div>
              <div>
                <textarea
                  className="input wp-100"
                  name="Title"
                  id="Title"
                  placeholder="Descriptions"
                  rows={6}
                  //   style={{ resize: "none" }}
                />
              </div>
            </div>
          </div>
          <div
            className="wp-100"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              margin: "20px 0px",
            }}
          >
            <Button
              style={{
                background: "#8C8E90",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              className="text-14-500 w-150 p-10"
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button
              style={{
                background:
                  "linear-gradient(91.9deg, #7B5BFF -2.22%, #B3A1FF 101.51%)",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              className="text-14-500 w-150 p-10 ms-10"
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UploadMedia;
