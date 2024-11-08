import { useSelector } from "react-redux";
import { icons } from "../../../../utils/constants";
import "../AssetAllocation.scss";
import { creteImgFilter } from "../../../../utils/helpers";
import { useState } from "react";
import MetricsChart from "./MetricsChart";
function Metrics() {
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const { isResponsive, themeColor } = reduxData;
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className="Metrics-container">
      <div
        className="Metrics-header"
        style={isResponsive ? { flexDirection: "column" } : {}}
      >
        <div className="profile-det">
          <div className="w-80 h-80 profile-img">
            <img src={icons.avatar7} alt="" className="fit-image" />
          </div>
          <div className="det p-10 w-200 ms-10">
            <div className="text-18-600">Asset Allocation</div>
            <div className="fb-center">
              <div className="w-18">
                <img src={icons.branch} alt="" className="fit-image" />
              </div>
              <div className="w-18">
                <img src={icons.downloads_box} alt="" className="fit-image" />
              </div>
              <div className="w-18">
                <img src={icons.link} alt="" className="fit-image" />
              </div>
              <div className="w-18">
                <img src={icons.screen} alt="" className="fit-image" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="header-menu "
          style={isResponsive ? { paddingTop: "20px", width: "100%" } : {}}
        >
          <div
            className={`f-center menu ${selectedTab === 1 && "active"} ${
              isResponsive ? "p-5" : "p-15"
            }`}
            onClick={() => setSelectedTab(1)}
          >
            <div className="w-24 h-24">
              <img
                src={icons.allDevices}
                alt=""
                className="fit-image"
                style={{
                  filter: creteImgFilter(
                    selectedTab === 1 ? themeColor.darkColor : "#757F95"
                  ),
                }}
              />
            </div>
            <div className="ms-15 text-16-500">All Devices</div>
          </div>
          <div
            className={`f-center menu ${selectedTab === 2 && "active"} ${
              isResponsive ? "p-5" : "p-15"
            }`}
            onClick={() => setSelectedTab(2)}
          >
            <div className="w-24 h-24">
              <img
                src={icons.desktop}
                alt=""
                className="fit-image"
                style={{
                  filter: creteImgFilter(
                    selectedTab === 2 ? themeColor.darkColor : "#757F95"
                  ),
                }}
              />
            </div>
            <div className="ms-15 text-16-500">Desktop</div>
          </div>
          <div
            className={`f-center menu ${selectedTab === 3 && "active"} ${
              isResponsive ? "p-5" : "p-15"
            }`}
            onClick={() => setSelectedTab(3)}
          >
            <div className="w-24 h-24">
              <img
                src={icons.mobile}
                alt=""
                className="fit-image"
                style={{
                  filter: creteImgFilter(
                    selectedTab === 3 ? themeColor.darkColor : "#757F95"
                  ),
                }}
              />
            </div>
            <div className="ms-15 text-16-500">Mobile</div>
          </div>
          <div
            className={`f-center menu ${selectedTab === 4 && "active"} ${
              isResponsive ? "p-5" : "p-15"
            }`}
            onClick={() => setSelectedTab(4)}
          >
            <div className="w-24 h-24">
              <img
                src={icons.tablet}
                alt=""
                className="fit-image"
                style={{
                  filter: creteImgFilter(
                    selectedTab === 4 ? themeColor.darkColor : "#757F95"
                  ),
                }}
              />
            </div>
            <div className="ms-15 text-16-500">Tablet</div>
          </div>
          <div
            className={`f-center menu ${selectedTab === 5 && "active"} ${
              isResponsive ? "p-5" : "p-15"
            }`}
            onClick={() => setSelectedTab(5)}
          >
            <div className="w-24">
              <img
                src={icons.others}
                alt=""
                className="fit-image"
                style={{
                  filter: creteImgFilter(
                    selectedTab === 5 ? themeColor.darkColor : "#757F95"
                  ),
                }}
              />
            </div>
            <div className="ms-15 text-16-500">Others</div>
          </div>
        </div>
      </div>
      <div className="chart-card">
        <div className="fb-center chart-header">
          <h6 className="text-24-700">Report</h6>
          <div className="d-flex menu">
            <div className="w-60 pb-5 text-14-500 pointer f-center active">
              Daily
            </div>
            <div className="w-60 pb-5 text-14-500 pointer f-center">Weekly</div>
            <div className="w-60 pb-5 text-14-500 pointer f-center">
              Monthly
            </div>
          </div>
        </div>
        <MetricsChart />
      </div>
    </div>
  );
}

export default Metrics;
