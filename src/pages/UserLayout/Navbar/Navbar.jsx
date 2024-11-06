import { useState } from "react";
import { useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  creteImgFilter,
  getDataFromLocalStorage,
} from "../../../utils/helpers";
import ThemePicker from "./ThemePicker";
import Localization from "./Localization";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "./Navbar.scss";

const Navbar = ({ isResponsive, setShow }) => {
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
  const activeImageFilter = creteImgFilter(themeColor.pColor);
  const role = getDataFromLocalStorage("role");
  const isMode = ["admin"].includes(role);
  const isTheme = ["admin"].includes(role);
  const isInbox = ["admin"].includes(role);
  const isLocalization = ["admin"].includes(role);
  return (
    <div id="navbar-container">
      {isResponsive && (
        <div
          className={`pointer ${isResponsive ? "h-30 w-30" : "h-37 w-37"}`}
          onClick={() => {
            setShow(true);
          }}
        >
          <img src={icons.menuBar} alt="menuBar" className="fit-image" />
        </div>
      )}
      <div className="search-container">
        <span className="h-24 w-24 d-flex">
          <img src={icons.search} alt="search" className="fit-image" />
        </span>
        <input type="text" placeholder="Search" />
      </div>
      <div className="right-end-block">
        {isMode && (
          <DarkModeSwitch
            style={{
              backgroundColor: themeColor.sColor,
              height: isResponsive ? "30px" : "37px",
              width: isResponsive ? "30px" : "37px",
              padding: "6px",
              borderRadius: "35px",
            }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={18}
            moonColor={themeColor?.pColor}
            sunColor={themeColor?.pColor}
          />
        )}
        {isTheme && (
          <ThemePicker
            isResponsive={isResponsive}
            themeColor={themeColor}
            activeImageFilter={activeImageFilter}
          />
        )}
        {isInbox && (
          <div
            className={`pointer rounded-circle f-center ${
              isResponsive ? "h-30 w-30" : "h-37 w-37"
            }`}
            style={{ backgroundColor: themeColor.sColor }}
            onClick={() => {
              navigate("/console/inbox");
            }}
          >
            <span className="h-18 w-18 d-flex">
              <img
                src={icons.message}
                alt="message"
                className="fit-image"
                style={{
                  filter: activeImageFilter,
                }}
              />
            </span>
          </div>
        )}
        <div
          className={`pointer rounded-circle f-center ${
            isResponsive ? "h-30 w-30" : "h-37 w-37"
          }`}
          style={{ backgroundColor: themeColor.sColor }}
          onClick={() => {
            if (role === "admin") {
              navigate("/console/notifications");
            } else {
              navigate("/teacher/notifications");
            }
          }}
        >
          <span className="h-18 w-18 d-flex">
            <img
              src={icons.notification}
              alt="notification"
              className="fit-image"
              style={{
                filter: activeImageFilter,
              }}
            />
          </span>
        </div>
        {isLocalization && <Localization isResponsive={isResponsive} />}
        <div className="h-37 sp-border" />
        <div className={`pointer ${isResponsive ? "h-30 w-30" : "h-37 w-37"}`}>
          <img src={icons.avatar} alt="avatar" className="fit-image" />
        </div>
        <div className="profile-data">
          <div className="text-16-500 color-1923">Jay Hargudson</div>
          <div className="text-12-400 color-7f95">Admin</div>
        </div>
        <ProfileMenu themeColor={themeColor} role={role} />
      </div>
    </div>
  );
};

export default Navbar;
