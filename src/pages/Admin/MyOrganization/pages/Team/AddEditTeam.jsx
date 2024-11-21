import React from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { icons } from "../../../../../utils/constants";
import "./Team.scss";
function AddEditTeam({ isEdit, onHide, show }) {
  const option = [
    {
      label: "Owner",
      value: "Owner",
    },
    {
      label: "Member",
      value: "Member",
    },
    {
      label: "Admin",
      value: "Admin",
    },
  ];
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered
      className="AddEditTeam"
      style={{ borderRadius: "10px" }}
    >
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-24-700" style={{ color: "#1B2559" }}>
            {isEdit ? "Edit" : "Add"} Member
          </div>
          <div className="w-20 pointer" onClick={onHide}>
            <img src={icons.close} alt="" className="fit-image" />
          </div>
        </div>
        <div
          className="text-12-500 mt-5"
          style={{ color: "#989BA1", textAlign: "start" }}
        >
          Add new team members to collaborate and achieve your goals together.
        </div>
        <div>
          <div className="mt-20">
            <div
              className="text-12-500 ps-5 pb-5"
              style={{ color: "#666666", textAlign: "start" }}
            >
              Name:
            </div>
            <div>
              <input
                className="input wp-100"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
            </div>
          </div>

          <div className="mt-20">
            <div
              className="text-12-500 ps-5 pb-5"
              style={{ color: "#666666", textAlign: "start" }}
            >
              Email (Required):
            </div>
            <div>
              <input
                className="input wp-100"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="mt-20">
            <div
              className="text-12-500 ps-5 pb-5"
              style={{ color: "#666666", textAlign: "start" }}
            >
              Phone Number:
            </div>
            <div>
              <input
                className="input wp-100"
                type="number"
                name="Number"
                id="Number"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="mt-20">
            <div
              className="text-12-500 ps-5 pb-5"
              style={{ color: "#666666", textAlign: "start" }}
            >
              Role:
            </div>
            <div>
              <Select
                className=""
                options={option}
                placeholder={"Select Role"}
                styles={{ outline: "none" }}
              />
            </div>
          </div>
        </div>
        <div
          className="wp-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginTop: "20px",
          }}
        >
          <Button
            style={{
              background: "#8C8E90",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            className="text-14-500 w-150 p-5"
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button
            style={{
              background:
                "linear-gradient(91.9deg, #7B5BFF -2.22%, #B3A1FF 101.51%)",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            className="text-14-500 w-150 p-5 ms-10"
          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddEditTeam;
