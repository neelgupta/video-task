import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox, Label } from "../../components";
import * as Yup from "yup";
import "./Signup.scss";
import { Button, Spinner } from "react-bootstrap";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { handelCatch, showSuccess, throwError } from "../../store/globalSlice";
import { useEffect, useState } from "react";

function Signup() {
  const reduxData = useSelector((state) => state.global);
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [referralId, setReferralId] = useState("");
  const [teamReferralId, setTeamReferralId] = useState("");
  const [initialValues, setInitialValues] = useState({
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
  });

  useEffect(() => {
    if (token) {
      verifyToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const verifyToken = async () => {
    try {
      const res = await api.post("user/invitation", {
        invitation_token: token,
      });
      if (res.status === 200) {
        const data = res.data.response;
        console.log("data", data);
        if (data?.referral_status && data.referral_status === "pending") {
          setReferralId(data._id);
          setInitialValues({ ...initialValues, email: data.referral_email });
        } else if (
          data?.invitation_status &&
          data.invitation_status === "pending"
        ) {
          setTeamReferralId(data._id);
          setInitialValues({ ...initialValues, email: data.member_email });
        } else {
          navigate("/sign-up");
        }
      } else {
        navigate("/sign-up");
        dispatch(throwError(res.data.message));
      }
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
      navigate("/sign-up");
      dispatch(handelCatch(error));
    }
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
      const req = {
        ...values,
        ...(referralId ? { referralId } : {}),
        ...(teamReferralId ? { memberId: teamReferralId } : {}),
      };
      const res = await api.post("user/sign-up", req);
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
    <>
      <div id="signUp-container">
        <div className="leftBlock p-49 auri-scroll">
          <div className="fa-center justify-content-end mb-60">
            <Button
              className="w-120 h-51 text-18-500 scale-btn pointer"
              style={{
                background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                border: "none",
                borderRadius: "18px",
              }}
              onClick={() => navigate("/")}
            >
              Log in
            </Button>
          </div>
          <div className="text-42-600 color-0000 text-center mb-12">
            Create your account.
          </div>
          <div className="f-center flex-nowrap gap-3 mb-29">
            <div className="line"></div>
            <div className="text-20-600 color-9f9f text-nowrap">
              Let’s get started
            </div>
            <div className="line"></div>
          </div>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
            }) => (
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                <div className="formblock flex-column">
                  <div className="mb-18 inputClass">
                    <Label label="Name:" labelClass="text-14-600 color-6666" />
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      value={values.user_name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      autoComplete="new-password"
                      className={
                        touched.user_name && errors.user_name ? "error" : ""
                      }
                    />
                    {touched.user_name && errors.user_name && (
                      <div className="input-error">{errors.user_name}</div>
                    )}
                  </div>
                  <div className="mb-18 inputClass">
                    <Label label="Email:" labelClass="text-14-600 color-6666" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      autoComplete="new-password"
                      className={touched.email && errors.email ? "error" : ""}
                    />
                    {touched.email && errors.email && (
                      <div className="input-error">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-26 inputClass">
                    <Label
                      label="Password:"
                      labelClass="text-14-600 color-6666"
                    />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      autoComplete="new-password"
                      className={
                        touched.password && errors.password ? "error" : ""
                      }
                    />
                    {touched.password && errors.password && (
                      <div className="input-error">{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <div
                      className="mb-56 checkBlock"
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <CheckBox
                          isChecked={values.terms.isAgree}
                          onChange={() => {
                            setFieldValue("terms", {
                              ...values.terms,
                              isAgree: !values.terms.isAgree,
                            });
                          }}
                        />
                      </div>
                      <div className="text-14-500 color-6666">
                        I agree to Flow-AI’s Terms of service
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mb-9">
                  <Button
                    type="submit"
                    className="wp-57 h-62 text-20-500 br-30 pointer"
                    style={{
                      background:
                        "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                      border: "none",
                    }}
                    onClick={() => {
                      !isSignup && handleSubmit();
                    }}
                  >
                    Create Account
                    {isSignup && <Spinner size="sm" className="ms-10" />}
                  </Button>
                </div>
                <div className="text-20-600 color-9f9f text-center mb-9">
                  or
                </div>
                <div className="text-center mb-19">
                  <Button
                    className="wp-57 h-62 text-20-500 br-30 b-cccc bg-ffff color-2559 pointer"
                    onClick={() => {}}
                  >
                    Sign up with Apple
                  </Button>
                </div>
                <div className="text-center color-6fff text-20-500">
                  Sign up with SSO
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="rightBlock">
          <div className="wp-100 hp-100">
            <video
              src="./signUpvedio.mp4"
              className="full-size-image"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
