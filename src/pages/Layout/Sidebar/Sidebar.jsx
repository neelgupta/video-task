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

const Sidebar = ({ show, setShow, setShowCreateFlowModal }) => {
  const navigate = useNavigate();
  const role = getDataFromLocalStorage("role");
  const reduxData = useSelector((state) => state.global);
  const { themeColor, isResponsive, profileData } = reduxData;
  const [organization, setOrganization] = useState({});
  const [expand, setExpand] = useState("");

  useEffect(() => {
    if (profileData && profileData.organizations?.length !== 0) {
      setOrganization(profileData.organizations?.[0]);
    }
  }, [profileData]);

  const handleNavigate = (parentLink, subChildURL) => {
    navigate(`${parentLink}${subChildURL ? subChildURL : ""}`);
  };

  useEffect(() => {
    if (window?.location?.pathname?.includes("user/solutions")) {
      setExpand(1);
    }
    if (window?.location?.pathname?.includes("user/examples")) {
      setExpand(3);
    }
    if (window?.location?.pathname?.includes("user/resources")) {
      setExpand(4);
    }
  }, []);

  const userOptionsList = [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: icons.logo,
    },
    {
      title: "Interactions",
      url: "/user/interactions",
      icon: icons.Interactions,
    },
    {
      title: "Contacts",
      url: "/user/contacts",
      icon: icons.Contacts,
    },
    {
      title: "My Collection",
      url: "/user/collection",
      icon: icons.Folder,
    },
    {
      title: "Trash",
      url: "/user/trash",
      icon: icons.Trash,
    },
  ];
  const teacherOptionsList = [];
  const displayOption = role === "admin" ? teacherOptionsList : userOptionsList;
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
              <div
                className="h-72 w-130 text-26-700 f-center"
                style={{ color: "#1B2559" }}
              >
                {/* <img src={icons.LogoText} alt="logo" className="fit-image" /> */}
                {"Flōw AI"}
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
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
              className="Organization-btn"
            >
              <div className="px-15 py-10 pointer f-center text-16-700 color-darkText custom-btn">
                <div style={{ textTransform: "capitalize" }}>
                  {organization?.organization_name || ""}
                </div>
                <div className="w-12 ms-10">
                  <img
                    src={icons.arrow_down}
                    alt="close"
                    className="fit-image icon-color-1B2559 arrow_icon"
                  />
                </div>

                <div className="organizationMenu">
                  <div
                    className="text-14-500 mb-10"
                    style={{ color: "#989BA1" }}
                  >
                    Setup Organization
                  </div>
                  <div
                    onClick={() => {
                      navigate("/user/my-organization/overview", {
                        state: { organizationId: organization._id },
                      });
                    }}
                    className="text-14-500 mt-10 link"
                  >
                    Explore Your Organization
                  </div>
                  <div
                    onClick={() =>
                      navigate("/user/my-organization/team", {
                        state: { organizationId: organization._id },
                      })
                    }
                    className="text-14-500 mt-10 link"
                  >
                    Invite Your Team
                  </div>
                </div>
              </div>
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
                          ? `linear-gradient(to right , rgba(67, 24, 255, 0.05), rgba(67, 24, 255, 0) 100%)`
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
                            className="fit-image w-20"
                            style={{
                              filter: creteImgFilter(
                                isActive ? themeColor.darkColor : "#757F95"
                              ),
                            }}
                          />
                        )}
                      </span>
                      <span
                        className={`title-block ${
                          isActive ? "text-18-700" : "text-18-600"
                        }`}
                        style={{ color: isActive ? "var(--darkText)" : "" }}
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
                onClick={() => setShowCreateFlowModal(true)}
                btnText="New Flōw AI"
                className="h-50 pe-20 ps-20 text-16-300 wp-100"
                leftIcon={icons.cricleAdd}
                iconColor="#ffffff"
                style={{
                  background: `linear-gradient(to right , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
                  border: "none",
                  color: "white",
                  borderRadius: "50px",
                  boxShadow: "0px 6px 24px 1px #7090B00A",
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
                  Level Up with QnAFlow PRO-Premium AI Video Questions for
                  Next-Level Engagement!
                </p>
                <button className="try-now-button" style={{ color: "white" }}>
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
