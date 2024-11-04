import "./Verification.scss";
import { Button, TextInput } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    <div id="verification-container">
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
    </div>
  );
};

export default Verification;
