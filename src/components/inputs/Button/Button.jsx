import { creteImgFilter } from "../../../utils/helpers";
import Roundedloader from "../../layouts/Roundedloader";
import "./Button.scss";

const Button = ({
  btnText,
  btnStyle,
  btnType,
  onClick,
  className,
  rightIcon,
  leftIcon,
  disabled,
  loading,
  leftIconClass,
  style,
  iconColor,
}) => {
  return (
    <div id="button-container">
      <button
        className={`btn-block ${btnStyle ? btnStyle : "PD"} ${
          className ? className : ""
        }`}
        onClick={onClick}
        type={btnType || "button"}
        disabled={disabled}
        style={style}
      >
        <span className="d-flex align-items-center justify-content-center gap-2">
          {leftIcon && (
            <span className="h-18 f-center">
              <img
                src={leftIcon}
                alt="left-icon"
                className={`fit-image ${leftIconClass}`}
              />
            </span>
          )}
          {btnText && <span>{btnText}</span>}
          {rightIcon && (
            <span className="h-18 f-center">
              <img
                src={rightIcon}
                alt="right-icon"
                className="fit-image"
                style={{ filter: creteImgFilter(iconColor) }}
              />
            </span>
          )}
          {loading && (
            <span>
              <Roundedloader
                type={["PD", "RD"].includes(btnStyle) ? "L" : "D"}
              />
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

export default Button;
