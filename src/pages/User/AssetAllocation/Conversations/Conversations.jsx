/* eslint-disable react/display-name */
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
import ChatsFilter from "./ChatsFilter";
import AddEditContactModal from "../../Contacts/AddEditContactModal";
import { Dropdown } from "react-bootstrap";
import CreateContactModal from "../../Interactions/CreateContactModal";
import AssignContactModal from "../../Interactions/AssignContactModal";

function Conversations({
  id,
  interactionDetails,
  isLoad,
  contacts,
  results,
  selectedType,
  fetchDataFunction,
}) {
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor, selectedOrganizationId } = reduxData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectChat, setSelectChat] = useState("");
  const [selectChatDetails, setSelectChatDetails] = useState({});
  const [selectMetingCard, setSelectMetingCard] = useState(null);
  const [showCreateConversationModal, setShowCreateConversationModal] =
    useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [isShowEditContact, setIsShowEditContact] = useState(false);
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [showAssignContact, setShowAssignContact] = useState(false);
  const [contactForUpdate, setContactForUpdate] = useState({});
  useEffect(() => {
    if (selectedType) {
      if (
        contacts &&
        contacts?.length !== 0 &&
        selectedType === "Conversations"
      ) {
        setSelectChat(contacts?.[0]?._id || "");
      } else if (
        results &&
        results?.length !== 0 &&
        selectedType === "Results"
      ) {
        setSelectChat(results?.[0]?._id || "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, selectedType, results]);

  useEffect(() => {
    if (selectedType === "Conversations") {
      if (!selectChat || contacts?.length === 0) return;

      const findChat = contacts.find((ele) => ele._id === selectChat);
      if (findChat) {
        setSelectChatDetails(findChat);
        setSelectMetingCard(findChat?.answers?.[0] || {});
      } else {
        setSelectChatDetails({});
        dispatch(throwError("Chat not found."));
      }
    } else if (selectedType === "Results") {
      if (!selectChat || results?.length === 0) return;
      const findChat = results.find((ele) => ele._id === selectChat);
      if (findChat) {
        setSelectChatDetails(findChat);
        setSelectMetingCard(findChat?.answers?.[0] || {});
      } else {
        setSelectChatDetails({});
        dispatch(throwError("Chat not found."));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectChat, contacts, results, selectedType]);

  return (
    <>
      <Share
        show={shareUrl !== ""}
        handleClose={() => setShareUrl("")}
        shareUrl={shareUrl}
      />
      {isShowEditContact && (
        <AddEditContactModal
          show={isShowEditContact}
          handleClose={() => {
            setIsShowEditContact(false);
          }}
          selectedOrganizationId={selectedOrganizationId}
          isEdit={true}
          editContact={
            selectedType === "Conversations"
              ? selectChatDetails?.contact_details || {}
              : selectMetingCard?.contactDetails || {}
          }
          fetchContact={fetchDataFunction}
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
            fetchDataFunction();
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
            fetchDataFunction();
          }}
        />
      )}
      <ChatsFilter show={openFilter} onHide={() => setOpenFilter(false)} />
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
              <LoaderCircle size={150} />
              <div className="text-18-600 mt-10" style={{ color: "#1B2559" }}>
                We are getting things ready...
              </div>
            </div>
          </div>
        )}

        <div
          className={`Conversations-sidebar ${
            isResponsive ? "wp-100" : "wp-35"
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
                <div
                  className="w-24 h-24 f-center"
                  onClick={() => setOpenFilter(true)}
                >
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
              {selectedType === "Conversations" ? (
                contacts?.length > 0 ? (
                  contacts.map((ele, index) => {
                    const { contact_id, _id, contact_details, createdAt } = ele;
                    const isActive = _id === selectChat;

                    const menuOption = contact_id
                      ? [
                          {
                            label: "Send a Video reply",
                            onClick: () => {},
                            isDisabled: false,
                          },
                          {
                            label: "Send an e-mail",
                            onClick: () => {},
                            isDisabled: false,
                          },
                          {
                            label: "Go to contact",
                            onClick: () => {},
                            isDisabled: false,
                          },
                        ]
                      : [
                          {
                            label: "Create new contact",
                            onClick: () => {
                              setShowCreateContact(true);
                              setContactForUpdate(ele);
                            },
                            isDisabled: false,
                          },
                          {
                            label: "Assign contact",
                            onClick: () => {
                              setShowAssignContact(true);
                              setContactForUpdate(ele);
                            },
                            isDisabled: false,
                          },
                        ];
                    return (
                      <div
                        className="chat_card mb-20 pointer"
                        key={index}
                        style={{ background: isActive ? "#b19eff" : "white" }}
                      >
                        <div
                          className="d-flex ps-10 wp-100 hp-100"
                          style={{ alignItems: "center", padding: "5px 10px" }}
                          onClick={() => setSelectChat(_id)}
                        >
                          <div
                            className="w-50 h-50 rounded-circle f-center"
                            style={{
                              overflow: "hidden",
                              color: isActive
                                ? contact_id
                                  ? getColorFromLetter(
                                      contact_details?.contact_email?.charAt(
                                        0
                                      ) || ""
                                    )
                                  : "#1B2559"
                                : "white",
                              backgroundColor: isActive
                                ? "white"
                                : contact_id
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
                              className="w-50 h-50 f-center text-22-800"
                              style={{
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                            >
                              {(contact_id
                                ? contact_details?.contact_email?.charAt(0) ||
                                  ""
                                : "A"
                              )
                                .toString()
                                .toUpperCase()}
                            </div>
                          </div>
                          <div style={{ padding: "5px", paddingLeft: "15px" }}>
                            <div
                              className="pb-5 text-16-600"
                              style={{
                                color: isActive ? "white" : "#1B2559",
                                padding: "0px",
                                margin: "0px",
                              }}
                            >
                              {contact_id
                                ? contact_details?.contact_email.split("@")[0]
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
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "absolute",
                            right: "5px",
                            top: "0px",
                            paddingBottom: "5px",
                          }}
                        >
                          <div className="w-24 h-24">
                            <InteractionMenu
                              isSelected={isActive}
                              menuOption={menuOption}
                            />
                          </div>
                          <div
                            style={{ color: isActive ? "white" : "#8C8E90" }}
                          >
                            {dayjs(createdAt).format("HH:mm")}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="f-center">
                    <div className="text-16-600" style={{ color: "black" }}>
                      Contacts not found.
                    </div>
                  </div>
                )
              ) : results?.length > 0 ? (
                results.map((ele, index) => {
                  const { _id, video_thumbnail, title } = ele;
                  // const { contact_id, _id, contact_details, createdAt } = ele;

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
                        style={{ alignItems: "center", padding: "10px" }}
                      >
                        <div
                          className="w-50 h-50 rounded-circle f-center"
                          style={{
                            overflow: "hidden",
                            backgroundColor: "white",
                            boxShadow: isActive
                              ? "3px 3px 15px rgba(0,0,0,0.2)"
                              : "none",
                            border: "2px solid #FFB302",
                          }}
                        >
                          <img src={video_thumbnail} alt="" />
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
                            {title}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="f-center">
                  <div className="text-16-600" style={{ color: "black" }}>
                    Questions not found.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`Conversations-body `}
          style={
            isResponsive
              ? { marginTop: "20px", width: "100%" }
              : { minWidth: "calc(65% - 10px)" }
          }
        >
          <div className="h-95 Conversations-header">
            <div className="f-center">
              {[
                {
                  condition: selectedType === "Conversations",
                  details: selectChatDetails?.contact_details,
                  id: selectChatDetails?.contact_id ? true : false,
                },
                {
                  condition: selectedType !== "Conversations",
                  details: selectMetingCard?.contactDetails,
                  id: selectMetingCard?.contactDetails ? true : false,
                },
              ].map(({ condition, details, id }, idx) =>
                condition ? (
                  <React.Fragment key={idx}>
                    <div
                      className="w-55 h-55 rounded-circle f-center"
                      style={{
                        overflow: "hidden",
                        color: "white",
                        backgroundColor: id
                          ? getColorFromLetter(
                              details?.contact_email?.charAt(0) || ""
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
                        {(id ? details?.contact_email?.charAt(0) || "A" : "A")
                          .toString()
                          .toUpperCase()}
                      </div>
                    </div>
                    <div
                      className="text-18-600 ms-20"
                      style={{ color: "#1B2559" }}
                    >
                      {id ? details?.contact_email : "Anonymous"}
                    </div>
                  </React.Fragment>
                ) : null
              )}
            </div>
            <div className="icon-group">
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

          <div className="Conversations-content" style={{ height: "430px" }}>
            {selectMetingCard && (
              <ConversationsAnswer
                selectMetingCard={
                  selectedType === "Conversations"
                    ? { ...selectMetingCard }
                    : {
                        ...selectMetingCard,
                        nodeDetails: { ...selectChatDetails, answers: [] },
                      }
                }
              />
            )}
          </div>
          <div className="Conversations-footer auri-scroll">
            <div className="meting-card-body">
              {selectChatDetails?.answers?.length > 0 &&
                selectChatDetails.answers.map((ele, index) => {
                  console.log("ele", ele);
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
                              borderBottom: "3px solid #b19eff",
                            }
                          : {}
                      }
                    >
                      {selectedType === "Conversations" ? (
                        <div className="node-thumbnail-box">
                          <img
                            src={nodeDetails?.video_thumbnail}
                            alt=""
                            className=""
                          />
                          <div className="img-btn wp-100">
                            <div
                              className="text-12-600"
                              style={{ textTransform: "capitalize" }}
                            >
                              {nodeDetails?.title || ""}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="node-thumbnail-box"
                          style={{
                            width: "100px",
                            border: "2px solid #b19eff",
                          }}
                        >
                          <div className="w-50">
                            <img
                              src={icons.userAnswerProfile}
                              alt=""
                              className="fit-image"
                              style={{ filter: creteImgFilter("#888888") }}
                            />
                          </div>
                        </div>
                      )}
                      {isActive && (
                        <>
                          {selectedType === "Conversations" ? (
                            <div className="text-11-500 color-darkText m-0 p-0 mt-5">
                              {dayjs(nodeDetails.createdAt).format(
                                "DD MMM YYYY | HH:mm"
                              )}
                            </div>
                          ) : (
                            <div className="text-11-500 color-darkText m-0 p-0 mt-5">
                              {dayjs(ele.createdAt).format(
                                "DD MMM YYYY | HH:mm"
                              )}
                            </div>
                          )}
                        </>
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

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const InteractionMenu = ({ isSelected, menuOption }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <img
          src={icons.three_dots}
          alt=""
          className="fit-image"
          style={{
            filter: creteImgFilter(isSelected ? "#ffffff" : "#8C8E90"),
          }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          Mark as unread
        </Dropdown.Item>
        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        {menuOption.map((option, idx) => (
          <React.Fragment key={option.value}>
            <Dropdown.Item
              onClick={() => {
                option.onClick();
              }}
              className="text-14-500"
            >
              {option.label}
            </Dropdown.Item>
          </React.Fragment>
        ))}

        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          Delete Conversation
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
