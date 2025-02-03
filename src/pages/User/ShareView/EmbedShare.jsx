import React, { useState } from "react";
import DropdownOption from "../../../components/inputs/DropdownOption/DropdownOption";
import { Button } from "react-bootstrap";
// import CustomWidget from "./VideoAskWidget";
import { Switch } from "../../../components";
import { SketchPicker } from "react-color";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { showSuccess, throwError } from "../../../store/globalSlice";

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
function EmbedShare({ shareUrl }) {
  const dispatch = useDispatch();
  const [codeType, setCodeType] = useState({
    label: "Iframe",
    value: "iframe",
  });
  const [widgetViewType, setWidgetViewType] = useState("desktop");
  const [showPicker, setShowPicker] = useState(false);
  const [iframeForm, setIframeForm] = useState({
    height: "500",
  });

  const [widgetForm, setWidgetForm] = useState({
    widget_style: "circle",
    widget_position: "left",
    background_color: "#9013FE",
    overlay_text: "",
    is_dismissible: false,
  });

  const handelIframeCopy = async () => {
    try {
      const iframe = `
        <iframe
          src="${shareUrl}"
          allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
          width="100%"
          height="${iframeForm.height}px"
          style="border: none; border-radius: 15px"
        ></iframe>`;
      await navigator.clipboard.writeText(iframe);
      dispatch(showSuccess("Copied to clipboard!"));
    } catch (err) {
      dispatch(throwError("Failed to copy password. Please try again."));
    }
  };

  const handelWidgetCopy = async () => {
    try {
      const widget = `<script>
      window.FLOW_WIDGET_CONFIG = {
        kind: "widget",
        url: "${shareUrl}",
        options: {
          widgetType: "${widgetForm.widget_style}",
          text: "${widgetForm.overlay_text}",
          backgroundColor: "${widgetForm.background_color}",
          position: "bottom-${widgetForm.widget_position}",
          dismissible: ${widgetForm.is_dismissible},
        },
      };
    </script>
    <script src="https://adorable-custard-9de130.netlify.app/embed.js"></script>`;
      await navigator.clipboard.writeText(widget);
      dispatch(showSuccess("Copied to clipboard!"));
    } catch (error) {
      console.log("error", error);
      dispatch(throwError("Failed to copy password. Please try again."));
    }
  };
  return (
    <div className="EmbedShare-container">
      <div className="Share-view" style={{ width: "65%" }}>
        <div
          className="iframe-view-container"
          style={{ width: widgetViewType === "mobile" ? "250px" : "100%" }}
        >
          <div className="view-header">
            <span></span>
            <span></span>
            <span></span>
          </div>
          {widgetViewType !== "mobile" && (
            <div className="body-header">
              <span></span>
              <span></span>
            </div>
          )}
          <div
            className="iframe-view-body"
            style={
              widgetViewType === "mobile"
                ? { height: "calc(100% - 20px)" }
                : { height: "calc(100% - 170px)" }
            }
          >
            {widgetViewType !== "mobile" && (
              <div className="left-view-body">
                <span></span>
                <span></span>
              </div>
            )}

            <div
              className="right-view-body"
              style={
                widgetViewType === "mobile"
                  ? {
                      width: "100%",
                      height: "100%",
                      padding: "0px",
                      background: "#ddd",
                      position: "relative",
                    }
                  : {}
              }
            >
              <div className="iframe-video">
                <iframe
                  src={shareUrl}
                  allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
                  width="100%"
                  height="100%"
                  style={{
                    border: "none",
                    borderRadius: "15px",
                  }}
                ></iframe>
                {widgetViewType === "mobile" && (
                  <div
                    style={{
                      width: "100%",
                      position: "absolute",
                      top: "0px",
                      height: "100%",
                      zIndex: "100000",
                      cursor: "pointer",
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="view-btn">
          <div
            onClick={() => {
              setWidgetViewType("desktop");
            }}
          >
            <img
              src={icons.desktop}
              alt=""
              className="w-25 h-25 fit-image"
              style={{
                filter: creteImgFilter(
                  widgetViewType === "desktop" ? "#000" : "#888"
                ),
              }}
            />
          </div>
          <div
            onClick={() => {
              setWidgetViewType("mobile");
            }}
          >
            <img
              src={icons.mobile}
              alt=""
              className="w-25 h-25 fit-image"
              style={{
                filter: creteImgFilter(
                  widgetViewType === "mobile" ? "#000" : "#888"
                ),
              }}
            />
          </div>
        </div>
      </div>
      <div className="EmbedShare-config" style={{ paddingLeft: "10px" }}>
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
                <div className="wp-100 flow-ai-input mb-20">
                  <div
                    style={{ color: "#777" }}
                    className="text-12-600 ps-5 mb-5"
                  >
                    Width
                  </div>
                  <input
                    type="text"
                    name="width"
                    placeholder="Enter width"
                    className={`form-control`}
                    style={{ boxShadow: "none" }}
                    value={"100%"}
                    disabled={true}
                  />
                </div>
                <div className="wp-100 flow-ai-input">
                  <div
                    style={{ color: "#777" }}
                    className="text-12-600 ps-5 mb-5"
                  >
                    Height (px):
                  </div>
                  <input
                    type="number"
                    name="height"
                    placeholder="Enter height"
                    className={`form-control`}
                    style={{ boxShadow: "none" }}
                    value={iframeForm.height}
                    onChange={(e) => {
                      setIframeForm({ height: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {codeType.value === "widget" && (
            <div className="widget-config-container">
              <p
                className="text-14-500 mt-10 mb-10 p-5"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    background: "#000",
                    borderRadius: "50%",
                    marginRight: "5px",
                  }}
                ></div>
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
                      const isActive = ele === widgetForm.widget_style;
                      return (
                        <div
                          className={`Widget-style-option-container ${
                            isActive
                              ? "Widget-style-option-container-active"
                              : ""
                          }`}
                          key={index}
                          onClick={() => {
                            setWidgetForm({ ...widgetForm, widget_style: ele });
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="mt-20">
                    <div className="text-12-600" style={{ color: "#a1a1a1" }}>
                      Position:
                    </div>
                    <div className="Widget-position-option">
                      <div
                        className={`Widget-position-option-container ${
                          widgetForm.widget_position === "right"
                            ? "Widget-position-option-container-active"
                            : ""
                        }`}
                        onClick={() => {
                          setWidgetForm({
                            ...widgetForm,
                            widget_position: "right",
                          });
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
                          widgetForm.widget_position === "left"
                            ? "Widget-position-option-container-active"
                            : ""
                        }`}
                        onClick={() => {
                          setWidgetForm({
                            ...widgetForm,
                            widget_position: "left",
                          });
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
                  <div className="mt-20">
                    <div className="text-12-600" style={{ color: "#a1a1a1" }}>
                      color:
                    </div>
                    <div className="color-input-container mt-5">
                      <button
                        onClick={() => setShowPicker(true)}
                        style={{
                          backgroundColor:
                            widgetForm.background_color || "#fff",
                        }}
                        className="color-input-container_btn"
                      ></button>

                      {showPicker && (
                        <div className="color-input-container_picker">
                          <CustomSketchPicker
                            flowColor={widgetForm.background_color}
                            setFlowColor={(val) => {
                              setWidgetForm({
                                ...widgetForm,
                                background_color: val.hex,
                              });
                            }}
                          />
                          <div className="picker-btn">
                            <button
                              className="picker-btn_pick"
                              onClick={() => {
                                setShowPicker(false);
                              }}
                            >
                              save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <div className="text-12-600" style={{ color: "#a1a1a1" }}>
                    Overlay text:
                  </div>
                  <div className="flow-ai-input">
                    <input
                      type="text"
                      placeholder="Enter overlay text"
                      value={widgetForm.overlay_text}
                      onChange={(e) => {
                        setWidgetForm({
                          ...widgetForm,
                          overlay_text: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div
                  className="mt-20"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="text-12-600" style={{ color: "#a1a1a1" }}>
                    is dismissible:
                  </div>
                  <div className="flow-ai-input">
                    <Switch
                      isChecked={widgetForm.is_dismissible}
                      onChange={() => {
                        setWidgetForm({
                          ...widgetForm,
                          is_dismissible: !widgetForm.is_dismissible,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="wp-100">
          <Button
            style={{
              background: "#000",
              border: "none",
              outline: "none",
              fontSize: "14px",
              fontWeight: "700",
              width: "100%",
              letterSpacing: "1.5px",
              padding: "15px 0px",
            }}
            onClick={() => {
              if (codeType.value === "iframe") handelIframeCopy();
              if (codeType.value === "widget") handelWidgetCopy();
            }}
          >
            Copy code!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmbedShare;

const CustomSketchPicker = ({ flowColor, setFlowColor }) => {
  const customStyles = {
    default: {
      picker: {
        width: "200px",
        boxShadow: "none",
        borderRadius: "10px",
      },
      saturation: {
        borderRadius: "10px",
      },
      controls: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
      },
      color: {
        borderRadius: "10px",
        width: "20px",
        height: "20px",
      },
      fields: {
        padding: "0px 5px",
      },
      input: {
        border: "2px solid #ccc",
        borderRadius: "5px",
        height: "30px",
        padding: "0 5px",
        fontSize: "14px",
        display: "flex",
      },
      label: {
        fontSize: "12px",
        color: "#555",
      },
    },
  };

  return (
    <SketchPicker
      color={flowColor || "#000"}
      onChange={(color) => setFlowColor(color)}
      styles={customStyles} // Pass custom styles
    />
  );
};
