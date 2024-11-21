/* eslint-disable react/display-name */
import React from "react";
import { Dropdown } from "react-bootstrap";
import { creteImgFilter } from "../../../utils/helpers";
import { icons } from "../../../utils/constants";

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

const CustomFileMenu = ({ showDeleteModal, setShowDeleteModal }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <img
          src={icons.three_dots}
          alt=""
          className="fit-image"
          style={{ filter: creteImgFilter("#ffffff") }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          View
        </Dropdown.Item>

        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item onClick={() => {}} className="text-14-500 ">
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          Move to folder
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          Duplicate
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          Share
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          Setting
        </Dropdown.Item>
        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item
          onClick={() => setShowDeleteModal(true)}
          className="text-14-500 text-danger"
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomFileMenu;
