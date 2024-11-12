/* eslint-disable react/display-name */
import React, { useState } from "react";
import "./Trash.scss";
import { Dropdown } from "react-bootstrap";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import DeleteModal from "../Interactions/Interactions/DeleteModal";

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

const CustomMenu = ({ showDeleteModal, setShowDeleteModal }) => {
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
          Restore
        </Dropdown.Item>

        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item
          onClick={() => {
            setShowDeleteModal(true);
          }}
          className="text-14-500 text-danger"
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Card = ({ item }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <div className="custom-card">
        <img src={item.avatar} alt="Avatar" className="custom-card-image" />
        <div className="custom-card-title">{item.title}</div>
        <div className="custom-card-menu">
          <CustomMenu
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
          />
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
        text="Once deleted, they cannot be recovered."
      />
    </>
  );
};

export default Card;
