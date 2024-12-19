import React, { useEffect, useState } from "react";
import { creteImgFilter } from "../../../../utils/helpers";
import { icons } from "../../../../utils/constants";
import { throwError } from "../../../../store/globalSlice";
import { useDispatch } from "react-redux";
import "./AnswerForm.scss";
import { Spinner } from "react-bootstrap";

function MultipleChoiceForm({ onNext, node, isPost }) {
  const { answer_type, answer_format } = node;
  const dispatch = useDispatch();
  const [selectOption, setSelectOption] = useState(null);
  const [optionList, setOptionList] = useState([]);
  const handelOptionSelect = (select) => {
    if (answer_format.allow_multiple) {
      const selectArray = selectOption || [];
      const isExist = selectArray.includes(select);
      if (isExist) {
        setSelectOption(selectArray.filter((x) => x !== select));
      } else {
        setSelectOption([...selectArray, select]);
      }
    } else {
      setSelectOption(select);
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array]; // Create a copy to avoid mutating the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  useEffect(() => {
    if (answer_format.randomize) {
      setOptionList(shuffleArray(answer_format?.choices || []));
    } else {
      setOptionList(answer_format?.choices || []);
    }
  }, [answer_format]);

  return (
    <div className="MultipleChoiceForm-container">
      <div
        className="wp-100 hp-85"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        {answer_format.display_total_choices && (
          <div
            className="text-20-500 mb-30"
            style={{ color: "#8000ff", display: "flex", alignItems: "center" }}
          >
            <div
              className="w-15 h-15 me-10"
              style={{
                borderRadius: "50%",
                background: "#f0f0f0",
              }}
            ></div>
            {answer_format.allow_multiple
              ? `Choose up to ${optionList.length} options`
              : `Choose 1 of ${optionList.length} options`}
          </div>
        )}

        {optionList.map((ele, index) => {
          return (
            <div
              className={`option-box ${
                answer_format.allow_multiple
                  ? (selectOption || []).includes(ele) && "active"
                  : selectOption === ele && "active"
              }`}
              key={index}
              onClick={() => {
                handelOptionSelect(ele);
              }}
            >
              <div className="option-teg">
                {(selectOption || []).includes(ele) &&
                answer_format.allow_multiple ? (
                  <img
                    src={icons.check}
                    alt=""
                    className="w-15"
                    style={{ filter: creteImgFilter("#ffffff") }}
                  />
                ) : (
                  index + 1
                )}
              </div>
              <div className="option-value">{ele}</div>
            </div>
          );
        })}
      </div>
      <div id="ans-btn-group">
        <button
          className="next-btn"
          onClick={() => {
            if (!selectOption || selectOption.length === 0) {
              dispatch(throwError("Please enter an answer."));
              return;
            }
            if (!isPost) {
              onNext({ ans: selectOption });
            }
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
                filter: creteImgFilter("#888888"),
              }}
              className="fit-image w-30"
            />
          )}
        </button>
        <button className="cancel-btn" onClick={() => setSelectOption(null)}>
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

export default MultipleChoiceForm;
