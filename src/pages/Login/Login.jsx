import { useNavigate } from "react-router-dom";
import { Label, PasswordInput, TextInput } from "../../components";
import * as Yup from "yup";
import "./Login.scss";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { encrypt, trimLeftSpace } from "../../utils/helpers";
import { setAuthData } from "../../store/globalSlice";
import { icons } from "../../utils/constants";
import { api } from "../../services/api";
import Swal from "sweetalert2";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const initialValues = {
    email: "",
    password: "",
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setIsLogin(true);
    try {
      const res = await api.post("user/sign-in", values);
      const data = res.data;
      if (data.status === 200) {
        const { token, role } = data.response;
        let authBody = {
          token: token,
          role: role,
        };
        localStorage.authData = encrypt(authBody);
        dispatch(setAuthData(encrypt(authBody)));
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.response.data.message);
    }
    setIsLogin(false);
  };
  return (
    <>
      {/* <div id="login-container">
      <div className="login-card">
        <div className="login-title">
          <div className="video_ask_bg">
            <img
              src={icons.videoAskLogo}
              alt={"Video-ask Logo"}
              className="fit-image"
            />
          </div>
          <h3 className="text-24-400">Welcome back!</h3>
          <h4 style={{ color: themeColor.pColor }}>Please log in...</h4>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            const { values, handleChange, handleSubmit, errors, touched } =
              props;

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
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && errors.email}
                    placeholder="Enter email address"
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
                <div
                  style={{ color: themeColor.pColor }}
                  className="forgot-password mt-10"
                  onClick={() => navigate("/verification")}
                >
                  Forgot Password?
                </div>
                <div>
                  <p className="text-14-500" style={{ color: "var(--dc35)" }}>
                    {errorMessage}
                  </p>
                </div>
                <div>
                  <Button
                    // disabled={isLogin}
                    className="wp-100 h-53 text-18-500 scale-btn"
                    style={{
                      backgroundColor: themeColor.pColor,
                      border: "none",
                    }}
                    onClick={() => {
                      !isLogin && handleSubmit();
                    }}
                  >
                    Login
                    {isLogin && <Spinner size="sm" className="ms-10" />}
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div> */}
      <div id="login-container">
      <div className="leftBlock p-49 auri-scroll">
        <div className="fa-center justify-content-end mb-60">
          <Button
            className="w-120 h-51 text-18-500 scale-btn pointer"
            style={{
              background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
              border: "none",
              borderRadius: "18px",
            }}
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </Button>
        </div>
        <div className="text-42-600 color-0000 text-center mb-12">
          Welcome Back
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
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}>
              <div className="f-center flex-column">
                <div className="mb-18 inputClass">
                  <Label
                    label="Email:"
                    labelClass="text-14-600 color-6666"
                  />
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
                    className={touched.password && errors.password ? "error" : ""}
                  />
                  {touched.password && errors.password && (
                    <div className="input-error">{errors.password}</div>
                  )}
                </div>
                <div>

                <div
                  className="forgotBlock wp-100 color-6fff text-18-500 mb-56 pointer"
                  // onClick={() => navigate("/forgot-password")}
                  onClick={() => navigate("/verification")}

                >
                  Forgot Password?
                </div>
                </div>
              </div>
              <div className="text-center mb-9">
                <Button
                  type="submit"
                  className="wp-57 h-62 text-20-500 br-30 pointer"
                  style={{
                    background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                    border: "none",
                  }}
                  onClick={() => {
                    !isLogin && handleSubmit();
                  }}
                  disabled={isLogin}
                >
                  Login
                  {isLogin && <Spinner size="sm" className="ms-10" />}
                </Button>
              </div>
              <div className="text-20-600 color-9f9f text-center mb-9">or</div>
              <div className="text-center mb-19">
                <Button
                  className="wp-57 h-62 text-20-500 br-30 b-cccc bg-ffff color-2559 pointer"
                  onClick={() => {}}
                >
                  Sign up with Apple
                </Button>
              </div>
              <div className="text-center mb-27">
                <Button
                  className="wp-57 h-62 text-20-500 br-30 b-cccc bg-ffff color-2559 pointer"
                  onClick={() => {}}
                >
                  Sign up with Facebook
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
          <img src={icons.loginImage} loading="lazy" alt="Login" className="full-size-image" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
