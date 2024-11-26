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

const CustomFolderMenu = ({
  item,
  setShowDeleteModal,
  setIsCreateFolderModalShow,
  setRenamingFolder,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <img
          src={icons.three_dots}
          alt=""
          className="fit-image"
          style={{ filter: creteImgFilter("#8C8E90") }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          New QnAFlow
        </Dropdown.Item>

        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item
          onClick={() => {
            setRenamingFolder(item);
            setIsCreateFolderModalShow(true);
          }}
          className="text-14-500 "
        >
          Rename Folder
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}} className="text-14-500">
          Set Permissions
        </Dropdown.Item>
        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item
          onClick={() => setShowDeleteModal(item._id)}
          className="text-14-500 text-danger"
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomFolderMenu;
