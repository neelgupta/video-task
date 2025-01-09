import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useColor, ColorPicker } from "react-color-palette";
import { icons } from "../../../utils/constants";
import "react-color-palette/css";
import { setThemeColor } from "../../../store/globalSlice";

const recentList = [
  "#299f63",
  "#ef4444",
  "#f97316",
  "#facc15",
  "#4ade80",
  "#2dd4bf",
  "#3b82f6",
  "#738cb5",
];
const ThemePicker = ({ isResponsive, themeColor, activeImageFilter }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [color, setColor] = useColor("hsl(149 56% 62% / 1)");
  const themePickerRef = useRef(null);
  const lightenColor = (hex, percent) => {
    // Remove the hash (#) if present
    hex = hex.replace(/^#/, "");

    // Parse the r, g, b values from the hex string
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Increase r, g, b values by the percentage
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    // Convert back to hex
    const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;

    return newHex;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        themePickerRef.current &&
        !themePickerRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themePickerRef]);

  return (
    <div className="position-relative" ref={themePickerRef}>
      <div
        className={`rounded-circle pointer f-center ${
          isResponsive ? "h-30 w-30" : "h-37 w-37"
        }`}
        style={{
          backgroundColor: show ? themeColor.pColor : themeColor.sColor,
        }}
        onClick={() => {
          setShow(!show);
        }}
      >
        <span className="h-18 w-18 d-flex">
          <img
            src={icons.themeIcon}
            alt="themeIcon"
            className={`fit-image`}
            style={{
              filter: show ? "invert(1)" : activeImageFilter,
            }}
          />
        </span>
      </div>
      {show && (
        <div className="theme-picker-block shadow">
          <div className="custom-layout">
            <ColorPicker
              color={color}
              onChange={(e) => {
                setColor(e);
                dispatch(
                  setThemeColor({
                    pColor: e?.hex,
                    sColor: lightenColor(e?.hex, 90),
                  })
                );
              }}
            />
            <div className="mt-12">
              <div className="text-14-500 color-1923">Recent colors</div>
              <div className="fa-center gap-2 mt-5">
                {recentList?.map((elm, index) => {
                  const isActive = themeColor.pColor === elm;
                  return (
                    <span
                      key={index}
                      className="rounded-circle pointer"
                      onClick={() => {
                        setColor({ hex: elm, rgb: color.rgb, hsv: color.hsv });

                        dispatch(
                          setThemeColor({
                            pColor: elm,
                            sColor: lightenColor(elm, 90),
                          })
                        );
                      }}
                      style={
                        isActive ? { border: "1px solid", padding: "2px" } : {}
                      }
                    >
                      <span
                        className="h-20 w-20 d-flex rounded-circle"
                        style={{
                          backgroundColor: elm,
                        }}
                      />
                    </span>
                  );
                })}
                {/* <span
                  className="rounded-circle"
                  style={{ border: "1px solid", padding: "2px" }}
                >
                  <span
                    className="h-20 w-20 d-flex rounded-circle"
                    style={{
                      backgroundColor: "#299F63",
                    }}
                  />
                </span>
                <span
                  className="h-20 w-20 d-flex rounded-circle"
                  style={{ backgroundColor: "#EF4444" }}
                /> */}
                {/* <span
                  className="h-20 w-20 d-flex rounded-circle"
                  style={{ backgroundColor: "#F97316" }}
                />
                <span
                  className="h-20 w-20 d-flex rounded-circle"
                  style={{ backgroundColor: "#FACC15" }}
                />
                <span
                  className="h-20 w-20 d-flex rounded-circle"
                  style={{ backgroundColor: "#4ADE80" }}
                />
                <span
                  className="h-20 w-20 d-flex rounded-circle"
                  style={{ backgroundColor: "#2DD4BF" }}
                />
                <span
                  className="h-20 w-20 d-flex rounded-circle"
                  style={{ backgroundColor: "#3B82F6" }}
                />
                <span
                  className="h-20 w-20 d-flex rounded-circle"
                  style={{ backgroundColor: "#738CB5" }}
                /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
