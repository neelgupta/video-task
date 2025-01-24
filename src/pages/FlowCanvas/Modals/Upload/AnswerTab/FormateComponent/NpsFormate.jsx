import { ErrorMessage, Field, Form } from "formik";
import React from "react";

function NpsFormate({ setFieldValue, values, errors }) {
  return (
    <Form id="NpsFormate">
      {/* Label Section */}
      <div className="wp-100 mb-20">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-22-600">Label</div>
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Yes Button */}
            <div
              onClick={() => setFieldValue("is_label", true)}
              className={`align-btn ${values.is_label ? "active" : ""}`}
            >
              Yes
            </div>
            {/* No Button */}
            <div
              onClick={() => {
                setFieldValue("is_label", false);
                setFieldValue("right_label", ""); // Clear right_label if "No" is selected
                setFieldValue("left_label", ""); // Clear left_label if "No" is selected
              }}
              className={`align-btn ${!values.is_label ? "active" : ""}`}
            >
              No
            </div>
          </div>
        </div>
        <ErrorMessage
          name="is_label"
          component="div"
          className="error-message"
        />
      </div>

      {/* Left Label Input */}
      <div className="wp-100 mb-20">
        <div
          className="InputBox"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Field
            type="text"
            name="left_label"
            className="form-control"
            placeholder="Left label"
            disabled={!values.is_label} // Disable if "is_label" is false
          />
        </div>
        <ErrorMessage
          name="left_label"
          component="div"
          className="error-message"
        />
      </div>

      {/* Right Label Input */}
      <div className="wp-100 mb-20">
        <div
          className="InputBox"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Field
            type="text"
            name="right_label"
            className="form-control"
            placeholder="Right label"
            disabled={!values.is_label} // Disable if "is_label" is false
          />
        </div>
        <ErrorMessage
          name="right_label"
          component="div"
          className="error-message"
        />
      </div>
    </Form>
  );
}

export default NpsFormate;
