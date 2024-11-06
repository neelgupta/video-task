import { useEffect, useRef, useState } from "react";
import Button from "../../../components/inputs/Button/Button";
import { Link } from "react-router-dom";

const NewVideoAsk = () => {
  const [isMenu, setIsMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="position-relative">
      <Button
        btnText={"New videoask"}
        btnStyle={"PD"}
        className="wp-90 mx-auto text-16-500"
        onClick={() => setIsMenu((prev) => !prev)}
      />
      {isMenu && (
        <div className="new-video-menu" ref={menuRef}>
          <Link
            to="/user/get-started"
            className="fa-center gap-4 p-3 my-4 pointer color-0000"
            onClick={() => setIsMenu(false)}
          >
            <svg
              fill="#111111"
              height="28"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
              className="CreateVideoaskButton__StyledBrandLogo-sc-86odc6-3 gPdYnB"
            >
              <path d="M1.745 14.793c-1.08 0-1.936.93-1.708 1.984C1.627 24.117 8.17 29.616 16 29.616s14.373-5.5 15.963-12.84c.228-1.053-.628-1.983-1.708-1.983H1.745z"></path>
              <ellipse
                rx="4.567"
                ry="4.559"
                transform="matrix(-1 0 0 1 22.911 4.559)"
              ></ellipse>
              <ellipse
                rx="4.567"
                ry="4.559"
                transform="matrix(-1 0 0 1 9.132 4.559)"
              ></ellipse>
            </svg>
            <span className="text-14-500">Start from scratch</span>
          </Link>
          <div className="fa-center gap-4 p-3 my-4 pointer">
            <svg
              fill="#111111"
              height="25"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className="CreateVideoaskButton__StyledRocketIcon-sc-86odc6-4 bPglTr"
            >
              <path
                d="M6.79 19.332c-.256.41-.742.64-1.074.716-.563.102-1.1.154-1.508.486-.128.102-.333.025-.358-.128-.077-.486.05-1.022.28-1.355a.582.582 0 00-.28.077.24.24 0 01-.333-.256c.154-.562.537-1.303 1.125-1.636l-1.15-1.15C1.6 16.495.424 18.744.015 20.278c-.102.435.332.767.741.588.205-.102.41-.153.64-.153-.512.767-.844 2.019-.64 3.17a.523.523 0 00.844.306c.971-.792 2.224-.869 3.528-1.125.971-.204 2.53-1.048 2.914-2.48-.102-.076-.205-.178-.307-.28l-.946-.971zM19.29 13.223C23.123 8.877 24.094 2.64 23.992.748a.735.735 0 00-.23-.51.862.862 0 00-.511-.23C21.36-.096 15.122.85 10.777 4.71L9.397 4.2a3.89 3.89 0 00-4.295 1.124L2.7 8.162c-.332.409-.179 1.022.307 1.201l3.068 1.125a37.144 37.144 0 00-1.79 3.323c-.23.537-.128 1.15.282 1.585l4.038 4.039c.41.409 1.049.537 1.585.281a31.178 31.178 0 003.323-1.79l1.125 3.068a.75.75 0 001.202.307l2.811-2.403a3.89 3.89 0 001.125-4.294l-.486-1.381zm-1.662-3.425a2.438 2.438 0 01-3.477 0 2.438 2.438 0 010-3.477 2.438 2.438 0 013.477 0c.971.972.971 2.53 0 3.477z"
                fill="#111111"
                className="CreateVideoaskButton__StyledRocketIcon-sc-86odc6-4 bPglTr"
              ></path>
            </svg>
            <span className="text-14-500">Explore Template</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewVideoAsk;
