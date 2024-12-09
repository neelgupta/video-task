import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./AnswerTab.scss";
import OutlineCheck from "../../../../User/MyOrganization/pages/Notifications/OutlineCheck";
import { TextInput } from "../../../../../components";
import { Button } from "react-bootstrap";
import OpenEndedFormate from "./FormateComponent/OpenEndedFormate";
import ButtonFormate from "./FormateComponent/ButtonFormate";
import FileUploadFormate from "./FormateComponent/FileUploadFormate";
import CalendarFormate from "./FormateComponent/CalendarFormate";
import MultipleChoiceFormate from "./FormateComponent/MultipleChoiceFormate";
import { Formik } from "formik";
import * as Yup from "yup";
const AnsFormate = [
  {
    label: "Open Ended",
    value: "open-ended",
  },
  {
    label: "Multiple Choice",
    value: "multiple-choice",
  },
  {
    label: "Button",
    value: "button",
  },
  {
    label: "File Upload",
    value: "file-upload",
  },
  {
    label: "Calendar",
    value: "calendar",
  },
];

const handelFrom = (type) => {
  if (type === "open-ended") {
    return {
      validation: {
        options: Yup.array()
          .min(1, "Select at least one option")
          .required("This field is required"),
        timeLimit: Yup.string().required("Time limit is required"),
        delay: Yup.string()
          .matches(/^\d+ Sec$/, "Delay must be in 'X Sec' format")
          .required("Delay is required"),
      },
      defaultValue: {
        options: ["Audio", "Video", "Text"],
        timeLimit: "",
        delay: "10 Sec",
      },
    };
  }
  if (type === "button") {
    return {
      defaultValue: {
        buttonTitle: "",
        delay: "10 Sec",
        disableDataCollection: true,
      },
      validation: {
        buttonTitle: Yup.string()
          .required("Button title is required")
          .min(3, "Title must be at least 3 characters"),
        delay: Yup.string()
          .matches(/^\d+ Sec$/, "Delay must be in 'X Sec' format")
          .required("Delay is required"),
        disableDataCollection: Yup.boolean().required(
          "Disable Data Collection is required"
        ),
      },
    };
  }
  if (type === "file-upload") {
    return {
      defaultValue: {
        title: "Resume Video",
        description: "",
        disableDataCollection: true,
      },
      validation: {
        title: Yup.string()
          .required("Title is required")
          .min(3, "Title must be at least 3 characters"),
        description: Yup.string()
          .required("Description is required")
          .min(10, "Description must be at least 10 characters"),
        disableDataCollection: Yup.boolean().required(
          "Disable Data Collection is required"
        ),
      },
    };
  }
  if (type === "calendar") {
    return {
      defaultValue: {
        schedulingLink: "",
        schedulingTool: null,
        delay: "10 Sec",
        disableDataCollection: true, // Default value
      },
      validation: {
        schedulingLink: Yup.string().required("Scheduling link is required"),
        schedulingTool: Yup.string().required("Scheduling tool is required"),
        delay: Yup.string()
          .matches(/^\d+ Sec$/, "Delay must be in 'X Sec' format")
          .required("Delay is required"),
        disableDataCollection: Yup.boolean().required(
          "Disable Data Collection is required"
        ),
      },
    };
  }
  if (type === "multiple-choice") {
    return {
      defaultValue: {
        options: [""],
        allowMultipleSelections: false,
        randomize: false,
        disableDataCollection: false,
        displayTotalChoices: false,
      },
      validation: {
        options: Yup.array()
          .of(Yup.string().trim().required("Option cannot be empty"))
          .min(1, "At least one option is required"),
      },
    };
  }
  return { defaultValue: {}, validation: {} };
};

function AnswerTab() {
  const [ansFormate, setAnsFormate] = useState("open-ended");
  const [validationSchema, setValidationSchema] = useState(null);
  const [initialFormValues, setFormatDetailsForm] = useState(null);

  useEffect(() => {
    if (ansFormate) {
      const form = handelFrom(ansFormate);
      setValidationSchema({
        ...form.validation,
        contactForm: Yup.boolean().required("Contact form is required"),
      });
      setFormatDetailsForm({ ...form.defaultValue, contactForm: false });
    }
  }, [ansFormate]);

  return (
    <div className="AnswerTab-container pe-20 ps-20">
      <div className="title">Answer Format</div>
      <div className="mt-20">
        <div className="mb-20">
          <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
            Select answer type :
          </div>
          <div className="wp-100">
            <Select
              style={{}}
              value={AnsFormate.find((o) => o.value === ansFormate)}
              options={AnsFormate}
              onChange={(select) => {
                setAnsFormate(select.value);
              }}
            />
          </div>
        </div>

        <div
          className="wp-100 pt-20 pb-30"
          style={{ borderTop: "2px solid #ECECEE" }}
        >
          {validationSchema && initialFormValues && (
            <Formik
              enableReinitialize
              initialValues={initialFormValues}
              validationSchema={Yup.object().shape({ ...validationSchema })}
              onSubmit={(values) => {
                console.log("Form values:", values);
              }}
            >
              {({ values, setFieldValue, submitForm, errors }) => (
                <>
                  {ansFormate === "open-ended" && (
                    <OpenEndedFormate
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  )}
                  {ansFormate === "button" && (
                    <ButtonFormate
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  )}
                  {ansFormate === "file-upload" && (
                    <FileUploadFormate
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  )}
                  {ansFormate === "calendar" && (
                    <CalendarFormate
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  )}
                  {ansFormate === "multiple-choice" && (
                    <MultipleChoiceFormate
                      values={values}
                      setFieldValue={setFieldValue}
                      errors={errors}
                    />
                  )}
                  <div
                    className="wp-100 pt-20"
                    style={{ borderTop: "2px solid #ECECEE" }}
                  >
                    <div
                      className="wp-100"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="text-22-600">Contact Form</div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div
                          onClick={() => {
                            setFieldValue("contactForm", true);
                          }}
                          className={`align-btn ${
                            values.contactForm && "active"
                          }`}
                        >
                          Yes
                        </div>
                        <div
                          onClick={() => {
                            setFieldValue("contactForm", false);
                          }}
                          className={`align-btn ${
                            !values.contactForm && "active"
                          }`}
                        >
                          No
                        </div>
                      </div>
                    </div>

                    <div className="mb-20 " style={{ color: "#7B5AFF" }}>
                      <span className="text-14-400 EditContactLink">
                        Edit contact Form?
                      </span>
                    </div>

                    <div className="pt-30">
                      <Button
                        className="text-18-600 wp-100 "
                        style={{
                          background:
                            "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                          border: "none",
                          padding: "10px 0px",
                        }}
                        type="submit"
                        onClick={submitForm}
                      >
                        Done
                        {/* {isCreate && <Spinner className="ms-10" size="sm" />} */}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          )}

          {/* {ansFormate === "button" && <ButtonFormate />}
          {ansFormate === "file-upload" && <FileUploadFormate />}
          {ansFormate === "calendar" && <CalendarFormate />}
          {ansFormate === "multiple-choice" && <MultipleChoiceFormate />} */}
        </div>
      </div>
    </div>
  );
}

export default AnswerTab;
