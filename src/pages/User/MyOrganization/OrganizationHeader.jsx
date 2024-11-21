import React from "react";
import { useNavigate } from "react-router-dom";

function OrganizationHeader({ type }) {
  const navigate = useNavigate();
  const menuList = [
    {
      title: "Overview",
      type: "overview",
    },
    {
      title: "Plan & Billing",
      type: "plan-billing",
    },
    {
      title: "Referrals",
      type: "referrals",
    },
    {
      title: "Team",
      type: "team",
    },
    {
      title: "Notifications",
      type: "notifications",
    },
    {
      title: "Media Library",
      type: "media-library",
    },
    {
      title: "Developer Apps",
      type: "developer-apps",
    },
    {
      title: "Webhooks",
      type: "webhooks",
    },
  ];
  return (
    <div className="OrganizationHeader auri-scroll">
      <div className="menu">
        {menuList.map((ele, index) => {
          return (
            <div
              onClick={() => navigate("/user/my-organization/" + ele.type)}
              className={`${type === ele.type && "active"}`}
              key={index}
            >
              {ele.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrganizationHeader;
