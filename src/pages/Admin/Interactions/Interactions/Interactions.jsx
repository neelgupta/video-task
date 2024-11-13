/* eslint-disable react/display-name */
import React, { useState } from "react";
import "./Interactions.scss";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { interactionsData } from "./constants";
import { Dropdown } from "react-bootstrap";
import DeleteModal from "../../../../components/layouts/DeleteModal";

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

const InteractionFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Unread");

  const filterOptions = [
    { label: "All Unread", value: "All Unread" },
    { label: "This Week", value: "This Week" },
    { label: "Previous Week", value: "Previous Week" },
    { label: "This Month", value: "This Month" },
    { label: "Previous Month", value: "Previous Month" },
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <img
          src={icons.control_menu}
          alt="Control menu"
          className="fit-image hover-icons-effect w-18"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {filterOptions.map((option, idx) => (
          <React.Fragment key={option.value}>
            <Dropdown.Item
              onClick={() => handleFilterChange(option.value)}
              active={selectedFilter === option.value}
              className="text-14-500"
            >
              {option.label}
            </Dropdown.Item>

            {idx === 0 && (
              <Dropdown.Divider
                style={{
                  margin: "0.5rem 1rem",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const InteractionMenu = ({
  isSelected,
  setShowDeleteModal,
  setChatToDelete,
}) => {
  const filterOptions = [
    { label: "Mark as unread", value: "Mark as unread" },
    { label: "Send a Video reply", value: "Send a Video reply" },
    { label: "Send an e-mail", value: "Send an e-mail" },
    { label: "Go to contact", value: "Go to contact" },
    {
      label: "Delete Conversation",
      value: "Delete Conversation",
    },
  ];

  const handleFilterChange = (filter) => {
    //TODO : Do the stuffs
    if (filter === "Delete Conversation") {
      setShowDeleteModal(true);
      setChatToDelete(123);
    }
  };

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
        {filterOptions.map((option, idx) => (
          <React.Fragment key={option.value}>
            <Dropdown.Item
              onClick={() => handleFilterChange(option.value)}
              className="text-14-500"
            >
              {option.label}
            </Dropdown.Item>

            {(idx === 0 || idx == filterOptions.length - 2) && (
              <Dropdown.Divider
                style={{
                  margin: "0.5rem 1rem",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

function Interactions() {
  const [interactions, setInteractions] = useState(interactionsData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  const handleSelectInteraction = (id) => {
    setInteractions((prevInteraction) =>
      prevInteraction.map((interaction) =>
        interaction.id === id
          ? { ...interaction, isSelected: true }
          : { ...interaction, isSelected: false }
      )
    );
  };

  const [selectMetingCard, setSelectMetingCard] = useState(1);

  return (
    <>
      <div className="Interactions-container">
        <div className="Interactions-sidebar ">
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
                <InteractionFilter />
              </div>
            </div>
            <div style={{ padding: "5px" }}>
              <div className="color-darkText text-14-600">This week</div>
            </div>
            <div className="p-5 pt-20 hp-100 auri-scroll list">
              {interactions.map((ele, index) => {
                const { isSelected, isCurrentWeek } = ele;
                return (
                  isCurrentWeek && (
                    <div
                      className="chat_card mb-20 pointer"
                      key={index}
                      onClick={() => handleSelectInteraction(ele.id)}
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
                            {ele.name}
                          </div>
                          <div
                            className="text-12-500"
                            style={{ color: isSelected ? "white" : "#8C8E90" }}
                          >
                            {ele.mobile}
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
                          <InteractionMenu
                            isSelected={isSelected}
                            showDeleteModal={showDeleteModal}
                            setShowDeleteModal={setShowDeleteModal}
                            setChatToDelete={setChatToDelete}
                          />
                        </div>
                        <div
                          style={{ color: isSelected ? "white" : "#8C8E90" }}
                        >
                          {ele.timeAgo}
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
              <div style={{ padding: "5px" }}>
                <div className="color-darkText text-14-600">Previous week</div>
              </div>
              {interactions.map((ele, index) => {
                const { isSelected, isCurrentWeek } = ele;
                return (
                  !isCurrentWeek && (
                    <div
                      className="chat_card mb-20 pointer"
                      key={index}
                      onClick={() => handleSelectInteraction(ele.id)}
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
                            {ele.name}
                          </div>
                          <div
                            className="text-12-500"
                            style={{ color: isSelected ? "white" : "#8C8E90" }}
                          >
                            {ele.mobile}
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
                          <InteractionMenu isSelected={isSelected} />
                        </div>
                        <div
                          style={{ color: isSelected ? "white" : "#8C8E90" }}
                        >
                          {ele.timeAgo}
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
        <div className="Interactions-body">
          <div className="h-90 Interactions-header">
            <div className="f-center">
              <div className="w-79 h-69 profile-img">
                <img src={icons.avatar7} alt="" className="fit-image" />
              </div>
              <div className="text-18-600 color-darkText ms-10">
                QnA Flow-Flow 2
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
          <div className="Interactions-content"></div>
          <div className="Interactions-footer">
            <div className="meting-card-body">
              {[1, 2, 3].map((ele, index) => {
                const isActive = selectMetingCard === ele;
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
                    <div className="w-100" style={{ position: "relative" }}>
                      <img src={icons.avatar8} alt="" className="fit-image" />
                      <div className="img-btn w-100">
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
    </>
  );
}

export default Interactions;
