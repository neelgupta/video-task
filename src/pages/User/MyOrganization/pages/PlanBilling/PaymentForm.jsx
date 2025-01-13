import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./PlanBilling.scss";
import { icons } from "../../../../../utils/constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../../store/globalSlice";
import { api } from "../../../../../services/api";
import dayjs from "dayjs";
function PaymentForm({
  onHide,
  show,
  isEdit,
  selectedOrganizationId,
  editData,
  addressArray,
  fetchPaymentCard,
}) {
  const dispatch = useDispatch();
  const [selectAddress, setSelectAddress] = useState("");

  useEffect(() => {
    if (addressArray.length < 0) {
      dispatch(throwError("Please add shipping address"));
      onHide();
      return;
    }
    setSelectAddress(addressArray?.[0]?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressArray]);
  const handleSubmit = async (value) => {
    try {
      const req = {
        shipping_address_id: selectAddress,
        card_type: "Master Card",
        card_number: value.CardNumber,
        cvv: value.CVV,
        expiry_date: dayjs(value.ExpiryDate).format("YYYY-MM-DD"),
        email: value.UserEmail,
        ...(isEdit
          ? { payment_method_id: editData._id }
          : { organization_id: selectedOrganizationId }),
      };
      const res = await api[isEdit ? "put" : "post"](
        isEdit ? "user/update-payment-method" : "user/add-payment-method",
        req
      );
      if ([201, 200].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        onHide();
        fetchPaymentCard();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const formik = useFormik({
    initialValues: {
      CardType: "Master Card",
      CardNumber: isEdit ? editData.card_number : "",
      CVV: isEdit ? editData.cvv : "",
      ExpiryDate: isEdit
        ? dayjs(editData.expiry_date).format("YYYY-MM-DD")
        : "",
      UserEmail: isEdit ? editData.email : "",
    },
    validationSchema: Yup.object({
      CardNumber: Yup.string()
        .matches(/^\d{16}$/, "Card Number must be exactly 16 digits")
        .required("Card Number is required"),
      CVV: Yup.string()
        .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
        .required("CVV is required"),
      ExpiryDate: Yup.date()
        .min(new Date(), "Expiry date cannot be in the past")
        .required("Expiry Date is required"),
      UserEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered
      className="PaymentForm-form"
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
              {isEdit ? "Edit" : "Add"} Payment Details
            </div>
            <div className="w-20 pointer" onClick={onHide}>
              <img src={icons.close} alt="" className="fit-image" />
            </div>
          </div>
          <div className="select-billing-address-card">
            {addressArray.map((ele, index) => {
              return (
                <div
                  key={index}
                  className={`billing-card ${
                    selectAddress === ele._id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectAddress(ele._id);
                  }}
                >
                  <div className="details-icon w-25 h-25">
                    <img src={icons.address} alt="" className="fit-image" />
                  </div>
                  <div className="details">
                    <p className="email">{ele.email}</p>
                    <p className="country">{ele.country}</p>
                    <p className="pinCode">{ele.pinCode}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Card Type:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  value={formik.values.CardType}
                  disabled
                  name="CardType"
                  id="CardType"
                />
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Card Number:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="CardNumber"
                  id="CardNumber"
                  placeholder="Card Number"
                  value={
                    formik.values.CardNumber.length > 0
                      ? formik.values.CardNumber.match(/.{1,4}/g).join(" ")
                      : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    const result =
                      val.length > 0 ? val.split(" ").join("") : "";
                    formik.setFieldValue("CardNumber", result);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.CardNumber && formik.errors.CardNumber ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {formik.errors.CardNumber}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                CVV:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="CVV"
                  id="CVV"
                  placeholder="CVV Number"
                  value={formik.values.CVV}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.CVV && formik.errors.CVV ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {formik.errors.CVV}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Card Expiry Date:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="date"
                  name="ExpiryDate"
                  id="ExpiryDate"
                  placeholder="Card Expiry Date"
                  value={formik.values.ExpiryDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ExpiryDate && formik.errors.ExpiryDate ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {formik.errors.ExpiryDate}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                User Email:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="email"
                  name="UserEmail"
                  id="UserEmail"
                  placeholder="User Email"
                  value={formik.values.UserEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.UserEmail && formik.errors.UserEmail ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    {formik.errors.UserEmail}
                  </div>
                ) : null}
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
                onClick={onHide}
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
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentForm;
