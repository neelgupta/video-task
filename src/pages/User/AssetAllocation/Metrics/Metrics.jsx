import { useDispatch, useSelector } from "react-redux";
import "../AssetAllocation.scss";
import { useEffect, useState } from "react";
import MetricsChart from "./MetricsChart";
import MetricsHeader from "./MetricsHeader";
import { handelCatch, throwError } from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
import { icons } from "../../../../utils/constants";
import DatePicker from "react-datepicker";
import "./Metrics.scss";
import dayjs from "dayjs";

function Metrics({ id, interactionDetails }) {
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const { isResponsive, themeColor } = reduxData;
  const [interval, setInterval] = useState("day");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [metricsSet, setMetricsSet] = useState(null);
  const [deviceType, setDeviceType] = useState("all");

  useEffect(() => {
    (() => {
      const end = dayjs().toISOString();
      let start = "";
      if (interval === "day") {
        start = dayjs(end).subtract(10, "day").toISOString();
      }
      if (interval === "week") {
        start = dayjs(end).subtract(10, "week").toISOString();
      }
      if (interval === "month") {
        start = dayjs(end).subtract(12, "month").toISOString();
      }
      if (end && start) {
        setStart(start);
        setEnd(end);
      }
    })();
  }, [interval]);

  useEffect(() => {
    if (id && start && end) {
      getMetrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, start, end, deviceType]);

  const getMetrics = async () => {
    try {
      const res = await api.get(
        `interactions/get-metrics/${id}/?interval=${interval}&deviceType=${deviceType}&start=${dayjs(
          start
        ).format("YYYY-MM-DD")}&end=${dayjs(end).format("YYYY-MM-DD")}`
      );
      if (res.status === 200) {
        console.log("res", res);
        setMetricsSet(res?.data?.response || null);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  return (
    <div className="Metrics-container">
      <MetricsHeader
        interaction={interactionDetails}
        selectedTab={deviceType}
        setSelectedTab={setDeviceType}
      />
      <div className="chart-card">
        <div className="fb-center chart-header">
          <h6 className="text-24-700">Reports</h6>
          <div className="f-center date-btn">
            <div className="">
              <img
                src={icons.calendar}
                alt=""
                className="w-20 fit-image date-label"
              />
            </div>
            <DatePicker
              selected={start}
              onChange={(dates) => {
                setStart(dates?.[0] || "");
                setEnd(dates?.[1] || "");
              }}
              selectsRange
              startDate={start}
              endDate={end}
              dateFormat="yyyy/MM/dd"
              isClearable
              className="custom-date-picker-input"
              calendarClassName="custom-calendar"
              placeholderText="Select a date range"
            />
          </div>
          <div className="d-flex menu">
            <div
              className={`ps-10 pe-10 pb-5 text-14-500 color-darkText pointer f-center ${
                interval === "day" ? "active" : ""
              }`}
              onClick={() => setInterval("day")}
            >
              Daily
            </div>
            <div
              className={`ps-10 pe-10 pb-5 text-14-500 color-darkText pointer f-center ${
                interval === "week" ? "active" : ""
              }`}
              onClick={() => setInterval("week")}
            >
              Weekly
            </div>
            <div
              className={`ps-10 pe-10 pb-5 text-14-500 color-darkText pointer f-center ${
                interval === "month" ? "active" : ""
              }`}
              onClick={() => setInterval("month")}
            >
              Monthly
            </div>
          </div>
        </div>
        <MetricsChart metricsSet={metricsSet || {}} />
      </div>
    </div>
  );
}

export default Metrics;
