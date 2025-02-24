import React, { useEffect, useState } from "react";
import styles from "./QnaFlow.module.scss";
import { icons } from "../../../../../utils/constants";
import CustomMenu from "./CustomMenu";
import Tooltip from "../../../../../components/layouts/Tooltip";
import dayjs from "dayjs";
import ConversationsAnswer from "../../../AssetAllocation/Conversations/ConversationsAnswer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  setReplyModalData,
  setWebcamModelConfig,
  throwError,
} from "../../../../../store/globalSlice";
import { api } from "../../../../../services/api";
import { Edit, ReplyIcon, Trash2Icon, VideoIcon } from "lucide-react";
import AddEditContactModal from "../../AddEditContactModal";

function QnaFlow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrganizationId } = useSelector((state) => state.global);
  const [interactionAnswers, setInteractionAnswers] = useState([]);
  const [contact, setContact] = useState({});
  const [selectChat, setSelectChat] = useState(null);
  const [answersList, setAnswersList] = useState([]);
  const [selectMetingCard, setSelectMetingCard] = useState({});
  const [isShowAddEditModal, setIsShowAddEditModal] = useState(false);
  useEffect(() => {
    if (id) {
      fetchContactConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchContactConversation = async () => {
    try {
      const res = await api.get(`contact/contact-conversation/${id}`);
      if (res.status === 200) {
        const { answersDetails, ...contact } = res.data.response;
        setInteractionAnswers(answersDetails);
        setSelectChat(answersDetails?.[0]);
        setContact(contact);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  useEffect(() => {
    if (selectChat) {
      if (selectChat.answers.length > 0) {
        setSelectMetingCard(selectChat.answers?.[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectChat]);

  useEffect(() => {
    if (selectChat?.answers?.length > 0) {
      const newArray = groupByNodeId(selectChat?.answers);
      setAnswersList(newArray);
    }
  }, [selectChat?.answers]);

  const groupByNodeId = (data) => {
    return Object.values(
      data.reduce((acc, item) => {
        const {
          node_id,
          answer_details,
          createdAt,
          _id,
          nodeDetails,
          node_answer_type,
        } = item;

        if (!acc[node_id]) {
          acc[node_id] = {
            node_id,
            node_type: item.node_type,
            nodeDetails,
            answers: [],
          };
        }
        acc[node_id].answers.push({
          _id,
          answer_details,
          createdAt,
          node_answer_type,
        });

        return acc;
      }, {})
    );
  };

  const openMailClient = (email) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <>
      {isShowAddEditModal && (
        <AddEditContactModal
          show={isShowAddEditModal}
          handleClose={() => {
            setIsShowAddEditModal(false);
          }}
          selectedOrganizationId={selectedOrganizationId}
          isEdit={true}
          editContact={contact}
          fetchContact={fetchContactConversation}
        />
      )}
      <div className={styles.qnaContainer}>
        <div className={styles.qnaSidebar}>
          <div className={styles.profileDet}>
            <div className={`${styles.profileImg}`}>
              <img
                src={icons.videoUser}
                alt=""
                className="fit-image w-60 h-60"
              />
            </div>
            <div className={`p-0 wp-100 ${styles.det}`}>
              <div className="h-70 ps-8">
                <div
                  className="text-20-600"
                  style={{ textTransform: "capitalize" }}
                >
                  {contact?.contact_name || ""}
                </div>

                <div
                  className={styles.email}
                  style={{ cursor: "pointer" }}
                  onClick={() => openMailClient(contact?.contact_email)}
                >
                  <Tooltip
                    content={
                      <div style={{ color: "yellow" }}>Open mail box</div>
                    }
                    placement="right"
                    offsetNumber={20}
                  >
                    <div>{contact?.contact_email}</div>
                  </Tooltip>
                </div>
                <div style={{ color: "darkblue" }} className="text-14-500">
                  {contact?.phone_number || ""}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0px 15px",
                  height: "50px",
                }}
              >
                <div
                  className={styles.contact_btn_group}
                  onClick={() => setIsShowAddEditModal(true)}
                >
                  <Edit size={20} className={styles.contact_btn} />
                </div>
                <div className={styles.contact_btn_group}>
                  <Trash2Icon size={20} className={styles.contact_btn} />
                </div>
                <div className={styles.videoCallBtnContainer}>
                  <button
                    className={styles.videoCallBtn}
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
                    <div className={styles.btnBg}></div>
                    <VideoIcon className={styles.VideoIcon} />
                    <div>Video reply</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.recentChats}>
            <div className={`p-5 pt-20 hp-100 flow ${styles.list}`}>
              {interactionAnswers.length === 0
                ? ""
                : interactionAnswers.map((ele, index) => {
                    const isSelected = ele._id === selectChat?._id;
                    return (
                      <div
                        className={`${styles.chatCard} mb-20 pointer`}
                        key={index}
                        onClick={() => setSelectChat(ele)}
                        style={{ background: isSelected ? "#b19eff" : "white" }}
                      >
                        <div className="d-flex ps-5 fa-center">
                          <div
                            className="w-50 h-50 rounded-circle f-center"
                            style={{
                              overflow: "hidden",
                              background: "rgba(0,0,0,0.15)",
                            }}
                          >
                            <img
                              src={icons.branch}
                              alt="avatar"
                              className={`fit-image w-30 h-30 ${styles.ImageWhite}`}
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
                              {ele?.interactionDetails?.title}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "50px",
                            height: "60px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <div className="w-24 h-24">
                            <CustomMenu
                              isSelected={isSelected}
                              showDeleteModal={false}
                              setShowDeleteModal={() => {}}
                            />
                          </div>
                          <div
                            style={{ color: isSelected ? "white" : "#8C8E90" }}
                          >
                            {dayjs(ele.createdAt).format("DD/MM/YY")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
        <div className={styles.qnaBody}>
          <div className={`${styles.qnaHeader}`}>
            <div className="f-center">
              <div
                className="w-75 h-75 profile-img"
                style={{
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={icons.branch}
                  alt=""
                  className={`fit-image w-55 h-55 ${styles.ImageWhite}`}
                />
              </div>
              <div
                className="text-18-600 color-darkText ms-10"
                style={{ textTransform: "capitalize" }}
              >
                {selectChat?.interactionDetails?.title}
              </div>
            </div>
            <div className={styles.iconGroup}>
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
                  className={styles.replayBtn}
                  onClick={() => {
                    dispatch(setWebcamModelConfig({ isShow: true }));
                    dispatch(
                      setReplyModalData({
                        interactionId: selectChat.interactionDetails._id,
                        type: "reply",
                        contactId: contact._id,
                        answerId: selectMetingCard._id,
                      })
                    );
                  }}
                >
                  <img
                    src={icons.reply}
                    alt=""
                    className="w-25 h-25 fit-image"
                  />
                  <div>reply</div>
                </div>
              </Tooltip>
              <div className="w-20 h-20">
                <img
                  src={icons.edit}
                  alt=""
                  className="fit-image hover-icons-effect"
                />
              </div>
              <div className="w-20 h-20" onClick={() => {}}>
                <Tooltip
                  content={
                    <div className="d-flex gap-1 flex-column">
                      <div style={{ color: "#FFFFFF" }}>Tagged as:</div>
                      <div style={{ color: "#BEBEBF", fontSize: "10px" }}>
                        CXXCX
                      </div>
                      <div style={{ color: "#E4C548" }}>Click to edit tags</div>
                    </div>
                  }
                >
                  <img
                    src={icons.teg_svg}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </Tooltip>
              </div>
              <div className="w-20 h-20">
                <img
                  src={icons.exportPng}
                  alt=""
                  className="fit-image hover-icons-effect"
                />
              </div>
            </div>
          </div>
          <div className={styles.qnaContent}>
            {selectMetingCard && (
              <ConversationsAnswer selectMetingCard={selectMetingCard} />
            )}
          </div>
          <div className={styles.qnaFooter}>
            <div className={styles.metingCardBody}>
              {answersList?.length > 0 &&
                answersList.map((answerGroup, index) => {
                  // const isActive = selectMetingCard?._id === ele?._id;
                  const { nodeDetails, answers, node_type } = answerGroup;
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      {node_type === "reply_node" && (
                        <div className={styles.replySection}>
                          <div className={styles.replySectionLine}></div>
                          <div className={styles.replySectionCircle}>
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
                                      {selectChat.interactionDetails?.title}
                                    </span>
                                    interaction answer.
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
                        const isActive = selectMetingCard._id === ele._id;
                        return (
                          <div
                            key={ele._id}
                            className={styles.metingCard}
                            onClick={() =>
                              setSelectMetingCard({ ...ele, nodeDetails })
                            }
                            style={
                              isActive
                                ? {
                                    borderBottom: "3px solid #8000ff",
                                  }
                                : {}
                            }
                          >
                            <div
                              className={styles.nodeThumbnailBox}
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
                              <div className={styles.imgBtn + " wp-100"}>
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
    </>
  );
}

export default QnaFlow;
