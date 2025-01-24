import React, { useEffect, useState } from "react";
import styles from "./QnaFlow.module.scss";
import { icons } from "../../../../../utils/constants";
import CustomMenu from "./CustomMenu";
import Tooltip from "../../../../../components/layouts/Tooltip";
import dayjs from "dayjs";
import ConversationsAnswer from "../../../AssetAllocation/Conversations/ConversationsAnswer";

function QnaFlow({ answersDetails, contact }) {
  const [selectChat, setSelectChat] = useState(null);
  const [selectMetingCard, setSelectMetingCard] = useState({});

  useEffect(() => {
    if (answersDetails.length > 0) {
      setSelectChat(answersDetails?.[0]);
    }
  }, [answersDetails]);

  useEffect(() => {
    if (selectChat) {
      if (selectChat.answers.length > 0) {
        setSelectMetingCard(selectChat.answers?.[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectChat]);
  return (
    <>
      <div className={styles.qnaContainer}>
        <div className={styles.qnaSidebar}>
          <div className={styles.profileDet}>
            <div className={`w-85 h-100 ${styles.profileImg}`}>
              <img
                src={icons.videoUser}
                alt=""
                className="fit-image w-60 h-60"
              />
            </div>
            <div className={`p-5 w-200 ms-10 ${styles.det}`}>
              <div>
                <div
                  className="text-20-600"
                  style={{ textTransform: "capitalize" }}
                >
                  {contact?.contact_name || ""}
                </div>
                <div className="text-12-500">
                  {contact?.contact_email || ""}
                </div>
                <div style={{ color: "#4D4AEA" }}>
                  {contact?.phone_number || ""}
                </div>
              </div>
              <div className="d-flex gap-3 align-self-end align-items-center mt-10">
                <div className="w-18">
                  <img
                    src={icons.videoIcon}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
                <div className="w-17">
                  <img
                    src={icons.editIcon}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
                <div className="w-14">
                  <img
                    src={icons.deleteIcon}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.recentChats}>
            <div className={`p-5 pt-20 hp-100 auri-scroll ${styles.list}`}>
              {answersDetails.length === 0
                ? ""
                : answersDetails.map((ele, index) => {
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
          <div className={`h-90 ${styles.qnaHeader}`}>
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
            <ConversationsAnswer selectMetingCard={{ ...selectMetingCard }} />
          </div>
          <div className={styles.qnaFooter}>
            <div className={styles.metingCardBody}>
              {selectChat?.answers?.length > 0
                ? selectChat.answers.map((answer, index) => {
                    const isActive = selectMetingCard === answer;
                    return (
                      <div
                        className={styles.metingCard}
                        key={index}
                        onClick={() => setSelectMetingCard(answer)}
                        style={
                          isActive
                            ? {
                                borderBottom: "3px solid blue",
                              }
                            : {}
                        }
                      >
                        <div
                          className="w-100 h-110"
                          style={{
                            position: "relative",
                            borderRadius: "10px",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={answer.nodeDetails.video_thumbnail}
                            alt=""
                            className={`fit-image ${styles.nodeImage}`}
                          />
                          <div className={`w-100 ${styles.imgBtn}`}>
                            <div className="text-12-500">Jacob</div>
                          </div>
                        </div>
                        {isActive && (
                          <div className="text-11-500 color-darkText m-0 p-0 mt-10">
                            29 OCT 24 | 09:36
                          </div>
                        )}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QnaFlow;
