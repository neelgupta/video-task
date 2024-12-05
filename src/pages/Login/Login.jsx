import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput } from "../../components";
import * as Yup from "yup";
import "./Login.scss";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { encrypt } from "../../utils/helpers";
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
    <div id="login-container">
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
    </div>
  );
};

export default Login;
