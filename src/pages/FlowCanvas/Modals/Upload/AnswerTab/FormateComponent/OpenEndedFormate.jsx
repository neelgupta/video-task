import React from "react";
import OutlineCheck from "../../../../../User/MyOrganization/pages/Notifications/OutlineCheck";
import Select from "react-select";

function OpenEndedFormate() {
  return (
    <div id="OpenEndedFormate">
      <div className="mb-20">
        <div
          className="mb-10"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <OutlineCheck
            className="w-18 h-18"
            isCheck={false}
            onChange={() => {}}
            isDisabled={false}
          />
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Video
          </div>
        </div>
        <div
          className="mb-10"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <OutlineCheck
            className="w-18 h-18"
            isCheck={false}
            onChange={() => {}}
            isDisabled={false}
          />
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Audio
          </div>
        </div>
        <div
          className="mb-10"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <OutlineCheck
            className="w-18 h-18"
            isCheck={false}
            onChange={() => {}}
            isDisabled={false}
          />
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Text
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
          Time Limit for Answer:
        </div>
        <div className="wp-100">
          <Select style={{}} options={[]} />
        </div>
      </div>

      <div className="mb-20">
        <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
          Delay for options to show:
        </div>
        <div className="wp-40 InputBox">
          <input type="string" value="10 Sec" />
        </div>
      </div>
    </div>
  );
}

export default OpenEndedFormate;
