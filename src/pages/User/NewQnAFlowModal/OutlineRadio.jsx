import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function OutlineRadio({ className, isCheck, onChange, isDisabled }) {
  return (
    <div>
      <div className="OutlineCheck">
        <Form.Check
          style={{
            width: "18px",
            height: "18px",
            cursor: "pointer",
            userSelect: "none",
            borderRadius: "50%",
            border: isCheck ? `2px solid #7B5AFF` : `2px solid #757F95`,
            ...(isDisabled ? { border: `1px solid #d3d3d3` } : {}),
          }}
          type="checkbox"
          checked={isCheck}
          className={className}
        >
          <span
            onClick={onChange}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: isCheck ? "60%" : "0%",
                height: isCheck ? "60%" : "0%",
                opacity: isCheck ? "1" : "0",
                borderRadius: "50%",
                background: isDisabled ? "#d3d3d3" : "#7B5AFF",
                transitionDuration: "0.2s",
              }}
            ></span>
          </span>
        </Form.Check>
      </div>
    </div>
  );
}

export default OutlineRadio;
