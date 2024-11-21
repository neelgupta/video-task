import React from "react";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";

function BillingCard({ ele, type, onAddEdit }) {
  return (
    <div className="Billing_card">
      <div className="Billing_header">{ele}</div>
      <div className="Billing_body">
        <div className="det_card">
          <div className="edit_delete_btn">
            <img
              src={icons.edit}
              alt=""
              className="fit-image w-18 h-18 pointer "
              style={{ filter: creteImgFilter("#1B2559") }}
              onClick={onAddEdit}
            />
            <img
              src={icons.deleteSVG}
              alt=""
              className="fit-image w-18 h-18 pointer"
              style={{ filter: creteImgFilter("#1B2559") }}
            />
          </div>
          {type === "billing" && (
            <>
              <div className="text-16-500">Dr. Cheque</div>
              <div className="text-14-400">1234 Elm Street</div>
              <div className="text-14-400">Apt. 56B</div>
              <div className="text-14-400">Springfield, IL 62704</div>
              <div className="text-14-400">USA</div>
              <div className="mt-10">
                <img
                  src={icons.email}
                  alt=""
                  className="fit-image w-14 h-14"
                  style={{ filter: creteImgFilter("#696969") }}
                />
                <span className="text-11-400 ms-5" style={{ color: "#696969" }}>
                  drchque@gmail.com
                </span>
              </div>
            </>
          )}

          {type === "Payment" && (
            <div style={{ display: "flex", alignItems: "start", gap: "15px" }}>
              <div className="">
                <img src={icons.master} alt="" className="fit-image w-40" />
              </div>
              <div>
                <div className="text-16-500 " style={{ color: "#2C2C2C" }}>
                  Master Card
                </div>
                <div className="text-12-500 mt-5" style={{ color: "#2C2C2C" }}>
                  **** **** **** 4002
                </div>
                <div className="text-10-500 mt-5" style={{ color: "#696969" }}>
                  Expiry on 20/2024
                </div>
                <div className="mt-10">
                  <img
                    src={icons.email}
                    alt=""
                    className="fit-image w-14 h-14"
                    style={{ filter: creteImgFilter("#696969") }}
                  />
                  <span
                    className="text-11-400 ms-5"
                    style={{ color: "#696969" }}
                  >
                    drchque@gmail.com
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="wp-100"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <div
            onClick={onAddEdit}
            className="pointer mt-8"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              className="w-18 h-18"
              style={{
                border: "1px solid #1B2559",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={icons.addIcon}
                alt=""
                className="fit-image w-10 h-10"
                style={{ filter: creteImgFilter("#1B2559") }}
              />
            </div>
            <div className="text-12-500" style={{ color: "#696969" }}>
              Add More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingCard;
