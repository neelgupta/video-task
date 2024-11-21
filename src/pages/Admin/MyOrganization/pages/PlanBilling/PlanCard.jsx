import React from "react";
import { creteImgFilter } from "../../../../../utils/helpers";
import { icons } from "../../../../../utils/constants";
import { Button } from "react-bootstrap";

function PlanCard({ ele }) {
  return (
    <div className="plans-card">
      <div style={{ position: "relative", width: "100%" }}>
        <div className="text-32-400" style={{ color: "#1B2559" }}>
          {ele.title}
        </div>
        {ele.bestDealBtn && ele.bestDealBtn.is && (
          <Button className="Best_Deal_btn">{ele.bestDealBtn.text}</Button>
        )}
      </div>
      <div
        className="text-16-400"
        style={{ color: "#536174", textTransform: "capitalize" }}
      >
        {ele.subTitle}
      </div>
      <div
        className="text-48-600 mt-10 mb-30"
        style={{
          color: ele.type === "free" ? "#7B5AFF" : "black",
          textTransform: "capitalize",
        }}
      >
        {ele.type === "free" ? (
          "Free"
        ) : (
          <>
            <sup className="text-32-600">$</sup>
            {ele.price}
            {ele.type !== "" && (
              <sub className="text-14-400" style={{ color: "#98A2B2" }}>
                / month
              </sub>
            )}
          </>
        )}
      </div>

      {ele?.upgradeBtn && ele.upgradeBtn.is && (
        <div
          className="text-14-500"
          style={{
            color: ele.upgradeBtn.isSelect ? "#7E8B9E" : "white",
            background: ele.upgradeBtn.isSelect
              ? "#F6F6F6"
              : "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
            display: "inline",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          {ele.upgradeBtn.text}
        </div>
      )}

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
          Everything you get in this plan
        </div>
        <div className="mt-40">
          {(ele.planDes || []).map((ele, index) => {
            return (
              <div
                key={index}
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
                  {ele}
                </div>
              </div>
            );
          })}
        </div>

        {ele.moreBtn && ele.moreBtn.is && (
          <div className="mt-30">
            <Button
              className="wp-100 text-16-500"
              style={{
                padding: "12px 0px",
                background: "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
                border: "none",
              }}
            >
              {ele.moreBtn.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
