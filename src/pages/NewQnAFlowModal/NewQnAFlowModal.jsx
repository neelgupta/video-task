import React from "react";
import { Modal } from "react-bootstrap";
import "./NewQnAFlowModal.scss";
import { icons } from "../../utils/constants";

const NewQnAFlowModal = ({ show, handleClose, setShowCreateFlowAIModal }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      centered
      className="qnaFlorModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-24-700 text-center" style={{ color: "#1B2559" }}>
            How would you like to Start?
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`d-flex itemsContainer gap-5 justify-content-center`}>
          <div className="items">
            <div>
              <img src={icons.Scratch} alt="" />
            </div>
            <div className="text-15-500">From Scratch</div>
          </div>
          <div className="items">
            <div>
              <img src={icons.templateIcon} alt="" />
            </div>
            <div className="text-15-500">Template</div>
          </div>
          <div
            className="items"
            onClick={() => {
              setShowCreateFlowAIModal(true);
              handleClose();
            }}
          >
            <div className="proTag">pro</div>
            <div>
              <img src={icons.Scratch} alt="" />
            </div>
            <div className="text-15-500">Create with Flōw AI</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewQnAFlowModal;
