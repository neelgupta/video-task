import { icons } from "../../../utils/constants";
import { creteImgFilter, encrypt } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ themeColor, role }) => {
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
  const teacherOption = [
    { title: "My Profile", icon: icons.user, link: "/teacher/my-profile" },
    {
      title: "Edit Profile",
      icon: icons.editUser,
      link: "/teacher/edit-profile",
    },
  ];
  const displayOption = role === "admin" ? [] : teacherOption;
  return (
    <div className="position-relative">
      <div
        className="h-24 w-24 pointer"
        onClick={() => {
          setShow(!show);
        }}
      >
        <img
          src={icons.downDark}
          alt="more"
          className="fit-image"
          style={
            show
              ? {
                  filter: creteImgFilter(themeColor.pColor),
                  transform: "rotate(180deg)",
                }
              : {}
          }
        />
      </div>
      {show && (
        <div className="profile-popover" ref={profileRef}>
          {displayOption?.map((elm, index) => {
            return (
              <div
                className="fa-center gap-2 px-16 py-13 bb-2b0a pointer"
                key={index}
                onClick={() => {
                  navigate(elm.link);
                  setShow(false);
                }}
              >
                <span className="d-flex h-16 w-16">
                  <img
                    src={elm.icon}
                    alt="user"
                    className="fit-image"
                    style={{
                      filter: creteImgFilter(themeColor.pColor),
                    }}
                  />
                </span>
                <span className="text-14-400 color-757f">{elm.title}</span>
              </div>
            );
          })}

          <div
            className="fa-center gap-2 px-16 py-13 pointer"
            onClick={() => {
              let data = encrypt({ time: new Date().toLocaleString() });
              localStorage.authData = data;
              dispatch(setAuthData(data));
            }}
          >
            <span className="d-flex h-16 w-16">
              <img
                src={icons.logout}
                alt="logout"
                className="fit-image"
                style={{
                  filter: creteImgFilter(themeColor.pColor),
                }}
              />
            </span>
            <span className="text-14-400 color-757f">Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
