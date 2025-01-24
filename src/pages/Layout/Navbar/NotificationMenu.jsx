import { icons } from "../../../utils/constants";
import { creteImgFilter, encrypt } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  setAuthData,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { api } from "../../../services/api";
const teamInvitationsMessage = {
  1: "You have been invited to join our team and collaborate with us.",
  2: "You are cordially invited to become a valued member of our team.",
  3: "Join our team! We’ve sent you an invitation to collaborate and grow with us.",
  4: "You’ve been invited to be part of our team and contribute to our shared success.",
  5: "We’re excited to invite you to join our team and make an impact together.",
};

const NotificationMenu = ({ themeColor, isResponsive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { profileData } = reduxData;
  const notificationRef = useRef(null);
  const [show, setShow] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [invitationLoad, setInvitationLoad] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  useEffect(() => {
    getTeamNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTeamNotification = async () => {
    try {
      const res = await api.get(`notification/get-team-invitation`);
      if (res.status === 200) {
        setNotificationList(
          res.data.response.map((ele) => {
            return {
              ...ele,
              notification_type: "invitation",
            };
          })
        );
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const handelInvitationStatus = async (status, invitationDetails) => {
    setInvitationLoad(true);
    try {
      const req = {
        member_id: invitationDetails._id,
        invitation_status: status,
      };
      const res = await api.put("notification/update-team-status", req);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        window.location.reload();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setInvitationLoad(false);
  };

  return (
    <div className="position-relative NotificationMenu">
      <div
        className={`pointer rounded-circle f-center ${
          isResponsive ? "h-30 w-30" : "h-37 w-37"
        }`}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <span className="h-20 w-20 d-flex" style={{ position: "relative" }}>
          {notificationList.length > 0 && (
            <div
              className="is-notification"
              style={{
                position: "absolute",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "red",
                top: "-8px",
                right: "-8px",
                fontSize: "10px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                zIndex: "100000",
                lineHeight: "1",
                boxSizing: "border-box",
                padding: "0px",
                margin: "0px",
                border: "1px solid lightcoral",
              }}
            >
              <span>{notificationList.length}</span>
            </div>
          )}

          <img
            src={icons.notificationSvg}
            alt="notification"
            className={`fit-image icon-color-1B2559 hover-icons-effect ${
              show && "active_icon"
            }`}
          />
        </span>
      </div>
      {show && (
        <div className="notification-popover auri-scroll" ref={notificationRef}>
          {notificationList.length > 0 ? (
            notificationList.map((ele, index) => {
              const { notification_type } = ele;
              return (
                <>
                  {notification_type === "invitation" && (
                    <div className="team-notification-container" key={index}>
                      <div
                        className="m-0 p-0"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="notification-title">invitation</p>
                        {invitationLoad && (
                          <div className="m-0 p-10 ">
                            <Spinner size="sm" style={{ color: "white" }} />
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          padding: "5px",
                          gap: "10px",
                        }}
                      >
                        <div className="notification-icon w-50">
                          <img
                            src={icons.users}
                            alt=""
                            className="fit-image w-40 h-40"
                            style={{ filter: creteImgFilter("#ffffff") }}
                          />
                        </div>
                        <div className="notification-des">
                          <span>{ele.userDetails.email}</span>
                          <p>
                            You have been invited to join our team and
                            collaborate with us.
                          </p>
                        </div>
                      </div>
                      <div className="team-notification-btn">
                        <Button
                          className="accept-btn notification-btn"
                          onClick={() => {
                            handelInvitationStatus("completed", ele);
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          className="reject-btn notification-btn"
                          onClick={() => {
                            handelInvitationStatus("reject", ele);
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              );
            })
          ) : (
            <>
              <div
                className="wp-100 h-120"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={icons.notificationSvg}
                  alt="notification"
                  className={`fit-image w-70`}
                  style={{ filter: creteImgFilter("#cccccc") }}
                />
                <p className="p-0 m-0 text-14-600" style={{ color: "#aaa" }}>
                  Notification not found !.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
