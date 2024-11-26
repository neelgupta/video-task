import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./EditDetailsModal.scss";
import { api } from "../../../../services/api";
import { showSuccess, throwError } from "../../../../store/globalSlice";
import { useDispatch } from "react-redux";

const EditDetailsModal = ({ show, handleClose, userData, getProfile }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    user_name: "",
    email: "",
  });
  const [isPost, setIsPost] = useState(false);

  useEffect(() => {
    setForm({
      user_name: userData.user_name,
      email: userData.email,
    });
  }, [userData]);

  const handleSubmit = async () => {
    setIsPost(true);
    try {
      const res = await api.put("user/update-profile", form);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        getProfile();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsPost(false);
    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="editDetailsModalContainer"
    >
      <Modal.Header closeButton>
        <div className="text-20-600" style={{ color: "#1B2559" }}>
          Edit Personal Details
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="form-group">
            <div className="text-11-600 mb-5">User Name</div>
            <div>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter Your User Name"
                value={form.user_name}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
                onChange={(e) => {
                  setForm({ ...form, user_name: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="form-group mt-20">
            <div className="text-11-600 mb-5">Registered Mail</div>
            <div>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter Your Registered Mail"
                value={form.email}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            style={{ width: "150px" }}
            variant="secondary"
            onClick={() => {
              handleClose();
              setForm({
                user_name: "",
                email: "",
              });
            }}
            className="text-14-500"
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            className="text-14-500 f-center"
            style={{
              background: `#7B5AFF`,
              border: "none",
              color: "white",
              width: "150px",
            }}
            disabled={isPost}
          >
            Update
            {isPost && <Spinner size="sm" className="ms-10" />}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDetailsModal;
