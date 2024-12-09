import React, { useState } from "react";
import { icons } from "../../../../../../utils/constants";
import { Button } from "react-bootstrap";

function MultipleChoiceFormate() {
  const [options, setOptions] = useState([""]);
  return (
    <div id="MultipleChoiceFormate">
      <div className="option-input-group mb-20">
        {options.map((value, index) => {
          return (
            <div className="option-input" key={index}>
              <input
                type="text"
                value={value}
                placeholder={`Enter choice ${index + 1}`}
                onChange={(e) => {
                  const newOptions = options;
                  const text = e.target.value;
                  newOptions[index] = text;
                  setOptions([...newOptions]);
                }}
              />
              <Button
                className="input-delete-btn"
                onClick={() => {
                  const newOption = options;
                  newOption.splice(index, 1);
                  setOptions([...newOption]);
                }}
                disabled={options.length === 1}
              >
                <img src={icons.close} alt="" className="fit-image" />
              </Button>
            </div>
          );
        })}
        <div className="wp-80 fb-center" style={{ justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setOptions([...options, ""]);
            }}
            className="text-12-600"
            style={{
              background: "white",
              color: "#7B5AFF",
              border: "none",
              padding: "8px 10px",
            }}
          >
            + Add Choice
          </Button>
        </div>
      </div>
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Allow multiple selections</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className={`align-btn active`}>Yes</div>
          <div className={`align-btn`}>No</div>
        </div>
      </div>
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Randomize</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className={`align-btn active`}>Yes</div>
          <div className={`align-btn`}>No</div>
        </div>
      </div>
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Disable Data Collection</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className={`align-btn active`}>Yes</div>
          <div className={`align-btn`}>No</div>
        </div>
      </div>
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Display total choices</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className={`align-btn active`}>Yes</div>
          <div className={`align-btn`}>No</div>
        </div>
      </div>
    </div>
  );
}

export default MultipleChoiceFormate;
