import { ErrorMessage, Field } from "formik";
import React from "react";
import { Form } from "react-bootstrap";

function ButtonFormate({ setFieldValue, values, errors }) {
  return (
    <Form id="ButtonFormate">
      {/* Button Title */}
      <div className="mb-20">
        <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
          Button Title :
        </div>
        <div className="wp-100 InputBox">
          <Field
            type="text"
            name="button_title"
            placeholder="Navigate to"
            className={`form-control`}
          />
          <ErrorMessage
            className="error-message"
            name="button_title"
            component="div"
          />
        </div>
      </div>

      <div className="mb-20">
        <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
          Delay for options to show :
        </div>
        <div
          className="wp-50 InputBox"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Field type="text" name="delay" className={`form-control`} />
          <div className="text-14-600" style={{ color: "#666666" }}>
            Sec.
          </div>
        </div>
        <ErrorMessage name="delay" component="div" className="error-message" />
      </div>

      {/* Disable Data Collection */}
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-22-600">Disable Data Collection</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            onClick={() => setFieldValue("disable_data_collection", true)}
            className={`align-btn ${
              values.disable_data_collection && "active"
            }`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("disable_data_collection", false)}
            className={`align-btn ${
              !values.disable_data_collection && "active"
            }`}
          >
            No
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ButtonFormate;
