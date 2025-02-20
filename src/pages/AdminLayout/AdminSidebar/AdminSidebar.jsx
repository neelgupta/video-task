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
import "./AdminSidebar.scss";

const AdminSidebar = ({ show, setShow }) => {
  const navigate = useNavigate();
  const role = getDataFromLocalStorage("role");
  const reduxData = useSelector((state) => state.global);
  const { themeColor, isResponsive, profileData } = reduxData;
  const [expand, setExpand] = useState("");

  const handleNavigate = (parentLink, subChildURL) => {
    navigate(`${parentLink}${subChildURL ? subChildURL : ""}`);
  };

  const userOptionsList = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: icons.logo,
    },
    {
      title: "Subscription",
      url: "/admin/subscription",
      icon: icons.logo,
    },
  ];
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
          <div id="admin-sidebar-container" className="flow">
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
            </div>

            <div
              className="side-option-container flow"
              style={{
                maxHeight:
                  role === "admin"
                    ? "calc(100vh - 300px)"
                    : "calc(100vh - 50px)",
              }}
            >
              {userOptionsList?.map((elm, index) => {
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
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AdminSidebar;
