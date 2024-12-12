import React, { useState } from "react";
import { creteImgFilter } from "../../../../utils/helpers";
import { icons } from "../../../../utils/constants";

function MultipleChoiceForm({ onNext, node }) {
  const { answer_type, answer_format } = node;
  console.log("answer_format", answer_format);
  const [selectOption, setSelectOption] = useState(null);
  const handelOptionSelect = (select) => {
    console.log("select", select);
    setSelectOption(select);
  };
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
        {(answer_format?.choices || []).map((ele, index) => {
          return (
            <div
              className={`option-box ${selectOption === ele && "active"}`}
              key={index}
              onClick={() => {
                handelOptionSelect(ele);
              }}
            >
              <div className="option-teg">{index + 1}</div>
              <div className="option-value">{ele}</div>
            </div>
          );
        })}
      </div>
      <div id="ans-btn-group">
        <button className="next-btn" onClick={onNext}>
          <img
            src={icons.top_right_arrow}
            alt=""
            style={{
              transform: "rotate(45deg)",
              filter: creteImgFilter("#888888"),
            }}
            className="fit-image w-30"
          />
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
