/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import "./Interactions.scss";
import { icons } from "../../../utils/constants";
import { creteImgFilter, getColorFromLetter } from "../../../utils/helpers";
import { Button, Dropdown } from "react-bootstrap";
import DeleteModal from "../../../components/layouts/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  setReplyModalData,
  setWebcamModelConfig,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
import { api } from "../../../services/api";
import dayjs from "dayjs";
import InteractionsChatCard from "./InteractionsChatCard";
import ConversationsAnswer from "../AssetAllocation/Conversations/ConversationsAnswer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoaderCircle from "../../../components/layouts/LoaderCircle/LoaderCircle";
import InteractionFilter from "./InteractionFilter";
import CreateContactModal from "./CreateContactModal";
import AssignContactModal from "./AssignContactModal";
import { ReplyIcon } from "lucide-react";
import Tooltip from "../../../components/layouts/Tooltip";

function Interactions() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const { isResponsive, themeColor, selectedOrganizationId } = reduxData;
  const [interactions, setInteractions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [selectMetingCard, setSelectMetingCard] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactForUpdate, setContactForUpdate] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [showAssignContact, setShowAssignContact] = useState(false);
  const [answersList, setAnswersList] = useState([]);
  const selectedFilterTitleList = {
    all: ["This week", "Previous week"],
    thisWeek: ["This Week"],
    previousWeek: ["Previous Week"],
    thisMonth: ["This Month"],
    previousMonth: ["Previous Month"],
  };

  const isDateInCurrentWeek = (dateString) => {
    const givenDate = dayjs(dateString);
    const today = dayjs();

    const startOfWeek = today.startOf("week");
    const endOfWeek = today.endOf("week");

    return (
      (givenDate.isAfter(startOfWeek) && givenDate.isBefore(endOfWeek)) ||
      givenDate.isSame(startOfWeek, "day") ||
      givenDate.isSame(endOfWeek, "day")
    );
  };

  const fetchAllInteraction = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(
        `interactions/get-all-interaction-answers/${selectedOrganizationId}/${selectedFilter}`
      );
      if (res.status === 200) {
        const data = res.data.response.map((ele) => {
          const { createdAt } = ele;
          return { ...ele, isCurrentWeek: isDateInCurrentWeek(createdAt) };
        });
        setInteractions(data);
        console.log("data", data);
        setSelectedContact(data[0]);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(true);
  };

  const deleteConversation = async () => {
    setIsDelete(true);
    try {
      const res = await api.delete(
        `contact/remove-conversation/${chatToDelete}`
      );
      if (res.status === 200) {
        fetchAllInteraction();
        setShowDeleteModal(false);
        setChatToDelete("");
        dispatch(showSuccess(res.data.message));
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsDelete(false);
  };

  useEffect(() => {
    if (selectedFilter && selectedOrganizationId) {
      fetchAllInteraction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter, selectedOrganizationId]);

  useEffect(() => {
    if (selectedContact) {
      setSelectMetingCard(selectedContact?.answers?.[0]);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact?.answers) {
      console.log("selectMetingCard", selectedContact?.answers);
    }
  }, [selectedContact?.answers]);

  useEffect(() => {
    if (selectedContact?.answers?.length > 0) {
      const newArray = groupByNodeId(selectedContact?.answers);
      setAnswersList(newArray);
    }
  }, [selectedContact?.answers]);

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

  return (
    <>
      <div
        className="Interactions-container"
        style={
          isResponsive ? { flexDirection: "column" } : { flexDirection: "row" }
        }
      >
        {showDeleteModal && (
          <DeleteModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            onDelete={() => {
              deleteConversation();
            }}
            isDelete={isDelete}
            title="Are you sure you want to proceed?"
            text="This will erase all messages and replies in this conversation. Once deleted, they cannot be recovered."
          />
        )}

        {showCreateContact && (
          <CreateContactModal
            show={showCreateContact}
            selectedContact={contactForUpdate}
            isAnonymous={!contactForUpdate?.contact_id ? true : false}
            handleClose={() => {
              setShowCreateContact(false);
              setContactForUpdate({});
            }}
            selectedOrganizationId={selectedOrganizationId}
            fetchContact={() => {
              fetchAllInteraction();
            }}
          />
        )}

        {showAssignContact && (
          <AssignContactModal
            show={showAssignContact}
            selectedContact={contactForUpdate}
            isAnonymous={!contactForUpdate?.contact_id ? true : false}
            handleClose={() => {
              setShowAssignContact(false);
              setContactForUpdate({});
            }}
            selectedOrganizationId={selectedOrganizationId}
            fetchContact={() => {
              fetchAllInteraction();
            }}
          />
        )}

        <div
          className={`Interactions-sidebar ${
            isResponsive ? "wp-100" : "w-400"
          }`}
        >
          <div className="recent-chats">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px",
                paddingTop: "15px",
              }}
            >
              <div className="color-darkText text-14-600">
                Recent Interactions
              </div>

              <div className="w-24 h-24 f-center">
                <InteractionFilter
                  setSelectedFilter={setSelectedFilter}
                  selectedFilter={selectedFilter}
                />
              </div>
            </div>

            <div
              className="p-5 pt-20  flow list"
              style={{ height: isResponsive ? "400px" : "calc(100vh - 200px)" }}
            >
              {interactions.length > 0 || !isLoad ? (
                <>
                  {selectedFilterTitleList[selectedFilter].map(
                    (title, weekIndex) => {
                      const filterData = (ele) => {
                        if (selectedFilter === "all") {
                          if (ele.isCurrentWeek === (weekIndex === 0)) {
                            return ele;
                          }
                        } else {
                          return ele;
                        }
                      };
                      return (
                        <div key={weekIndex}>
                          {isLoad ? (
                            <>
                              <div style={{ padding: "5px" }}>
                                <div className="color-darkText text-14-600">
                                  {interactions.filter(filterData).length ===
                                  0 ? (
                                    <div
                                      className="text-14-500 p-10 ps-20 "
                                      style={{ color: "rgba(0,0,0,0.5)" }}
                                    >
                                      {title} interaction not found.
                                    </div>
                                  ) : (
                                    title
                                  )}
                                </div>
                              </div>
                              {interactions
                                .filter(filterData)
                                .map((ele, index) => {
                                  const { contact_id, contact_details, _id } =
                                    ele;
                                  const isActive = selectedContact?._id === _id;
                                  const bgColor = isActive
                                    ? "#b19eff"
                                    : "white";
                                  const textColor = isActive
                                    ? "white"
                                    : "#1B2559";
                                  const subTextColor = isActive
                                    ? "white"
                                    : "#8C8E90";

                                  return (
                                    <>
                                      <InteractionsChatCard
                                        key={index}
                                        ele={ele}
                                        subTextColor={subTextColor}
                                        contact_id={contact_id}
                                        contact_details={contact_details}
                                        bgColor={bgColor}
                                        isActive={isActive}
                                        textColor={textColor}
                                        onSelectChat={() =>
                                          setSelectedContact(ele)
                                        }
                                        setShowCreateContact={
                                          setShowCreateContact
                                        }
                                        setShowAssignContact={
                                          setShowAssignContact
                                        }
                                        onSelectMenuContact={() => {
                                          setContactForUpdate(ele);
                                        }}
                                        onDeleteChat={() => {
                                          setChatToDelete(_id);
                                          setShowDeleteModal(true);
                                        }}
                                      />
                                    </>
                                  );
                                })}
                            </>
                          ) : (
                            <div>
                              <SkeletonTheme>
                                {weekIndex === 0 ? (
                                  <>
                                    <Skeleton
                                      height={60}
                                      borderRadius={10}
                                      count={selectedFilter === "all" ? 2 : 20}
                                      style={{ marginBottom: "10px" }}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Skeleton
                                      height={60}
                                      borderRadius={10}
                                      count={15}
                                      style={{ marginBottom: "10px" }}
                                    />
                                  </>
                                )}
                              </SkeletonTheme>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </>
              ) : (
                <div
                  className="wp-100 d-flex text-18-700 mt-50"
                  style={{ justifyContent: "center" }}
                >
                  {selectedFilterTitleList[selectedFilter]?.[0]} Interactions
                  not found!
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="Interactions-body"
          style={
            isResponsive
              ? { marginTop: "20px", width: "100%" }
              : { width: "calc(100% - 410px)" }
          }
        >
          {isLoad ? (
            <>
              <div className="h-90 Interactions-header">
                {interactions.length > 0 ? (
                  <>
                    <div className="f-center">
                      <div
                        className="w-50 h-50 rounded-circle f-center"
                        style={{
                          overflow: "hidden",
                          color: "white",
                          backgroundColor: selectedContact?.contact_id
                            ? getColorFromLetter(
                                selectedContact.contact_details?.contact_email?.charAt(
                                  0
                                ) || ""
                              )
                            : "#1B2559",
                        }}
                      >
                        <div
                          className="w-50 h-50 f-center text-22-800"
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        >
                          {(selectedContact?.contact_id
                            ? selectedContact.contact_details?.contact_email?.charAt(
                                0
                              ) || ""
                            : "A"
                          )
                            .toString()
                            .toUpperCase()}
                        </div>
                      </div>
                      <div className="text-18-600 color-darkText ms-10">
                        {selectedContact?.contact_id
                          ? selectedContact.contact_details?.contact_email
                          : "Anonymous"}
                      </div>
                    </div>
                    <div className="icon-group">
                      {selectedContact?.contact_id && (
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
                                  {
                                    selectedContact?.contact_details
                                      ?.contact_email
                                  }
                                </span>
                              </div>
                            </div>
                          }
                        >
                          <div
                            className="replay-btn"
                            onClick={() => {
                              console.log("selectChatDetails", selectedContact);
                              // dispatch(
                              //   setWebcamModelConfig({ isShow: true })
                              // );
                              // dispatch(
                              //   setReplyModalData({
                              //     interactionId:
                              //       selectedContact.interaction_id,
                              //     type: "reply",
                              //     contactId: selectedContact.contact_id,
                              //     answerId: selectedContact._id,
                              //   })
                              // );
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
                      )}
                      <div className="w-20 h-20">
                        <img
                          src={icons.teg_svg}
                          alt=""
                          className="fit-image hover-icons-effect"
                        />
                      </div>
                      <div className="w-20 h-20">
                        <img
                          src={icons.exportPng}
                          alt=""
                          className="fit-image hover-icons-effect"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div
                className="Interactions-content"
                style={isResponsive ? { height: "500px" } : {}}
              >
                {interactions.length > 0 ? (
                  <ConversationsAnswer
                    selectMetingCard={{ ...selectMetingCard }}
                  />
                ) : (
                  <div className="wp-100 hp-100 f-center">
                    <Button className="new-flow-btn">
                      Create new interactions
                    </Button>
                  </div>
                )}
              </div>
              <div className="Interactions-footer flow">
                <div className="meting-card-body">
                  {answersList?.length > 0 &&
                    answersList.map((answerGroup, index) => {
                      // const isActive = selectMetingCard?._id === ele?._id;
                      const { nodeDetails, answers, node_type } = answerGroup;
                      return (
                        <div key={index} style={{ display: "flex" }}>
                          {node_type === "reply_node" && (
                            <div className="reply_section">
                              <div className="reply_section_line"></div>
                              <div className="reply_section_circle">
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
                                          {
                                            selectedContact.interactionDetails
                                              ?.title
                                          }
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
                                className="meting-card"
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
                                  <img
                                    src={nodeDetails?.video_thumbnail}
                                    alt=""
                                    className=""
                                  />
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
            </>
          ) : (
            <div
              style={{
                position: "absolute",
                zIndex: "1000",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "105%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LoaderCircle size={150} />
                <div className="text-18-600 mt-10" style={{ color: "#1B2559" }}>
                  We are getting things ready...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Interactions;
