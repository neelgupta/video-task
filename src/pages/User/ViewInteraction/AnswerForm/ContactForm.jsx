import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import "./AnswerForm.scss";
import { handelCatch, throwError } from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
import { Spinner } from "react-bootstrap";

function ContactForm({ onNext, node, isPost }) {
  console.log("node", node);
  const dispatch = useDispatch();
  const [contactFormData, setContactFormData] = useState({});
  const [form, setForm] = useState({
    email: "",
  });

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

  // const
  return (
    <div className="ContactForm-container">
      <div className="text-20-600 mb-30 " style={{ color: "#8000ff" }}>
        Before you go, please leave your contact details so we can get back to
        you...
      </div>
      <div className="ContactForm">
        <div className="form">
          {contactFormData?.is_name && (
            <div className="mb-20">
              <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
                name :
              </div>
              <div className="wp-100 InputBox">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter name"
                  className="form-control"
                />
              </div>
            </div>
          )}

          {contactFormData?.is_email && (
            <div className="mb-20">
              <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
                email :
              </div>
              <div className="wp-100 InputBox">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  name="email"
                  placeholder="Enter email"
                  className="form-control"
                />
              </div>
            </div>
          )}
          {contactFormData?.is_phone && (
            <div className="mb-20">
              <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
                Phone number :
              </div>
              <div className="wp-100 InputBox">
                <input
                  type="number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  name="phone_number"
                  placeholder="Enter phone number"
                  className="form-control"
                />
              </div>
            </div>
          )}
          {contactFormData?.is_product && (
            <div className="mb-20">
              <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
                Product name :
              </div>
              <div className="wp-100 InputBox">
                <input
                  type="text"
                  value={form.product}
                  onChange={(e) =>
                    setForm({ ...form, product: e.target.value })
                  }
                  name="product_name"
                  placeholder="Enter product name"
                  className="form-control"
                />
              </div>
            </div>
          )}

          {contactFormData?.is_note && (
            <ul>
              <li className="text-16-500">{contactFormData?.note || ""}</li>
            </ul>
          )}
        </div>
        <div id="ans-btn-group">
          <button
            className="next-btn"
            onClick={() => {
              if (!isPost) {
                onNext();
              }
            }}
          >
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
          <button className="cancel-btn" onClick={() => {}}>
            <img
              src={icons.closeSvg}
              alt=""
              style={{ filter: creteImgFilter("#ffffff") }}
              className="fit-image w-12 pb-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
