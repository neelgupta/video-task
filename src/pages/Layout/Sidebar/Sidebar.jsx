import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { icons } from "../../../utils/constants";
import { useSelector } from "react-redux";
import {
  creteImgFilter,
  getDataFromLocalStorage,
} from "../../../utils/helpers";
import "./Sidebar.scss";

const Sidebar = ({ isResponsive, show, setShow }) => {
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
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
      title: "Product",
      url: "/admin/product",
      icon: icons.dashboard,
    },
    {
      title: "Solutions",
      url: "/admin/solutions",
      icon: icons.dashboard,
      childOptions: [
        {
          title: "Recruitment",
          url: "/recruitment",
        },
        {
          title: "Sales & Marketing",
          url: "/sales-marketing",
        },
        {
          title: "Other",
          url: "/other",
        },
      ],
    },
    {
      title: "Pricing",
      url: "/admin/price",
      icon: icons.dashboard,
    },
    {
      title: "Examples",
      url: "/admin/examples",
      icon: icons.dashboard,
      childOptions: [
        {
          title: "templates",
          url: "/templates",
        },
        {
          title: "case-studies",
          url: "/case-studies",
        },
        {
          title: "inspiration examples",
          url: "/inspiration-examples",
        },
      ],
    },
    {
      title: "Resources",
      url: "/admin/resources",
      icon: icons.dashboard,
      childOptions: [
        {
          title: "blog",
          url: "/blog",
        },
        {
          title: "Community",
          url: "/community",
        },
        {
          title: "help",
          url: "/help",
        },
      ],
    },
  ];
  const teacherOptionsList = [];
  const displayOption =
    role === "admin" ? adminOptionsList : teacherOptionsList;
  return (
    <div style={{ backgroundColor: "white" }}>
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
        <Offcanvas.Body>
          <div id="sidebar-container">
            <div className="py-10 px-20 fb-center">
              <div className="h-72 w-141">
                <img src={""} alt="logo" className="fit-image" />
              </div>
              {isResponsive && (
                <div
                  className="h-18 w-18 pointer"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <img src={icons.close} alt="close" className="fit-image" />
                </div>
              )}
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
                        backgroundColor: isActive ? themeColor.sColor : "",
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
                          style={{ backgroundColor: themeColor.pColor }}
                        />
                      )}
                      <span className="icon-block">
                        {icon && (
                          <img
                            src={icon}
                            alt={title}
                            className="fit-image"
                            style={{
                              filter: creteImgFilter(
                                isActive ? themeColor.pColor : "#757F95"
                              ),
                            }}
                          />
                        )}
                      </span>
                      <span
                        className="title-block text-16-400"
                        style={{ color: isActive ? themeColor.pColor : "" }}
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
                                isActive ? themeColor.pColor : "#757F95"
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

export default Sidebar;
