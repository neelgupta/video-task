import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
function OutlineCheck({ className, isCheck, onChange, isDisabled }) {
  return (
    <div className="OutlineCheck">
      <Form.Check
        style={{
          position: "relative",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          userSelect: "none",
          borderRadius: "3px",
          border: isCheck ? `2px solid #B3A1FF` : `1px solid #757F95`,
          ...(isDisabled ? { border: `2px solid #D3D3D3` } : {}),
        }}
        type="checkbox"
        checked={isCheck}
        className={className}
      >
        <span
          onClick={() => {
            onChange && !isDisabled && onChange(!isCheck);
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isCheck && (
            <img
              src={icons.check}
              alt=""
              className="fit-image wp-80"
              style={{
                filter: creteImgFilter(isDisabled ? "#D3D3D3" : "#B3A1FF"),
              }}
            />
          )}
        </span>
      </Form.Check>
    </div>
  );
}

export default OutlineCheck;
