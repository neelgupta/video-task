import React, { useEffect, useState } from "react";
import "./Conversations.scss";
import { icons } from "../../../../utils/constants";
import {
  creteImgFilter,
  encrypt,
  getColorFromLetter,
} from "../../../../utils/helpers";
import StartConversationModal from "./StartConversationModal";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../../services/api";
import { handelCatch, throwError } from "../../../../store/globalSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ConversationsAnswer from "./ConversationsAnswer";
import Share from "../../MyCollection/MyFolder/Share";
import LoaderCircle from "../../../../components/layouts/LoaderCircle/LoaderCircle";

function Conversations({ id }) {
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor } = reduxData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectChat, setSelectChat] = useState("");
  const [selectChatDetails, setSelectChatDetails] = useState({});

  const [selectMetingCard, setSelectMetingCard] = useState({});
  const [showCreateConversationModal, setShowCreateConversationModal] =
    useState(false);
  const [interactionDetails, setInteractionDetails] = useState({});
  const [contacts, setContacts] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    fetchAllAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllAnswer = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(`interactions/get-interaction-answers/${id}`);
      if (res.status === 200) {
        console.log("res", res);
        const { interactionData, contactData } = res.data.response;
        setContacts(contactData);
        setSelectChat(contactData?.[0]?._id || "");
        setInteractionDetails(interactionData || {});
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(true);
  };

  useEffect(() => {
    if (!selectChat && contacts.length < 1) return;

    const findChat = contacts.find((ele) => ele._id === selectChat);
    console.log("findChat", findChat);
    if (findChat) {
      setSelectChatDetails(findChat);
      setSelectMetingCard(findChat?.answers?.[0] || {});
    } else {
      setSelectChatDetails({});
      dispatch(throwError("Chat not found."));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectChat, contacts]);

  return (
    <>
      <Share
        show={shareUrl !== ""}
        handleClose={() => setShareUrl("")}
        shareUrl={shareUrl}
      />
      <div
        className="Conversations-container"
        style={
          isResponsive ? { flexDirection: "column" } : { flexDirection: "row" }
        }
      >
        {!isLoad && (
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
              <LoaderCircle />
              <div className="text-24-600 mt-50" style={{ color: "#1B2559" }}>
                We are getting things ready...
              </div>
            </div>
          </div>
        )}

        <div
          className={`Conversations-sidebar ${
            isResponsive ? "wp-100" : "wp-45"
          }`}
        >
          <div className="profile-det">
            <div
              className="w-89 h-79 profile-img"
              onClick={() => {
                const token = encrypt(id);
                window.open(`/view-flow/${token}`, "_blank");
              }}
            >
              <img
                src={interactionDetails?.thumbnailUrl || ""}
                alt=""
                className=""
              />
              <div className="redirect-icons">
                <img
                  src={icons.top_right_arrow}
                  alt=""
                  className="fit-image "
                  style={{ filter: creteImgFilter("#ffffff") }}
                />
              </div>
            </div>
            <div className="det p-5 w-200 ms-10">
              <div className="text-18-600">
                {interactionDetails?.title || ""}
              </div>
              <div className="fb-center mt-10">
                <div
                  className="w-18"
                  onClick={() => navigate(`/user/flow/${id}`)}
                >
                  <img
                    src={icons.branch}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
                <div className="w-18">
                  <img
                    src={icons.downloads_box}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
                <div
                  className="w-18"
                  onClick={() => {
                    const token = encrypt(id);
                    const url = `${window.location.origin}/view-flow/${token}`;
                    setShareUrl(url);
                  }}
                >
                  <img
                    src={icons.link}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
                <div className="w-18">
                  <img
                    src={icons.screen}
                    alt=""
                    className="fit-image hover-icons-effect"
                  />
                </div>
              </div>
            </div>
          </div>
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
              <div className="color-darkText text-14-600">Recent Chats</div>
              <div style={{ display: "flex", gap: "0px 10px" }}>
                <div className="w-24 h-24 f-center">
                  <img
                    src={icons.double_arrow}
                    alt=""
                    className="fit-image hover-icons-effect w-18"
                  />
                </div>
                <div className="w-24 h-24 f-center">
                  <img
                    src={icons.control_menu}
                    alt=""
                    className="fit-image hover-icons-effect w-18"
                  />
                </div>
              </div>
            </div>

            <div
              className="p-5 pt-20  auri-scroll list"
              style={
                isResponsive
                  ? { height: "400px" }
                  : { height: "calc(100vh - 370px)" }
              }
            >
              {contacts.length > 0 ? (
                contacts.map((ele, index) => {
                  const { contact_id, _id, contact_details, createdAt } = ele;
                  const isActive = _id === selectChat;
                  return (
                    <div
                      className="chat_card mb-20 pointer"
                      key={index}
                      onClick={() => setSelectChat(_id)}
                      style={{ background: isActive ? "#b19eff" : "white" }}
                    >
                      <div
                        className="d-flex ps-10"
                        style={{ alignItems: "center" }}
                      >
                        <div
                          className="w-40 h-40 rounded-circle f-center"
                          style={{
                            overflow: "hidden",
                            backgroundColor: "white",
                            color: contact_id
                              ? getColorFromLetter(
                                  contact_details?.contact_email?.charAt(0) ||
                                    ""
                                )
                              : "#1B2559",
                            boxShadow: isActive
                              ? "3px 3px 15px rgba(0,0,0,0.2)"
                              : "none",
                          }}
                        >
                          <div
                            className="w-40 h-40 f-center text-22-800"
                            style={{
                              borderRadius: "50%",
                              overflow: "hidden",
                            }}
                          >
                            {(contact_id
                              ? contact_details?.contact_email?.charAt(0) || ""
                              : "A"
                            )
                              .toString()
                              .toUpperCase()}
                          </div>
                        </div>
                        <div style={{ padding: "5px", paddingLeft: "15px" }}>
                          <div
                            className="pb-5 text-16-600 w-250"
                            style={{
                              color: isActive ? "white" : "#1B2559",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            {contact_id
                              ? contact_details?.contact_email
                              : "Anonymous"}
                          </div>
                          <div
                            className="text-14-500"
                            style={{ color: isActive ? "white" : "#8C8E90" }}
                          >
                            {dayjs(createdAt).format("DD MMM YY")}
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
                          <img
                            src={icons.three_dots}
                            alt=""
                            className="fit-image"
                            style={{
                              filter: creteImgFilter(
                                isActive ? "#ffffff" : "#8C8E90"
                              ),
                            }}
                          />
                        </div>
                        <div style={{ color: isActive ? "white" : "#8C8E90" }}>
                          {dayjs(createdAt).format("HH:mm")}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="f-center">
                  <div className="text-16-600" style={{ color: "black" }}>
                    Contact not found.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="Conversations-body"
          style={isResponsive ? { marginTop: "20px" } : {}}
        >
          <div className="h-95 Conversations-header">
            <div className="f-center">
              <div
                className="w-55 h-55 rounded-circle f-center"
                style={{
                  overflow: "hidden",
                  backgroundColor: "white",
                  color: selectChatDetails.contact_id
                    ? getColorFromLetter(
                        selectChatDetails.contact_details?.contact_email?.charAt(
                          0
                        ) || ""
                      )
                    : "#1B2559",
                  boxShadow: "3px 3px 15px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="w-40 h-40 f-center text-22-800"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  {(selectChatDetails.contact_id
                    ? selectChatDetails.contact_details?.contact_email?.charAt(
                        0
                      ) || ""
                    : "A"
                  )
                    .toString()
                    .toUpperCase()}
                </div>
              </div>

              <div className="text-18-600 ms-20" style={{ color: "#1B2559" }}>
                {selectChatDetails.contact_id
                  ? selectChatDetails?.contact_details?.contact_email
                  : "Anonymous"}
              </div>
            </div>
            <div className="icon-group">
              <div className="w-20 h-20">
                <img
                  src={icons.edit}
                  alt=""
                  className="fit-image hover-icons-effect"
                />
              </div>
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
          </div>
          <div
            className="Conversations-content"
            style={isResponsive ? { height: "500px" } : {}}
          >
            <ConversationsAnswer selectMetingCard={selectMetingCard} />
          </div>
          <div className="Conversations-footer">
            <div className="meting-card-body">
              {selectChatDetails?.answers?.length > 0 &&
                selectChatDetails.answers.map((ele, index) => {
                  const isActive = selectMetingCard._id === ele._id;
                  const { nodeDetails, answer_details, node_answer_type } = ele;
                  return (
                    <div
                      className="meting-card"
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
                      <div className="node-thumbnail-box">
                        <img
                          src={nodeDetails.video_thumbnail}
                          alt=""
                          className=""
                        />
                        <div className="img-btn wp-100">
                          <div
                            className="text-12-600"
                            style={{ textTransform: "capitalize" }}
                          >
                            {nodeDetails.title}
                          </div>
                        </div>
                      </div>
                      {isActive && (
                        <div className="text-11-500 color-darkText m-0 p-0 mt-5">
                          {dayjs(answer_details.createdAt).format(
                            "DD MMM YYYY | HH:mm"
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <StartConversationModal
        show={showCreateConversationModal}
        handleClose={() => setShowCreateConversationModal(false)}
      />
    </>
  );
}

export default Conversations;
