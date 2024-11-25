import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { icons } from "../../../../../utils/constants";
import "./Team.scss";
import { api } from "../../../../../services/api";
import { useDispatch } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";

const option = [
  {
    label: "Owner",
    value: "owner",
  },
  {
    label: "Member",
    value: "member",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string()
    .matches(/^\d+$/, "Must be a number")
    .required("Phone Number is required"),
  role: Yup.object().required("Role is required"),
});
function AddEditTeam({
  isEdit,
  onHide,
  show,
  selectedOrganizationId,
  fetchList,
  editMemberData,
}) {
  const dispatch = useDispatch();
  const [isPost, setIsPost] = useState(false);

  const initialValues = {
    name: isEdit ? editMemberData.member_name : "",
    email: isEdit ? editMemberData.member_email : "",
    number: isEdit ? editMemberData.member_phone : "",
    role: isEdit
      ? option.find((o) => o.value === editMemberData.member_role)
      : "",
  };

  const handleSubmit = async (values) => {
    // handle form submission
    setIsPost(true);
    try {
      const req = {
        organization_id: selectedOrganizationId,
        member_name: values.name,
        member_email: values.email,
        member_phone: values.number,
        member_role: values.role.value,
        ...(isEdit ? { member_id: editMemberData._id } : {}),
      };
      const res = await api[isEdit ? "put" : "post"](
        isEdit ? "user/update-member" : "user/add-member",
        req
      );
      if ([200, 201].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        onHide();
        fetchList();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsPost(false);
  };
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered
      className="AddEditTeam"
      style={{ borderRadius: "10px" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Modal.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="text-24-700" style={{ color: "#1B2559" }}>
                  {isEdit ? "Edit" : "Add"} Member
                </div>
                <div className="w-20 pointer" onClick={onHide}>
                  <img src={icons.close} alt="" className="fit-image" />
                </div>
              </div>
              <div
                className="text-12-500 mt-5"
                style={{ color: "#989BA1", textAlign: "start" }}
              >
                Add new team members to collaborate and achieve your goals
                together.
              </div>
              <div>
                <div className="mt-20">
                  <div
                    className="text-12-500 ps-5 pb-5"
                    style={{ color: "#666666", textAlign: "start" }}
                  >
                    Name:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="mt-20">
                  <div
                    className="text-12-500 ps-5 pb-5"
                    style={{ color: "#666666", textAlign: "start" }}
                  >
                    Email (Required):
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="mt-20">
                  <div
                    className="text-12-500 ps-5 pb-5"
                    style={{ color: "#666666", textAlign: "start" }}
                  >
                    Phone Number:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="text"
                      name="number"
                      id="number"
                      placeholder="Phone Number"
                    />
                    <ErrorMessage
                      name="number"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="mt-20">
                  <div
                    className="text-12-500 ps-5 pb-5"
                    style={{ color: "#666666", textAlign: "start" }}
                  >
                    Role:
                  </div>
                  <div>
                    <Field name="role">
                      {({ field }) => (
                        <Select
                          {...field}
                          options={option}
                          placeholder={"Select Role"}
                          onChange={(select) => {
                            console.log("value", select);
                            setFieldValue("role", select);
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
              </div>
              <div
                className="wp-100"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginTop: "20px",
                }}
              >
                <Button
                  style={{
                    background: "#8C8E90",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  className="text-14-500 w-150 p-5"
                  onClick={onHide}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    background:
                      "linear-gradient(91.9deg, #7B5BFF -2.22%, #B3A1FF 101.51%)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  className="f-center text-14-500 w-150 p-5 ms-10"
                  type="submit"
                  disabled={isPost}
                >
                  {isEdit ? "Update" : "Create"}
                  {isPost && (
                    <Spinner animation="border" size="sm" className="ms-10" />
                  )}
                </Button>
              </div>
            </Modal.Body>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddEditTeam;
