import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { handelCatch, throwError } from "../../../../store/globalSlice";
const npsOptions = [
  {
    index: 1,
    color: "#D30027",
  },
  {
    index: 2,
    color: "#EB0B0B",
  },
  {
    index: 3,
    color: "#F13708",
  },
  {
    index: 4,
    color: "#F87501",
  },
  {
    index: 5,
    color: "#F8B300",
  },
  {
    index: 6,
    color: "#F8DD00",
  },
  {
    index: 7,
    color: "#CCDE0E",
  },
  {
    index: 8,
    color: "#89D421",
  },
  {
    index: 9,
    color: "#44BC38",
  },
  {
    index: 10,
    color: "#12AD47",
  },
];

function NpsForm({ onNext, node, isPost, flowStyle }) {
  const { t } = useTranslation();
  const { answer_type, answer_format } = node;
  const dispatch = useDispatch();
  const [selectedNPS, setSelectedNPS] = useState(1);

  const handelSubmit = () => {
    try {
      const findOption = (answer_format?.nps_choices || []).find(
        (ele) => ele.index === parseInt(selectedNPS)
      );
      if (!selectedNPS || !findOption) {
        dispatch(throwError("Please enter an answer."));
        return;
      }
      if (!isPost) {
        onNext({
          ans: findOption,
        });
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };
  return (
    <div className="NpsForm-container">
      <div className="nps-option">
        <div className="options">
          {npsOptions.map((ele, index) => {
            const isActive = ele.index === selectedNPS;
            return (
              <div
                className="option"
                key={index}
                style={{
                  background: ele.color,
                  ...(isActive
                    ? {
                        transform: "scale(0.85)",
                        boxShadow: "none",
                        borderRadius: "50%",
                        border: "2px solid white",
                        zIndex: "1000",
                      }
                    : {}),
                }}
                onClick={() => {
                  setSelectedNPS(ele.index);
                }}
              >
                {ele.index}
              </div>
            );
          })}
        </div>
        <div className="nps-label" style={{ color: flowStyle.primary_color }}>
          {answer_format.is_label ? (
            <>
              <p>{answer_format.left_label}</p>
              <p>{answer_format.right_label}</p>
            </>
          ) : (
            <>
              <p>left</p>
              <p>right</p>
            </>
          )}
        </div>
      </div>
      <div id="ans-btn-group" className="mb-30">
        <button
          className="next-btn"
          onClick={() => {
            handelSubmit();
          }}
          style={{ background: flowStyle.secondary_color }}
        >
          {isPost ? (
            <Spinner size="lg" color="#000" />
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
        <button className="cancel-btn" onClick={() => {}}>
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

export default NpsForm;
