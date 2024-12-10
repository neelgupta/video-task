import { ErrorMessage, Field } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

const schedulingOption = [
  {
    label: "Calendly",
    value: "Calendly",
  },
  {
    label: "HubSpot Meetings",
    value: "HubSpot Meetings",
  },
  {
    label: "Acuity Scheduling",
    value: "Acuity Scheduling",
  },
  {
    label: "OnceHub",
    value: "OnceHub",
  },
];
function CalendarFormate({ setFieldValue, values, errors }) {
  return (
    <Form id="CalendarFormate">
      {/* Scheduling Link */}
      <div className="mb-20">
        <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
          Provide your scheduling link:
        </div>
        <div className="wp-100 InputBox">
          <Field
            type="text"
            name="schedulingLink"
            placeholder="Enter the link"
            className={`form-control`}
          />
          <ErrorMessage
            name="schedulingLink"
            component="div"
            className="error-message"
          />
        </div>
      </div>

      {/* Scheduling Tool */}
      <div className="mb-20">
        <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
          Opt for your scheduling tool:
        </div>
        <div className="wp-100">
          <Select
            options={schedulingOption}
            value={schedulingOption.find(
              (x) => x.value === values.schedulingTool
            )}
            onChange={(option) => setFieldValue("schedulingTool", option.value)}
            placeholder="Select a tool"
          />
          <ErrorMessage
            name="schedulingTool"
            component="div"
            className="error-message"
          />
        </div>
      </div>

      {/* Delay */}
      <div className="mb-20">
        <div className={`text-12-600 mb-5 `} style={{ color: "#666666" }}>
          Delay for options to show :
        </div>
        <div className="wp-40 InputBox">
          <Field type="text" name="delay" className={`form-control`} />
        </div>
        <ErrorMessage name="delay" component="div" className="error-message" />
      </div>

      {/* Disable Data Collection */}
      <div className="wp-100 mb-20">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-22-600">Disable Data Collection</div>
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
        <ErrorMessage
          name="disableDataCollection"
          component="div"
          className="error-message"
        />
      </div>
    </Form>
  );
}

export default CalendarFormate;
