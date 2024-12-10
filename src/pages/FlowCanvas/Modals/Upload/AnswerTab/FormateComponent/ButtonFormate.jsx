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
            name="buttonTitle"
            placeholder="Navigate to"
            className={`form-control`}
          />
          <ErrorMessage
            className="error-message"
            name="buttonTitle"
            component="div"
          />
        </div>
      </div>

      {/* Delay for Options to Show */}
      <div className="mb-20">
        <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
          Delay for options to show :
        </div>
        <div className="wp-40 InputBox">
          <Field type="text" name="delay" className={`form-control`} />
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
            onClick={() => setFieldValue("disableDataCollection", true)}
            className={`align-btn ${values.disableDataCollection && "active"}`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("disableDataCollection", false)}
            className={`align-btn ${!values.disableDataCollection && "active"}`}
          >
            No
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ButtonFormate;
