import { ErrorMessage, Field } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import DropdownOption from "../../../../../../components/inputs/DropdownOption/DropdownOption";

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
            name="scheduling_link"
            placeholder="Enter the link"
            className={`form-control`}
          />
          <ErrorMessage
            name="scheduling_link"
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
          <DropdownOption
            options={schedulingOption}
            value={schedulingOption.find(
              (x) => x.value === values.scheduling_tool
            )}
            onChange={(option) =>
              setFieldValue("scheduling_tool", option.value)
            }
            placeholder="Select a tool"
          />
          <ErrorMessage
            name="scheduling_tool"
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

export default CalendarFormate;
