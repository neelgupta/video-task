import React, { useEffect, useState } from "react";
import "./Interactions.scss";
import { icons } from "../../../utils/constants";
import { Dropdown } from "react-bootstrap";

// eslint-disable-next-line react/display-name
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

const InteractionFilter = ({ setSelectedFilter, selectedFilter }) => {
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "This Week", value: "thisWeek" },
    { label: "Previous Week", value: "previousWeek" },
    { label: "This Month", value: "thisMonth" },
    { label: "Previous Month", value: "previousMonth" },
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
              className="text-14-500"
              style={
                selectedFilter === option.value
                  ? {
                      fontWeight: "bold",
                      color: "#fff",
                      backgroundColor: "#7c5bff",
                    }
                  : {
                      backgroundColor: "#fff",
                      color: "#000",
                    }
              }
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

export default InteractionFilter;
