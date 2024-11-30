import React, { useState } from "react";
import { icons } from "../../../../utils/constants";
import "./ModalsHeader.scss";
const modalTitle = {
  upload: "Upload QnA Flow",
};
function ModalsHeader({
  handleClose,
  selectedHeaderTab,
  onChangeHeaderTab,
  isHeaderDisabled,
  queModelData,
}) {
  const { modalType } = queModelData;
  const headerTabArray = ["video", "answer", "logic"];
  return (
    <div className="Video_header">
      <div
        className="wp-55 header_item text-18-600 ps-15"
        style={{ borderRight: "1px solid #D9D9D9" }}
      >
        {modalTitle[modalType]}
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
                onClick={() => !isHeaderDisabled && onChangeHeaderTab(ele)}
                className={
                  selectedHeaderTab === ele
                    ? "active"
                    : isHeaderDisabled
                    ? "disabled"
                    : ""
                }
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
