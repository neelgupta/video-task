/* eslint-disable react/display-name */
import React, { useState } from "react";
import { creteImgFilter, getColorFromLetter } from "../../../../utils/helpers";
import { Dropdown } from "react-bootstrap";
import { icons } from "../../../../utils/constants";

function InteractionsChatCard({
  subTextColor,
  contact_id,
  contact_details,
  bgColor,
  isActive,
  textColor,
  onSelectChat,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <div className="chat_card mb-20 pointer" style={{ background: bgColor }}>
      <div className="d-flex wp-100 hp-100 p-10" onClick={() => onSelectChat()}>
        <div
          className="w-50 h-50"
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "50%",
            overflow: "hidden",
            color: isActive
              ? contact_id
                ? getColorFromLetter(
                    contact_details?.contact_email?.charAt(0) || ""
                  )
                : "#1B2559"
              : "white",
            backgroundColor: isActive
              ? "white"
              : contact_id
              ? getColorFromLetter(
                  contact_details?.contact_email?.charAt(0) || ""
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
            {(contact_id
              ? contact_details?.contact_email?.charAt(0) || ""
              : "A"
            )
              .toString()
              .toUpperCase()}
          </div>
        </div>
        <div>
          <div className="pb-5 text-16-600 ps-10" style={{ color: textColor }}>
            {contact_id
              ? contact_details?.contact_email.split("@")[0]
              : "Anonymous"}
          </div>
          <div className="text-12-500 ps-10" style={{ color: subTextColor }}>
            {contact_details?.contact_number || "-"}
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
          position: "absolute",
          right: "5px",
          top: "0px",
        }}
      >
        <div className="w-24 h-24">
          <InteractionMenu
            isSelected={isActive}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            setChatToDelete={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default InteractionsChatCard;

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
