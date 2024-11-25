import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { icons } from "../../../../../utils/constants";
import { api } from "../../../../../services/api";
import { useDispatch } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";

const AddressForm = ({
  onHide,
  show,
  isEdit,
  type,
  selectedOrganizationId,
  editData,
}) => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const initialValues = {
    apartment_number: editData.apartment_number || "",
    Street: editData.street_name || "",
    State: editData.state || "",
    PINCode: editData.pinCode || "",
    Country: editData.country || "",
    Email: editData.email || "",
  };

  const validationSchema = Yup.object({
    apartment_number: Yup.string().required("Required"),
    Street: Yup.string().required("Required"),
    State: Yup.string().required("Required"),
    PINCode: Yup.number().required("Required").typeError("Must be a number"),
    Country: Yup.string().required("Required"),
    Email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onSubmit = async (values) => {
    setIsAdd(true);
    try {
      const req = {
        apartment_number: values.apartment_number,
        street_name: values.Street,
        state: values.State,
        pinCode: values.PINCode,
        country: values.Country,
        email: values.Email,
        ...(isEdit
          ? { address_id: editData._id }
          : { address_type: type, organization_id: selectedOrganizationId }),
      };
      console.log("req", req);
      const res = await api[isEdit ? "put" : "post"](
        isEdit ? "user/update-address" : "user/add-address",
        req
      );
      console.log("res", res);
      if ([201, 200].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        onHide(true);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsAdd(false);
  };

  return (
    <Modal
      onHide={() => onHide(false)}
      show={show}
      centered
      className="AddressForm-form"
      style={{ borderRadius: "10px" }}
    >
      <Modal.Body>
        <div style={{ width: "500px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-24-700" style={{ color: "#1B2559" }}>
              {isEdit ? "Edit" : "Add"} {type} Address
            </div>
            <div className="w-20 pointer" onClick={() => onHide(false)}>
              <img src={icons.close} alt="" className="fit-image" />
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <div className="mt-20">
                  <div
                    className="text-12-500 ps-5 pb-5"
                    style={{ color: "#666666", textAlign: "start" }}
                  >
                    Apartment Number:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="text"
                      name="apartment_number"
                      placeholder="Apartment Number"
                      id="apartment_number"
                    />
                    <ErrorMessage
                      name="apartment_number"
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
                    Street Name:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="text"
                      name="Street"
                      id="Street"
                      placeholder="Street Name"
                    />
                    <ErrorMessage
                      name="Street"
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
                    State:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="text"
                      name="State"
                      id="State"
                      placeholder="State"
                    />
                    <ErrorMessage
                      name="State"
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
                    PIN Code:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="text"
                      name="PINCode"
                      id="PINCode"
                      placeholder="PIN Code"
                    />
                    <ErrorMessage
                      name="PINCode"
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
                    Country:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="text"
                      name="Country"
                      id="Country"
                      placeholder="Country"
                    />
                    <ErrorMessage
                      name="Country"
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
                    Email:
                  </div>
                  <div>
                    <Field
                      className="input wp-100"
                      type="email"
                      name="Email"
                      id="Email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="Email"
                      component="div"
                      className="error-message"
                    />
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
                    className="text-14-500 w-150 p-10"
                    onClick={() => onHide(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{
                      background:
                        "linear-gradient(91.9deg, #7B5BFF -2.22%, #B3A1FF 101.51%)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    className="text-14-500 w-150 p-10 ms-10"
                    disabled={isAdd}
                  >
                    {isAdd && (
                      <Spinner animation="border" size="sm" className="me-10" />
                    )}
                    {isEdit ? "Update" : "Create"}
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

export default AddressForm;
