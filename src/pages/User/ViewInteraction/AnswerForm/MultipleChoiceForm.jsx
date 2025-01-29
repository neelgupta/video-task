import React, { useEffect, useState } from "react";
import { addWhitenessToHex, creteImgFilter } from "../../../../utils/helpers";
import { icons } from "../../../../utils/constants";
import { throwError } from "../../../../store/globalSlice";
import { useDispatch } from "react-redux";
import "./AnswerForm.scss";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function MultipleChoiceForm({ onNext, node, isPost, flowStyle }) {
  const { t } = useTranslation();
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
            style={{
              color: flowStyle.primary_color,
              fontFamily: `${flowStyle.font}`,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="w-15 h-15 me-10"
              style={{
                borderRadius: "50%",
                background: addWhitenessToHex(flowStyle.primary_color, 0.9),
              }}
            ></div>
            {answer_format.allow_multiple
              ? `${t("multipleChoiceForm.Choose_up_to")} ${
                  optionList.length
                } ${t("multipleChoiceForm.options")}`
              : `${t("multipleChoiceForm.Choose_1_of")} ${
                  optionList.length
                } ${t("multipleChoiceForm.options")}`}
          </div>
        )}

        {optionList.map((ele, index) => {
          const isActive = answer_format.allow_multiple
            ? (selectOption || []).includes(ele)
            : selectOption?.index === ele.index;
          return (
            <div
              className={`option-box`}
              // answer_format.allow_multiple
              // ? (selectOption || []).includes(ele) && "active"
              // : selectOption === ele && "active"
              key={index}
              onClick={() => {
                handelOptionSelect(ele);
              }}
              style={{
                borderRadius: `${flowStyle.border_radius}px`,
                ...(isActive
                  ? {
                      background: addWhitenessToHex(
                        flowStyle.primary_color,
                        0.95
                      ),
                      border: `1px solid ${flowStyle.primary_color}`,
                    }
                  : {}),
              }}
            >
              <div
                className="option-teg"
                style={{
                  borderRadius: `${flowStyle.border_radius}px`,
                  ...(isActive
                    ? {
                        background: flowStyle.primary_color,
                      }
                    : {}),
                }}
              >
                {answer_format.allow_multiple &&
                (selectOption || []).includes(ele) ? (
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
              <div
                className="option-value"
                style={{
                  fontFamily: `${flowStyle.font}`,
                  ...(isActive
                    ? {
                        color: flowStyle.primary_color,
                      }
                    : {}),
                }}
              >
                {ele.option}
              </div>
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
          style={{
            background: flowStyle.secondary_color,
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
