import React, { useState } from "react";
import styles from "./QnaFlow.module.scss";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import CustomMenu from "./CustomMenu";
import DeleteModal from "../../../../../components/layouts/DeleteModal";
import UpdateTagsModal from "./Modals/UpdateTagsModal";
import TagListModal from "./Modals/TagListModal";
import AddTagModal from "./Modals/AddTagModal";
import ShareModal from "./Modals/ShareModal";
import Tooltip from "../../../../../components/layouts/Tooltip";
import { useQnaContext } from "../../../../../services/context/QnaContext/QnaFlowContext";

function QnaFlow({ isDirectMessageScreen }) {
  const [selectChat, setSelectChat] = useState(1);
  const [selectMetingCard, setSelectMetingCard] = useState(1);
  const {
    showDeleteModal,
    setShowDeleteModal,
    showUpdateTagModal,
    setShowUpdateTagModal,
    showTagList,
    setShowTagList,
    showDeleteTagsModal,
    setShowDeleteTagsModal,
    showNewTagAddModal,
    setShowNewTagAddModal,
    showShareModal,
    setShowShareModal,
  } = useQnaContext();

  return (
    <>
      <div className={styles.qnaContainer}>
        <div className={styles.qnaSidebar}>
          <div className={styles.profileDet}>
            <div className={`w-89 h-79 ${styles.profileImg}`}>
              <img src={icons.avatar7} alt="" className="fit-image" />
            </div>
            <div className={`p-5 w-200 ms-10 ${styles.det}`}>
              <div>
                <div className="text-20-600">Billy Bil</div>
                <div className="text-12-500">billybil@gmail.com</div>
                <div style={{ color: "#4D4AEA" }}>+919876378296</div>
              </div>
              <div className="d-flex gap-2 align-self-end align-items-center">
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
              {/* <div className="fb-center mt-10">
                <div className="w-18">
                  <img
                    src={icons.videoIcon}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
                <div className="w-18">
                  <img
                    src={icons.editIcon}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
                <div className="w-18">
                  <img
                    src={icons.deleteIcon}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className={styles.recentChats}>
            {isDirectMessageScreen && (
              <>
                <div
                  className={styles.titleContainer}
                  style={{
                    padding: "5px",
                    paddingTop: "15px",
                  }}
                >
                  <div className="color-darkText text-14-600">
                    Start New {isDirectMessageScreen && "Conversation"}
                  </div>
                </div>
                <div className={`${styles.chatCard} mb-20 pointer mt-5`}>
                  <div
                    className="ps-20 d-flex align-items-center justify-content-evenly px-10 py-20"
                    style={{ color: "#1B2559", width: "100%" }}
                  >
                    <div className="w-25 h-25" style={{ overflow: "hidden" }}>
                      <img
                        src={icons.videoIcon}
                        alt="avatar"
                        className="fit-image "
                      />
                    </div>
                    <div>
                      Send a video message to
                      <span
                        className="text-12-500"
                        style={{ color: "#4D4AEA" }}
                      >
                        {" "}
                        Billy Bil
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div
              className={styles.titleContainer}
              style={{
                padding: "5px",
                paddingTop: "15px",
              }}
            >
              <div className="color-darkText text-14-600">
                Last Week {isDirectMessageScreen && "Conversation"}
              </div>
            </div>
            <div className={`p-5 pt-20 hp-100 auri-scroll ${styles.list}`}>
              {[1, 2, 3, 4].map((ele, index) => {
                const isSelected = ele === selectChat;
                return (
                  <div
                    className={`${styles.chatCard} mb-20 pointer`}
                    key={index}
                    onClick={() => setSelectChat(ele)}
                    style={{ background: isSelected ? "#b19eff" : "white" }}
                  >
                    <div className="d-flex ps-30">
                      <div
                        className="w-50 h-50 rounded-circle f-center"
                        style={{ overflow: "hidden" }}
                      >
                        <img
                          src={icons.avatar5}
                          alt="avatar"
                          className="fit-image "
                        />
                      </div>
                      <div style={{ padding: "5px", paddingLeft: "10px" }}>
                        <div
                          className="pb-5 text-14-500"
                          style={{ color: isSelected ? "white" : "#1B2559" }}
                        >
                          Jacob Jones (3)
                        </div>
                        <div
                          className="text-12-500"
                          style={{ color: isSelected ? "white" : "#8C8E90" }}
                        >
                          +1 123456789
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "30px",
                        height: "60px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="w-24 h-24">
                        <CustomMenu
                          isSelected={isSelected}
                          showDeleteModal={showDeleteModal}
                          setShowDeleteModal={setShowDeleteModal}
                        />
                      </div>
                      <div style={{ color: isSelected ? "white" : "#8C8E90" }}>
                        5m
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
              <div className="w-79 h-69 profile-img">
                <img src={icons.avatar7} alt="" className="fit-image" />
              </div>
              <div className="text-18-600 color-darkText ms-10">
                QnA Flow-Flow 2
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
              <div className="w-20 h-20" onClick={() => setShowTagList(true)}>
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
          <div className={styles.qnaContent}></div>
          <div className={styles.qnaFooter}>
            <div className={styles.metingCardBody}>
              {[1, 2, 3].map((ele, index) => {
                const isActive = selectMetingCard === ele;
                return (
                  <div
                    className={styles.metingCard}
                    key={index}
                    onClick={() => setSelectMetingCard(ele)}
                    style={
                      isActive
                        ? {
                            borderBottom: "3px solid blue",
                          }
                        : {}
                    }
                  >
                    <div className="w-100" style={{ position: "relative" }}>
                      <img src={icons.avatar8} alt="" className="fit-image" />
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
              })}
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          setShowDeleteModal(false);
          // TODO: Implement delete functionality here
        }}
        title="Are you sure you want to proceed?"
        text="This will erase all messages and replies in this conversation. Once deleted, they cannot be recovered."
      />
      <UpdateTagsModal
        show={showUpdateTagModal}
        handleClose={() => setShowUpdateTagModal(false)}
      />
      <TagListModal
        show={showTagList}
        handleClose={() => setShowTagList(false)}
      />
      <DeleteModal
        show={showDeleteTagsModal}
        handleClose={() => setShowDeleteTagsModal(false)}
        onDelete={() => {
          setShowDeleteTagsModal(false);
          // TODO: Implement delete functionality here
        }}
        title="Are you sure you want to delete the tag?"
        text="All people tagged with this tag will be dissociated from this tag."
      />
      <AddTagModal
        show={showNewTagAddModal}
        handleClose={() => setShowNewTagAddModal(false)}
      />
      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
      />
    </>
  );
}

export default QnaFlow;
