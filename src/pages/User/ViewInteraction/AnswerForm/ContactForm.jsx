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
import LoaderCircle from "../../../../components/layouts/LoaderCircle/LoaderCircle";
import { useTranslation } from "react-i18next";
function ContactForm({ onNext, node, isPost, flowStyle }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [contactFormData, setContactFormData] = useState({});
  const [form, setForm] = useState({
    email: "",
  });
  const [validationSchema, setValidationSchema] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    fetchContactForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.interaction_id]);

  useEffect(() => {
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
        ? Yup.string().required(t("contactForm.error_message.name_required"))
        : Yup.string(),
      email: contactFormData?.is_email
        ? Yup.string()
            .email(t("contactForm.error_message.email_valid"))
            .required(t("contactForm.error_message.email_required"))
        : Yup.string(),
      phone: contactFormData?.is_phone
        ? Yup.number()
            .typeError(t("contactForm.error_message.phone_valid"))
            .required(t("contactForm.error_message.phone_required"))
        : Yup.number(),
      product: contactFormData?.is_product
        ? Yup.string().required(t("contactForm.error_message.product_required"))
        : Yup.string(),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactFormData]);

  const fetchContactForm = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(
        `interactions/get-interaction-contact/${node.interaction_id}`
      );
      if (res.status === 200) {
        setContactFormData(res?.data?.response?.contact_details || {});
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(true);
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
    <div className="ContactForm-container" style={{ background: "white" }}>
      {isLoad && (
        <>
          <div
            className="text-20-500 px-35"
            style={{
              color: flowStyle.primary_color,
              fontFamily: `${flowStyle.font}`,
            }}
          >
            {t("contactForm.contact_header_text")}
          </div>
          <form onSubmit={formik.handleSubmit} className="ContactForm">
            <div className="form">
              {contactFormData?.is_name && (
                <div className="mb-20 InputBox">
                  <label
                    className="text-14-500 mb-5"
                    style={{
                      color: "#000",
                      fontFamily: `${flowStyle.font}`,
                    }}
                  >
                    {t("contactForm.name")}:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("contactForm.name_placeholder")}
                    className="form-control"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div
                      className="error-text"
                      style={{ fontFamily: `${flowStyle.font}` }}
                    >
                      {formik.errors.name}
                    </div>
                  )}
                </div>
              )}

              {contactFormData?.is_email && (
                <div className="mb-20 InputBox">
                  <label
                    className="text-14-500 mb-5"
                    style={{
                      color: "#000",
                      fontFamily: `${flowStyle.font}`,
                    }}
                  >
                    {t("contactForm.email")}:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("contactForm.email_placeholder")}
                    className="form-control"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div
                      className="error-text"
                      style={{ fontFamily: `${flowStyle.font}` }}
                    >
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              )}

              {contactFormData?.is_phone && (
                <div className="mb-20 InputBox">
                  <label
                    className="text-14-500 mb-5"
                    style={{
                      color: "#000",
                      fontFamily: `${flowStyle.font}`,
                    }}
                  >
                    {t("contactForm.phone")}:
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("contactForm.phone_placeholder")}
                    className="form-control"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div
                      className="error-text"
                      style={{ fontFamily: `${flowStyle.font}` }}
                    >
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
              )}

              {contactFormData?.is_product && (
                <div className="mb-20 InputBox">
                  <label
                    className="text-14-500 mb-5"
                    style={{
                      color: "#000",
                      fontFamily: `${flowStyle.font}`,
                    }}
                  >
                    {t("contactForm.product")} :
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={formik.values.product}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("contactForm.product_placeholder")}
                    className="form-control"
                  />
                  {formik.touched.product && formik.errors.product && (
                    <div
                      className="error-text"
                      style={{ fontFamily: `${flowStyle.font}` }}
                    >
                      {formik.errors.product}
                    </div>
                  )}
                </div>
              )}

              {contactFormData?.is_note && (
                <ul>
                  <li
                    className="text-16-500"
                    style={{ fontFamily: `${flowStyle.font}` }}
                  >
                    {contactFormData?.note || ""}
                  </li>
                </ul>
              )}
            </div>

            <div id="ans-btn-group">
              <button
                type="submit"
                className="next-btn"
                style={{ background: flowStyle.secondary_color }}
              >
                {isPost ? (
                  <Spinner size="lg" color="#888888" />
                ) : (
                  <img
                    src={icons.top_right_arrow}
                    alt=""
                    style={{
                      transform: "rotate(45deg)",
                      filter: creteImgFilter("#000"),
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
        </>
      )}
      {!isLoad && (
        <div className="loader-box">
          <div>
            <LoaderCircle />
          </div>
          <div
            className="text-24-500 mt-50"
            style={{ color: "#1B2559", fontFamily: `${flowStyle.font}` }}
          >
            {t("contactForm.lode_text")}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
