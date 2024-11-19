import React, { useState } from "react";
import ModalsHeader from "./ModalsHeader";
import { Button, Modal } from "react-bootstrap";
import { icons } from "../../../utils/constants";
import VideoEditFooter from "./VideoEdit/VideoEditFooter";
import "./VideoModal.scss";
import VideoEditBody from "./VideoEdit/VideoEditBody";
import VideoAIFooter from "./VideoAI/VideoAIFooter";
import VideoAIBody from "./VideoAI/VideoAIBody";
import VideoGenBody from "./VideoGen/VideoGenBody";
import VideoGenLoaderBody from "./VideoGenLoader/VideoGenLoaderBody";
import AudioGenBody from "./AudioGen/AudioGenBody";
const VideoModal = ({ show, handleClose }) => {
  const [modalType, setModalType] = useState("video-edit");
  return (
    <Modal show={show} onHide={handleClose} centered className="VideoEditModal">
      <ModalsHeader handleClose={handleClose} />
      <div className="modal_body">
        <div className="wp-55 body_left">
          <div
            className="wp-100 p-15"
            style={{ borderBottom: "1px solid #d9d9d9" }}
          >
            <img src={icons.videoAvatar} alt="" className="fit-image" />
          </div>
          <div className="body_left_footer">
            {modalType === "video-edit" && <VideoEditFooter />}
            {[
              "video-ai",
              "video-gen",
              "video-gen-getting-ready",
              "audio-gen",
            ].includes(modalType) && <VideoAIFooter />}
          </div>
        </div>
        <div className="wp-45 body_right auri-scroll">
          {modalType === "video-edit" && (
            <VideoEditBody setModalType={setModalType} />
          )}
          {modalType === "video-ai" && (
            <VideoAIBody setModalType={setModalType} />
          )}
          {modalType === "video-gen" && (
            <VideoGenBody setModalType={setModalType} />
          )}
          {modalType === "video-gen-getting-ready" && (
            <VideoGenLoaderBody setModalType={setModalType} />
          )}
          {modalType === "audio-gen" && (
            <AudioGenBody setModalType={setModalType} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
