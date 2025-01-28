import React from "react";
import { Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { icons } from "../../../../../../utils/constants";

function MultipleChoiceFormate({ values, setFieldValue, targetedNode }) {
  console.log("targetedNode", targetedNode);

  return (
    <Form id="MultipleChoiceFormate">
      <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
        Choices :
      </div>
      <FieldArray name="choices">
        {({ push, remove }) => (
          <div className="option-input-group mb-20">
            {(values?.choices || []).map((option, index) => (
              <div key={index}>
                <div className="option-input">
                  <Field
                    name={`choices[${index}].option`}
                    placeholder={`Enter choice ${index + 1}`}
                    className="form-control"
                  />
                  <Button
                    className="input-delete-btn"
                    onClick={() => {
                      remove(index);
                    }}
                    disabled={(values?.choices || []).length === 1}
                  >
                    <img src={icons.close} alt="" className="fit-image" />
                  </Button>
                </div>
                <ErrorMessage
                  name={`choices[${index}].option`}
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
                onClick={() => {
                  push({
                    index:
                      values?.choices[values?.choices.length - 1]?.index + 1,
                    option: "",
                    targetedNodeId: targetedNode?._id || null,
                    redirection_url: null,
                  });
                }}
                className="text-12-600"
                style={{
                  background: "white",
                  color: "#7B5AFF",
                  border: "none",
                  padding: "8px 10px",
                }}
                disabled={(values?.choices || []).length > 5}
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
            onClick={() => setFieldValue("allow_multiple", true)}
            className={`align-btn ${values.allow_multiple ? "active" : ""}`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("allow_multiple", false)}
            className={`align-btn ${!values.allow_multiple ? "active" : ""}`}
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

      {/* Display Total Choices */}
      <div
        className="wp-100 mb-20"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-18-600">Display total choices</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            onClick={() => setFieldValue("display_total_choices", true)}
            className={`align-btn ${
              values.display_total_choices ? "active" : ""
            }`}
          >
            Yes
          </div>
          <div
            onClick={() => setFieldValue("display_total_choices", false)}
            className={`align-btn ${
              !values.display_total_choices ? "active" : ""
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
