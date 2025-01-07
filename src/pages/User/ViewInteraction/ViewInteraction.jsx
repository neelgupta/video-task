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
// profileData;
function ViewInteraction() {
  const { token, type } = useParams();
  const id = decrypt(token);
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
  const [flowStyle, setFlowStyle] = useState({
    primary_color: "#7B5AFF",
    secondary_color: "#B3A1FF",
    background_color: "#FFFFFF",
    language: "english",
    border_radius: "Arial",
    font: 10,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchInteraction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    console.log("flowStyle", flowStyle);
  }, [flowStyle]);

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
        setKey(nodeList.length > 0 ? 0 : "End");
        setQueNodes(nodeList);
        setEndNodes(nodes.find((x) => x.type === "End"));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
      navigate();
    }
  };

  const handleNext = (index) => {
    if (index === queNodes.length - 1) {
      setKey("End");
      return;
    }
    setKey(index + 1);
  };

  const handleSubmitAns = async (index, node, ansValue) => {
    setIsPost(true);
    try {
      const req = new FormData();
      req.append("interaction_id", node.interaction_id);
      req.append("node_id", node._id);
      req.append("node_answer_type", node.answer_type);

      if (node.answer_type === "multiple-choice") {
        if (Array.isArray(ansValue?.ans)) {
          ansValue?.ans.map((x, ind) => {
            req.append(`answer[${ind}]`, x);
          });
        } else {
          req.append(`answer[0]`, ansValue.ans);
        }
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
        handleNext(index);
        setIsContact(false);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsPost(false);
  };

  const handleSubmitAnsWithContact = async (index, node, contactValue) => {
    setIsPost(true);
    try {
      const req = new FormData();
      req.append("interaction_id", node.interaction_id);
      req.append("node_id", node._id);
      req.append("node_answer_type", node.answer_type);
      if (Array.isArray(ansData?.ans)) {
        ansData?.ans.map((x, ind) => {
          req.append(`answer[${ind}]`, x);
        });
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
        setIsContact(false);
        handleNext(index);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsPost(false);
  };

  return (
    <div className="ViewInteraction-container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        className="mb-3"
        style={{ border: "none" }}
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
            return (
              <Tab eventKey={index} key={index}>
                {key === index && (
                  <div
                    className="wp-100 d-flex"
                    style={{
                      background: "#fff",
                      position: "absolute",
                      top: "0px",
                      bottom: "0px",
                    }}
                  >
                    <div
                      className="wp-55 hp-100 m-0 p-0"
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="wp-100 hp-100 f-center"
                        style={{ background: "black" }}
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
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className="wp-45 hp-100 f-center"
                      style={{ background: flowStyle.background_color }}
                    >
                      <div
                        className="wp-100 hp-100 p-30 d-flex"
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
                              handleSubmitAns(index, node, ansValue);
                            }}
                            node={node}
                            videoTime={videoTime}
                            isPost={isPost}
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
                              handleSubmitAns(index, node, ansValue);
                            }}
                            node={node}
                            isPost={isPost}
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
                              handleSubmitAns(index, node, ansValue);
                            }}
                            node={node}
                            videoTime={videoTime}
                            isPost={isPost}
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
                              handleSubmitAns(index, node, ansValue);
                            }}
                            node={node}
                            isPost={isPost}
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
                              handleSubmitAnsWithContact(
                                index,
                                node,
                                contactValue
                              )
                            }
                            flowStyle={flowStyle}
                            isPost={isPost}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Tab>
            );
          })}
        <Tab eventKey="End" className="wp-100 hp-100 p-0">
          <div
            style={{
              background: "#fff",
              position: "absolute",
              top: "0px",
              bottom: "0px",
              width: "100%",
            }}
          >
            <EndScreen
              answerId={answerId}
              inEnd={key === "End"}
              flowStyle={flowStyle}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ViewInteraction;
