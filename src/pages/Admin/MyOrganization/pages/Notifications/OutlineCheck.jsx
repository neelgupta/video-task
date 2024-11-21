import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
function OutlineCheck({ className, isCheck, onChange }) {
  const [checked, setChecked] = useState(isCheck);
  useEffect(() => {
    onChange && onChange(checked);
  }, [checked, onChange]);
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
          border: checked ? `2px solid #B3A1FF` : `1px solid #757F95`,
        }}
        type="checkbox"
        checked={checked}
        className={className}
      >
        <span
          onClick={() => {
            setChecked((pre) => !pre);
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
          {checked && (
            <img
              src={icons.check}
              alt=""
              className="fit-image wp-80"
              style={{
                filter: creteImgFilter("#B3A1FF"),
              }}
            />
          )}
        </span>
      </Form.Check>
    </div>
  );
}

export default OutlineCheck;
