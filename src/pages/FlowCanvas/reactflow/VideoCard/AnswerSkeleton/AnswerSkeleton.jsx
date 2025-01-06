import React from "react";
import "./AnswerSkeleton.scss";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function AnswerSkeleton({ answerType }) {
  return (
    <div className="wp-100 hp-100">
      {answerType === "open-ended" && (
        <div className="open-ended-skeleton">
          {["video", "audioIcon", "textLine"].map((icon) => {
            return (
              <div className="open-ended-icon" key={icon}>
                <Skeleton
                  baseColor="#f6eeff"
                  highlightColor="#f0e2ff"
                  width={45}
                  borderRadius={"5px"}
                  height={45}
                />
                <img
                  src={icons[icon]}
                  alt=""
                  className="w-20"
                  style={{
                    filter: creteImgFilter("#7b5aff"),
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
                  baseColor="#f6eeff"
                  highlightColor="#f0e2ff"
                  width={120}
                  borderRadius={"20px"}
                  height={20}
                />
                <div className="multiple-choice-label">{item} </div>
              </div>
            );
          })}
        </div>
      )}

      {answerType === "button" && (
        <div className="button-skeleton">
          <div className="button-skeleton-box">
            <Skeleton
              baseColor="#f6eeff"
              highlightColor="#f0e2ff"
              width={120}
              borderRadius={"5px"}
              height={40}
            />
            <div className="button-skeleton-text" style={{}}>
              <span>Button</span>
              <img
                src={icons.link}
                alt=""
                className="w-20"
                style={{
                  filter: creteImgFilter("#7b5aff"),
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
              baseColor="#f6eeff"
              highlightColor="#f0e2ff"
              width={150}
              borderRadius={"5px"}
              height={70}
            />
            <div className="file-upload-text" style={{}}>
              <div>
                <img
                  src={icons.Upload}
                  alt=""
                  className="w-35"
                  style={{
                    filter: creteImgFilter("#7b5aff"),
                  }}
                />
              </div>
              <div>File Upload</div>
            </div>
          </div>
        </div>
      )}

      {answerType === "calender" && (
        <div className="calender-skeleton">
          <div className="calender-skeleton-box">
            <Skeleton
              baseColor="#f6eeff"
              highlightColor="#f0e2ff"
              width={150}
              borderRadius={"5px"}
              height={70}
            />
            <div className="calender-text">
              <div>
                <img
                  src={icons.calendar}
                  alt=""
                  className="w-35"
                  style={{
                    filter: creteImgFilter("#7b5aff"),
                  }}
                />
              </div>
              <div className="calender-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((count) => {
                  return <div key={count} className="calender-grid-box"></div>;
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
