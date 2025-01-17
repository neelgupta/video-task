import React from "react";
import { creteImgFilter } from "../../../../../utils/helpers";
import { icons } from "../../../../../utils/constants";
import { Button } from "react-bootstrap";

function PlanCard({ ele, onPurchase, isActive, isPurchase }) {
  return (
    <div className="plans-card">
      <div style={{ position: "relative", width: "100%" }}>
        <div className="text-32-400" style={{ color: "#1B2559" }}>
          {ele?.title}
        </div>
        {ele?.is_best_deal && (
          <Button className="Best_Deal_btn">Best Deal</Button>
        )}
      </div>
      <div
        className="text-16-400"
        style={{ color: "#536174", textTransform: "capitalize" }}
      >
        {ele?.sub_title}
      </div>
      <div
        className={`text-${
          ele.plan_type === "enterprise" ? "35" : "48"
        }-600 mt-10 mb-30`}
        style={{
          color: ele?.plan_type === "free" ? "#7B5AFF" : "black",
          textTransform: "capitalize",
        }}
      >
        {ele?.plan_type === "free" ? (
          "Free"
        ) : (
          <>
            <sup className="text-32-600">
              {ele?.currency === "USD" ? "$" : "$"}
            </sup>
            {ele?.price}
            {ele?.plan_type !== "" && (
              <sub className="text-14-400" style={{ color: "#98A2B2" }}>
                / month
              </sub>
            )}
          </>
        )}
      </div>
      {isActive && <div className="active">Active plan</div>}

      <div className="mt-30">
        <div
          className="text-20-500 mb-5"
          style={{ color: "#14171C", textTransform: "capitalize" }}
        >
          Include
        </div>
        <div
          className="text-16-400"
          style={{ color: "#536174", textTransform: "capitalize" }}
        >
          {ele?.description}
        </div>
        <div className="mt-40">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
            className="mt-20 mb-20"
          >
            <div className="w-20 h-20">
              <img
                src={icons.check}
                alt=""
                className="fit-image"
                style={{ filter: creteImgFilter("#7B5BFF") }}
              />
            </div>
            <div
              className="text-16-400 "
              style={{
                color: "#536174",
              }}
            >
              {ele.page} Page Unlock
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
            className="mt-20 mb-20"
          >
            <div className="w-20 h-20">
              <img
                src={icons.check}
                alt=""
                className="fit-image"
                style={{ filter: creteImgFilter("#7B5BFF") }}
              />
            </div>
            <div
              className="text-16-400 "
              style={{
                color: "#536174",
              }}
            >
              {ele.storage} GB Storage
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
            className="mt-20 mb-20"
          >
            <div className="w-20 h-20">
              <img
                src={icons.check}
                alt=""
                className="fit-image"
                style={{ filter: creteImgFilter("#7B5BFF") }}
              />
            </div>
            <div
              className="text-16-400 "
              style={{
                color: "#536174",
              }}
            >
              {ele.members} Team Members
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
            className="mt-20 mb-20"
          >
            <div className="w-20 h-20">
              <img
                src={icons.check}
                alt=""
                className="fit-image"
                style={{ filter: creteImgFilter("#7B5BFF") }}
              />
            </div>
            <div
              className="text-16-400 "
              style={{
                color: "#536174",
              }}
            >
              Unlimited basic feature
            </div>
          </div>
        </div>

        {ele?.button_text && ele?.plan_type !== "free" && (
          <div className="mt-30">
            <Button
              className="wp-100 text-16-500"
              disabled={isPurchase}
              style={{
                padding: "12px 0px",
                background: "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
                border: "none",
              }}
              onClick={() => onPurchase(ele)}
            >
              {ele.button_text}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
