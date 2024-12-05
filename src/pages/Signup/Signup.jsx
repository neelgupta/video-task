import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { PasswordInput, Switch, TextInput } from "../../components";
import * as Yup from "yup";
import "./Signup.scss";
import { icons } from "../../utils/constants";
import { Accordion, Button, Spinner } from "react-bootstrap";
import { api } from "../../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { showSuccess, throwError } from "../../store/globalSlice";
import { useState } from "react";

function Signup() {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const initialValues = {
    user_name: "",
    email: "",
    password: "",
    terms: {
      isAgree: false,
      isAccept: false,
      isEmail: false,
      isActivity: false,
      isSherContent: false,
    },
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const handleSubmit = async (values) => {
    setIsSignup(true);
    try {
      const res = await api.post("user/sign-up", values);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsSignup(false);
  };
  return (
    <div id="signUp-container">
      <div className="signUp-card">
        <div className="signUp-title">
          <div className="video_ask_bg">
            <img src={icons.logo} alt={"Video-ask Logo"} className="logo-img" />
          </div>
          <h3>Hello.</h3>
          <h4 style={{ color: themeColor.pColor }}>
            To get started please sign up...
          </h4>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
            } = props;

            return (
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                <div className="mb-24">
                  <TextInput
                    id="user_name"
                    name="user_name"
                    value={values.user_name}
                    onChange={handleChange}
                    error={touched.user_name && errors.user_name}
                    placeholder="Enter name"
                    type="text"
                  />
                </div>
                <div className="mb-24">
                  <TextInput
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && errors.email}
                    placeholder="Enter email address"
                    type="email"
                  />
                </div>
                <div>
                  <PasswordInput
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && errors.password}
                    placeholder="Enter password"
                  />
                </div>
                <div className="mt-20 mb-30">
                  <div
                    className="mt-10 wp-100"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="text-14-500 wp-80">
                      I agree to VideoAsks`s{" "}
                      <span
                        className="link pointer"
                        style={{ color: themeColor.pColor }}
                      >
                        Terms of service
                      </span>
                    </div>
                    <div className="wp-20">
                      <Switch
                        isChecked={values.terms.isAgree}
                        onChange={() => {
                          setFieldValue("terms", {
                            ...values.terms,
                            isAgree: !values.terms.isAgree,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-10 wp-100"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="text-14-500 wp-60">
                      I accept VideoAsk`s use of my data for the service and
                      everything else described in the{" "}
                      <span
                        className="link pointer"
                        style={{ color: themeColor.pColor }}
                      >
                        Privacy Policy
                      </span>{" "}
                      and{" "}
                      <span
                        className="link pointer"
                        style={{ color: themeColor.pColor }}
                      >
                        Data Processing Agreement
                      </span>
                    </div>
                    <div className="wp-20">
                      <Switch
                        isChecked={values.terms.isAccept}
                        onChange={() => {
                          setFieldValue("terms", {
                            ...values.terms,
                            isAccept: !values.terms.isAccept,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-10 wp-100 according-bg">
                    <Accordion className="custom-accordion">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header style={{ color: themeColor.pColor }}>
                          See options
                        </Accordion.Header>
                        <Accordion.Body>
                          <div
                            className="mt-10 wp-100"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="text-14-500 wp-60">
                              I`d like to occasionally get useful tips &
                              inspiration via email.
                            </div>
                            <div className="wp-20">
                              <Switch
                                isChecked={values.terms.isEmail}
                                onChange={() => {
                                  setFieldValue("terms", {
                                    ...values.terms,
                                    isEmail: !values.terms.isEmail,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="mt-10 wp-100"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="text-14-500 wp-60">
                              Tailor VideoAsk to my needs based on my activity.
                            </div>
                            <div className="wp-20">
                              <Switch
                                isChecked={values.terms.isActivity}
                                onChange={() => {
                                  setFieldValue("terms", {
                                    ...values.terms,
                                    isActivity: !values.terms.isActivity,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className="mt-10 wp-100"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="text-14-500 wp-60">
                              Enrich my data with select third parties for more
                              relevant content.
                            </div>
                            <div className="wp-20">
                              <Switch
                                isChecked={values.terms.isSherContent}
                                onChange={() => {
                                  setFieldValue("terms", {
                                    ...values.terms,
                                    isSherContent: !values.terms.isSherContent,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                <div>
                  <Button
                    className="wp-100 h-53 text-18-500 scale-btn"
                    style={{
                      backgroundColor: themeColor.pColor,
                      border: "none",
                    }}
                    onClick={() => {
                      !isSignup && handleSubmit();
                    }}
                  >
                    Sign Up
                    {isSignup && <Spinner size="sm" className="ms-10" />}
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
