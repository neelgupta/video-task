import { useDispatch, useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
import "./Navbar.scss";
import { encrypt } from "../../../utils/helpers";
import { setAuthData } from "../../../store/globalSlice";
import ProfileMenu from "./ProfileMenu";
import NotificationMenu from "./NotificationMenu";

const Navbar = ({ setShow, pageTitle, onBack }) => {
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const { themeColor, isResponsive } = reduxData;
  const dispatch = useDispatch();

  return (
    <div
      id="admin-navbar-container"
      style={{
        background: "transparent",
        justifyContent: "space-between",
      }}
    >
      {isResponsive ? (
        <div
          className={`pointer ${isResponsive ? "h-30 w-30" : "h-37 w-37"}`}
          onClick={() => {
            setShow(true);
          }}
        >
          <img src={icons.menuBar} alt="menuBar" className="fit-image" />
        </div>
      ) : (
        <div className={`f-center ${onBack && "pointer"}`} onClick={onBack}>
          <div className="h-30 w-30 me-5 pointer">
            <img src={icons.arrow_left} alt="menuBar" className="fit-image" />
          </div>
          <div className="text-34-700 color-darkText">{pageTitle}</div>
        </div>
      )}
      <div className={`profile-det ${isResponsive ? "w-350" : "w-400"}`}>
        <div className="search-container wp-70">
          <span className="d-flex">
            <img
              src={icons.search}
              alt="search"
              className="fit-image icon-color-1B2559"
            />
          </span>
          <input type="text" placeholder="Search" />
        </div>
        <div className="right-end-block wp-30">
          <NotificationMenu
            themeColor={themeColor}
            isResponsive={isResponsive}
          />
          <div
            className={`pointer rounded-circle f-center ${
              isResponsive ? "h-30 w-30" : "h-37 w-37"
            }`}
            onClick={() => {
              let data = encrypt({ time: new Date().toLocaleString() });
              localStorage.authData = data;
              dispatch(setAuthData(data));
            }}
          >
            <span className="h-18 w-18 d-flex">
              <img
                src={icons.logoutSvg}
                alt="notification"
                className="fit-image icon-color-1B2559 hover-icons-effect"
              />
            </span>
          </div>
          <ProfileMenu themeColor={themeColor} isResponsive={isResponsive} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
