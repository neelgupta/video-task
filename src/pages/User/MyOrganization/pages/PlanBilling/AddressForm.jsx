import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { icons } from "../../../../../utils/constants";
import { api } from "../../../../../services/api";
import { useDispatch } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";
import countries from "world-countries/dist/countries.json";
import DropdownOption from "../../../../../components/inputs/DropdownOption/DropdownOption";
import { State } from "country-state-city";

const countriesOption = countries.map((ele) => {
  return {
    label: ele?.name?.common + ` - (${ele?.cca2})`,
    value: ele?.name?.common,
    cca2: ele?.cca2,
  };
});

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
  const [stateOption, setStateOption] = useState([]);
  const [initialValues, setInitialValues] = useState({
    apartment_number: editData.apartment_number || "",
    Street: editData.street_name || "",
    State: null,
    PINCode: editData.pinCode || "",
    Country: null,
    Email: editData.email || "",
  });
  "initialValues", initialValues;

  const validationSchema = Yup.object({
    apartment_number: Yup.string().required("Apartment number required"),
    Street: Yup.string().required("Street required"),
    State: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
    }).required("State required"),
    PINCode: Yup.number()
      .required("PIN code required")
      .typeError("Must be a number")
      .test(
        "len",
        "PIN code must be exactly 6 digits",
        (val) => val && val.toString().length === 6
      ),
    Country: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
      cca2: Yup.string(),
    }).required("Country required"),
    Email: Yup.string()
      .email("Invalid email format")
      .required("Email required"),
  });

  useEffect(() => {
    if (editData && isEdit && countriesOption.length > 0) {
      const findCountry = countriesOption.find(
        (ele) => ele?.value === editData.country
      );
      handleCountryChange(findCountry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, editData]);

  const handleCountryChange = (selectedCountry) => {
    const countryStates = State.getStatesOfCountry(selectedCountry.cca2).map(
      (state) => ({
        value: state.isoCode,
        label: state.name,
      })
    );
    setStateOption(countryStates);
    if (isEdit) {
      setInitialValues((pre) => {
        return {
          ...pre,
          Country: selectedCountry,
          State: countryStates.find((ele) => ele.label === editData.state),
        };
      });
    }
  };

  const onSubmit = async (values) => {
    setIsAdd(true);
    try {
      const req = {
        apartment_number: values.apartment_number,
        street_name: values.Street,
        state: values.State.label,
        pinCode: values.PINCode,
        country: values.Country.value,
        email: values.Email,
        ...(isEdit
          ? { address_id: editData._id }
          : { address_type: type, organization_id: selectedOrganizationId }),
      };
      const res = await api[isEdit ? "put" : "post"](
        isEdit ? "user/update-address" : "user/add-address",
        req
      );
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
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
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
                      Country:
                    </div>
                    <div>
                      <DropdownOption
                        value={values.Country}
                        name="Country"
                        placeholder="Country"
                        options={countriesOption}
                        onChange={(select) => {
                          setFieldValue("Country", select);
                          handleCountryChange(select);
                          setFieldValue("State", null);
                        }}
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
                      State:
                    </div>
                    <div>
                      <DropdownOption
                        value={values.State}
                        name="State"
                        placeholder="State"
                        isDisabled={!values.Country}
                        options={stateOption}
                        onChange={(select) => {
                          setFieldValue("State", select);
                        }}
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
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-10"
                        />
                      )}
                      {isEdit ? "Update" : "Create"}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddressForm;
