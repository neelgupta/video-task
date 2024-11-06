import { useEffect, useState } from "react";

import "./userlayout.scss";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const UserLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isResponsive = windowWidth < 992;

  return (
    <div className="user-layout-container">
      <Sidebar isResponsive={isResponsive} show={show} setShow={setShow} />
      <div className="right-body-content">
        <Navbar isResponsive={isResponsive} setShow={setShow} />
        <div className="body-block auri-scroll">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
