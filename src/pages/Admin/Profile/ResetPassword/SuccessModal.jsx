import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./SuccessModal.module.scss";

const SuccessModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className={styles.successModal}
    >
      <Modal.Body className={`${styles.modalBody} text-center`}>
        <div
          className={styles.checkmarkCircle}
          style={{ width: "100px", height: "100px", background: "#27AE60" }}
        >
          <svg
            width="44"
            height="36"
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
          <div className="text-23-700" style={{ color: "#27AE60" }}>
            SUCCESS
          </div>
          <div className="text-15-600">Your password has been updated.</div>
          <div className="text-15-400">
            Login again to continue to the portal.
          </div>
        </div>

        <Button className={styles.continueButton} onClick={handleClose}>
          Continue
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;
