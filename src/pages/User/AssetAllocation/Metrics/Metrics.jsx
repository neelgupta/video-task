import { useSelector } from "react-redux";
import "../AssetAllocation.scss";
import { useState } from "react";
import MetricsChart from "./MetricsChart";
import Header from "../Header";
function Metrics() {
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const { isResponsive, themeColor } = reduxData;
  const [days, setDays] = useState("daily");

  return (
    <div className="Metrics-container">
      <Header />
      <div className="chart-card">
        <div className="fb-center chart-header">
          <h6 className="text-24-700">Reports</h6>
          <div className="d-flex menu">
            <div
              className={`ps-10 pe-10 pb-5 text-14-500 color-darkText pointer f-center ${
                days === "daily" ? "active" : ""
              }`}
              onClick={() => setDays("daily")}
            >
              Daily
            </div>
            <div
              className={`ps-10 pe-10 pb-5 text-14-500 color-darkText pointer f-center ${
                days === "weekly" ? "active" : ""
              }`}
              onClick={() => setDays("weekly")}
            >
              Weekly
            </div>
            <div
              className={`ps-10 pe-10 pb-5 text-14-500 color-darkText pointer f-center ${
                days === "monthly" ? "active" : ""
              }`}
              onClick={() => setDays("monthly")}
            >
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
