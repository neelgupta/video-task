import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./EditDetailsModal.scss";

const EditDetailsModal = ({ show, handleClose, userData }) => {
  const [form, setForm] = useState({
    user_name: "",
    email: "",
  });
  useEffect(() => {
    setForm({
      user_name: userData.user_name,
      email: userData.email,
    });
  }, [userData]);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="editDetailsModalContainer"
    >
      <Modal.Header closeButton>
        <div className="text-20-600" style={{ color: "#1B2559" }}>
          Edit Personal Details
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="form-group">
            <div className="text-11-600 mb-5">User Name</div>
            <div>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter Your User Name"
                value={form.user_name}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
                onChange={(e) => {
                  setForm({ ...form, user_name: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="form-group mt-20">
            <div className="text-11-600 mb-5">Registered Mail</div>
            <div>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter Your Registered Mail"
                value={form.email}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            style={{ width: "150px" }}
            variant="secondary"
            onClick={() => {
              handleClose();
              setForm({
                user_name: "",
                email: "",
              });
            }}
            className="text-14-500"
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {}}
            className="text-14-500"
            style={{
              background: `#7B5AFF`,
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

export default EditDetailsModal;
