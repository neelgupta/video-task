import React from "react";
import { TextArea } from "../../../../../../components";
import { Form } from "react-bootstrap";
import { ErrorMessage, Field } from "formik";

function FileUploadFormate({ setFieldValue, values, errors }) {
  return (
    <Form id="FileUploadFormate">
      {/* Title */}
      <div className="mb-20">
        <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
          Title:
        </div>
        <div className="wp-100 InputBox">
          <Field
            type="text"
            name="title"
            placeholder="Enter title"
            className={`form-control`}
          />
          <ErrorMessage
            name="title"
            component="div"
            className="error-message"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-20 wp-100 ">
        <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
          Description:
        </div>
        <div className="InputBox">
          <Field
            as="textarea"
            name="description"
            placeholder="Description..."
            style={{
              borderRadius: "10px",
              width: "100%",
              padding: "10px",
              minHeight: "100px",
              resize: "none",
            }}
            className={`form-control`}
          />
          <ErrorMessage
            name="description"
            component="div"
            className="error-message"
          />
        </div>
      </div>

      {/* Disable Data Collection */}
      <div className="wp-100 mb-20">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-22-600">Disable Data Collection</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              onClick={() => setFieldValue("disable_data_collection", true)}
              className={`align-btn ${
                values.disable_data_collection ? "active" : ""
              }`}
            >
              Yes
            </div>
            <div
              onClick={() => setFieldValue("disable_data_collection", false)}
              className={`align-btn ${
                !values.disable_data_collection ? "active" : ""
              }`}
            >
              No
            </div>
          </div>
        </div>
        <ErrorMessage
          name="disable_data_collection"
          component="div"
          className="error-message"
        />
      </div>
    </Form>
  );
}

export default FileUploadFormate;
