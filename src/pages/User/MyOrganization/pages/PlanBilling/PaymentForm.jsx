import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./PlanBilling.scss";
import { icons } from "../../../../../utils/constants";
function PaymentForm({ onHide, show, isEdit }) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered
      className="PaymentForm-form"
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
              {isEdit ? "Edit" : "Add"} Payment Details
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
                Card Type:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  value={"Master Card"}
                  disabled
                  name="CardType"
                  id="CardType"
                />
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Card Number:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="CardNumber"
                  id="CardNumber"
                  placeholder="Card Number"
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                CVV:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="CVV"
                  id="CVV"
                  placeholder="CVV Number"
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Card Expiry Date:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="date"
                  name="ExpiryDate"
                  id="ExpiryDate"
                  placeholder="Card Expiry Date"
                />
              </div>
            </div>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                User Email:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="email"
                  name="UserEmail"
                  id="UserEmail"
                  placeholder="User Email"
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

export default PaymentForm;
