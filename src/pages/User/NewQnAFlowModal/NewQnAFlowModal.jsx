import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./NewQnAFlowModal.scss";
import { icons } from "../../../utils/constants";
import OutlineRadio from "./OutlineRadio";
import Select from "react-select";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: "5px 10px", // Example padding
    border: "1px solid #CCCCCC", // Customize the border
    boxShadow: "none", // Customize the box shadow
    borderRadius: "8px",
    "&:hover": {
      border: "1px solid gray", // Customize the border on hover
    },
  }),
  indicatorSeparator: () => ({
    display: "none", // Remove the divider
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "black" : "gray", // Customize the dropdown indicator color
    "&:hover": {
      color: state.isFocused ? "black" : "gray", // Customize the dropdown indicator color on hover
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "gray", // Customize the placeholder color
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "black", // Customize the selected value color
  }),
};
const NewQnAFlowModal = ({
  show,
  handleClose,
  setShowCreateFlowAIModal,
  setCreateFlowModalSubmitData,
}) => {
  const [qnaForm, setQnaFlow] = useState({
    leadCRM: "no",
    selectCRM: null,
    type: null,
  });
  const buttonValidator = () => {
    if (qnaForm) {
      const { leadCRM, selectCRM, type } = qnaForm;
      if (leadCRM === "yes" && selectCRM && type) {
        return false;
      }
      if (leadCRM === "no" && type) {
        return false;
      }
      return true;
    }
    return true;
  };

  const cardArray = [
    {
      icons: icons.Scratch,
      title: "From Scratch",
      isPro: false,
      className: `w-50`,
      value: "Scratch",
    },
    {
      icons: icons.templateIcon,
      title: "Template",
      isPro: false,
      className: "w-50",
      value: "Template",
    },
    {
      icons: icons.doubleStar,
      title: "Create with Flōw AI",
      isPro: true,
      className: "w-70",
      value: "FlowAI",
    },
  ];

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
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
          <div>
            <div
              className={`d-flex itemsContainer gap-5 justify-content-center`}
            >
              {cardArray.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className={`items ${
                      qnaForm.type === elem.value && "active-card"
                    }`}
                    onClick={() => {
                      setQnaFlow({ ...qnaForm, type: elem.value });
                    }}
                  >
                    {elem.isPro && <div className="proTag">pro</div>}
                    <div className="fa-center h-100">
                      <img
                        src={elem.icons}
                        alt=""
                        className={`fit-image ${elem.className}`}
                        style={
                          qnaForm.type === elem.value &&
                          cardArray.length !== index + 1
                            ? {
                                filter: `invert(100%) sepia(100%) saturate(0%) hue-rotate(289deg) brightness(102%) contrast(105%)`,
                              }
                            : {}
                        }
                      />
                    </div>
                    <div className="text-15-500">{elem.title}</div>
                  </div>
                );
              })}
            </div>
            <div>
              <div
                className="text-24-700 text-center"
                style={{ color: "#1B2559" }}
              >
                Do you want to create lead on CRM?
              </div>
              <div className="f-center" style={{ gap: "100px" }}>
                <div
                  className="mt-20"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="me-10">
                    <OutlineRadio
                      className="w-24 h-24"
                      isCheck={qnaForm.leadCRM === "yes"}
                      onChange={() => {
                        setQnaFlow({ ...qnaForm, leadCRM: "yes" });
                      }}
                    />
                  </div>
                  <div className="text-16-600" style={{ color: "#000000" }}>
                    Yes
                  </div>
                </div>
                <div
                  className="mt-20"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="me-10">
                    <OutlineRadio
                      className="w-24 h-24"
                      isCheck={qnaForm.leadCRM === "no"}
                      onChange={() => {
                        setQnaFlow({ ...qnaForm, leadCRM: "no" });
                      }}
                    />
                  </div>
                  <div className="text-16-600" style={{ color: "#000000" }}>
                    No
                  </div>
                </div>
              </div>
              {qnaForm.leadCRM === "yes" && (
                <div className="f-center">
                  <div className="wp-60 mt-30">
                    <div
                      className="text-16-500 mb-5"
                      style={{ color: "rgba(102, 102, 102, 1)" }}
                    >
                      Select CRM to Link
                    </div>
                    <Select
                      options={[]}
                      placeholder={"Select"}
                      name="selectCRM"
                      value={""}
                      onChange={(select) => {}}
                      styles={customStyles}
                    />
                  </div>
                </div>
              )}
              <div className="Connect-Continue-btn">
                <Button
                  onClick={() => {
                    setShowCreateFlowAIModal(true);
                    setCreateFlowModalSubmitData(qnaForm);
                    handleClose();
                  }}
                  disabled={buttonValidator()}
                >
                  Connect and Continue
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default NewQnAFlowModal;
