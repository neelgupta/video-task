import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import "./AnswerForm.scss";
import { handelCatch, throwError } from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
import { Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
function ContactForm({ onNext, node, isPost }) {
  console.log("node", node);
  const dispatch = useDispatch();
  const [contactFormData, setContactFormData] = useState({});
  const [form, setForm] = useState({
    email: "",
  });
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    fetchContactForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.interaction_id]);

  useEffect(() => {
    console.log("contactFormData;", contactFormData);
    const setFormData = form || {};
    if (contactFormData.is_name) {
      setFormData["name"] = "";
    }
    if (contactFormData.is_phone) {
      setFormData["phone"] = "";
    }
    if (contactFormData.is_product) {
      setFormData["product"] = "";
    }

    setValidationSchema({
      name: contactFormData?.is_name
        ? Yup.string().required("Name is required")
        : Yup.string(),
      email: contactFormData?.is_email
        ? Yup.string()
            .email("Invalid email format")
            .required("Email is required")
        : Yup.string(),
      phone: contactFormData?.is_phone
        ? Yup.number()
            .typeError("Invalid phone number")
            .required("Phone number is required")
        : Yup.number(),
      product: contactFormData?.is_product
        ? Yup.string().required("Product name is required")
        : Yup.string(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactFormData]);

  const fetchContactForm = async () => {
    try {
      const res = await api.get(
        `interactions/get-interaction-contact/${node.interaction_id}`
      );
      console.log("res", res);
      if (res.status === 200) {
        setContactFormData(res?.data?.response?.contact_details || {});
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const validationForm = () => {
    let valid = true;
    valid = Object.keys(form).forEach((key) => {
      if (!form[key]) {
        return false;
      }
    });
    return valid;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      product: "",
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      if (!isPost) {
        onNext(values);
      }
    },
  });
  return (
    <div className="ContactForm-container">
      <div className="text-20-600 mb-30 " style={{ color: "#8000ff" }}>
        Before you go, please leave your contact details so we can get back to
        you...
      </div>
      <form onSubmit={formik.handleSubmit} className="ContactForm">
        <div className="form">
          {contactFormData?.is_name && (
            <div className="mb-20 InputBox">
              <label className="text-12-600 mb-5" style={{ color: "#666666" }}>
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter name"
                className="form-control"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error-text">{formik.errors.name}</div>
              )}
            </div>
          )}

          {contactFormData?.is_email && (
            <div className="mb-20 InputBox">
              <label className="text-12-600 mb-5" style={{ color: "#666666" }}>
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter email"
                className="form-control"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-text">{formik.errors.email}</div>
              )}
            </div>
          )}

          {contactFormData?.is_phone && (
            <div className="mb-20 InputBox">
              <label className="text-12-600 mb-5" style={{ color: "#666666" }}>
                Phone number:
              </label>
              <input
                type="number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter phone number"
                className="form-control"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error-text">{formik.errors.phone}</div>
              )}
            </div>
          )}

          {contactFormData?.is_product && (
            <div className="mb-20 InputBox">
              <label className="text-12-600 mb-5" style={{ color: "#666666" }}>
                Product name:
              </label>
              <input
                type="text"
                name="product"
                value={formik.values.product}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter product name"
                className="form-control"
              />
              {formik.touched.product && formik.errors.product && (
                <div className="error-text">{formik.errors.product}</div>
              )}
            </div>
          )}

          {contactFormData?.is_note && (
            <ul>
              <li className="text-16-500">{contactFormData?.note || ""}</li>
            </ul>
          )}
        </div>

        <div id="ans-btn-group">
          <button type="submit" className="next-btn">
            {isPost ? (
              <Spinner size="lg" color="#888888" />
            ) : (
              <img
                src={icons.top_right_arrow}
                alt=""
                style={{
                  transform: "rotate(45deg)",
                  filter: creteImgFilter("#888888"),
                }}
                className="fit-image w-30"
              />
            )}
          </button>
          <button type="button" className="cancel-btn" onClick={() => {}}>
            <img
              src={icons.closeSvg}
              alt=""
              style={{ filter: creteImgFilter("#ffffff") }}
              className="fit-image w-12 pb-5"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
