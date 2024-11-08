import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import "./Layout.scss";
import { useDispatch } from "react-redux";
import { setIsResponsive } from "../../store/globalSlice";

const Layout = ({ children, pageTitle }) => {
  const [show, setShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

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
  useEffect(() => {
    dispatch(setIsResponsive(isResponsive));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResponsive]);

  return (
    <div id="admin-layout-container">
      <div className="Sidebar-content">
        <Sidebar show={show} setShow={setShow} />
      </div>
      <div className="right-body-content">
        <Navbar setShow={setShow} pageTitle={pageTitle} />
        <div className="body-block video-ask-scroll auri-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
