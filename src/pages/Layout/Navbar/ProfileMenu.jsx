import { icons } from "../../../utils/constants";
import { creteImgFilter, encrypt } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ themeColor, isResponsive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <div className="position-relative">
      <div
        className={`pointer ${isResponsive ? "h-30 w-30" : "h-37 w-37"}`}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <img src={icons.avatar} alt="more" className="fit-image" />
      </div>
      {show && (
        <div className="profile-popover" ref={profileRef}>
          <div className="d-flex flex-column gap-2 px-16 py-13 pointer">
            <div className="text-14-400">
              Hi, <span style={{ color: "#7B5AFF" }}>James</span>
            </div>

            <div className="text-14-400" style={{ color: "#8C8E90" }}>
              account@gmail.com
            </div>
            {/* <hr /> */}
            {/* <div className="d-flex gap-2 align-items-center">
              <div>
                <img
                  src={icons.PrimiumIcon}
                  alt="Avatar"
                  className="custom-card-image"
                />
              </div>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
            <hr /> */}

            <div
              className="text-14-400"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/admin/profile");
              }}
            >
              My Account
            </div>

            <div className="text-14-400">Sign out</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
