import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import "./AuthHeader.scss";
function AuthHeader({ children, buttonText, path }) {
  const navigate = useNavigate();
  return (
    <div id="AuthHeader-container">
      <div className="auth-bg">
        <div className="header">
          <h3 className="text-18-600">Don`t have an account?</h3>
          <div className="w-120">
            <Button
              onClick={() => navigate(path)}
              btnText={buttonText}
              className="h-40 pe-20 ps-20 text-18-500"
              style={{
                backgroundColor: "black",
                border: "none",
                color: "white",
                borderRadius: "50px",
              }}
            />
          </div>
        </div>
        <div className="body-block">{children}</div>
      </div>
    </div>
  );
}

export default AuthHeader;
