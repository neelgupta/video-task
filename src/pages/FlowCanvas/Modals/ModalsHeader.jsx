import React, { useState } from "react";
import { icons } from "../../../utils/constants";
import "./ModalsHeader.scss";
function ModalsHeader({ handleClose }) {
  const [selectHeaderTab, setSelectHeaderTab] = useState(1);
  const headerTabArray = ["video", "Answer", "Logic"];
  return (
    <div className="Video_header">
      <div
        className="wp-55 header_item text-18-600 ps-15"
        style={{ borderRight: "1px solid #D9D9D9" }}
      >
        QnA Flow-Flow 2
      </div>
      <div
        className="wp-45 header_item"
        style={{ justifyContent: "space-between" }}
      >
        <div className="header_tab">
          {headerTabArray.map((ele, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectHeaderTab(index + 1)}
                className={selectHeaderTab === index + 1 ? "active" : ""}
              >
                {ele}
              </div>
            );
          })}
        </div>
        <div className="pe-15 pointer " onClick={handleClose}>
          <img src={icons.close} alt="webCam" className="fit-image h-15" />
        </div>
      </div>
    </div>
  );
}

export default ModalsHeader;
