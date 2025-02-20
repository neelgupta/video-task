import React, { useEffect, useState } from "react";
import ModalsHeader from "./Header/ModalsHeader";
import { Button, Modal } from "react-bootstrap";
import { icons } from "../../../utils/constants";
import VideoEditFooter from "./VideoEdit/VideoEditFooter";
import "./VideoModal.scss";
import VideoEditBody from "./VideoEdit/VideoEditBody";
import VideoAIFooter from "./VideoOption/VideoAIFooter";
import VideoOptionBody from "./VideoOption/VideoOptionBody";
import VideoGenBody from "./VideoGen/VideoGenBody";
import VideoGenLoaderBody from "./VideoGenLoader/VideoGenLoaderBody";
import AudioGenBody from "./AudioGen/AudioGenBody";
import { useDispatch, useSelector } from "react-redux";
import { setQueModelConfig, throwError } from "../../../store/globalSlice";
import VideoJS from "react-video-js-player";
import "video.js/dist/video-js.css";
import { VideoPlayer } from "../../../components";
const VideoModal = ({ show, handleClose }) => {
  const { queModelData } = useSelector((state) => state.global);
  const {
    nodeId,
    isEdit,
    selectedHeaderTab,
    isHeaderDisabled,
    modalType,
    createQusModalData,
  } = queModelData;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [file, setFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  useEffect(() => {
    if (file && file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoSrc(e.target.result); // Read video as a base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      dispatch(throwError("Please upload a valid video file."));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  useEffect(() => {
    if (isEdit && nodeId === null) {
      dispatch(
        setQueModelConfig({
          modalType: "",
          nodeData: null,
          isEdit: false,
          isShow: false,
        })
      );
      dispatch(throwError("question id not found"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId, isEdit]);

  return (
    <Modal show={show} centered className="VideoEditModal">
      <ModalsHeader
        handleClose={handleClose}
        isHeaderDisabled={isHeaderDisabled}
        onChangeHeaderTab={(tabName) => {}}
        selectedHeaderTab={selectedHeaderTab}
        queModelData={queModelData}
      />
      <div className="modal_body">
        <div className="wp-55 body_left">
          <div
            className="wp-100 p-15 h-550 f-center"
            style={{ borderBottom: "1px solid #d9d9d9", overflow: "hidden" }}
          >
            {videoSrc && <VideoPlayer videoSrc={videoSrc} />}
          </div>
          {!isHeaderDisabled && (
            <div className="body_left_footer">
              {modalType === "video-edit" && <VideoEditFooter />}
              {[
                "video-ai",
                "video-gen",
                "video-gen-getting-ready",
                "audio-gen",
              ].includes(modalType) && <VideoAIFooter />}
            </div>
          )}
        </div>
        <div className="wp-45 body_right flow">
          {selectedHeaderTab === "video" && (
            <div>
              {modalType === "upload" && (
                <div>
                  {page === 1 && (
                    <VideoGenBody
                      onNextPage={() => {
                        setPage(2);
                      }}
                      onBack={() => {}}
                      onSetValue={() => {}}
                      setFile={setFile}
                    />
                  )}

                  {page === 2 && (
                    <div>
                      <VideoEditBody setModalType={() => {}} />
                    </div>
                  )}
                </div>
              )}
              {/* {modalType === "video-ai" && (
                <VideoAIBody setModalType={changeModal} />
              )}
              {modalType === "video-gen" && (
                
              )}
              {modalType === "video-gen-getting-ready" && (
                <VideoGenLoaderBody setModalType={changeModal} />
              )}
              {modalType === "audio-gen" && (
                <AudioGenBody setModalType={changeModal} />
              )} */}
            </div>
          )}
          {selectedHeaderTab === "answer" && <div>answer</div>}
          {selectedHeaderTab === "logic" && <div>logic</div>}
        </div>
      </div>
    </Modal>
  );
};

export default VideoModal;
