// import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import "./AdminLayout.scss";
import { useDispatch } from "react-redux";
import { setIsResponsive } from "../../store/globalSlice";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children, pageTitle, onBack }) => {
  const [show, setShow] = useState(false);
  const [showCreateFlowModal, setShowCreateFlowModal] = useState(false);
  const [createFlowModalSubmitData, setCreateFlowModalSubmitData] = useState(
    {}
  );
  const [showCreateFlowAIModal, setShowCreateFlowAIModal] = useState(false);
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
    <div id="admin-AdminLayout-container">
      <div className="Sidebar-content">
        <AdminSidebar show={show} setShow={setShow} />
      </div>
      <div className="right-body-content">
        <AdminNavbar setShow={setShow} pageTitle={pageTitle} onBack={onBack} />
        <div className="body-block video-ask-scroll flow">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
