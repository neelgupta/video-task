import React from "react";
import { TextArea } from "../../../../../../components";

function FileUploadFormate() {
  return (
    <div id="FileUploadFormate">
      <div className="mb-20">
        <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
          Title:
        </div>
        <div className="wp-100 InputBox">
          <input
            type="string"
            value={"Resume Video"}
            placeholder="Enter title"
          />
        </div>
      </div>

      <div className="mb-20 wp-100">
        <div className="text-18-500 mb-10" style={{ color: "#7D8185" }}>
          Description:
        </div>
        <TextArea
          id="Description"
          placeholder="Description..."
          style={{ borderRadius: "10px" }}
        />
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

export default FileUploadFormate;
