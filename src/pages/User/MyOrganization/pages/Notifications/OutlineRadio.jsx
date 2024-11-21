import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function OutlineRadio({ className, isCheck, onChange }) {
  return (
    <div>
      <div className="OutlineCheck">
        <Form.Check
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            userSelect: "none",
            borderRadius: "50%",
            border: isCheck ? `1px solid #B3A1FF` : `1px solid #757F95`,
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
                width: isCheck ? "80%" : "0%",
                height: isCheck ? "80%" : "0%",
                borderRadius: "50%",
                background: "#B3A1FF",
                transitionDuration: "0.3s",
              }}
            ></span>
          </span>
        </Form.Check>
      </div>
    </div>
  );
}

export default OutlineRadio;
