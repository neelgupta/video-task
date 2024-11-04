import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import "./Layout.scss";

const Layout = ({ children }) => {
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
    <div id="layout-container">
      <Sidebar isResponsive={isResponsive} show={show} setShow={setShow} />
      <div className="right-body-content">
        <Navbar isResponsive={isResponsive} setShow={setShow} />
        <div className="body-block auri-scroll">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
