import React, { useState } from "react";
import { icons } from "../../../../utils/constants";
import { getTrackBackground, Range } from "react-range";
import { Button } from "react-bootstrap";
import Select from "react-select";
import TextArea from "../../../../components/inputs/TextArea/TextArea";
import "./VideoEdit.scss";
import DropdownOption from "../../../../components/inputs/DropdownOption/DropdownOption";

function VideoEditBody({ setModalType, isThumbnail }) {
  const [alignVideo, setAlignVideo] = useState(true);
  const [values, setValues] = useState([4]);
  const MIN = 0;
  const MAX = 12;
  const positionOption = [
    {
      value: "Center Left",
      label: "Center Left",
    },
    {
      value: "Center Right",
      label: "Center Right",
    },
    {
      value: "Center Top",
      label: "Center Top",
    },
    {
      value: "Center Bottom",
      label: "Center Bottom",
    },
    {
      value: "Top Left",
      label: "Top Left",
    },
    {
      value: "Top Right",
      label: "Top Right",
    },
    {
      value: "Bottom Left",
      label: "Bottom Left",
    },
    {
      value: "Bottom Left",
      label: "Bottom Left",
    },
  ];
  const sizeOption = [
    {
      value: "Extra Small",
      label: "Extra Small",
    },
    {
      value: "Small",
      label: "Small",
    },
    {
      value: "Medium",
      label: "Medium",
    },
    {
      value: "Large",
      label: "Large",
    },
    {
      value: "Extra Large",
      label: "Extra Large",
    },
  ];
  return (
    <div className="VideoEditBody">
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
            onClick={() => setAlignVideo(true)}
            className={`align-btn ${alignVideo && "active"}`}
          >
            Yes
          </div>
          <div
            onClick={() => setAlignVideo(false)}
            className={`align-btn ${!alignVideo && "active"}`}
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
          <DropdownOption style={{}} options={positionOption} />
        </div>
      </div>
      <div className="Overlay-content">
        <h3 className="text-22-600 mt-20 mb-20">Overlay</h3>
        <div className="mb-20">
          <div className="text-18-500 mb-10" style={{ color: "#7D8185" }}>
            Overlay Text
          </div>
          <TextArea
            placeholder="Enter Overlay Text ..."
            style={{ borderRadius: "10px" }}
            onChange={() => {}}
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
            <DropdownOption
              onChange={() => {}}
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
              values={values}
              step={1}
              min={MIN}
              max={MAX}
              onChange={(values) => setValues(values)}
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
                        values,
                        colors: ["#7b5aff", "rgba(0,0,0,0.1)"],
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
                12 sec
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
            onClick={() => {
              setModalType("video-ai");
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VideoEditBody;
