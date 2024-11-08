import { useState } from "react";
import "./AssetAllocation.scss";
import Metrics from "./Metrics";
import { useSelector } from "react-redux";
import Results from "./Results/Results";
import Conversations from "./Conversations";
// import Conversations from "./Conversations/Conversations";
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
        {selectedTab === 1 && <Conversations />}
        {selectedTab === 2 && <Results />}
        {selectedTab === 3 && <Metrics />}
      </div>
    </div>
  );
}

export default AssetAllocation;
