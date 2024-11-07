import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { icons } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { Button } from "../../../components";
import {
  creteImgFilter,
  getDataFromLocalStorage,
} from "../../../utils/helpers";
import "./Sidebar.scss";

const Sidebar = ({ show, setShow }) => {
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { themeColor, isResponsive } = reduxData;
  const role = getDataFromLocalStorage("role");

  useState(false);

  const [expand, setExpand] = useState("");
  const handleNavigate = (parentLink, subChildURL) => {
    navigate(`${parentLink}${subChildURL ? subChildURL : ""}`);
  };

  useEffect(() => {
    if (window?.location?.pathname?.includes("admin/solutions")) {
      setExpand(1);
    }
    if (window?.location?.pathname?.includes("admin/examples")) {
      setExpand(3);
    }

    if (window?.location?.pathname?.includes("admin/resources")) {
      setExpand(4);
    }
  }, []);

  const adminOptionsList = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: icons.dashboard,
    },
    {
      title: "Interactions",
      url: "/admin/interactions",
      icon: icons.Interactions,
    },
    {
      title: "Contacts",
      url: "/admin/contacts",
      icon: icons.Contacts,
    },
    {
      title: "My Collection",
      url: "/admin/collection",
      icon: icons.Folder,
    },
    {
      title: "Trash",
      url: "/admin/trash",
      icon: icons.Trash,
    },
    {
      title: "Subscription",
      url: "/admin/subscription",
      icon: icons.users,
    },
  ];
  const teacherOptionsList = [];
  const displayOption =
    role === "admin" ? adminOptionsList : teacherOptionsList;
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
        }}
        responsive="lg"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="sidebar-card">
          <div id="admin-sidebar-container" className="auri-scroll">
            <div
              className="py-10 px-20 f-center"
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              <div className="h-72 w-141 ">
                <img src={icons.LogoText} alt="logo" className="fit-image" />
              </div>
              {isResponsive && (
                <div
                  className="h-16 w-16 pointer close-icon"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <img src={icons.close} alt="close" className="fit-image" />
                </div>
              )}
            </div>
            <div
              className="py-10 px-20 f-center text-18-500"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
            >
              My Organization
            </div>
            <div
              className="side-option-container auri-scroll"
              style={{
                maxHeight:
                  role === "admin"
                    ? "calc(100vh - 300px)"
                    : "calc(100vh - 50px)",
              }}
            >
              {displayOption?.map((elm, index) => {
                const { title, icon, url, childOptions, isPending } = elm;
                const isActive = window.location.pathname?.includes(url);
                const isChild = childOptions?.length > 0;
                const subChildURL = isChild ? childOptions?.[0]?.url : "";

                return (
                  <div key={index} className="main-option-block">
                    <div
                      className={`fa-center gap-2 option-item ${
                        isActive ? "active" : ""
                      }`}
                      style={{
                        background: isActive
                          ? `linear-gradient(to right , rgba(179, 161, 255, 0.3), transparent 40%)`
                          : "",
                      }}
                      onClick={() => {
                        if (!isPending) {
                          if (isChild) {
                            setExpand(index);
                          } else {
                            setExpand("");
                          }
                          handleNavigate(url, subChildURL);
                        }
                      }}
                    >
                      {isActive && (
                        <span
                          className="v-active-line"
                          style={{ backgroundColor: themeColor.darkColor }}
                        />
                      )}
                      <span className="icon-block">
                        {icon && (
                          <img
                            src={icon}
                            alt={title}
                            className="fit-image w-16"
                            style={{
                              filter: creteImgFilter(
                                isActive ? themeColor.darkColor : "#757F95"
                              ),
                            }}
                          />
                        )}
                      </span>
                      <span
                        className="title-block text-18-400"
                        style={{ color: isActive ? themeColor.darkColor : "" }}
                      >
                        {title}
                      </span>
                      {isChild && (
                        <span className="down-block">
                          <img
                            src={icons.down}
                            alt="down"
                            className="fit-image"
                            style={{
                              filter: creteImgFilter(
                                isActive ? themeColor.darkColor : "#757F95"
                              ),
                            }}
                          />
                        </span>
                      )}
                    </div>
                    {expand === index && (
                      <div className="child-option-block">
                        {childOptions?.map((cElem, cIndex) => {
                          const isSubActive =
                            window.location.pathname?.includes(cElem?.url);
                          return (
                            <div
                              key={cIndex}
                              className={`text-16-400 child-item pointer ${
                                isSubActive ? "active-child" : ""
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleNavigate(url, cElem.url);
                              }}
                              style={{
                                color: isSubActive ? themeColor.pColor : "",
                              }}
                            >
                              {cElem?.title}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="f-center p-20"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
            >
              <Button
                onClick={() => {}}
                btnText="New QnAFlow"
                className="h-50 pe-20 ps-20 text-16-300 wp-100"
                leftIcon={icons.cricleAdd}
                iconColor="#ffffff"
                style={{
                  background: `linear-gradient(to right , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
                  border: "none",
                  color: "white",
                  borderRadius: "50px",
                }}
              />
            </div>

            <div className="p-10">
              <div
                className="gradient-card"
                style={{
                  background: `linear-gradient(135deg, ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
                }}
              >
                <div className="circle-container">
                  <div className="icon-container">
                    <div
                      className="circle-box"
                      style={{
                        background: `linear-gradient(to top , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
                      }}
                    >
                      <img
                        src={icons.crown}
                        alt="down"
                        className="fit-image w-40"
                        style={{
                          filter: creteImgFilter("#FFFFFF"),
                        }}
                      />
                    </div>
                  </div>
                </div>
                <h2>Go Boundless with PRO!</h2>
                <p>
                  Level Up with QnAFlow PRO – Premium AI Video Questions for
                  Next-Level Engagement!
                </p>
                <button
                  className="try-now-button"
                  style={{ color: themeColor.darkColor }}
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
