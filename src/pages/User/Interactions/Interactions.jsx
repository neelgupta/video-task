/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import "./Interactions.scss";
import { icons } from "../../../utils/constants";
import { creteImgFilter, getColorFromLetter } from "../../../utils/helpers";
import { interactionsData } from "./constants";
import { Dropdown } from "react-bootstrap";
import DeleteModal from "../../../components/layouts/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { handelCatch, throwError } from "../../../store/globalSlice";
import { api } from "../../../services/api";
import dayjs from "dayjs";
import InteractionsChatCard from "./InteractionsChatCard";
import ConversationsAnswer from "../AssetAllocation/Conversations/ConversationsAnswer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LoaderCircle from "../../../components/layouts/LoaderCircle/LoaderCircle";
import InteractionFilter from "./InteractionFilter";
import CreateContactModal from "./CreateContactModal";
import AssignContactModal from "./AssignContactModal";

function Interactions() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const { isResponsive, themeColor, selectedOrganizationId } = reduxData;
  const [interactions, setInteractions] = useState(interactionsData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [selectMetingCard, setSelectMetingCard] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactForUpdate, setContactForUpdate] = useState({});

  const [isLoad, setIsLoad] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [showAssignContact, setShowAssignContact] = useState(false);

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
        setSelectedContact(data.find((ele) => ele.isCurrentWeek));
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

  return (
    <>
      <div
        className="Interactions-container"
        style={
          isResponsive ? { flexDirection: "column" } : { flexDirection: "row" }
        }
      >
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
              className="p-5 pt-20  auri-scroll list"
              style={{ height: isResponsive ? "400px" : "calc(100vh - 200px)" }}
            >
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
                      <div style={{ padding: "5px" }}>
                        <div className="color-darkText text-14-600">
                          {title}
                        </div>
                      </div>
                      {isLoad ? (
                        <>
                          {interactions.filter(filterData).map((ele, index) => {
                            const { contact_id, contact_details, _id } = ele;
                            const isActive = selectedContact?._id === _id;
                            const bgColor = isActive ? "#b19eff" : "white";
                            const textColor = isActive ? "white" : "#1B2559";
                            const subTextColor = isActive ? "white" : "#8C8E90";

                            return (
                              <InteractionsChatCard
                                key={index}
                                ele={ele}
                                subTextColor={subTextColor}
                                contact_id={contact_id}
                                contact_details={contact_details}
                                bgColor={bgColor}
                                isActive={isActive}
                                textColor={textColor}
                                onSelectChat={() => setSelectedContact(ele)}
                                setShowCreateContact={setShowCreateContact}
                                setShowAssignContact={setShowAssignContact}
                                onSelectMenuContact={() => {
                                  setContactForUpdate(ele);
                                }}
                              />
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
                  {/* <div
                    className="w-20 h-20"
                  >
                    <img
                      src={icons.edit}
                      alt=""
                      className="fit-image hover-icons-effect"
                    />
                  </div> */}
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
                className="Interactions-content"
                style={isResponsive ? { height: "500px" } : {}}
              >
                <ConversationsAnswer
                  selectMetingCard={{ ...selectMetingCard }}
                />
              </div>
              <div className="Interactions-footer auri-scroll">
                <div className="meting-card-body">
                  {selectedContact?.answers?.length > 0 &&
                    selectedContact?.answers.map((ele, index) => {
                      const isActive = selectMetingCard?._id === ele?._id;
                      const { nodeDetails } = ele;
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

                          {isActive && (
                            <>
                              <div className="text-11-500 color-darkText m-0 p-0 mt-5">
                                {dayjs(nodeDetails.createdAt).format(
                                  "DD MMM YYYY | HH:mm"
                                )}
                              </div>
                            </>
                          )}
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
    </>
  );
}

export default Interactions;
