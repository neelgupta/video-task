import React, { useState } from "react";
import { getTrackBackground, Range } from "react-range";
import { Button, Spinner } from "react-bootstrap";
import Select from "react-select";
import "./VideoConfiguration.scss";
import { TextArea } from "../../../../../components";
import { icons } from "../../../../../utils/constants";

function VideoConfiguration({
  isThumbnail,
  onSubmit,
  videoConfigForm,
  setVideoConfigForm,
  MAX,
  isCreate,
}) {
  const MIN = 0;
  const positionOption = [
    { value: "center start", label: "Center Left" },
    { value: "center end", label: "Center Right" },
    { value: "flex-start center", label: "Top Center" },
    { value: "flex-end center", label: "Bottom Center" },
    { value: "flex-start flex-start", label: "Top Left" },
    { value: "flex-start flex-end", label: "Top Right" },
    { value: "flex-end flex-start", label: "Bottom Left" },
    { value: "flex-end flex-end", label: "Bottom Right" },
  ];
  const sizeOption = [
    {
      label: "Extra Small",
      value: "20px",
    },
    {
      label: "Small",
      value: "22px",
    },
    {
      label: "Medium",
      value: "34px",
    },
    {
      label: "Large",
      value: "46px",
    },
    {
      label: "Extra Large",
      value: "58px",
    },
  ];
  return (
    <div className="VideoConfiguration-container">
      <h3 className="text-22-600 mb-20">Video</h3>
      {isThumbnail && (
        <div className="img-title mb-20" style={{}}>
          <img src={icons.videoAvatar} alt="" className="img_fit_video" />
          <div className="double-star">
            <img src={icons.doubleStar} alt="" className="fit-image " />
          </div>
        </div>
      )}

      <div className="align-option mb-20">
        <div className="text-18-500" style={{ color: "#7D8185" }}>
          Align Video
        </div>
        <div style={{ display: "flex" }}>
          <div
            onClick={() =>
              setVideoConfigForm((pre) => {
                return { ...pre, alignVideo: true };
              })
            }
            className={`align-btn ${videoConfigForm.alignVideo && "active"}`}
          >
            Yes
          </div>
          <div
            onClick={() =>
              setVideoConfigForm((pre) => {
                return { ...pre, alignVideo: false };
              })
            }
            className={`align-btn ${!videoConfigForm.alignVideo && "active"}`}
          >
            No
          </div>
        </div>
      </div>
      <div
        className="mb-20"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="text-18-500" style={{ color: "#7D8185" }}>
          Select video position Manually
        </div>
        <div className="w-200">
          <Select
            style={{}}
            isDisabled={videoConfigForm.alignVideo}
            options={positionOption}
            value={videoConfigForm.videoPosition}
            onChange={(select) => {
              setVideoConfigForm((pre) => {
                return { ...pre, videoPosition: select };
              });
            }}
          />
        </div>
      </div>
      <div className="Overlay-content">
        <h3 className="text-22-600 mt-20 mb-20">Overlay</h3>
        <div className="mb-20">
          <div className="text-18-500 mb-10" style={{ color: "#7D8185" }}>
            Overlay Text
          </div>
          <TextArea
            id="overlayText"
            placeholder="Enter Overlay Text ..."
            style={{ borderRadius: "10px" }}
            value={videoConfigForm.overlayText}
            onChange={(e) => {
              setVideoConfigForm((pre) => {
                return { ...pre, overlayText: e.target.value };
              });
            }}
          />
        </div>
        <div
          className="mb-20"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Text Size
          </div>
          <div className="w-220">
            <Select
              value={videoConfigForm.textSize}
              isDisabled={!videoConfigForm.overlayText}
              onChange={(select) => {
                setVideoConfigForm((pre) => {
                  return { ...pre, textSize: select };
                });
              }}
              options={sizeOption}
              menuPlacement="top"
            />
          </div>
        </div>
        <div
          className="mb-20"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Fade/Reveal
          </div>
          <div className="slider-container">
            <Range
              values={videoConfigForm.textReveal}
              step={1}
              min={MIN}
              max={MAX}
              disabled={!videoConfigForm.overlayText}
              onChange={(values) => {
                setVideoConfigForm((pre) => {
                  return { ...pre, textReveal: values };
                });
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values: videoConfigForm.textReveal,
                        colors: [
                          videoConfigForm.overlayText
                            ? "#7b5aff"
                            : "rgba(0,0,0,0.3)",
                          "rgba(0,0,0,0.1)",
                        ],
                        min: MIN,
                        max: MAX,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: isDragged ? "25px" : "20px",
                    width: isDragged ? "25px" : "20px",
                    borderRadius: "50%",
                    backgroundColor: isDragged ? "#7b5aff" : "#B3A1FF",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                ></div>
              )}
            />
            <div className="slider-labels mt-10">
              <span style={{ color: "#7D8185" }} className="text-14-600">
                0 sec
              </span>
              <span style={{ color: "#7D8185" }} className="text-14-600">
                {MAX} sec
              </span>
            </div>
          </div>
        </div>
        <div className="p-20 pt-0">
          <Button
            className="text-18-600 wp-100 "
            style={{
              background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
              border: "none",
              padding: "10px 0px",
            }}
            onClick={onSubmit}
            disabled={isCreate}
          >
            Done
            {isCreate && <Spinner className="ms-10" size="sm" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VideoConfiguration;
