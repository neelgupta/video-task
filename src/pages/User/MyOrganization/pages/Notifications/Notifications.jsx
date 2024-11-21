import React, { useState } from "react";
import "./Notifications.scss";
import OutlineCheck from "./OutlineCheck";
import OutlineRadio from "./OutlineRadio";

function Notifications() {
  const [radio, setRadio] = useState("");
  return (
    <div className="Notifications">
      <div className="" style={{ borderBottom: "1px solid #DCDEE4" }}>
        <div className="text-24-600" style={{ color: "#1B2559" }}>
          Notification Preferences
        </div>
        <div className="text-12-500 mt-5 mb-20" style={{ color: "#696F8C" }}>
          Get emails to found out what is going on when you are not online. You
          can turn them off anytime.
        </div>
      </div>
      <div className=" mt-20 mb-20">
        <div className="text-18-600" style={{ color: "#292929" }}>
          Notifications from Us
        </div>
        <div className="text-12-500 mt-5 " style={{ color: "#696F8C" }}>
          Receive the latest news, updates, and industry tutorials from us.
        </div>
      </div>

      <div>
        <div
          className="mt-20"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="me-20">
            <OutlineCheck className="w-24 h-24" />
          </div>
          <div className="m-0 p-0">
            <div className="text-14-600" style={{ color: "#292929" }}>
              New User Contacts
            </div>
            <div className="text-12-500 " style={{ color: "#696F8C" }}>
              News about product and feature updates.
            </div>
          </div>
        </div>
        <div
          className="mt-20"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="me-20">
            <OutlineCheck className="w-24 h-24" />
          </div>
          <div className="m-0 p-0">
            <div className="text-14-600" style={{ color: "#292929" }}>
              Tips and tutorials
            </div>
            <div className="text-12-500 " style={{ color: "#696F8C" }}>
              Tips on getting more out of Courier.
            </div>
          </div>
        </div>
        <div
          className="mt-20"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="me-20">
            <OutlineCheck className="w-24 h-24" />
          </div>
          <div className="m-0 p-0">
            <div className="text-14-600" style={{ color: "#292929" }}>
              User research
            </div>
            <div className="text-12-500 " style={{ color: "#696F8C" }}>
              Data results to help you better understand your users.
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-20 mb-20">
        <div className="text-18-600" style={{ color: "#292929" }}>
          Replies
        </div>
        <div className="text-12-500 mt-5 " style={{ color: "#696F8C" }}>
          These are notifications for comments on your posts and replies to your
          comments
        </div>
      </div>
      <div>
        <div
          className="mt-20"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="me-20">
            <OutlineRadio
              className="w-24 h-24"
              isCheck={radio === "1"}
              onChange={() => {
                setRadio("1");
              }}
            />
          </div>
          <div className="text-14-600 " style={{ color: "#292929" }}>
            Do not notify me
          </div>
        </div>

        <div
          className="mt-20"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="me-20">
            <OutlineRadio
              className="w-24 h-24"
              isCheck={radio === "2"}
              onChange={() => {
                setRadio("2");
              }}
            />
          </div>
          <div className="m-0 p-0">
            <div className="text-14-600" style={{ color: "#292929" }}>
              Mentions only
            </div>
            <div className="text-12-500 " style={{ color: "#696F8C" }}>
              Only notify me if I’m mentioned in a comment.
            </div>
          </div>
        </div>
        <div
          className="mt-20"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="me-20">
            <OutlineRadio
              className="w-24 h-24"
              isCheck={radio === "3"}
              onChange={() => {
                setRadio("3");
              }}
            />
          </div>
          <div className="m-0 p-0">
            <div className="text-14-600" style={{ color: "#292929" }}>
              All comments
            </div>
            <div className="text-12-500 " style={{ color: "#696F8C" }}>
              Notify me for all comments on my posts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
