import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./PlanBilling.scss";
import { icons } from "../../../../../utils/constants";
function AddressForm({ onHide, show, isEdit, ApartmentType }) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered
      className="AddressForm-form"
      style={{ borderRadius: "10px" }}
    >
      <Modal.Body>
        <div style={{ width: "500px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-24-700" style={{ color: "#1B2559" }}>
              {isEdit ? "Edit" : "Add"} Address Details
            </div>
            <div className="w-20 pointer" onClick={onHide}>
              <img src={icons.close} alt="" className="fit-image" />
            </div>
          </div>
          <div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Apartment Type:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  value={ApartmentType}
                  disabled
                  name="ApartmentType"
                  id="ApartmentType"
                />
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Street Name:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="Street"
                  id="Street"
                  placeholder="Street Name"
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                State:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="State"
                  id="State"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                PIN Code:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="number"
                  name="PINCode"
                  id="PINCode"
                  placeholder="PIN Code"
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Country:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="Country"
                  id="Country"
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Email:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Email"
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
              className="text-14-500 w-150 p-10"
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
              className="text-14-500 w-150 p-10 ms-10"
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddressForm;
