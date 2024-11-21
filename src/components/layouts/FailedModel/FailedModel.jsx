import React from "react";
import "./FailedModel.scss";
import { Button, Modal } from "react-bootstrap";
function FailedModel({ show, handleClose, title, message }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="failedModal"
      style={{ borderRadius: "30px" }}
    >
      <Modal.Body className={`modalBody text-center`}>
        <div
          className="checkmarkCircle"
          style={{ width: "80px", height: "80px" }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.710996 4.13824C0.404292 3.83171 0.196815 3.47107 0.0885669 3.05635C-0.0196815 2.64162 -0.0287022 2.2269 0.0615048 1.81217C0.169753 1.37941 0.38625 1.00977 0.710996 0.703231C1.0177 0.396694 1.37853 0.189331 1.79348 0.081142C2.20843 -0.0270473 2.62339 -0.0270473 3.03834 0.081142C3.47133 0.189331 3.84118 0.396694 4.14789 0.703231L35.2964 31.8618C35.6211 32.1683 35.8286 32.5289 35.9188 32.9436C36.0271 33.3584 36.0271 33.7821 35.9188 34.2149C35.8286 34.6296 35.6211 34.9902 35.2964 35.2968C34.9897 35.6033 34.6289 35.8107 34.2139 35.9189C33.799 36.027 33.384 36.027 32.969 35.9189C32.5541 35.8107 32.1933 35.6033 31.8866 35.2968L0.710996 4.13824ZM0.710996 31.8618L31.8866 0.703231C32.1933 0.396694 32.5541 0.189331 32.969 0.081142C33.384 -0.0270473 33.799 -0.0270473 34.2139 0.081142C34.6289 0.189331 34.9897 0.396694 35.2964 0.703231C35.6211 1.00977 35.8286 1.37941 35.9188 1.81217C36.0271 2.2269 36.0271 2.64162 35.9188 3.05635C35.8286 3.47107 35.6211 3.83171 35.2964 4.13824L4.14789 35.2968C3.84118 35.6033 3.47133 35.8107 3.03834 35.9189C2.62339 36.027 2.20843 36.027 1.79348 35.9189C1.37853 35.8107 1.0177 35.6033 0.710996 35.2968C0.38625 34.9902 0.169753 34.6296 0.0615048 34.2149C-0.0287022 33.7821 -0.0196815 33.3584 0.0885669 32.9436C0.196815 32.5289 0.404292 32.1683 0.710996 31.8618Z"
              fill="white"
            />
          </svg>
        </div>

        <div>
          <div className="text-23-700 mb-20" style={{ color: "#f32e2e" }}>
            {title || "FAILED!"}
          </div>
          {!message ? (
            <>
              <div className="text-15-600">Your password has been updated.</div>
              <div className="text-15-400">
                Login again to continue to the portal.
              </div>
            </>
          ) : (
            <div className="text-15-400" style={{ color: "#4A4A4A" }}>
              {message}
            </div>
          )}
        </div>

        <Button className="continueButton" onClick={handleClose}>
          Try Again
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default FailedModel;
