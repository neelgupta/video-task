import React from "react";
import "./CreateFlowOptionsModal.scss";
import { Button, Modal } from "react-bootstrap";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { useDispatch } from "react-redux";
import {
  setQueModelConfig,
  setWebcamModelConfig,
} from "../../../../store/globalSlice";

const CreateFlowOptionsModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const cardArray = [
    {
      icon: icons.webCam,
      title: "WebCam",
      isPro: false,
      value: "Webcam",
      onClick: () => {
        dispatch(setWebcamModelConfig({ isShow: true }));
        dispatch(
          setQueModelConfig({
            nodeData: null,
            isEdit: false,
            modalType: "Webcam",
            isShow: false,
          })
        );
        handleClose();
      },
    },
    {
      icon: icons.Upload,
      title: "Upload",
      isPro: false,
      value: "Upload",
      style: { filter: creteImgFilter("#8C8E90") },
      onClick: () => {
        dispatch(
          setQueModelConfig({
            nodeData: null,
            isEdit: false,
            modalType: "Upload",
            isShow: true,
          })
        );
        handleClose();
      },
    },
    {
      icon: icons.screenShare,
      title: "ScreenShare",
      isPro: false,
      value: "Screen",
      onClick: () => {
        dispatch(setWebcamModelConfig({ isShow: true }));
        dispatch(
          setQueModelConfig({
            nodeData: null,
            isEdit: false,
            modalType: "Screen",
            isShow: false,
          })
        );
        handleClose();
      },
    },
    {
      icon: icons.library,
      title: "Library",
      isPro: false,
      value: "Library",
      onClick: () => {},
    },
    {
      icon: icons.doubleStar,
      title: "Flōw AI",
      isPro: true,
      value: "FlowAI",
      onClick: () => {},
    },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="createFlowOptionsModal"
      size="xl"
      backdrop="static"
    >
      <div className="p-10" style={{ zIndex: "100" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div
              className="text-24-700 text-center"
              style={{ color: "#1B2559" }}
            >
              Create New Flōw AI
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`d-flex itemsContainer gap-3 justify-content-center`}
            style={{ flexWrap: "wrap" }}
          >
            {cardArray.map((ele, index) => {
              return (
                <div
                  className="items"
                  key={index}
                  onClick={() => {
                    ele.onClick();
                  }}
                >
                  {ele.isPro && <span className="proTag">PRO</span>}
                  <div className="h-150 mt-100 mb-50 p-30">
                    <img
                      src={ele.icon}
                      alt="webCam"
                      className="fit-image"
                      style={ele.style || {}}
                    />
                  </div>
                  <div
                    className="text-20-600 mb-20"
                    style={{ color: "#000000" }}
                  >
                    {ele.title}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{ display: "flex", justifyContent: "end" }}
            className="mb-20 mt-30"
          >
            <Button
              style={{
                color: "#1B2559",
                textAlign: "end",
                border: "none",
                background: "transparent",
                width: "170px",
              }}
              className="Upload_btn"
            >
              <div>Upload later</div>
              <div className="h-30">
                <img
                  src={icons.arrowRight}
                  alt="webCam"
                  className="fit-image btn_img"
                />
              </div>
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default CreateFlowOptionsModal;
