import { useEffect, useState } from "react";
import "./AssetAllocation.scss";
import Metrics from "./Metrics";
import { useDispatch, useSelector } from "react-redux";
import Results from "./Results/Results";
import Conversations from "./Conversations";
import { useParams } from "react-router-dom";
import { handelCatch, throwError } from "../../../store/globalSlice";
import { api } from "../../../services/api";
// import Conversations from "./Conversations/Conversations";
function AssetAllocation() {
  const { id } = useParams();
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor } = reduxData;
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className="AssetAllocation-container">
      <div className="AssetAllocation-menu-tab">
        <div
          onClick={() => {
            setSelectedTab(1);
          }}
          className={`${selectedTab === 1 ? "active" : ""} text-14-500`}
        >
          Conversations
        </div>
        <div
          onClick={() => {
            setSelectedTab(2);
          }}
          className={`${selectedTab === 2 ? "active" : ""} text-14-500`}
        >
          Results
        </div>
        <div
          onClick={() => {
            setSelectedTab(3);
          }}
          className={`${selectedTab === 3 ? "active" : ""} text-14-500`}
        >
          Metrics
        </div>
      </div>
      <div className="mt-20 ">
        {selectedTab === 1 && <Conversations id={id} />}
        {selectedTab === 2 && <Results />}
        {selectedTab === 3 && <Metrics />}
      </div>
    </div>
  );
}

export default AssetAllocation;
