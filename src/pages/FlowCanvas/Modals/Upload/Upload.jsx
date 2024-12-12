import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { icons } from "../../../../utils/constants";
import { VideoPlayer, VideoUpload } from "../../../../components";
import "./Upload.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  setNewQueModalData,
  setQueModelConfig,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";
import VideoConfiguration from "./VideoConfiguration";
import { api } from "../../../../services/api";
import AnswerTab from "./AnswerTab";

function Upload({ show, handleClose }) {
  const dispatch = useDispatch();
  const {
    newQueModalData,
    queModelConfig: { nodeData, isEdit, modalType },
  } = useSelector((state) => state.global);
  const [MAX, setMAX] = useState(0);
  const [currentKey, setCurrentKey] = useState(1);
  const [videoSrc, setVideoSrc] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const [headerTab, setHeaderTab] = useState("video");
  const [nodeTitle, setNodeTitle] = useState("untitled");
  const [videoConfigForm, setVideoConfigForm] = useState({
    alignVideo: true,
    videoPosition: "center center",
    overlayText: "",
    textSize: "20px",
    textReveal: [0],
  });

  useEffect(() => {
    if (isEdit && nodeData) {
      setNodeTitle(nodeData.title);
      setVideoConfigForm({
        alignVideo: nodeData.video_align,
        videoPosition:
          (!nodeData.video_align && nodeData?.video_position) ||
          "center center",
        overlayText: nodeData?.overlay_text || "",
        textSize: nodeData?.overlay_text
          ? nodeData?.text_size || "20px"
          : "20px",
        textReveal: [
          nodeData?.overlay_text ? parseInt(nodeData.fade_reveal) : 0,
        ],
      });
    }
  }, [isEdit, nodeData]);

  const handleSubmitNewQue = async () => {
    try {
      setIsCreate(true);
      const req = new FormData();
      if (!isEdit) {
        req.append("interaction_id", newQueModalData.interaction_id);
        req.append("targetId", newQueModalData.targetId);
        req.append("sourceId", newQueModalData.sourceId);
        req.append("type", newQueModalData.type);
        req.append("positionX", newQueModalData.positionX);
        req.append("positionY", newQueModalData.positionY);
        req.append("flow_type", modalType);
      }
      if (isEdit) {
        req.append("node_id", nodeData._id);
      }

      req.append("video_align", videoConfigForm.alignVideo);
      if (!videoConfigForm.alignVideo) {
        req.append("video_position", videoConfigForm.videoPosition);
      }
      req.append("overlay_text", videoConfigForm?.overlayText || "");
      if (videoConfigForm?.overlayText) {
        req.append("text_size", videoConfigForm.textSize);
        req.append("fade_reveal", videoConfigForm.textReveal[0]);
      }
      req.append("title", nodeTitle);
      if (videoFile) {
        req.append("video", videoFile);
      }

      const res = await api[isEdit ? "put" : "post"](
        `${isEdit ? "interactions/update-node" : "interactions/create-node"}`,
        req,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      console.log("res", res);
      if ([201, 200].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        dispatch(setNewQueModalData({}));
        const nodeData = res.data.response;

        if (!isEdit) {
          dispatch(
            setQueModelConfig({
              modalType: nodeData.flow_type || "",
              nodeData: nodeData,
              isEdit: true,
            })
          );
        } else {
          handleClose();
        }
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
    if (!videoFile && !isEdit) {
      setVideoSrc("");
      return;
    }

    if (isEdit && videoFile) {
      setVideoConfigForm((pre) => {
        return { ...pre, textReveal: [0] };
      });
    } else {
      setVideoConfigForm((pre) => {
        return {
          ...pre,
          textReveal: [
            nodeData?.overlay_text ? parseInt(nodeData.fade_reveal) : 0,
          ],
        };
      });
    }

    const tempVideo = document.createElement("video");
    const videoUrl =
      videoFile && videoFile.type.startsWith("video/")
        ? URL.createObjectURL(videoFile)
        : isEdit && nodeData
        ? nodeData.video_url
        : null;

    if (videoUrl) {
      setVideoSrc(videoUrl);
      tempVideo.src = videoUrl;
      tempVideo.onloadedmetadata = () => {
        setMAX(tempVideo.duration.toFixed(0));
      };
    } else {
      setVideoSrc("");
    }

    // Cleanup: Revoke object URL when the component unmounts
    return () => {
      if (videoFile && videoFile.type.startsWith("video/")) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoFile, isEdit, nodeData]);

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
          <div className="wp-40 ">
            <div className="Video_header">
              <div
                className="wp-45 header_item"
                style={{ justifyContent: "space-between" }}
              >
                <div className="header_tab">
                  {(!isEdit ? ["video"] : ["video", "answer", "logic"]).map(
                    (ele, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setHeaderTab(ele)}
                          className={headerTab === ele && "active"}
                        >
                          {ele}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="content-body auri-scroll">
              {headerTab === "video" && (
                <div className="video">
                  <div className="modal-title">
                    <div
                      className="w-30 pointer"
                      onClick={() => setCurrentKey(1)}
                    >
                      <img
                        src={icons.arrow_left}
                        alt=""
                        className="fit-image"
                      />
                    </div>
                    <div className="text-22-600">
                      Upload With
                      <span
                        className="text-22-400 ms-5"
                        style={{ color: "#7B5AFF" }}
                      >
                        FlōwAI
                      </span>
                    </div>
                  </div>
                  <div className="p-20">
                    {currentKey === 1 && (
                      <UploadVideoComponent
                        setVideoFile={setVideoFile}
                        videoFile={videoFile}
                        setNodeTitle={setNodeTitle}
                        nodeTitle={nodeTitle}
                        onNextPage={() => {
                          if (!videoFile && !isEdit) {
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
              )}

              {headerTab === "answer" && (
                <AnswerTab
                  ansType={nodeData?.answer_type || ""}
                  ansFormat={nodeData?.answer_format || {}}
                  onClose={handleClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const UploadVideoComponent = ({
  setVideoFile,
  onNextPage,
  videoFile,
  nodeTitle,
  setNodeTitle,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <div className="content p-10">
          <div>
            <div className="mb-20">
              <div
                className="text-12-600 mb-5"
                style={{ color: !nodeTitle ? "var(--dc35)" : "#666666" }}
              >
                Title*
              </div>
              <div className="wp-100 title-input">
                <input
                  type="string"
                  required
                  placeholder="Enter title..."
                  value={nodeTitle}
                  onChange={(e) => {
                    setNodeTitle(e.target.value);
                  }}
                  style={{
                    borderColor: !nodeTitle ? "var(--dc35)" : "#cccccc",
                  }}
                />
                {!nodeTitle && (
                  <p
                    className="text-12-500 ps-8"
                    style={{ color: "var(--dc35)" }}
                  >
                    Title is required.
                  </p>
                )}
              </div>
            </div>
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
          type="submit"
          style={{
            background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            if (!nodeTitle || nodeTitle === "") {
              dispatch(throwError("Title is required."));
              return;
            }
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
