import React, { useState } from "react";
import "./AudioGen.scss";
import { icons } from "../../../../utils/constants";
import TextArea from "../../../../components/inputs/TextArea/TextArea";
import { Button } from "react-bootstrap";
import AudioUpload from "../../../../components/layouts/AudioUpload";
function AudioGenBody({ setModalType }) {
  const [stockVoice, setStockVoice] = useState([]);
  return (
    <div className="AudioGenBody-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="w-30 pointer">
          <img src={icons.arrow_left} alt="" className="fit-image" />
        </div>
        <div className="text-22-600">
          Generate With{" "}
          <span className="text-22-400" style={{ color: "#7B5AFF" }}>
            FlōwAI
          </span>
        </div>
      </div>
      <div className="p-20">
        <div>
          <div className="text-20-500 mb-10" style={{ color: "#7D8185" }}>
            Description
          </div>
          <TextArea
            placeholder="Discuss your plan for generating video..."
            style={{ borderRadius: "5px" }}
            onChange={() => {}}
          />
        </div>
        <div>
          <div className="text-20-500 mb-10 mt-20" style={{ color: "#7D8185" }}>
            Upload Audio
          </div>
          <AudioUpload />
        </div>
        <div>
          <div className="text-20-500 mb-20 mt-20" style={{ color: "#7D8185" }}>
            Stock Voice (Optional)
          </div>
          <div className="stock-voice">
            {[1, 2, 3, 4, 5, 6].map((ele, index) => {
              return (
                <div
                  onClick={() => {
                    if (stockVoice.includes(ele)) {
                      setStockVoice((pre) => pre.filter((x) => x !== ele));
                      return;
                    }
                    setStockVoice((pre) => [...pre, ele]);
                  }}
                  key={index}
                  className={`${
                    stockVoice.includes(ele) && "active-btn"
                  } stock-btn `}
                >
                  Voice-{ele}
                </div>
              );
            })}
          </div>
        </div>
        <div className="pt-20 wp-100">
          <Button
            className="text-18-600 wp-100 p-0 mt-20"
            style={{
              background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setModalType("video-gen-getting-ready");
            }}
          >
            <span>Generate</span>
            <span
              className="h-60 w-60 "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                paddingBottom: "10px",
              }}
            >
              <img
                src={icons.doubleStar}
                alt=""
                className="w-50 h-50 fit-image"
              />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AudioGenBody;
