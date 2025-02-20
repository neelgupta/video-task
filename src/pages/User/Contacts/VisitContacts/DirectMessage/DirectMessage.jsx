import React, { useEffect, useState } from "react";
import "./DirectMessage.scss";
import { icons } from "../../../../../utils/constants";
import { useDispatch } from "react-redux";
import {
  setReplyModalData,
  setWebcamModelConfig,
  throwError,
} from "../../../../../store/globalSlice";
import { useParams } from "react-router-dom";
import { api } from "../../../../../services/api";
import dayjs from "dayjs";
import { Edit, ReplyIcon, Trash2Icon, VideoIcon } from "lucide-react";
import ConversationsAnswer from "../../../AssetAllocation/Conversations/ConversationsAnswer";
import Tooltip from "../../../../../components/layouts/Tooltip";
const DirectMessage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [contact, setContact] = useState({});
  const [selectChat, setSelectChat] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  useEffect(() => {
    if (id) getDirectMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getDirectMessage = async () => {
    try {
      const res = await api.get(`reply/get-direct-message-contact/${id}`);
      if (res.status === 200) {
        const { messageList, ...contact } = res.data.response;
        setContact(contact);
        setMessageList(messageList);
        setSelectChat(messageList[0]);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  useEffect(() => {
    if (selectChat?.reply) {
      const newList = groupByNodeId(selectChat?.reply?.answers || []);
      setAnswerList(newList);
      setSelectedAnswer(selectChat?.reply?.answers?.[0]);
    } else {
      setAnswerList([]);
      setSelectedAnswer({});
    }
  }, [selectChat]);

  const groupByNodeId = (data) => {
    const newObject = data.reduce((acc, item) => {
      const { node_id, nodeDetails } = item;
      if (!acc[node_id]) {
        acc[node_id] = {
          ...nodeDetails,
          answers: [],
        };
      }
      acc[node_id].answers.push({
        ...item,
      });

      return acc;
    }, {});
    return Object.values(newObject);
  };
  return (
    <div className="direct-message-container">
      <div className="direct-message-sidebar">
        <div className="direct-message-sidebar-header">
          <div className="direct-message-sidebar-header-profile-img">
            <img src={icons.videoUser} alt="" className="fit-image w-60 h-60" />
          </div>
          <div className="direct-message-sidebar-header-det">
            <div>
              <div
                className="text-20-600"
                style={{ textTransform: "capitalize" }}
              >
                {contact?.contact_name || ""}
              </div>
              <div className="text-12-500">{contact?.contact_email || ""}</div>
              <div style={{ color: "#4D4AEA" }}>
                {contact?.phone_number || ""}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="contact_btn_group">
                <Edit size={20} className="contact_btn" />
              </div>
              <div className="contact_btn_group">
                <Trash2Icon size={20} className="contact_btn" />
              </div>
              <div className={"videoCallBtnContainer"}>
                <button
                  className="videoCallBtn"
                  onClick={() => {
                    dispatch(setWebcamModelConfig({ isShow: true }));
                    dispatch(
                      setReplyModalData({
                        type: "direct-message",
                        contactId: id,
                      })
                    );
                  }}
                >
                  <VideoIcon className="VideoIcon" />
                  <div>Video reply</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="direct-message-sidebar-reply-cheat">
          <div className={`p-5 pt-20 hp-100 flow list`}>
            {messageList.map((ele, index) => {
              console.log("ele", ele);
              const isSelected = ele._id === selectChat._id;
              return (
                <div
                  className={`chatCard mb-20 pointer`}
                  key={index}
                  onClick={() => setSelectChat(ele)}
                  style={{ background: isSelected ? "#b19eff" : "white" }}
                >
                  <div className="d-flex ps-5 fa-center">
                    <div
                      className="rounded-circle f-center chatCard-img-box"
                      style={{
                        overflow: "hidden",
                        background: "rgba(0,0,0,0.15)",
                        border: "2px solid",
                        borderColor: isSelected ? "#fff" : "transparent",
                      }}
                    >
                      <img
                        src={ele?.video_thumbnail}
                        alt="avatar"
                        className={`chatCard-img ImageWhite`}
                      />
                    </div>
                    <div
                      style={{
                        padding: "5px",
                        paddingLeft: "10px",
                        height: "100%",
                      }}
                      className="fa-center"
                    >
                      <div
                        className="p-0 m-0 text-16-700"
                        style={{
                          color: isSelected ? "white" : "#1B2559",
                          textTransform: "capitalize",
                        }}
                      >
                        {ele?.title}
                      </div>
                    </div>
                  </div>
                  <div
                    className="chatCard-date"
                    style={{ color: isSelected ? "white" : "#8C8E90" }}
                  >
                    {dayjs(ele?.createdAt).format("DD MMM YYYY | HH:mm")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="direct-message-content">
        <div className="direct-message-content-header">
          <div>{selectChat?.title}</div>

          <div className="direct-message-content-header-btn-group">
            <Tooltip
              placement="left"
              content={
                <div
                  style={{
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    className="w-10 h-10 "
                    style={{
                      background: "yellow",
                      borderRadius: "50px",
                    }}
                  ></div>
                  <div>
                    {`Reply to `}
                    <span
                      style={{
                        color: "yellow",
                        fontWeight: "600",
                        textDecoration: "underline",
                      }}
                    >
                      {contact?.contact_email}
                    </span>
                  </div>
                </div>
              }
            >
              <div
                className="replay-btn"
                onClick={() => {
                  dispatch(setWebcamModelConfig({ isShow: true }));
                  dispatch(
                    setReplyModalData({
                      directNodeId: selectChat._id,
                      type: "reply-message",
                      contactId: contact._id,
                      answerId: selectChat.reply._id,
                    })
                  );
                }}
              >
                <img src={icons.reply} alt="" className="w-25 h-25 fit-image" />
                <div>reply</div>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="direct-message-content-body">
          <div className="direct-message-content-body-message">
            {selectedAnswer && (
              <ConversationsAnswer
                selectMetingCard={{
                  ...selectedAnswer,
                  node_answer_type: selectedAnswer?.nodeDetails?.answer_type,
                }}
              />
            )}
          </div>
          <div className="direct-message-content-body-list">
            {answerList?.length > 0 &&
              answerList.map((answerGroup, index) => {
                // const isActive = selectMetingCard?._id === ele?._id;
                const { answers, ...nodeDetails } = answerGroup;
                return (
                  <div key={index} style={{ display: "flex" }}>
                    {nodeDetails?.type === "reply-message" && (
                      <div className="reply-section">
                        <div className="reply-section-line"></div>
                        <div className="reply-section-circle">
                          <Tooltip
                            placement="top"
                            offsetNumber={65}
                            content={
                              <div>
                                <div
                                  style={{
                                    color: "white",
                                    fontSize: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      background: "yellow",
                                      borderRadius: "50px",
                                      marginRight: "10px",
                                    }}
                                  ></div>
                                  Reply to
                                  <span
                                    style={{
                                      color: "yellow",
                                      fontWeight: "900",
                                      margin: "0px 5px",
                                    }}
                                  >
                                    {selectChat?.title}
                                  </span>
                                  direct message answer.
                                </div>
                                <div
                                  style={{
                                    color: "white",
                                    fontSize: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "5px 0px",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "900",
                                      fontSize: "10px",
                                      color: "#00ffff",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    {dayjs(nodeDetails?.createdAt).format(
                                      "DD MMM YYYY | HH:mm"
                                    )}
                                  </span>
                                </div>
                              </div>
                            }
                          >
                            <div>
                              <ReplyIcon size={18} />
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    )}
                    {answers.map((ele, index) => {
                      const { nodeDetails } = ele;
                      const isActive = selectedAnswer._id === ele._id;
                      return (
                        <div
                          key={ele._id}
                          className="meeting-card"
                          onClick={() => setSelectedAnswer({ ...ele })}
                          style={
                            isActive
                              ? {
                                  borderBottom: "3px solid #8000ff",
                                }
                              : {}
                          }
                        >
                          <div
                            className="node-thumbnail-box"
                            style={
                              isActive
                                ? {
                                    boxSizing: "border-box",
                                    border: "2px solid gold",
                                  }
                                : {}
                            }
                          >
                            <img src={nodeDetails?.video_thumbnail} alt="" />
                            <div className="img-btn wp-100">
                              <div className="text-10-600">
                                {nodeDetails?.title || ""}
                              </div>
                            </div>
                          </div>

                          {isActive && (
                            <>
                              <div className="text-11-500 color-darkText m-0 p-0 mt-5">
                                {dayjs(nodeDetails?.createdAt).format(
                                  "DD MMM YYYY | HH:mm"
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessage;
