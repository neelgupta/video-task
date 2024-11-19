import React from "react";
import { Modal } from "react-bootstrap";
import "./NewQnAFlowModal.scss";
import { icons } from "../../utils/constants";

const NewQnAFlowModal = ({ show, handleClose, setShowCreateFlowAIModal }) => {
  const cardArray = [
    {
      icons: icons.Scratch,
      title: "From Scratch",
      isPro: false,
      className: "w-50",
      onClick: () => {
        setShowCreateFlowAIModal(true);
        handleClose();
      },
    },
    {
      icons: icons.templateIcon,
      title: "Template",
      isPro: false,
      className: "w-50",
      onClick: () => {
        setShowCreateFlowAIModal(true);
        handleClose();
      },
    },
    {
      icons: icons.doubleStar,
      title: "Create with Flōw AI",
      isPro: true,
      className: "w-70",
      onClick: () => {
        setShowCreateFlowAIModal(true);
        handleClose();
      },
    },
  ];
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      centered
      className="qnaFlowModal"
    >
      <div className="p-10" style={{ zIndex: "100" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div
              className="text-24-700 text-center"
              style={{ color: "#1B2559" }}
            >
              How would you like to Start?
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={`d-flex itemsContainer gap-5 justify-content-center`}>
            {cardArray.map((elem, index) => {
              return (
                <div key={index} className="items" onClick={elem.onClick}>
                  {elem.isPro && <div className="proTag">pro</div>}
                  <div className="fa-center h-100">
                    <img
                      src={elem.icons}
                      alt=""
                      className={`fit-image ${elem.className}`}
                    />
                  </div>
                  <div className="text-15-500">{elem.title}</div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default NewQnAFlowModal;
