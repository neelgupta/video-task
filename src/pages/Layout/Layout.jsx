import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import "./Layout.scss";
import { useDispatch } from "react-redux";
import { setIsResponsive } from "../../store/globalSlice";
import NewQnAFlowModal from "../User/NewQnAFlowModal";
import CreateWithAI from "../User/NewQnAFlowModal/CreateWithAI";

const Layout = ({ children, pageTitle, onBack }) => {
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
    <div id="admin-layout-container">
      <div className="Sidebar-content">
        <Sidebar
          show={show}
          setShow={setShow}
          setShowCreateFlowModal={setShowCreateFlowModal}
        />
      </div>
      <div className="right-body-content">
        <Navbar setShow={setShow} pageTitle={pageTitle} onBack={onBack} />
        <div className="body-block video-ask-scroll flow">
          {children}
          {showCreateFlowModal && (
            <NewQnAFlowModal
              show={showCreateFlowModal}
              handleClose={() => setShowCreateFlowModal(false)}
              setShowCreateFlowAIModal={setShowCreateFlowAIModal}
              setCreateFlowModalSubmitData={setCreateFlowModalSubmitData}
            />
          )}
          {showCreateFlowAIModal && (
            <CreateWithAI
              show={showCreateFlowAIModal}
              createFlowModalSubmitData={createFlowModalSubmitData}
              handleClose={() => setShowCreateFlowAIModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
