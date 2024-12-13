/* eslint-disable react/display-name */
import React from "react";
import { Dropdown } from "react-bootstrap";
import { creteImgFilter } from "../../../../utils/helpers";
import { icons } from "../../../../utils/constants";

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

const CustomFileMenu = ({
  onEditClick,
  onDeleteClick,
  onMoveClick,
  onViewClick,
  onDuplicateClick,
  onShareClick,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <img
          src={icons.three_dots}
          alt=""
          className="fit-image w-25"
          style={{
            filter: creteImgFilter("#ffffff"),
          }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ boxShadow: "0px 0px 50px rgba(0,0,0,0.8)" }}>
        <Dropdown.Item
          onClick={() => {
            onViewClick();
          }}
          className="text-14-600 "
          style={{ display: "flex", alignItems: "center" }}
        >
          View
          <div className="w-8 mb-5 ms-5">
            <img src={icons.top_right_arrow} alt="" className="fit-image" />
          </div>
        </Dropdown.Item>

        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item
          onClick={() => {
            onEditClick();
          }}
          className="text-14-500"
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            onMoveClick();
          }}
          className="text-14-500"
        >
          Move to folder
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            onDuplicateClick();
          }}
          className="text-14-500"
        >
          Duplicate
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            onShareClick();
          }}
          className="text-14-500"
        >
          Share
        </Dropdown.Item>

        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item
          onClick={() => {
            onDeleteClick();
          }}
          className="text-14-500 text-danger"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="w-13 mb-5 me-5">
            <img
              src={icons.deleteSVG}
              alt=""
              className="fit-image"
              style={{ filter: creteImgFilter("#dc3545") }}
            />
          </div>
          <div>Delete</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomFileMenu;
