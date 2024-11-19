import React from "react";
import { icons } from "../../../../utils/constants";
import "./VideoAI.scss";
function VideoAIFooter() {
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
  ];
  return (
    <div className="VideoAIFooter">
      <div className="text-24-600">Your Answer</div>
      <div className="footer_card_box">
        {footerTabArray.map((ele, index) => {
          return (
            <div
              className="footer_card pointer"
              key={index}
              style={{ color: "white" }}
            >
              {ele.isPro && <div className="proTeg">pro</div>}
              <div className="wp-100 h-100 f-center">
                <img src={ele.icon} alt="" className="fit-image wp-40" />
              </div>
              <div className="text-16-500">{ele.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoAIFooter;
