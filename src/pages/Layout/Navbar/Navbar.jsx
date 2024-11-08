import { useDispatch, useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
import "./Navbar.scss";
import { encrypt } from "../../../utils/helpers";
import { setAuthData } from "../../../store/globalSlice";

const Navbar = ({ setShow, pageTitle }) => {
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
        <div className="f-center">
          <div className="h-30 w-30 me-5 pointer">
            <img src={icons.arrow_left} alt="menuBar" className="fit-image" />
          </div>
          <div className="text-34-700 color-darkText">{pageTitle}</div>
        </div>
      )}
      <div className={`profile-det ${isResponsive ? "w-350" : "w-400"}`}>
        <div className="search-container wp-70">
          <span className="d-flex">
            <img src={icons.search} alt="search" className="fit-image" />
          </span>
          <input type="text" placeholder="Search" />
        </div>
        <div className="right-end-block wp-30">
          <div
            className={`pointer rounded-circle f-center ${
              isResponsive ? "h-30 w-30" : "h-37 w-37"
            }`}
          >
            <span className="h-18 w-18 d-flex">
              <img
                src={icons.notificationSvg}
                alt="notification"
                className="fit-image"
              />
            </span>
          </div>
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
                className="fit-image"
              />
            </span>
          </div>

          <div
            className={`pointer ${isResponsive ? "h-30 w-30" : "h-37 w-37"}`}
          >
            <img src={icons.avatar} alt="avatar" className="fit-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
