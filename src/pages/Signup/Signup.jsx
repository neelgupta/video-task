import { Formik } from "formik";
import { useSelector } from "react-redux";
import { Button, PasswordInput, Switch, TextInput } from "../../components";
import * as Yup from "yup";
import "./Signup.scss";

function Signup() {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email address is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("✌️values --->", values);
  };
  return (
    <div id="signUp-container">
      <div className="signUp-card">
        <div className="signUp-title">
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
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && errors.name}
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
                      <Switch isChecked />
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
                      <Switch />
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    btnText="Sign Up"
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
}

export default Signup;
