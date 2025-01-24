import React from "react";
import OutlineCheck from "../../../../../User/MyOrganization/pages/Notifications/OutlineCheck";
import Select from "react-select";
import { ErrorMessage, Field, Form } from "formik";
import DropdownOption from "../../../../../../components/inputs/DropdownOption/DropdownOption";

const timeLimitOption = [
  { value: "5", label: "5 Sec" },
  { value: "10", label: "10 Sec" },
  { value: "15", label: "15 Sec" },
  { value: "20", label: "20 Sec" },
  { value: "25", label: "25 Sec" },
  { value: "30", label: "30 Sec" },
  { value: "35", label: "35 Sec" },
  { value: "40", label: "40 Sec" },
  { value: "45", label: "45 Sec" },
  { value: "50", label: "50 Sec" },
  { value: "55", label: "55 Sec" },
  { value: "60", label: "60 Sec" },
];
function OpenEndedFormate({ values, setFieldValue, errors }) {
  const handleCheck = (val) => {
    const updatedOptions = (values?.options || []).includes(val)
      ? (values?.options || []).filter((opt) => opt !== val)
      : [...(values?.options || []), val];
    setFieldValue("options", updatedOptions);
  };
  return (
    <Form id="OpenEndedFormate">
      <div className="mb-20">
        <div
          className="mb-10"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <OutlineCheck
            className="w-22 h-22"
            isCheck={(values?.options || []).includes("Video")}
            onChange={() => handleCheck("Video")}
          />
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Video
          </div>
        </div>
        <div
          className="mb-10"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <OutlineCheck
            className="w-22 h-22"
            isCheck={(values?.options || []).includes("Audio")}
            onChange={() => handleCheck("Audio")}
          />
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Audio
          </div>
        </div>
        <div
          className="mb-10"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <OutlineCheck
            className="w-22 h-22"
            isCheck={(values?.options || []).includes("Text")}
            onChange={() => handleCheck("Text")}
          />
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Text
          </div>
        </div>
        <ErrorMessage
          name="options"
          component="div"
          className="error-message"
        />
      </div>

      {/* Time Limit Section */}
      <div className="mb-20">
        <div style={{ color: "#666666" }} className={`text-12-600 mb-5`}>
          Time Limit for Answer:
        </div>
        <div className="wp-100">
          <DropdownOption
            name="time_limit"
            options={timeLimitOption}
            value={timeLimitOption.find((x) => x.value === values?.time_limit)}
            onChange={(option) => setFieldValue("time_limit", option.value)}
          />
        </div>
        <ErrorMessage
          name="time_limit"
          component="div"
          className="error-message"
        />
      </div>

      {/* Delay Section */}
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
    </Form>
  );
}

export default OpenEndedFormate;
