import React from "react";
import "./AnswerSkeleton.scss";
import { icons } from "../../../../../utils/constants";
import {
  addWhitenessToHex,
  creteImgFilter,
} from "../../../../../utils/helpers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function AnswerSkeleton({ answerType, interactionsStyle }) {
  return (
    <div className="wp-100 hp-100">
      {answerType === "open-ended" && (
        <div className="open-ended-skeleton">
          {["video", "audioIcon", "textLine"].map((icon) => {
            return (
              <div className="open-ended-icon" key={icon}>
                <Skeleton
                  baseColor={addWhitenessToHex(
                    interactionsStyle.primary_color,
                    0.8
                  )}
                  highlightColor={addWhitenessToHex(
                    interactionsStyle.primary_color,
                    0.95
                  )}
                  width={45}
                  borderRadius={`${interactionsStyle.border_radius}px`}
                  height={45}
                />
                <img
                  src={icons[icon]}
                  alt=""
                  className="w-20 h-20"
                  style={{
                    filter: creteImgFilter(interactionsStyle.primary_color),
                    position: "absolute",
                    zIndex: "10000",
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {answerType === "multiple-choice" && (
        <div className="multiple-choice-skeleton">
          {[1, 2, 3].map((item) => {
            return (
              <div className="multiple-choice-options" key={item}>
                <Skeleton
                  baseColor={addWhitenessToHex(
                    interactionsStyle.primary_color,
                    0.8
                  )}
                  highlightColor={addWhitenessToHex(
                    interactionsStyle.primary_color,
                    0.95
                  )}
                  width={120}
                  borderRadius={`${interactionsStyle.border_radius}px`}
                  height={25}
                />
                <div
                  className="multiple-choice-label"
                  style={{
                    background: interactionsStyle.primary_color,
                    lineHeight: "1",
                    borderRadius: interactionsStyle.border_radius || "20px",
                    fontFamily: `${interactionsStyle.font}`,
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {answerType === "button" && (
        <div className="button-skeleton">
          <div className="button-skeleton-box">
            <Skeleton
              baseColor={addWhitenessToHex(
                interactionsStyle.primary_color,
                0.8
              )}
              highlightColor={addWhitenessToHex(
                interactionsStyle.primary_color,
                0.95
              )}
              width={120}
              borderRadius={`${interactionsStyle.border_radius}px`}
              height={40}
            />
            <div className="button-skeleton-text">
              <span
                style={{
                  color: interactionsStyle.primary_color,
                  fontFamily: `${interactionsStyle.font}`,
                }}
              >
                Button
              </span>
              <img
                src={icons.link}
                alt=""
                className="w-20"
                style={{
                  filter: creteImgFilter(interactionsStyle.primary_color),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {answerType === "file-upload" && (
        <div className="file-upload-skeleton">
          <div className="file-upload-skeleton-box">
            <Skeleton
              baseColor={addWhitenessToHex(
                interactionsStyle.primary_color,
                0.8
              )}
              highlightColor={addWhitenessToHex(
                interactionsStyle.primary_color,
                0.95
              )}
              width={170}
              borderRadius={`${interactionsStyle.border_radius}px`}
              height={75}
            />
            <div className="file-upload-text" style={{}}>
              <div>
                <img
                  src={icons.Upload}
                  alt=""
                  className="w-35"
                  style={{
                    filter: creteImgFilter(interactionsStyle.primary_color),
                  }}
                />
              </div>
              <div
                style={{
                  color: interactionsStyle.primary_color,
                  lineHeight: "1",
                  fontFamily: `${interactionsStyle.font}`,
                }}
              >
                File Upload
              </div>
            </div>
          </div>
        </div>
      )}

      {answerType === "calender" && (
        <div className="calender-skeleton">
          <div className="calender-skeleton-box">
            <Skeleton
              baseColor={addWhitenessToHex(
                interactionsStyle.primary_color,
                0.8
              )}
              highlightColor={addWhitenessToHex(
                interactionsStyle.primary_color,
                0.95
              )}
              width={170}
              borderRadius={`${interactionsStyle.border_radius}px`}
              height={70}
            />
            <div className="calender-text">
              <div>
                <img
                  src={icons.calendar}
                  alt=""
                  className="w-35"
                  style={{
                    filter: creteImgFilter(interactionsStyle.primary_color),
                  }}
                />
              </div>
              <div className="calender-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((count) => {
                  return (
                    <div
                      key={count}
                      className="calender-grid-box"
                      style={{ background: interactionsStyle.primary_color }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswerSkeleton;
