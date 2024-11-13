import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./AddEditContactModal.scss";

const AddEditContactModal = ({ show, handleClose, isEdit }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="editContactDetailsContainer"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-24-700 text-center" style={{ color: "#1B2559" }}>
            {isEdit ? "Edit Contact Details" : "Add Contact Details"}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bodyContainer">
          <div className="form-items">
            <div className="text-16-500 mb-5">Name:</div>
            <div>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter Name"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
              />
            </div>
          </div>
          <div className="form-items">
            <div className="text-16-500 mb-5">Email (Required):</div>
            <div>
              <input
                type="email"
                className="form-control rounded-3"
                placeholder="Enter Email"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
              />
            </div>
          </div>
          <div className="form-items">
            <div className="text-16-500 mb-5">Phone Number:</div>
            <div>
              <input
                type="number"
                className="form-control rounded-3"
                placeholder="Enter Phone Number"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="px-40" variant="secondary">
          Cancel
        </Button>
        {isEdit ? (
          <Button className="px-40">Update</Button>
        ) : (
          <Button className="px-40">Create</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditContactModal;
