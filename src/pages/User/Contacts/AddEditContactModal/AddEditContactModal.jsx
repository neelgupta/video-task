import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./AddEditContactModal.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
const AddEditContactModal = ({
  show,
  handleClose,
  isEdit,
  editContact,
  fetchContact,
  selectedOrganizationId,
}) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const [validationSchema, setValidationSchema] = useState({
    name: Yup.string(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
    productName: Yup.string(),
  });
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    productName: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    console.log("isEdit", isEdit);
    console.log("editContact", editContact);
    if (isEdit && editContact) {
      setInitialValues({
        name: editContact?.contact_name || "",
        email: editContact?.contact_email || "",
        phone: editContact?.phone_number || "",
        productName: editContact?.product_name || "",
      });
    }
  }, [isEdit, editContact]);

  const handleSubmitForm = async (value) => {
    setIsSubmit(true);
    try {
      const req = {
        organization_id: selectedOrganizationId,
        contact_email: value.email,
        ...(value.name && { contact_name: value.name }),
        ...(value.phone && { phone_number: value.phone }),
        ...(value.productName && { product_name: value.productName }),
        ...(isEdit ? { contact_id: editContact._id } : {}),
      };
      const res = await api?.[isEdit ? "put" : "post"](
        isEdit ? "contact/update" : "contact/add",
        req
      );
      if ([200, 201].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        fetchContact();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    handleClose();
    setIsSubmit(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="editContactDetailsContainer"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-24-700 text-center" style={{ color: "#1B2559" }}>
            {isEdit ? "Edit Contact Details" : "Add Contact Details"}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bodyContainer">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={(values, { resetForm }) => {
              handleSubmitForm(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-items">
                  <div className="text-16-500 mb-5">Email (Required):</div>
                  <div className="flow-ai-input">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="ps-10"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>
                </div>

                <div className="form-items">
                  <div className="text-16-500 mb-5">Name:</div>
                  <div className="flow-ai-input">
                    <Field
                      type="text"
                      name="name"
                      className=""
                      placeholder="Enter Name"
                    />
                    <ErrorMessage
                      name="name"
                      className="ps-10"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>
                </div>

                <div className="form-items">
                  <div className="text-16-500 mb-5">Phone Number:</div>
                  <div className="flow-ai-input">
                    <Field
                      type="text"
                      name="phone"
                      placeholder="Enter Phone Number"
                    />
                    <ErrorMessage
                      name="phone"
                      className="ps-10"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>
                </div>

                <div className="form-items">
                  <div className="text-16-500 mb-5">Product Name:</div>
                  <div className="flow-ai-input">
                    <Field
                      type="text"
                      name="productName"
                      placeholder="Enter Product Name"
                    />
                    <ErrorMessage
                      name="productName"
                      className="ps-10"
                      component="div"
                      style={{ color: "red", fontSize: "12px" }}
                    />
                  </div>
                </div>

                <div
                  className="wp-100 mt-40"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "20px",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    className="px-40"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-40"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: `linear-gradient(to right , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
                      border: "none",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {isEdit ? "Update" : "Create"}
                    {isSubmit && (
                      <Spinner size="sm" color="white" className="ms-10" />
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditContactModal;
