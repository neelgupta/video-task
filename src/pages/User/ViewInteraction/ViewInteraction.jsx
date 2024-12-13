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
  const [isPost, setIsPost] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchInteraction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchInteraction = async () => {
    try {
      const res = await api.get(`interactions/get-nodes/${id}`);
      if (res.status === 200) {
        const {
          response: { nodes, edges, ...intr },
        } = res.data;
        setIntData(intr);
        setQueNodes(nodes.filter((x) => x.type === "Question"));
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
  const handleBack = (index) => {
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
      if (Array.isArray(ansValue?.ans)) {
        ansValue?.ans.map((x, ind) => {
          req.append(`answer[${ind}]`, x);
        });
      } else {
        req.append(`answer`, ansValue.ans);
      }
      if (node.answer_type === "open-ended") {
        req.append("type", ansValue.ansType);
      }
      const res = await api.post(`interactions/add-answer`, req);
      if (res.status === 201) {
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

  const handleSubmitAnsWithContact = async (index, node) => {
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
      const res = await api.post(`interactions/add-answer`, req);
      if (res.status === 201) {
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
                    <div className="wp-45 hp-100 f-center">
                      <div
                        className="wp-100 hp-100 p-30 d-flex"
                        style={{ gap: "20px" }}
                      >
                        {!isContact && answer_type === "open-ended" && (
                          <OpenEndedForm
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
                            onNext={(ansValue) => {
                              console.log("ansValue", ansValue);
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

                        {isContact && !isContactCollected && (
                          <ContactForm
                            node={node}
                            onNext={() =>
                              handleSubmitAnsWithContact(index, node)
                            }
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
        <Tab eventKey="End">
          <div>End</div>
          <Button onClick={() => setKey(queNodes.length - 1)}>Back</Button>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ViewInteraction;
