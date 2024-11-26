import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./DeleteModal.scss";

const DeleteModal = ({
  show,
  handleClose,
  onDelete,
  title,
  text,
  isDelete,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="deleteModalContainer"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="modal-content-container">
          <div className="icon-container">
            <svg
              width="69"
              height="61"
              viewBox="0 0 69 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.1446 3.41602L2.5542 57.9812H65.7349L34.1446 3.41602Z"
                stroke="#F21E1E"
                strokeWidth="4.86104"
                strokeLinejoin="round"
              />
              <path
                d="M34.1445 46.4938V47.9298M34.1445 23.519L34.156 37.8783"
                stroke="#F21E1E"
                strokeWidth="4.86104"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-container">
            <div className="modal-title">Caution!</div>
            <div className="modal-message">{title}</div>
            <div className="modal-description">{text}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-evenly" }}>
        <div>
          <Button
            style={{ width: "200px" }}
            variant="secondary"
            onClick={handleClose}
            className="text-16-600"
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            style={{ width: "200px" }}
            variant="danger"
            onClick={onDelete}
            className="text-16-600"
            disabled={isDelete}
          >
            Delete Now {isDelete && <Spinner size="sm" className="ms-10" />}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
