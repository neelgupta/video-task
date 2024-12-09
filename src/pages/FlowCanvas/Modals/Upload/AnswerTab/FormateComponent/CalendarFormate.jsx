import React from "react";
import Select from "react-select";

const schedulingOption = [
  {
    label: "Calendly",
    value: "Calendly",
  },
  {
    label: "HubSpot Meetings",
    value: "HubSpot Meetings",
  },
  {
    label: "Acuity Scheduling",
    value: "Acuity Scheduling",
  },
  {
    label: "OnceHub",
    value: "OnceHub",
  },
];
function CalendarFormate() {
  return (
    <div id="CalendarFormate">
      <div className="mb-20">
        <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
          Provide your scheduling link:
        </div>
        <div className="wp-100 InputBox">
          <input type="string" placeholder="Enter the link" />
        </div>
      </div>
      <div className="mb-20">
        <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
          Opt for your scheduling tool:
        </div>
        <div className="wp-100">
          <Select style={{}} options={schedulingOption} />
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
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-22-600">Disable Data Collection</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className={`align-btn active`}>Yes</div>
          <div className={`align-btn`}>No</div>
        </div>
      </div>
    </div>
  );
}

export default CalendarFormate;
