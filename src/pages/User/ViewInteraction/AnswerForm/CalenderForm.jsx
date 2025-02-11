import React from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";

function CalenderForm({ node, isPost, flowStyle, onNext }) {
  const { answer_type, answer_format } = node;
  const dispatch = useDispatch();
  return (
    <div className="CalenderForm">
      <iframe
        src={answer_format?.scheduling_link || ""} // Replace with your desired URL
        style={{ width: "100%", height: "100%", border: "none" }}
        title="External Website"
      ></iframe>
      <div
        id="ans-btn-group"
        style={{
          position: "absolute",
          bottom: "0",
          zIndex: "10000",
          width: "100%",
          margin: "20px 0px",
        }}
      >
        <button
          type="submit"
          className="next-btn"
          style={{ background: flowStyle.secondary_color }}
          onClick={() => {
            onNext({ ans: true });
          }}
        >
          {isPost ? (
            <Spinner size="lg" color="#888888" />
          ) : (
            <img
              src={icons.top_right_arrow}
              alt=""
              style={{
                transform: "rotate(45deg)",
                filter: creteImgFilter("#000"),
              }}
              className="fit-image w-30"
            />
          )}
        </button>
        <button type="button" className="cancel-btn" onClick={() => {}}>
          <img
            src={icons.closeSvg}
            alt=""
            style={{ filter: creteImgFilter("#ffffff") }}
            className="fit-image w-12 pb-5"
          />
        </button>
      </div>
    </div>
  );
}

export default CalenderForm;
{
  /* <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/bJg7bVeYYII?si=9eO-zeGby1SADkGi"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>; */
}
