import "./Verification.scss";
import { TextInput } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Label } from "../../components";
import { icons } from "../../utils/constants";
import { Button, Spinner } from "react-bootstrap";

const Verification = () => {
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const initialValues = {
    code: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Email is required"),
  });

  const handleSubmit = (values) => {
    console.log("✌️values --->", values);
  };

  return (
    <>
      {/* <div id="verification-container">
      <div className="verify-card">
        <div className="text-38-700 color-1923 mb-8">Forgot your password?</div>
        <p className="text-18-400 color-757f mb-28">
          Please enter your email...
        </p>
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
                <div className="mb-30">
                  <TextInput
                    id="code"
                    name="code"
                    placeholder="Enter your email..."
                    value={values.code}
                    onChange={handleChange}
                    error={touched.code && errors.code}
                    s
                  />
                </div>

                <div className="text-14-500 mb-30">
                  <span style={{ color: "red" }}>
                    If you signed up using your Typeform account
                  </span>
                  , you need to
                  <span
                    onClick={() => navigate("/login")}
                    className="link pointer"
                    style={{ color: themeColor.pColor }}
                  >
                    {" reset your password "}
                  </span>
                  on Typeform.com
                </div>
                <div className="mb-16">
                  <Button
                    btnText="Reset My Password"
                    className="wp-100 h-53 text-18-500"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: themeColor.pColor,
                      border: "none",
                    }}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div> */}
      <div id="verification-container">
        <div className="leftBlock p-49 auri-scroll">
          <div className="fa-center justify-content-end mb-210">
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
            Forgot Password
          </div>
          <div className="f-center flex-nowrap gap-3 mb-29">
            <div className="text-20-600 color-9f9f textBlock">
              Enter your e-mail address, and we’ll give you reset instruction.
            </div>
          </div>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                <div className="f-center flex-column">
                  <div className="mb-56 inputClass">
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
                </div>
                <div className="text-center mb-24">
                  <Button
                    type="submit"
                    className="wp-57 h-62 text-20-500 br-30 pointer"
                    style={{
                      background:
                        "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                      border: "none",
                    }}
                    onClick={() => {}}
                    // disabled={isLogin}
                  >
                    Submit
                  </Button>
                </div>
                <div
                  className="text-20-600 color-9f9f text-center mb-9 pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Back to Login
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="rightBlock">
          <div className="wp-100 hp-100">
            <img
              src={icons.loginImage}
              loading="lazy"
              alt="Login"
              className="full-size-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
