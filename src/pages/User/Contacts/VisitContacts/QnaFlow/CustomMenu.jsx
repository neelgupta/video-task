import React from "react";
import { Dropdown } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";

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

CustomToggle.displayName = "CustomToggle";

const CustomMenu = ({ isSelected, setShowDeleteModal }) => {
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

export default CustomMenu;
