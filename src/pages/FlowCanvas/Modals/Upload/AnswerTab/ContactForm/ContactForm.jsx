import React, { useEffect, useState } from "react";
import "./ContactForm.scss";
import { Button, Modal, Spinner } from "react-bootstrap";
import { icons } from "../../../../../../utils/constants";
import { useParams } from "react-router-dom";
import { api } from "../../../../../../services/api";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../../../store/globalSlice";
function ContactForm({ handleClose, show }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const [contactForm, setContactForm] = useState({
    is_email: true,
    is_name: true,
    is_phone: false,
    is_product: false,
    is_note: false,
    note: "",
  });

  useEffect(() => {
    if (contactForm.note) {
      setContactForm({ ...contactForm, is_note: true });
    } else {
      setContactForm({ ...contactForm, is_note: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactForm.note]);

  useEffect(() => {
    fetchContactForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async () => {
    setIsUpdate(true);
    try {
      const req = { contact_details: { ...contactForm }, interaction_id: id };
      const res = await api.put(`interactions/update-interactions`, req);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        handleClose();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsUpdate(false);
  };

  const fetchContactForm = async () => {
    try {
      const res = await api.get(`interactions/get-interaction-contact/${id}`);
      if (res.status === 200) {
        const obj = res?.data?.response?.contact_details || {};
        setContactForm({ ...obj, is_email: true });
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="ContactForm-Modal"
      size="xl"
      backdrop="static"
    >
      <div className="p-10" style={{ zIndex: "100" }}>
        <Modal.Header closeButton className="p-0 ContactForm-header">
          <div className="text-20-600" style={{ color: "#1B2559" }}>
            Contact Form
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <div className="mb-10">
              <div className="InputBox">
                <input disabled type="text" placeholder="email" />
                <div
                  className={`input-toggle-btn ${
                    contactForm.is_email && "active-toggle"
                  }`}
                >
                  Yes
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="InputBox">
                <input disabled type="text" placeholder="name" />
                <div
                  onClick={() => {
                    setContactForm({
                      ...contactForm,
                      is_name: !contactForm.is_name,
                    });
                  }}
                  className={`input-toggle-btn ${
                    contactForm.is_name && "active-toggle"
                  }`}
                >
                  Yes
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="InputBox">
                <input disabled type="text" placeholder="Phone number" />
                <div
                  onClick={() => {
                    setContactForm({
                      ...contactForm,
                      is_phone: !contactForm.is_phone,
                    });
                  }}
                  className={`input-toggle-btn ${
                    contactForm.is_phone && "active-toggle"
                  }`}
                >
                  Yes
                </div>
              </div>
            </div>
            <div className="mb-10">
              <div className="InputBox">
                <input disabled type="text" placeholder="Product name" />
                <div
                  onClick={() => {
                    setContactForm({
                      ...contactForm,
                      is_product: !contactForm.is_product,
                    });
                  }}
                  className={`input-toggle-btn ${
                    contactForm.is_product && "active-toggle"
                  }`}
                >
                  Yes
                </div>
              </div>
            </div>
            <div
              className="mt-30 mb-30"
              style={{ borderTop: "1px solid #cccccc" }}
            ></div>

            <div className="mb-20">
              <div>Note(Optional)</div>
              <div className="InputBox">
                <textarea
                  name="description"
                  placeholder="input text..."
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    padding: "10px",
                    minHeight: "100px",
                    resize: "none",
                  }}
                  value={contactForm.note}
                  onChange={(e) => {
                    setContactForm({ ...contactForm, note: e.target.value });
                  }}
                />
              </div>
            </div>

            <Button
              className="text-18-600 wp-100 "
              style={{
                background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                border: "none",
                padding: "10px 0px",
              }}
              type="submit"
              onClick={handleSubmit}
              disabled={isUpdate}
            >
              Save
              {isUpdate && <Spinner className="ms-10" size="sm" />}
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default ContactForm;
