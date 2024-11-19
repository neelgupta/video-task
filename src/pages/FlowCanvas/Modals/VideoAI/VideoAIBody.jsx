import React, { useState } from "react";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { Button } from "react-bootstrap";

function VideoAIBody({ setModalType }) {
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
  ];
  return (
    <div className="VideoAIBody">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          className="w-30 pointer"
          onClick={() => setModalType("video-edit")}
        >
          <img src={icons.arrow_left} alt="" className="fit-image" />
        </div>
        <div className="text-22-600">
          Generate With{" "}
          <span className="text-22-400" style={{ color: "#7B5AFF" }}>
            FlōwAI
          </span>
        </div>
      </div>
      <div className="content">
        <div
          className="wp-100 text-20-500"
          style={{ color: "#7D8185", textAlign: "center" }}
        >
          How do you want to generate video?
        </div>
        <div className="footer_card_box p-20">
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
                      selectFooterTab === index + 1
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
        <div className="p-20 pt-0 wp-100">
          <Button
            className="text-18-600 wp-100"
            style={{
              background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setModalType("video-gen");
            }}
          >
            <span>Next</span>
            <span className="h-40 ms-30">
              <img src={icons.doubleStar} alt="" className="fit-image" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VideoAIBody;
