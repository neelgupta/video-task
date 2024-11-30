import React, { useState } from "react";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import "./VideoEdit.scss";

function VideoEditFooter() {
  const [selectFooterTab, setSelectFooterTab] = useState(1);
  const footerTabArray = [
    {
      icon: icons.video,
      text: "Video",
      isPro: false,
    },
    {
      icon: icons.audioIcon,
      text: "Audio",
      isPro: false,
    },
    {
      icon: icons.textLine,
      text: "Text",
      isPro: false,
    },
    {
      icon: icons.doubleStar,
      text: "Create with Flōw AI",
      isPro: true,
    },
  ];
  return (
    <div className="VideoEditFooter">
      <div className="text-24-600">Your Answer</div>
      <div className="footer_card_box">
        {footerTabArray.map((ele, index) => {
          return (
            <div
              onClick={() => setSelectFooterTab(index + 1)}
              className="footer_card pointer"
              key={index}
              style={
                selectFooterTab === index + 1
                  ? { background: "#7B5AFF", color: "white" }
                  : {}
              }
            >
              {ele.isPro && <div className="proTeg">pro</div>}
              <div className="wp-100 h-100 f-center">
                <img
                  src={ele.icon}
                  alt=""
                  className="fit-image wp-40"
                  style={
                    selectFooterTab === index + 1 &&
                    index != footerTabArray.length - 1
                      ? {
                          filter: creteImgFilter("#FFFFFF"),
                        }
                      : {}
                  }
                />
              </div>
              <div className="text-16-500">{ele.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoEditFooter;
