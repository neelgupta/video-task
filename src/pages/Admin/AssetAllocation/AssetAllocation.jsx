import { useState } from "react";
import "./AssetAllocation.scss";
import Metrics from "./Metrics";
import { useSelector } from "react-redux";
function AssetAllocation() {
  const [selectedTab, setSelectedTab] = useState(3);
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const { isResponsive, themeColor } = reduxData;
  return (
    <div className="AssetAllocation-container">
      <div className="AssetAllocation-menu-tab">
        <div
          onClick={() => {
            setSelectedTab(1);
          }}
          className={`${selectedTab === 1 ? "active" : ""}`}
        >
          Conversations
        </div>
        <div
          onClick={() => {
            setSelectedTab(2);
          }}
          className={`${selectedTab === 2 ? "active" : ""}`}
        >
          Results
        </div>
        <div
          onClick={() => {
            setSelectedTab(3);
          }}
          className={`${selectedTab === 3 ? "active" : ""}`}
        >
          Metrics
        </div>
      </div>
      <div className="mt-20 ">
        {selectedTab === 1 && <div>Conversations</div>}
        {selectedTab === 2 && <div>Results</div>}
        {selectedTab === 3 && <Metrics />}
      </div>
    </div>
  );
}

export default AssetAllocation;
