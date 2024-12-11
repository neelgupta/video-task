import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Verification from "../pages/Verification";
import AuthHeader from "../pages/AuthHeader/AuthHeader";
import Signup from "../pages/Signup";
import ViewInteraction from "../pages/User/ViewInteraction";
import Public from "../pages/User/Public";

const AuthRoute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthHeader buttonText="Sign Up" path="/sign-up">
            <Login />
          </AuthHeader>
        }
      />
      <Route
        path="/verification"
        element={
          <AuthHeader buttonText="Sign Up" path="/sign-up">
            <Verification />
          </AuthHeader>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AuthHeader buttonText="Log in" path="/">
            <Signup />
          </AuthHeader>
        }
      />
      <Route path="/user/public/:token" element={<Public />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AuthRoute;
