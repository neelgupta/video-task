import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ViewInteraction.scss";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { api } from "../../../services/api";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
import { VideoPlayer } from "../../../components";
import OpenEndedForm from "./AnswerForm/OpenEndedForm";
import { decrypt } from "../../../utils/helpers";
import MultipleChoiceForm from "./AnswerForm/MultipleChoiceForm";
import ButtonForm from "./AnswerForm/ButtonForm";
import FileUploadForm from "./AnswerForm/FileUploadForm";
import ContactForm from "./AnswerForm/ContactForm";
import CalenderForm from "./AnswerForm/CalenderForm";
import EndScreen from "./EndScreen";
import { useTranslation } from "react-i18next";
import { languageOptions } from "../MyOrganization/pages/Overview/overviewOption";
import NpsForm from "./AnswerForm/NpsForm";
import { isMobile, isTablet, isDesktop } from "react-device-detect";
// profileData;
function ViewInteraction() {
  const { token, type } = useParams();
  const id = decrypt(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [key, setKey] = useState(0);
  const [queNodes, setQueNodes] = useState([]);
  const [endNodes, setEndNodes] = useState([]);
  const [intData, setIntData] = useState(null);
  const [videoTime, setVideoTime] = useState({});
  const [ansData, setAnsData] = useState({});
  const [isContact, setIsContact] = useState(false);
  const [isContactCollected, setIsContactCollected] = useState(false);
  const [answerId, setAnswerId] = useState("");
  const [isPost, setIsPost] = useState(false);
  const [windowSize, setWindowSize] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });
  const [openEndedKey, setOpenEndedKey] = useState("");
  const [flowStyle, setFlowStyle] = useState({
    primary_color: "#7B5AFF",
    secondary_color: "#B3A1FF",
    background_color: "#FFFFFF",
    language: "english",
    border_radius: "Arial",
    font: 10,
  });

  const [widgetTag, setWidgetTag] = useState("");

  useEffect(() => {
    if (id) {
      fetchInteraction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
      console.log("size", {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("windowSize", windowSize);
    (() => {
      if (windowSize.innerHeight < 300) {
        setWidgetTag("Widget-button");
        return;
      }

      if (windowSize.innerWidth < 300 && windowSize.innerHeight < 600) {
        setWidgetTag("Widget-mobile");
        return;
      }
      setWidgetTag("");
    })();
  }, [windowSize]);

  const fetchInteraction = async () => {
    try {
      const res = await api.get(`interactions/get-nodes/${id}`);
      if (res.status === 200) {
        const {
          response: { nodes, edges, ...intr },
        } = res.data;

        const nodeList = nodes.filter((x) => x.type === "Question");

        setIntData(intr);
        setFlowStyle({
          primary_color: intr?.primary_color || "#7B5AFF",
          secondary_color: intr?.secondary_color || "#B3A1FF",
          background_color: intr?.background_color || "#FFFFFF",
          language: intr?.language || "english",
          border_radius: intr?.border_radius || "Arial",
          font: intr?.font || 10,
        });
        i18n.changeLanguage(
          languageOptions.find((ele) => ele.value === intr?.language)?.key ||
            "en"
        );
        // i18n.changeLanguage("fr");
        setKey(
          nodeList.length > 0
            ? nodeList.find((ele) => ele.index === 1)?._id || ""
            : "End"
        );
        setQueNodes(nodeList);
        setEndNodes(nodes.find((x) => x.type === "End"));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
      navigate();
    }
  };

  const handleDevice = () => {
    if (isMobile) return "mobile";
    if (isDesktop) return "desktop";
    if (isTablet) return "tablet";
    return "other";
  };

  const handleSubmitAns = async (node, ansValue) => {
    setIsPost(true);
    try {
      const req = new FormData();
      req.append("interaction_id", node.interaction_id);
      req.append("node_id", node._id);
      req.append("node_answer_type", node.answer_type);
      req.append("device_name", handleDevice());
      if (node.answer_type === "multiple-choice") {
        if (Array.isArray(ansValue?.ans)) {
          ansValue?.ans.map((x, ind) => {
            req.append(`answer[${ind}]`, x.option);
          });
        } else {
          req.append(`answer[0]`, ansValue.ans.option);
        }
      } else if (node.answer_type === "nps") {
        req.append(`answer`, ansValue.ans.index);
      } else {
        req.append(`answer`, ansValue.ans);
      }
      if (node.answer_type === "open-ended") {
        req.append("type", ansValue.ansType);
      }
      if (answerId) {
        req.append("answer_id", answerId);
      }

      const res = await api.post(`interactions/add-answer`, req, {
        "Content-Type": "multipart/form-data",
      });
      if (res.status === 201) {
        const ansId = res.data?.response?.answerId;
        if (!answerId) {
          setAnswerId(ansId);
        }
        dispatch(showSuccess(res.data.message));
        handleNextTarget(
          res.data?.response?.isMultiple,
          res.data?.response?.isRedirect,
          res.data?.response?.target,
          ansValue,
          ansId
        );
        setIsContact(false);
      } else {
        dispatch(throwError(res.data.message));
        setIsPost(false);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
      setIsPost(false);
    }
  };

  const handleSubmitAnsWithContact = async (node, contactValue) => {
    setIsPost(true);
    try {
      const req = new FormData();
      req.append("interaction_id", node.interaction_id);
      req.append("node_id", node._id);
      req.append("node_answer_type", node.answer_type);
      if (node?.answer_type === "multiple-choice") {
        if (Array.isArray(ansData?.ans)) {
          ansData?.ans.map((x, ind) => {
            req.append(`answer[${ind}]`, x.option);
          });
        } else {
          req.append(`answer[0]`, ansData?.ans?.option);
        }
      } else if (node.answer_type === "nps") {
        req.append(`answer`, ansData.ans.index);
      } else {
        req.append(`answer`, ansData.ans);
      }
      if (node.answer_type === "open-ended") {
        req.append("type", ansData.ansType);
      }
      if (answerId) {
        req.append("answer_id", answerId);
      }

      Object.keys(contactValue).forEach((key) => {
        if (contactValue[key]) {
          req.append(`contact_details[${key}]`, contactValue[key]);
        }
      });

      const res = await api.post(`interactions/add-answer`, req, {
        "Content-Type": "multipart/form-data",
      });
      if (res.status === 201) {
        const ansId = res.data?.response?.answerId;
        if (!answerId) {
          setAnswerId(ansId);
        }
        dispatch(showSuccess(res.data.message));
        setIsContactCollected(true);
        handleNextTarget(
          res.data?.response?.isMultiple,
          res.data?.response?.isRedirect,
          res.data?.response?.target,
          ansData,
          ansId
        );
      } else {
        dispatch(throwError(res.data.message));
        setIsPost(false);
      }
    } catch (error) {
      console.log("error---------------", error);
      dispatch(handelCatch(error));
      setIsPost(false);
    }
  };

  const handleNextTarget = async (
    isMultiple,
    isRedirect,
    target,
    ansData,
    ansId
  ) => {
    const handleRedirection = async (url) => {
      await updateAnswerCompleted(ansId);
      window.location.href = url;
    };

    const handleTargetNode = (nodeId) => {
      setIsContact(false);
      setIsPost(false);
      setKey(nodeId);
    };

    if (isMultiple) {
      const ans = Array.isArray(ansData?.ans) ? ansData.ans[0] : ansData.ans;

      console.log("ans?.redirection_url", ans?.redirection_url);
      if (ans?.redirection_url) {
        await handleRedirection(ans.redirection_url);
        return;
      }

      if (ans?.targetedNodeId) {
        handleTargetNode(ans.targetedNodeId);
        return;
      }
    } else if (isRedirect) {
      await handleRedirection(target);
    } else {
      handleTargetNode(target);
    }
  };

  const updateAnswerCompleted = async (ansId) => {
    try {
      const res = await api.put(`interactions/update-is-completed-answer`, {
        answer_id: ansId,
      });
      if (res.status !== 200) {
        dispatch(throwError(res.data.message));
        setIsContact(false);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  return (
    <div className="ViewInteraction-container">
      <div id="controlled-tab-example">
        {widgetTag === "Widget-button" && (
          <div
            className="wp-100 d-flex"
            style={{
              background: "#fff",
              position: "absolute",
              width: "100%",
              bottom: "0px",
              height: "100%",
            }}
          >
            <div
              className="hp-100 m-0 p-0"
              style={{
                overflow: "hidden",
                width: "100%",
              }}
            >
              <div
                className="wp-100 hp-100 f-center"
                style={{
                  background: "black",
                }}
              >
                {queNodes?.length && (
                  <VideoPlayer
                    flowStyle={flowStyle}
                    videoUrl={queNodes?.[0]?.video_url || ""}
                    videoConfigForm={{
                      alignVideo: queNodes?.[0]?.video_align,
                      videoPosition: "center center",
                      overlayText: queNodes?.[0]?.overlay_text || "",
                      textSize: queNodes?.[0]?.text_size || "",
                      textReveal: [parseInt(queNodes?.[0]?.fade_reveal || 0)],
                    }}
                    getCurrentTime={(time) => {
                      setVideoTime(time);
                    }}
                    windowSizeTag={
                      widgetTag !== ""
                        ? widgetTag
                        : windowSize.innerWidth > 1000
                        ? "desktop"
                        : "tablet"
                    }
                    allControlsDisabled={true}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <div
          className="int-display"
          style={{
            display: widgetTag === "Widget-button" ? "none" : "inline-block",
          }}
        >
          {queNodes.length > 0 &&
            queNodes.map((node, index) => {
              const {
                video_url,
                video_align,
                overlay_text,
                text_size,
                fade_reveal,
                answer_type,
                answer_format,
              } = node;

              // if (key === node._id) {
              //   setKeyNode(node);
              //   console.log("node", node);
              // }
              return (
                key === node._id && (
                  <div
                    className="wp-100 d-flex"
                    style={{
                      background: "#fff",
                      position: "absolute",
                      width: "100%",
                      bottom: "0px",
                      height: "100%",
                    }}
                    key={node._id}
                  >
                    <div
                      className="hp-100 m-0 p-0"
                      style={{
                        overflow: "hidden",
                        width: windowSize.innerWidth > 1000 ? "55%" : "100%",
                      }}
                    >
                      <div
                        className="wp-100 hp-100 f-center"
                        style={{
                          background: "black",
                        }}
                      >
                        {video_url && (
                          <VideoPlayer
                            flowStyle={flowStyle}
                            videoUrl={video_url || ""}
                            videoConfigForm={{
                              alignVideo: video_align,
                              videoPosition: "center center",
                              overlayText: overlay_text || "",
                              textSize: text_size || "",
                              textReveal: [parseInt(fade_reveal || 0)],
                            }}
                            getCurrentTime={(time) => {
                              setVideoTime(time);
                            }}
                            windowSizeTag={
                              widgetTag !== ""
                                ? widgetTag
                                : windowSize.innerWidth > 1000
                                ? "desktop"
                                : "tablet"
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className="hp-100 f-center"
                      style={{
                        background:
                          windowSize.innerWidth > 1000
                            ? flowStyle.background_color
                            : "transparent",
                        ...(windowSize.innerWidth > 1000
                          ? { width: "45%", height: "100%" }
                          : {
                              position: "absolute",
                              zIndex: "1000",
                              width: "100%",
                              height:
                                openEndedKey || isContact ? "100%" : "unset",
                              bottom: "0px",
                            }),
                      }}
                    >
                      <div
                        className="wp-100 hp-100  d-flex"
                        style={{ gap: "20px" }}
                      >
                        {!isContact && answer_type === "open-ended" && (
                          <OpenEndedForm
                            flowStyle={flowStyle}
                            onNext={(ansValue) => {
                              if (
                                answer_format?.contact_form &&
                                !isContactCollected
                              ) {
                                setAnsData(ansValue);
                                setIsContact(true);
                                return;
                              }
                              handleSubmitAns(node, ansValue);
                            }}
                            node={node}
                            videoTime={videoTime}
                            isPost={isPost}
                            windowSize={windowSize}
                            setOpenEndedKey={setOpenEndedKey}
                            widgetTag={widgetTag}
                          />
                        )}

                        {!isContact && answer_type === "multiple-choice" && (
                          <MultipleChoiceForm
                            flowStyle={flowStyle}
                            onNext={(ansValue) => {
                              if (
                                answer_format?.contact_form &&
                                !isContactCollected
                              ) {
                                setAnsData(ansValue);
                                setIsContact(true);
                                return;
                              }
                              handleSubmitAns(node, ansValue);
                            }}
                            node={node}
                            isPost={isPost}
                            windowSize={windowSize}
                          />
                        )}

                        {!isContact && answer_type === "button" && (
                          <ButtonForm
                            flowStyle={flowStyle}
                            onNext={(ansValue) => {
                              if (
                                answer_format?.contact_form &&
                                !isContactCollected
                              ) {
                                setAnsData(ansValue);
                                setIsContact(true);
                                return;
                              }
                              handleSubmitAns(node, ansValue);
                            }}
                            node={node}
                            videoTime={videoTime}
                            isPost={isPost}
                            windowSize={windowSize}
                          />
                        )}

                        {!isContact && answer_type === "file-upload" && (
                          <FileUploadForm
                            flowStyle={flowStyle}
                            onNext={(ansValue) => {
                              if (
                                answer_format?.contact_form &&
                                !isContactCollected
                              ) {
                                setAnsData(ansValue);
                                setIsContact(true);
                                return;
                              }
                              handleSubmitAns(node, ansValue);
                            }}
                            node={node}
                            isPost={isPost}
                            windowSize={windowSize}
                          />
                        )}

                        {!isContact && answer_type === "nps" && (
                          <NpsForm
                            flowStyle={flowStyle}
                            onNext={(ansValue) => {
                              if (
                                answer_format?.contact_form &&
                                !isContactCollected
                              ) {
                                setAnsData(ansValue);
                                setIsContact(true);
                                return;
                              }
                              handleSubmitAns(node, ansValue);
                            }}
                            node={node}
                            isPost={isPost}
                            windowSize={windowSize}
                          />
                        )}

                        {!isContact && answer_type === "calender" && (
                          <CalenderForm
                            onNext={() => {}}
                            node={node}
                            isPost={isPost}
                          />
                        )}

                        {isContact && !isContactCollected && (
                          <ContactForm
                            node={node}
                            onNext={(contactValue) =>
                              handleSubmitAnsWithContact(node, contactValue)
                            }
                            flowStyle={flowStyle}
                            isPost={isPost}
                            windowSize={windowSize}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          {key === endNodes?._id && (
            <div
              style={{
                background: "#fff",
                position: "absolute",
                top: "0px",
                bottom: "0px",
                width: "100%",
              }}
            >
              {key === endNodes?._id && (
                <EndScreen
                  answerId={answerId}
                  flowStyle={flowStyle}
                  windowSize={windowSize}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewInteraction;
