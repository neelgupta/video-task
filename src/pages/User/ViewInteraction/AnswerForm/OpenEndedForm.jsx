import React, { useState } from "react";
import "./AnswerForm.scss";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { TextArea, VideoUpload } from "../../../../components";

function OpenEndedForm({ onNext }) {
  const footerTabArray = [
    {
      icon: icons.video,
      text: "Video",
      value: "video",
      isPro: false,
    },
    {
      icon: icons.audioIcon,
      text: "Audio",
      value: "audio",
      isPro: false,
    },
    {
      icon: icons.textLine,
      text: "Text",
      value: "text",
      isPro: false,
    },
  ];
  const [selectFooterTab, setSelectFooterTab] = useState("");
  const [answerForm, setAnswerForm] = useState({
    description: "",
    ansFile: null,
  });

  return (
    <div className="OpenEndedForm-container">
      {!selectFooterTab && (
        <div
          className="wp-100 hp-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="text-20-500 mb-50"
            style={{ color: "#7D8185", textAlign: "center" }}
          >
            How do you want to generate video?
          </div>
          <div className="footer_card_box">
            {footerTabArray.map((ele, index) => {
              return (
                <div
                  onClick={() => setSelectFooterTab(ele.value)}
                  className="footer_card pointer"
                  key={index}
                  style={{ background: "#7B5AFF", color: "white" }}
                >
                  {ele.isPro && <div className="proTeg">pro</div>}
                  <div className="wp-100 h-100 f-center">
                    <img
                      src={ele.icon}
                      alt=""
                      className="fit-image wp-40"
                      style={{
                        filter: creteImgFilter("#FFFFFF"),
                      }}
                    />
                  </div>
                  <div className="text-16-500">{ele.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectFooterTab && (
        <div className="wp-100 hp-100">
          {selectFooterTab === "text" && (
            <div className="text-container">
              <div className="wp-100">
                <div className="text-20-500" style={{ color: "#7D8185" }}>
                  Description
                </div>
                <div style={{ borderRadius: "10px" }}>
                  <TextArea
                    rows={10}
                    value={answerForm.description}
                    placeholder={"Discuss your plan for generating video..."}
                    style={{ borderRadius: "10px" }}
                    onChange={(e) => {
                      setAnswerForm({
                        ...answerForm,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div id="ans-btn-group">
                <button className="next-btn" onClick={onNext}>
                  <img
                    src={icons.top_right_arrow}
                    alt=""
                    style={{
                      transform: "rotate(45deg)",
                      filter: creteImgFilter("#888888"),
                    }}
                    className="fit-image w-30"
                  />
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setSelectFooterTab("")}
                >
                  <img
                    src={icons.closeSvg}
                    alt=""
                    style={{ filter: creteImgFilter("#ffffff") }}
                    className="fit-image w-12 pb-5"
                  />
                </button>
              </div>
            </div>
          )}

          {selectFooterTab === "video" && (
            <div className="video-container">
              <div className="wp-100">
                <div
                  className="text-20-500 mb-20 mt-20"
                  style={{ color: "#7D8185" }}
                >
                  Upload Video
                </div>

                <VideoUpload
                  setFileValue={(file) => {
                    if (file) {
                      setAnswerForm((pre) => {
                        return { ...answerForm, ansFile: file };
                      });
                    }
                  }}
                  videoFile={answerForm.ansFile}
                />
              </div>
              <div id="ans-btn-group">
                <button className="next-btn" onClick={onNext}>
                  <img
                    src={icons.top_right_arrow}
                    alt=""
                    style={{
                      transform: "rotate(45deg)",
                      filter: creteImgFilter("#888888"),
                    }}
                    className="fit-image w-30"
                  />
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setSelectFooterTab("")}
                >
                  <img
                    src={icons.closeSvg}
                    alt=""
                    style={{ filter: creteImgFilter("#ffffff") }}
                    className="fit-image w-12 pb-5"
                  />
                </button>
              </div>
            </div>
          )}

          {selectFooterTab === "audio" && (
            <div className="audio-container">
              <div id="ans-btn-group">
                <button className="next-btn" onClick={onNext}>
                  <img
                    src={icons.top_right_arrow}
                    alt=""
                    style={{
                      transform: "rotate(45deg)",
                      filter: creteImgFilter("#888888"),
                    }}
                    className="fit-image w-30"
                  />
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setSelectFooterTab("")}
                >
                  <img
                    src={icons.closeSvg}
                    alt=""
                    style={{ filter: creteImgFilter("#ffffff") }}
                    className="fit-image w-12 pb-5"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OpenEndedForm;
