import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { icons } from "../../../../../../utils/constants";

function MultipleChoiceFormate({ values, setFieldValue }) {
  return (
    <Form id="MultipleChoiceFormate">
      {/* Dynamic Options Input */}
      <FieldArray name="options">
        {({ push, remove }) => (
          <div className="option-input-group mb-20">
            {(values?.options || []).map((option, index) => (
              <div key={index}>
                <div className="option-input">
                  <Field
                    name={`options[${index}]`}
                    placeholder={`Enter choice ${index + 1}`}
                    className="form-control"
                  />
                  <Button
                    className="input-delete-btn"
                    onClick={() => remove(index)}
                    disabled={(values?.options || []).length === 1}
                  >
                    <img src={icons.close} alt="" className="fit-image" />
                  </Button>
                </div>
                <ErrorMessage
                  name={`options[${index}]`}
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                  className="error-message"
                />
              </div>
            ))}
            <div
              className="wp-80 fb-center"
              style={{ justifyContent: "flex-end" }}
            >
              <Button
                onClick={() => push("")}
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
        )}
      </FieldArray>

      {/* Allow Multiple Selections */}
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Allow multiple selections</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            onClick={() => setFieldValue("allowMultipleSelections", true)}
            className={`align-btn ${
              values.allowMultipleSelections ? "active" : ""
            }`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("allowMultipleSelections", false)}
            className={`align-btn ${
              !values.allowMultipleSelections ? "active" : ""
            }`}
          >
            No
          </div>
        </div>
      </div>

      {/* Randomize */}
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Randomize</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            onClick={() => setFieldValue("randomize", true)}
            className={`align-btn ${values.randomize ? "active" : ""}`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("randomize", false)}
            className={`align-btn ${!values.randomize ? "active" : ""}`}
          >
            No
          </div>
        </div>
      </div>

      {/* Disable Data Collection */}
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Disable Data Collection</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            onClick={() => setFieldValue("disableDataCollection", true)}
            className={`align-btn ${
              values.disableDataCollection ? "active" : ""
            }`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("disableDataCollection", false)}
            className={`align-btn ${
              !values.disableDataCollection ? "active" : ""
            }`}
          >
            No
          </div>
        </div>
      </div>

      {/* Display Total Choices */}
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Display total choices</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            onClick={() => setFieldValue("displayTotalChoices", true)}
            className={`align-btn ${
              values.displayTotalChoices ? "active" : ""
            }`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("displayTotalChoices", false)}
            className={`align-btn ${
              !values.displayTotalChoices ? "active" : ""
            }`}
          >
            No
          </div>
        </div>
      </div>
    </Form>
  );
}

export default MultipleChoiceFormate;
