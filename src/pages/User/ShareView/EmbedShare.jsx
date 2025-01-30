import React, { useState } from "react";
import DropdownOption from "../../../components/inputs/DropdownOption/DropdownOption";
import { Button } from "react-bootstrap";
import CustomWidget from "./VideoAskWidget";

const option = [
  {
    label: "Widget",
    value: "widget",
  },
  {
    label: "Iframe",
    value: "iframe",
  },
];
function EmbedShare() {
  const [codeType, setCodeType] = useState({
    label: "Iframe",
    value: "iframe",
  });
  const [widgetStyle, setWidgetStyle] = useState("circle");
  const [widgetPosition, setWidgetPosition] = useState("right");

  return (
    <div className="EmbedShare-container">
      <div className="EmbedShare-view">
        <CustomWidget />
      </div>
      <div className="EmbedShare-config">
        <div className="wp-100">
          <DropdownOption
            value={codeType}
            options={option}
            onChange={(option) => {
              console.log("option", option);
              setCodeType(option);
            }}
          />
          {codeType.value === "iframe" && (
            <div className="i-frame-container">
              <p className="text-16-700 mt-20 mb-20 p-5">
                Embed your flow anywhere in your website
              </p>
              <div>
                <div className="wp-100 flow-ai-input">
                  <div style={{}} className="text-12-600 ps-5">
                    Width
                  </div>
                  <input
                    type="text"
                    name="width"
                    placeholder="Enter width"
                    className={`form-control`}
                    style={{ boxShadow: "none" }}
                  />
                </div>
                <div className="wp-100 flow-ai-input">
                  <div style={{}} className="text-12-600 ps-5">
                    Height
                  </div>
                  <input
                    type="text"
                    name="height"
                    placeholder="Enter height"
                    className={`form-control`}
                    style={{ boxShadow: "none" }}
                  />
                </div>
              </div>
            </div>
          )}
          {codeType.value === "widget" && (
            <div className="widget-container">
              <p className="text-16-700 mt-10 mb-10 p-5">
                Attract the attention of your visitors
              </p>
              <div>
                <div>
                  <div className="text-12-600" style={{ color: "#a1a1a1" }}>
                    Widget style:
                  </div>
                  <div className="Widget-style-option">
                    {[
                      "circle",
                      "horizontalSquire",
                      "verticalSquire",
                      "toggle",
                    ].map((ele, index) => {
                      const isActive = ele === widgetStyle;
                      return (
                        <div
                          className={`Widget-style-option-container ${
                            isActive
                              ? "Widget-style-option-container-active"
                              : ""
                          }`}
                          key={index}
                          onClick={() => {
                            setWidgetStyle(ele);
                          }}
                        >
                          {ele === "circle" && (
                            <div
                              style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                background: "white",
                                position: "absolute",
                                bottom: "5px",
                                right: "5px",
                              }}
                            ></div>
                          )}
                          {ele === "horizontalSquire" && (
                            <div
                              style={{
                                width: "25px",
                                height: "15px",
                                borderRadius: "3px",
                                background: "white",
                                position: "absolute",
                                bottom: "5px",
                                right: "5px",
                              }}
                            ></div>
                          )}
                          {ele === "verticalSquire" && (
                            <div
                              style={{
                                width: "15px",
                                height: "25px",
                                borderRadius: "3px",
                                background: "white",
                                position: "absolute",
                                bottom: "5px",
                                right: "5px",
                              }}
                            ></div>
                          )}
                          {ele === "toggle" && (
                            <div
                              style={{
                                width: "30px",
                                height: "10px",
                                borderRadius: "10px",
                                background: "white",
                                position: "absolute",
                                bottom: "5px",
                                right: "5px",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px 3px",
                                gap: "5px",
                              }}
                            >
                              <div
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "10px",
                                  background: "#8000ff",
                                }}
                              ></div>
                              <div
                                style={{
                                  width: "10px",
                                  height: "3px",
                                  background: "#999",
                                  borderRadius: "10px",
                                }}
                              ></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-20">
                  <div className="text-12-600" style={{ color: "#a1a1a1" }}>
                    Position:
                  </div>
                  <div className="Widget-position-option">
                    <div
                      className={`Widget-position-option-container ${
                        widgetPosition === "right"
                          ? "Widget-position-option-container-active"
                          : ""
                      }`}
                      onClick={() => {
                        setWidgetPosition("right");
                      }}
                    >
                      <div
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          background: "white",
                          position: "absolute",
                          bottom: "5px",
                          right: "5px",
                        }}
                      ></div>
                    </div>
                    <div
                      className={`Widget-position-option-container ${
                        widgetPosition === "left"
                          ? "Widget-position-option-container-active"
                          : ""
                      }`}
                      onClick={() => {
                        setWidgetPosition("left");
                      }}
                    >
                      <div
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          background: "white",
                          position: "absolute",
                          bottom: "5px",
                          left: "5px",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="wp-100">
          <Button>ok</Button>
        </div>
      </div>
    </div>
  );
}

export default EmbedShare;
