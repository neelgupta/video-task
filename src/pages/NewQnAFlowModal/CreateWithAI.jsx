import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import "./CreateWithAI.scss";
import Select from "react-select";

const options = [
  { value: "english", label: "English" },
  { value: "dutch", label: "Dutch" },
  { value: "spanish", label: "Spanish" },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  collectContactDetails: Yup.string().required("Please select an option"),
  language: Yup.string().required("Please select a language"),
  folder: Yup.string().required("Please select a folder"),
});

const CreateWithAI = ({ show, handleClose }) => {
  const [isContactDetailsChecked, setIsContactDetailsChecked] = useState(false);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="createWithAIContainer"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-24-700 text-center" style={{ color: "#1B2559" }}>
            Create New Flōw AI
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bodyContainer">
          <div className="form-items">
            <div className="text-16-500 mb-5">Title</div>
            <div>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Name your QnAFlow"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
          <div className="form-items">
            <div className="text-16-500 mb-15">Collect Contact Details</div>
            <div className="d-flex gap-3 customChecksYesNoContainer">
              <div
                onClick={() => setIsContactDetailsChecked(true)}
                className={isContactDetailsChecked && "active"}
              >
                Yes
              </div>
              <div
                onClick={() => setIsContactDetailsChecked(false)}
                className={!isContactDetailsChecked && "active"}
              >
                No
              </div>
            </div>
          </div>
          <div className="form-items">
            <div className="text-16-500 mb-5">Language</div>
            <div>
              <Select options={options} />
            </div>
          </div>
          <div className="form-items">
            <div className="text-16-500 mb-5">Folder</div>
            <div>
              <Select options={options} />
            </div>
          </div>
        </div>
        <div className="buttonContainer">
          <Button>Create QnAFlow</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateWithAI;
