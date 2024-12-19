import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./AnswerTab.scss";
import { Button, Spinner } from "react-bootstrap";
import OpenEndedFormate from "./FormateComponent/OpenEndedFormate";
import ButtonFormate from "./FormateComponent/ButtonFormate";
import FileUploadFormate from "./FormateComponent/FileUploadFormate";
import CalendarFormate from "./FormateComponent/CalendarFormate";
import MultipleChoiceFormate from "./FormateComponent/MultipleChoiceFormate";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../../store/globalSlice";
import { api } from "../../../../../services/api";
import ContactForm from "./ContactForm";
import DropdownOption from "../../../../../components/inputs/DropdownOption/DropdownOption";
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
    label: "Calender",
    value: "calender",
  },
];

const handelFrom = (type, data) => {
  if (type === "open-ended") {
    return {
      validation: {
        options: Yup.array()
          .min(1, "Select at least one option")
          .required("This field is required"),
        time_limit: Yup.string().required("Time limit is required"),
        delay: Yup.string()
          .matches(/^\d+$/, "Delay must be a number") // Ensures only numeric characters
          .required("Delay is required"),
      },
      defaultValue: {
        options: data?.options ? data?.options : ["Audio", "Video", "Text"],
        time_limit: data?.time_limit || "10",
        delay: data?.delay || 0,
      },
    };
  }
  if (type === "button") {
    return {
      defaultValue: {
        button_title: data?.button_title || "",
        delay: data?.delay || "0",
        disable_data_collection: data?.disable_data_collection || false,
      },
      validation: {
        button_title: Yup.string()
          .required("Button title is required")
          .min(3, "Title must be at least 3 characters"),
        delay: Yup.string()
          .matches(/^\d+$/, "Delay must be a number") // Ensures only numeric characters
          .required("Delay is required"),
        disable_data_collection: Yup.boolean().required(
          "Disable Data Collection is required"
        ),
      },
    };
  }
  if (type === "file-upload") {
    return {
      defaultValue: {
        title: data?.title || "",
        description: data?.description || "",
        disable_data_collection: data?.disable_data_collection || false,
      },
      validation: {
        title: Yup.string()
          .required("Title is required")
          .min(3, "Title must be at least 3 characters"),
        description: Yup.string()
          .required("Description is required")
          .min(10, "Description must be at least 10 characters"),
        disable_data_collection: Yup.boolean().required(
          "Disable Data Collection is required"
        ),
      },
    };
  }
  if (type === "calender") {
    return {
      defaultValue: {
        scheduling_link: data?.scheduling_link || "",
        scheduling_tool: data?.scheduling_tool || null,
        delay: data?.delay || "0",
        disable_data_collection: data?.disable_data_collection || false, // Default value
      },
      validation: {
        scheduling_link: Yup.string().required("Scheduling link is required"),
        scheduling_tool: Yup.string().required("Scheduling tool is required"),
        delay: Yup.string()
          .matches(/^\d+$/, "Delay must be a number") // Ensures only numeric characters
          .required("Delay is required"),
        disable_data_collection: Yup.boolean().required(
          "Disable Data Collection is required"
        ),
      },
    };
  }
  if (type === "multiple-choice") {
    return {
      defaultValue: {
        choices: data?.choices || [""],
        allow_multiple: data?.allow_multiple || false,
        randomize: data?.randomize || false,
        disable_data_collection: data?.disable_data_collection || false,
        display_total_choices: data?.display_total_choices || false,
      },
      validation: {
        choices: Yup.array()
          .of(Yup.string().trim().required("Option cannot be empty"))
          .min(1, "At least one option is required"),
      },
    };
  }
  return { defaultValue: {}, validation: {} };
};

function AnswerTab({ onClose }) {
  const dispatch = useDispatch();
  const {
    queModelConfig: { nodeData },
  } = useSelector((state) => state.global);
  const [ansFormate, setAnsFormate] = useState("");
  const [validationSchema, setValidationSchema] = useState(null);
  const [initialFormValues, setFormatDetailsForm] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openContactForm, setOpenContactForm] = useState(false);

  useEffect(() => {
    if (ansFormate && nodeData) {
      const format = nodeData?.answer_format;
      const form = handelFrom(ansFormate, format);
      setValidationSchema({
        ...form.validation,
        contact_form: Yup.boolean().required("Contact form is required"),
      });
      setFormatDetailsForm({
        ...form.defaultValue,
        contact_form: format?.contact_form,
      });
    }
  }, [ansFormate, nodeData]);

  useEffect(() => {
    setAnsFormate(nodeData?.answer_type || "open-ended");
  }, [nodeData]);

  const handleSubmit = async (value) => {
    setIsUpdate(true);
    try {
      const req = {
        node_id: nodeData._id,
        answer_type: ansFormate,
        answer_format: { ...value },
      };
      const res = await api.put("interactions/update-answer-format", req);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        onClose();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsUpdate(false);
  };

  return (
    <div className="AnswerTab-container pe-20 ps-20">
      <ContactForm
        show={openContactForm}
        handleClose={() => setOpenContactForm(false)}
      />
      <div className="title">Answer Format</div>
      <div className="mt-20" style={{ minHeight: "500px" }}>
        <div className="mb-20">
          <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
            Select answer type :
          </div>
          <div className="wp-100">
            <DropdownOption
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
                handleSubmit(values);
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
                  {ansFormate === "calender" && (
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
                            setFieldValue("contact_form", true);
                          }}
                          className={`align-btn ${
                            values.contact_form && "active"
                          }`}
                        >
                          Yes
                        </div>
                        <div
                          onClick={() => {
                            setFieldValue("contact_form", false);
                          }}
                          className={`align-btn ${
                            !values.contact_form && "active"
                          }`}
                        >
                          No
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="contact_form"
                      component="div"
                      className="error-message"
                    />
                    <div className="mb-20 " style={{ color: "#7B5AFF" }}>
                      <span
                        className="text-14-400 EditContactLink"
                        onClick={() => setOpenContactForm(true)}
                      >
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
                        disabled={isUpdate}
                        onClick={submitForm}
                      >
                        Done
                        {isUpdate && <Spinner className="ms-10" size="sm" />}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerTab;
