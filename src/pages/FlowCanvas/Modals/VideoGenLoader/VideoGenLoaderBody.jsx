/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../../../utils/constants";
import LoaderIcon from "./LoaderIcon";
import "./VideoGenLoaderBody.scss";

function VideoGenLoaderBody({ setModalType }) {
  const [seconds, setSeconds] = useState(5);
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(intervalRef.current);
      setModalType("audio-gen");
    }
  }, [seconds, setModalType]);

  return (
    <div className="VideoGenLoaderBody-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="w-30 pointer">
          <img src={icons.arrow_left} alt="" className="fit-image" />
        </div>
        <div className="text-22-600">
          Generate With{" "}
          <span className="text-22-400" style={{ color: "#7B5AFF" }}>
            FlōwAI
          </span>
        </div>
      </div>
      <div className="loader-box">
        <div className="loader">
          <LoaderIcon />
        </div>
        <div className="text-24-600 mt-50" style={{ color: "#1B2559" }}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            {seconds}
          </div>
          <div>We are getting things ready...</div>
        </div>
      </div>
    </div>
  );
}

export default VideoGenLoaderBody;
