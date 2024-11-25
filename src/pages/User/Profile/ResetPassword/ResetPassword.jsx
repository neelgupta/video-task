import React, { useState } from "react";
import styles from "./ResetPassword.module.scss";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { Button, FormControl, InputGroup, Spinner } from "react-bootstrap";
import { icons } from "../../../../utils/constants";
import SuccessModal from "./SuccessModal";
import { api } from "../../../../services/api";
import { useDispatch } from "react-redux";
import { setAuthData, throwError } from "../../../../store/globalSlice";
import { encrypt } from "../../../../utils/helpers";

const PasswordField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      <div className="text-14-500 mb-5" style={{ color: "#4C535F" }}>
        {label}
      </div>
      <div className={styles.inputGroup}>
        <FormControl
          className="text-14-500 p-12"
          type={showPassword ? "text" : "password"}
          {...field}
          {...props}
        />
        <div
          className={styles["toggle-password"]}
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src={showPassword ? icons.eyeClose : icons.eye} alt="eye" />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

const ResetPassword = ({ setIsResetPassword }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const onSubmit = async (values) => {
    setIsReset(true);
    try {
      if (values.confirmNewPassword === values.newPassword) {
        const req = {
          old_password: values.currentPassword,
          new_password: values.confirmNewPassword,
        };
        console.log("req", req);
        const res = await api.put("user/change-password", req);
        console.log("res", res);
        if (res.status === 200) {
          setShowSuccessModal(true);
        } else {
          dispatch(throwError(res.data.message));
        }
      } else {
        dispatch(throwError("Conform Password must be same"));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsReset(false);
  };
  return (
    <>
      <div className={styles.resetPasswordContainer}>
        <div className={styles.resetPasswordItem}>
          <div
            className="text-24-700"
            style={{
              color: "rgba(28, 29, 29, 1)",
            }}
          >
            Reset Password
          </div>
          <div className="text-14-400">
            We recommend you to change your password every three months, to keep
            your account safe.
          </div>
          <div className="mt-20">
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              }}
              validationSchema={Yup.object({
                currentPassword: Yup.string().required(
                  "Current password is required"
                ),
                newPassword: Yup.string().required("New password is required"),
                confirmNewPassword: Yup.string()
                  .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                  .required("Confirm new password is required"),
              })}
              onSubmit={onSubmit}
            >
              <Form>
                <div className={styles.formContainer}>
                  <div className="d-flex flex-wrap gap-2 ">
                    <PasswordField
                      label="Current Password"
                      name="currentPassword"
                      placeholder="Enter current password"
                    />
                    <PasswordField
                      label="New Password"
                      name="newPassword"
                      placeholder="Enter new password"
                    />
                    <PasswordField
                      label="Confirm New Password"
                      name="confirmNewPassword"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`${styles.resetButton} text-14-500 mt-30 me-5`}
                    style={{
                      background: `#7B5AFF`,
                      border: "none",
                      color: "white",
                    }}
                    disabled={isReset}
                  >
                    Reset Now
                    {isReset && <Spinner size="sm" className="ms-10" />}
                  </Button>
                  <Button
                    type="button"
                    className={`${styles.resetButton} text-14-500 mt-30 ms-5`}
                    style={{
                      background: `#F6F6F6`,
                      border: "none",
                      color: "black",
                    }}
                    onClick={() => setIsResetPassword(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          show={showSuccessModal}
          handleClose={() => {
            setShowSuccessModal(false);
            let data = encrypt({ time: new Date().toLocaleString() });
            localStorage.authData = data;
            dispatch(setAuthData(data));
          }}
        />
      )}
    </>
  );
};

export default ResetPassword;
