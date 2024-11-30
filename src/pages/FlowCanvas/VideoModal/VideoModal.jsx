import React, { useEffect, useState } from "react";
import ModalsHeader from "./Header/ModalsHeader";
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
import { useDispatch, useSelector } from "react-redux";
import { handleSetQueModelData, throwError } from "../../../store/globalSlice";
const VideoModal = ({ show, handleClose }) => {
  const { queModelData } = useSelector((state) => state.global);
  const { nodeId, isEdit, selectedHeaderTab, isHeaderDisabled, modalType } =
    queModelData;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log({ nodeId, isEdit });
    if (isEdit && nodeId === null) {
      dispatch(handleSetQueModelData.closeModel());
      dispatch(throwError("node id not found"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId, isEdit]);

  return (
    <Modal show={show} centered className="VideoEditModal">
      <ModalsHeader
        handleClose={handleClose}
        isHeaderDisabled={isHeaderDisabled}
        onChangeHeaderTab={(tabName) =>
          dispatch(
            handleSetQueModelData.setData({ selectedHeaderTab: tabName })
          )
        }
        selectedHeaderTab={selectedHeaderTab}
        queModelData={queModelData}
      />
      <div className="modal_body">
        <div className="wp-55 body_left">
          <div
            className="wp-100 p-15"
            style={{ borderBottom: "1px solid #d9d9d9" }}
          >
            <img src={icons.videoAvatar} alt="" className="fit-image" />
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
        <div className="wp-45 body_right auri-scroll">
          {selectedHeaderTab === "video" && (
            <div>
              {modalType === "upload" && (
                // <VideoEditBody setModalType={changeModal} />
                <div>
                  <VideoGenBody
                    onNextPage={() => {
                      console.log("ok");
                    }}
                    onBack={() => {}}
                  />
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

{
  /* <div className="modal_body">
  <div className="wp-55 body_left">
    <div className="wp-100 p-15" style={{ borderBottom: "1px solid #d9d9d9" }}>
      <img src={icons.videoAvatar} alt="" className="fit-image" />
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
  <div className="wp-45 body_right auri-scroll">
    {modalType === "video-edit" && <VideoEditBody setModalType={changeModal} />}
    {modalType === "video-ai" && <VideoAIBody setModalType={changeModal} />}
    {modalType === "video-gen" && <VideoGenBody setModalType={changeModal} />}
    {modalType === "video-gen-getting-ready" && (
      <VideoGenLoaderBody setModalType={changeModal} />
    )}
    {modalType === "audio-gen" && <AudioGenBody setModalType={changeModal} />}
  </div>
</div>; */
}
