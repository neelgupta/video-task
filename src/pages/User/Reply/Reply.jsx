import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import "./Reply.scss";
import { TextArea, VideoPlayer } from "../../../components";
import DropdownOption from "../../../components/inputs/DropdownOption/DropdownOption";
import { getTrackBackground, Range } from "react-range";
import { ReplyAll, ReplyAllIcon, ReplyIcon } from "lucide-react";
import LinkFlowModel from "./LinkFlowModel";
import { icons } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  throwError,
  setWebcamModelConfig,
  showSuccess,
} from "../../../store/globalSlice";
import { api } from "../../../services/api";
import OpenEndedForm from "../ViewInteraction/AnswerForm/OpenEndedForm";
import ButtonForm from "../ViewInteraction/AnswerForm/ButtonForm";
import { processVideoMetadata } from "../../FlowCanvas/flowControl";
import { creteImgFilter } from "../../../utils/helpers";

const sizeOption = [
  {
    label: "Extra Small",
    value: "20px",
  },
  {
    label: "Small",
    value: "22px",
  },
  {
    label: "Medium",
    value: "34px",
  },
  {
    label: "Large",
    value: "46px",
  },
  {
    label: "Extra Large",
    value: "58px",
  },
];
const MIN = 0;
function Reply({ show, handleClose }) {
  const dispatch = useDispatch();
  const { replyModalData, webcamModelConfig, selectedOrganizationId } =
    useSelector((state) => state.global);
  console.log("replyModalData", replyModalData);
  const [videoConfigForm, setVideoConfigForm] = useState({
    reply_title: "untitled",
    alignVideo: false,
    videoPosition: "center center",
    overlayText: "",
    textSize: "20px",
    textReveal: [0],
  });
  const [videoAnswerForm, setVideoAnswerForm] = useState({
    answer_type: "open-ended",
    btn_text: "",
    btn_url: "",
  });
  const [openEndedKey, setOpenEndedKey] = useState("");
  const [viewOption, setViewOption] = useState("desktop");
  const [interactionsStyle, setInteractionsStyle] = useState({
    border_radius: 10,
    background_color: "#7B5AFF",
    primary_color: "#7B5AFF",
    secondary_color: "#7B5AFF",
    language: "english",
    font: "Arial",
  });
  const [showLinkFlow, setShowLinkFlow] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  const [interaction, setInteraction] = useState(null);
  const [windowSize, setWindowSize] = useState({
    innerWidth: 400,
    innerHeight: window.innerHeight,
  });
  const [widgetTag, setWidgetTag] = useState("");
  const [MAX, setMAX] = useState(0);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    (() => {
      if (windowSize.innerWidth < 300 || windowSize.innerHeight < 400) {
        setWidgetTag("Widget-button");
        return;
      }
      if (windowSize.innerWidth < 450) {
        setWidgetTag("mobile");
        return;
      }
      if (windowSize.innerWidth < 1000) {
        setWidgetTag("tablet");
        return;
      }
      setWidgetTag("desktop");
    })();
  }, [windowSize]);

  useEffect(() => {
    if (replyModalData.type === "reply" && replyModalData.interactionId) {
      getInteraction();
    }
    if (
      ["reply-message", "reply-message"].includes(replyModalData.type) &&
      selectedOrganizationId
    ) {
      getOrganization();
    }
    getDuration();
    setVideoSrc(webcamModelConfig.blobUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamModelConfig, replyModalData, selectedOrganizationId]);

  const getInteraction = async () => {
    try {
      const res = await api.get(
        `interactions/get-single-interaction/${replyModalData.interactionId}`
      );
      if (res.status === 200) {
        setInteraction(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  const getOrganization = async () => {
    try {
      const res = await api.get(`user/organization/${selectedOrganizationId}`);
      if (res.status === 200) {
        setOrganization(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  useEffect(() => {
    if (interaction) {
      setInteractionsStyle({
        border_radius: interaction?.border_radius || 10,
        background_color: interaction?.background_color || "#7B5AFF",
        primary_color: interaction?.primary_color || "#7B5AFF",
        secondary_color: interaction?.secondary_color || "#7B5AFF",
        language: interaction?.language || "english",
        font: interaction?.font || "Arial",
      });
    }
    if (organization) {
      setInteractionsStyle({
        border_radius: organization?.border_radius || 10,
        background_color: organization?.background_color || "#7B5AFF",
        primary_color: organization?.primary_color || "#7B5AFF",
        secondary_color: organization?.secondary_color || "#7B5AFF",
        language: organization?.language || "english",
        font: organization?.font || "Arial",
      });
    }
  }, [interaction, organization]);

  const getDuration = async () => {
    const duration = await processVideoMetadata(webcamModelConfig.blobUrl);
    setMAX(duration);
    setVideoConfigForm({ ...videoConfigForm, textReveal: [duration] });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((error) => dispatch(throwError(error)));
      return;
    }

    try {
      const req = new FormData();

      req.append("organization_id", selectedOrganizationId);
      req.append("contact_id", replyModalData.contactId);
      if (replyModalData.type === "reply") {
        req.append("interaction_id", replyModalData.interactionId);
        req.append("answer_id", replyModalData.answerId);
      }
      if (replyModalData.type === "reply-message") {
        req.append("direct_node_id", replyModalData.directNodeId);
        req.append("reply_id", replyModalData.answerId);
      }
      req.append("type", replyModalData.type);
      req.append("flow_type", "Upload");
      req.append("video_align", videoConfigForm.alignVideo);
      if (!videoConfigForm.alignVideo) {
        req.append("video_position", videoConfigForm.videoPosition);
      }
      req.append("overlay_text", videoConfigForm?.overlayText || "");
      if (videoConfigForm?.overlayText) {
        req.append("text_size", videoConfigForm.textSize);
        req.append("fade_reveal", videoConfigForm.textReveal[0]);
      }
      req.append("title", videoConfigForm.reply_title);

      if (videoBlob) {
        req.append("video", videoBlob);
      }

      req.append("answer_type", videoAnswerForm.answer_type);
      const answerFormat =
        videoAnswerForm.answer_type === "open-ended"
          ? {
              options: ["Audio", "Video", "Text"],
              time_limit: 100,
              delay: 0,
              contact_form: false,
            }
          : {
              button_title: videoAnswerForm.btn_text,
              delay: "0",
              disable_data_collection: false,
              contact_form: false,
              button_url: videoAnswerForm.btn_url,
            };

      req.append("answer_format", JSON.stringify(answerFormat));

      const res = await api.post("reply/send-reply", req, {
        "Content-Type": "multipart/form-data",
      });

      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        handleClose();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      dispatch(throwError(error.response.data.message));
    } finally {
      setIsLoading(false);
    }
  };
  const validateForm = () => {
    const errors = [];
    if (!videoConfigForm.reply_title.trim())
      errors.push("Reply title is required");
    if (!replyModalData.interactionId && replyModalData.type === "reply")
      errors.push("Interaction id is required");
    if (!selectedOrganizationId) errors.push("Organization id is required");
    if (
      videoAnswerForm.answer_type === "button" &&
      !videoAnswerForm.btn_text.trim()
    )
      errors.push("Button text is required");
    if (!videoBlob) errors.push("Please record a video");
    if (!replyModalData.contactId) errors.push("Contact id is required");
    if (!replyModalData.answerId && replyModalData.type === "reply")
      errors.push("Answer id is required");

    return errors;
  };

  useEffect(() => {
    if (webcamModelConfig?.blobFile) {
      setVideoBlob(webcamModelConfig?.blobFile || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamModelConfig.blobFile]);

  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      className="reply-modal"
      onHide={handleClose}
    >
      {showLinkFlow && (
        <LinkFlowModel
          show={showLinkFlow}
          handleModalClose={() => {
            setShowLinkFlow(false);
          }}
          selectedOrganizationId={selectedOrganizationId}
          setVideoAnswerForm={setVideoAnswerForm}
          videoAnswerForm={videoAnswerForm}
        />
      )}
      <div className="reply-modal-container">
        <div className="config-container">
          <div className="config-container-title">Almost ready to send...</div>
          <div className="config-container-form">
            <div className="mb-10 flow-ai-input">
              <div
                className="text-16-500"
                style={{ color: "#7D8185", letterSpacing: "1px" }}
              >
                Reply Title
              </div>
              <input
                placeholder="Enter title"
                style={{ border: "1px solid #fff" }}
                value={videoConfigForm.reply_title}
                onChange={(e) => {
                  setVideoConfigForm({
                    ...videoConfigForm,
                    reply_title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-10">
              <div
                className="text-16-500"
                style={{ color: "#7D8185", letterSpacing: "1px" }}
              >
                Overlay Text
              </div>
              <TextArea
                id="overlayText"
                placeholder="Enter Overlay Text ..."
                style={{ borderRadius: "10px" }}
                value={videoConfigForm.overlayText}
                onChange={(e) => {
                  setVideoConfigForm((pre) => {
                    return { ...pre, overlayText: e.target.value };
                  });
                }}
              />
            </div>
            {videoConfigForm.overlayText && (
              <>
                <div
                  className="mb-20"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 20px",
                    background: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="text-16-500"
                    style={{ color: "#7D8185", letterSpacing: "1px" }}
                  >
                    Text Size
                  </div>
                  <div className="w-220">
                    <DropdownOption
                      value={sizeOption.find(
                        (x) => x.value === videoConfigForm?.textSize
                      )}
                      onChange={(select) => {
                        setVideoConfigForm({
                          ...videoConfigForm,
                          textSize: select.value,
                        });
                      }}
                      options={sizeOption}
                    />
                  </div>
                </div>
                <div
                  className="mb-20"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 10px 10px 20px",
                    background: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="text-16-500"
                    style={{ color: "#7D8185", letterSpacing: "1px" }}
                  >
                    Fade/Reveal
                  </div>
                  <div className="slider-container">
                    <Range
                      values={videoConfigForm.textReveal}
                      step={1}
                      min={MIN}
                      max={MAX}
                      disabled={!videoConfigForm.overlayText}
                      onChange={(values) => {
                        setVideoConfigForm((pre) => {
                          return { ...pre, textReveal: values };
                        });
                      }}
                      renderTrack={({ props, children }) => (
                        <div
                          onMouseDown={props.onMouseDown}
                          onTouchStart={props.onTouchStart}
                          style={{
                            ...props.style,
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          <div
                            ref={props.ref}
                            style={{
                              height: "5px",
                              width: "100%",
                              borderRadius: "4px",
                              background: getTrackBackground({
                                values: videoConfigForm.textReveal,
                                colors: [
                                  videoConfigForm.overlayText
                                    ? "#7b5aff"
                                    : "rgba(0,0,0,0.3)",
                                  "rgba(0,0,0,0.1)",
                                ],
                                min: MIN,
                                max: MAX,
                              }),
                              alignSelf: "center",
                            }}
                          >
                            {children}
                          </div>
                        </div>
                      )}
                      renderThumb={({ props, isDragged }) => {
                        const { key, ...restProps } = props;
                        return (
                          <div
                            key={key}
                            {...restProps}
                            style={{
                              ...props.style,
                              height: isDragged ? "28px" : "28px",
                              width: isDragged ? "28px" : "28px",
                              borderRadius: "50%",
                              backgroundColor: isDragged ? "#7b5aff" : "#fff",
                              border: "2px solid",
                              borderColor: !videoConfigForm.overlayText
                                ? "rgba(0,0,0,0.3)"
                                : "#7b5aff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              color: isDragged ? "white" : "black",
                              fontWeight: "600",
                            }}
                          >
                            {videoConfigForm.textReveal}
                          </div>
                        );
                      }}
                    />
                    <div className="slider-labels mt-10">
                      <span
                        style={{ color: "#7D8185", letterSpacing: "1px" }}
                        className="text-14-500"
                      >
                        0 sec
                      </span>
                      <span
                        style={{ color: "#7D8185", letterSpacing: "1px" }}
                        className="text-14-500"
                      >
                        {MAX} sec
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="align-option mb-20">
              <div
                className="text-16-500"
                style={{ color: "#7D8185", letterSpacing: "1px" }}
              >
                Align Video
              </div>
              <div style={{ display: "flex" }}>
                <div
                  onClick={() =>
                    setVideoConfigForm((pre) => {
                      return { ...pre, alignVideo: true };
                    })
                  }
                  className={`align-btn ${
                    videoConfigForm.alignVideo && "active"
                  }`}
                >
                  Yes
                </div>
                <div
                  onClick={() =>
                    setVideoConfigForm((pre) => {
                      return { ...pre, alignVideo: false };
                    })
                  }
                  className={`align-btn ${
                    !videoConfigForm.alignVideo && "active"
                  }`}
                >
                  No
                </div>
              </div>
            </div>
          </div>
          <div className="config-answer-formate-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                className="text-16-500"
                style={{ color: "#7D8185", letterSpacing: "1px" }}
              >
                Answer type
              </div>
              <div className="config-answer-formate-container-btn-group">
                <div
                  className={`${
                    videoAnswerForm.answer_type === "open-ended" ? "active" : ""
                  }`}
                  onClick={() => {
                    setVideoAnswerForm({
                      ...videoAnswerForm,
                      answer_type: "open-ended",
                    });
                  }}
                >
                  Open
                </div>
                <div
                  className={`${
                    videoAnswerForm.answer_type === "button" ? "active" : ""
                  }`}
                  onClick={() => {
                    setVideoAnswerForm({
                      ...videoAnswerForm,
                      answer_type: "button",
                    });
                  }}
                >
                  Button
                </div>
              </div>
            </div>
            {videoAnswerForm.answer_type === "button" && (
              <div className="mt-20">
                <div className="flow-ai-input">
                  <input
                    required
                    type="text"
                    placeholder="Enter button text ..."
                    value={videoAnswerForm.btn_text}
                    onChange={(e) => {
                      setVideoAnswerForm({
                        ...videoAnswerForm,
                        btn_text: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flow-ai-input mt-10 mb-10 button-link-input">
                  <input
                    type="text"
                    placeholder="Enter button url "
                    style={{ paddingRight: "135px" }}
                    value={videoAnswerForm.btn_url}
                    onChange={(e) => {
                      setVideoAnswerForm({
                        ...videoAnswerForm,
                        btn_url: e.target.value,
                      });
                    }}
                  />
                  <button
                    className="link-flow-button"
                    onClick={() => {
                      setShowLinkFlow(true);
                    }}
                  >
                    Link flow AI
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="submit-reply-btn"
            onClick={handleSubmit}
          >
            <span>Send reply</span>
            {isLoading ? <Spinner size="sm" /> : <ReplyAllIcon />}
          </button>
        </div>
        <div className="reply-card-container">
          <div
            className="reply-card-container-header"
            onClick={() => {
              handleClose();
            }}
          >
            <img src={icons.closeSvg} alt="" className="fit-image w-25 h-25" />
          </div>
          <div className="reply-card-container-screen">
            <div className="reply-card-container-screen-title">
              How your flow will look, click to try it! 👇
            </div>
            <div className="reply-card-container-screen-view">
              <div className="reply-card-container-screen-view-header">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="reply-card-container-screen-view-content">
                <div className="reply-card-container-screen-view-content-video">
                  <div
                    className="wp-100 hp-100 f-center"
                    style={{ background: "black" }}
                  >
                    {videoSrc && (
                      <VideoPlayer
                        flowStyle={interactionsStyle}
                        videoUrl={videoSrc}
                        videoBlob={videoBlob}
                        isBlob={videoBlob ? true : false}
                        videoConfigForm={videoConfigForm}
                        scaleCount={0.8}
                      />
                    )}
                  </div>
                </div>
                <div className="reply-card-container-screen-view-content-answer">
                  {videoAnswerForm.answer_type === "open-ended" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: openEndedKey ? "100%" : "70%",
                      }}
                    >
                      <OpenEndedForm
                        flowStyle={interactionsStyle}
                        onNext={(ansValue) => {}}
                        node={{
                          answer_format: {
                            options: ["Audio", "Video", "Text"],
                            time_limit: 100,
                            delay: 0,
                            contact_form: false,
                          },
                        }}
                        isPost={false}
                        windowSize={windowSize}
                        setOpenEndedKey={setOpenEndedKey}
                        widgetTag={widgetTag}
                        scaleCount={0.8}
                      />
                    </div>
                  )}
                  {videoAnswerForm.answer_type === "button" && (
                    <div className="wp-100 hp-100 p-20">
                      <ButtonForm
                        flowStyle={interactionsStyle}
                        onNext={(ansValue) => {}}
                        node={{
                          answer_format: {
                            button_title: videoAnswerForm.btn_text,
                            delay: "0",
                            disable_data_collection: false,
                            contact_form: false,
                          },
                        }}
                        videoTime={{ duration: 0, currentTime: 0 }}
                        isPost={false}
                        windowSize={windowSize}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="reply-card-container-screen-option">
              <div
                onClick={() => {
                  setViewOption("desktop");
                }}
              >
                <img
                  src={icons.desktop}
                  alt=""
                  className="fit-image"
                  style={
                    viewOption === "desktop"
                      ? { filter: creteImgFilter("#7b5aff") }
                      : {}
                  }
                />
              </div>
              <div
                onClick={() => {
                  setViewOption("mobile");
                }}
              >
                <img
                  src={icons.mobile}
                  alt=""
                  className="fit-image"
                  style={
                    viewOption === "mobile"
                      ? { filter: creteImgFilter("#7b5aff") }
                      : {}
                  }
                />
              </div>
              <div
                onClick={() => {
                  setViewOption("screen");
                }}
              >
                <img
                  src={icons.screen}
                  alt=""
                  className="fit-image"
                  style={
                    viewOption === "screen"
                      ? { filter: creteImgFilter("#7b5aff") }
                      : {}
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Reply;
