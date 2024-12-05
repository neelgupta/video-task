import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { icons } from "../../../../utils/constants";
import { VideoPlayer, VideoUpload } from "../../../../components";
import "./Upload.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  setNewQueModalData,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";
import VideoConfiguration from "./VideoConfiguration";
import { api } from "../../../../services/api";

function Upload({ show, handleClose }) {
  const dispatch = useDispatch();
  const { newQueModalData } = useSelector((state) => state.global);
  const [MAX, setMAX] = useState(0);
  const [currentKey, setCurrentKey] = useState(1);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [videoConfigForm, setVideoConfigForm] = useState({
    alignVideo: true,
    videoPosition: {
      value: "center left",
      label: "Center Left",
    },
    overlayText: "",
    textSize: {
      label: "Extra Small",
      value: "20px",
    },
    textReveal: [0],
  });

  useEffect(() => {
    if (MAX !== 0) {
      setVideoConfigForm((pre) => {
        return { ...pre, textReveal: [MAX] };
      });
    }
  }, [MAX]);

  const handleSubmitNewQue = async () => {
    try {
      setIsCreate(true);
      const req = new FormData();

      req.append("interaction_id", newQueModalData.interaction_id);
      req.append("targetId", newQueModalData.targetId);
      req.append("sourceId", newQueModalData.sourceId);
      req.append("type", newQueModalData.type);
      req.append("title", newQueModalData.title);
      req.append("positionX", newQueModalData.positionX);
      req.append("positionY", newQueModalData.positionY);

      req.append("flow_type", "Upload");
      req.append("video_align", videoConfigForm.alignVideo);
      req.append("overlay_text", videoConfigForm.overlayText);
      req.append("text_size", videoConfigForm.textSize.value);
      req.append("fade_reveal", videoConfigForm.textReveal[0]);
      if (videoFile) {
        req.append("video", videoFile);
      }

      const res = await api.post("interactions/create-node", req, {
        "Content-Type": "multipart/form-data",
      });
      if (res.status === 201) {
        dispatch(showSuccess(res.data.message));
        dispatch(setNewQueModalData({}));
        handleClose();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsCreate(false);
  };

  useEffect(() => {
    if (videoFile && videoFile.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(videoFile);
      setVideoSrc(videoUrl);
      const tempVideo = document.createElement("video");
      tempVideo.src = videoUrl;
      tempVideo.onloadedmetadata = () => {
        setMAX(Math.ceil(tempVideo.duration));
      };
      return;
    }
    setVideoSrc("");
  }, [videoFile]);

  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      className="upload-modal-container"
    >
      <div className="upload-model-content">
        <div
          className="h-18 w-18 f-center pointer close-icon"
          onClick={handleClose}
        >
          <img src={icons.close} alt="close" className="fit-image" />
        </div>
        <div className="modal_body">
          <div className="wp-60 video-body">
            <div
              className="wp-100 hp-100 f-center"
              style={{ background: "black" }}
            >
              {videoSrc && (
                <VideoPlayer
                  videoUrl={videoSrc}
                  videoConfigForm={videoConfigForm}
                />
              )}
            </div>
          </div>
          <div className="wp-40 content-body">
            <div className="modal-title">
              <div className="w-30 pointer" onClick={() => setCurrentKey(1)}>
                <img src={icons.arrow_left} alt="" className="fit-image" />
              </div>
              <div className="text-22-600">
                Upload With
                <span className="text-22-400 ms-5" style={{ color: "#7B5AFF" }}>
                  FlōwAI
                </span>
              </div>
            </div>
            <div className="p-20">
              {currentKey === 1 && (
                <UploadVideoComponent
                  setVideoFile={setVideoFile}
                  videoFile={videoFile}
                  onNextPage={() => {
                    if (!videoFile) {
                      dispatch(throwError("video is not selected"));
                      return;
                    }
                    setCurrentKey(2);
                  }}
                />
              )}
              {currentKey === 2 && (
                <div>
                  <VideoConfiguration
                    setModalType={() => {}}
                    onSubmit={() => {
                      handleSubmitNewQue();
                    }}
                    videoConfigForm={videoConfigForm}
                    setVideoConfigForm={setVideoConfigForm}
                    MAX={MAX}
                    isCreate={isCreate}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const UploadVideoComponent = ({ setVideoFile, onNextPage, videoFile }) => {
  return (
    <>
      <div>
        <div className="content p-10">
          <div>
            <div
              className="text-20-500 mb-20 mt-20"
              style={{ color: "#7D8185" }}
            >
              Upload Video
            </div>
            <VideoUpload setFileValue={setVideoFile} videoFile={videoFile} />
          </div>
        </div>
      </div>

      <div className="p-10 pt-20 wp-100">
        <Button
          className="text-18-600 wp-100 p-0"
          style={{
            background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            onNextPage();
          }}
        >
          <span>Generate</span>
          <span
            className="h-60 w-60"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              paddingBottom: "10px",
            }}
          >
            <img
              src={icons.doubleStar}
              alt=""
              className="w-50 h-50 fit-image"
            />
          </span>
        </Button>
      </div>
    </>
  );
};

export default Upload;
