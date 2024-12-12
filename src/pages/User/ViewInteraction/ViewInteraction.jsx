import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ViewInteraction.scss";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { api } from "../../../services/api";
import { handelCatch } from "../../../store/globalSlice";
import { VideoPlayer } from "../../../components";
import OpenEndedForm from "./AnswerForm/OpenEndedForm";
import { decrypt } from "../../../utils/helpers";
import MultipleChoiceForm from "./AnswerForm/MultipleChoiceForm";
import ButtonForm from "./AnswerForm/ButtonForm";
import FileUploadForm from "./AnswerForm/FileUploadForm";
function ViewInteraction() {
  const { token, type } = useParams();
  const id = decrypt(token);
  const [key, setKey] = useState(0);
  const [queNodes, setQueNodes] = useState([]);
  const [endNodes, setEndNodes] = useState([]);
  const [intData, setIntData] = useState(null);
  const [videoTime, setVideoTime] = useState({});
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
                        {answer_type === "open-ended" && (
                          <OpenEndedForm
                            onNext={() => {
                              handleNext(index);
                            }}
                            node={node}
                            videoTime={videoTime}
                          />
                        )}

                        {answer_type === "multiple-choice" && (
                          <MultipleChoiceForm
                            onNext={() => {
                              handleNext(index);
                            }}
                            node={node}
                          />
                        )}

                        {answer_type === "button" && (
                          <ButtonForm
                            onNext={() => {
                              handleNext(index);
                            }}
                            node={node}
                            videoTime={videoTime}
                          />
                        )}

                        {answer_type === "file-upload" && (
                          <FileUploadForm
                            onNext={() => {
                              handleNext(index);
                            }}
                            node={node}
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
      {/* <Button
        className="text-18-600 wp-100 p-15"
        style={{
          background: "#f0f0f0",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          cursor: "pointer",
        }}
        disabled={index === 0}
        onClick={() => {
          setKey(index - 1);
        }}
      >
        <span>Back</span>
      </Button>
      <Button
        className="text-18-600 wp-100 p-15"
        style={{
          background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          handleNext(index);
        }}
      >
        <span>Next</span>
      </Button> */}
    </div>
  );
}

export default ViewInteraction;
