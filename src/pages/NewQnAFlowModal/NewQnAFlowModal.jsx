import React from "react";
import { Modal } from "react-bootstrap";
import "./NewQnAFlowModal.scss";
import { icons } from "../../utils/constants";

const NewQnAFlowModal = ({ show, handleClose }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      centered
      className="modelCont"
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
            <img src={icons.Scratch} alt="" />
          </div>
          <div className="items">
            <img src={icons.Scratch} alt="" />
          </div>
          <div className="items">
            <img src={icons.Scratch} alt="" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewQnAFlowModal;
