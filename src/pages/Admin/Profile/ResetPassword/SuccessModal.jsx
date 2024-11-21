import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./SuccessModal.scss";

const SuccessModal = ({ show, handleClose, title, message }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="successModal"
      style={{ borderRadius: "30px" }}
    >
      <Modal.Body className={`modalBody text-center`}>
        <div
          className="checkmarkCircle"
          style={{ width: "80px", height: "80px", background: "#27AE60" }}
        >
          <svg
            width="40"
            height="30"
            viewBox="0 0 44 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 21.2344L14.7715 32.0059L40.6232 4"
              stroke="white"
              strokeWidth="6.46291"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <div className="text-23-700 mb-20" style={{ color: "#27AE60" }}>
            {title || "SUCCESS"}
          </div>
          {!message ? (
            <>
              <div className="text-15-600">Your password has been updated.</div>
              <div className="text-15-400">
                Login again to continue to the portal.
              </div>
            </>
          ) : (
            <div className="text-15-400">{message}</div>
          )}
        </div>

        <Button className="continueButton" onClick={handleClose}>
          Continue
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
