import { useNavigate } from "react-router-dom";
import { Button, PasswordInput, TextInput } from "../../components";
import * as Yup from "yup";
import "./Login.scss";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { encrypt } from "../../utils/helpers";
const Login = () => {
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    // password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("✌️values --->", values);
    let data = encrypt({
      token: "123",
      email: values.email,
      role: values.email === "admin@mailinator.com" ? "admin" : "teacher",
    });
    localStorage.authData = data;
  };
  return (
    <div id="login-container">
      <div className="login-card">
        <div className="login-title">
          <h3>Welcome back!</h3>
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
                <div
                  style={{ color: themeColor.pColor }}
                  className="forgot-password mt-10"
                  onClick={() => navigate("/verification")}
                >
                  Forgot Password?
                </div>
                <div>
                  <Button
                    btnText="Login"
                    className="wp-100 h-53 text-18-500 scale-btn"
                    style={{
                      backgroundColor: themeColor.pColor,
                      border: "none",
                    }}
                    onClick={handleSubmit}
                  />
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
