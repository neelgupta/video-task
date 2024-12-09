import React, { useState } from "react";
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

function AnswerTab() {
  const [ansFormate, setAnsFormate] = useState("open-ended");
  return (
    <div className="AnswerTab-container pe-20 ps-20">
      <div className="title">Answer Format</div>
      <div className="mt-20">
        <div className="mb-20">
          <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
            Select answer type:
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
          className="wp-100 pt-20"
          style={{ borderTop: "2px solid #ECECEE" }}
        >
          {ansFormate === "open-ended" && <OpenEndedFormate />}
          {ansFormate === "button" && <ButtonFormate />}
          {ansFormate === "file-upload" && <FileUploadFormate />}
          {ansFormate === "calendar" && <CalendarFormate />}
          {ansFormate === "multiple-choice" && <MultipleChoiceFormate />}
        </div>

        <div
          className="wp-100 pt-20"
          style={{ borderTop: "2px solid #ECECEE" }}
        >
          <div
            className="wp-100"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="text-22-600">Contact Form</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div className={`align-btn active`}>Yes</div>
              <div className={`align-btn`}>No</div>
            </div>
          </div>

          <div
            className="mb-20 text-14-400 EditContactLink"
            style={{ color: "#7B5AFF" }}
          >
            Edit contact Form?
          </div>

          <div className="pt-30">
            <Button
              className="text-18-600 wp-100 "
              style={{
                background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                border: "none",
                padding: "10px 0px",
              }}
            >
              Done
              {/* {isCreate && <Spinner className="ms-10" size="sm" />} */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerTab;
