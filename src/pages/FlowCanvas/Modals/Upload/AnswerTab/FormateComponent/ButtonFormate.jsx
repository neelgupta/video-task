import React from "react";

function ButtonFormate() {
  return (
    <div id="ButtonFormate">
      <div className="mb-20">
        <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
          Button Title:
        </div>
        <div className="wp-100 InputBox">
          <input type="string" placeholder="Navigate to" />
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

export default ButtonFormate;
