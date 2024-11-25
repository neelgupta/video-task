import React, { useEffect, useState } from "react";
import "./Notifications.scss";
import OutlineCheck from "./OutlineCheck";
import OutlineRadio from "./OutlineRadio";
import { api } from "../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";

function Notifications() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const [isChange, setIsChange] = useState("");
  const [radio, setRadio] = useState("");
  const [checkBox, setCheckBox] = useState({});

  useEffect(() => {
    if (selectedOrganizationId) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get(`user/organization/${selectedOrganizationId}`);
      if (res.status === 200) {
        const data = res.data.response;
        if (data) {
          const notification_settings = data?.notification_settings;
          setCheckBox({
            new_user_contacts:
              notification_settings?.new_user_contacts || false,
            tips_and_tutorials:
              notification_settings?.tips_and_tutorials || false,
            user_research: notification_settings?.user_research || false,
          });
          setRadio(data?.replies || "");
        }
        setIsChange("");
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  const updateNotifications = async (valueObj, type, message) => {
    try {
      setIsChange(Object.keys(valueObj)?.[0] || "");
      const req = {
        organization_id: selectedOrganizationId,
        ...(type === "checkBox"
          ? {
              notification_settings: {
                ...checkBox,
                ...valueObj,
              },
            }
          : { ...valueObj }),
      };
      const res = await api.put("user/update-organization", req);
      if (res.status === 200) {
        dispatch(showSuccess(`${message} ${res.data.message}`));
      } else {
        dispatch(throwError(`${message} ${res.data.message}`));
      }
      fetchNotifications();
      return;
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
      setIsChange("");
      return;
    }
  };
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
            <OutlineCheck
              className="w-24 h-24"
              isCheck={checkBox.new_user_contacts}
              onChange={(val) => {
                updateNotifications(
                  { new_user_contacts: val },
                  "checkBox",
                  "New User Contacts"
                );
              }}
              isDisabled={isChange === "new_user_contacts"}
            />
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
            <OutlineCheck
              className="w-24 h-24"
              isCheck={checkBox.tips_and_tutorials}
              onChange={(val) => {
                updateNotifications(
                  { tips_and_tutorials: val },
                  "checkBox",
                  "Tips and tutorials"
                );
              }}
              isDisabled={isChange === "tips_and_tutorials"}
            />
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
            <OutlineCheck
              className="w-24 h-24"
              isCheck={checkBox.user_research}
              onChange={(val) => {
                updateNotifications(
                  { user_research: val },
                  "checkBox",
                  "User Research"
                );
              }}
              isDisabled={isChange === "user_research"}
            />
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
              isCheck={radio === "DoNotNotify"}
              onChange={() => {
                updateNotifications(
                  { replies: "DoNotNotify" },
                  "radio",
                  "Replies"
                );
              }}
              isDisabled={isChange === "replies"}
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
              isCheck={radio === "MentionsOnly"}
              onChange={() => {
                updateNotifications(
                  { replies: "MentionsOnly" },
                  "radio",
                  "Replies"
                );
              }}
              isDisabled={isChange === "replies"}
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
              isCheck={radio === "AllComments"}
              onChange={() => {
                updateNotifications(
                  { replies: "AllComments" },
                  "radio",
                  "Replies"
                );
              }}
              isDisabled={isChange === "replies"}
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
