import "./PasswordInput.scss";
import { useState } from "react";
import { trimLeftSpace } from "../../../utils/helpers";
import { icons } from "../../../utils/constants";
import ProgressBar from "react-bootstrap/ProgressBar";
import Label from "../Label";

const PasswordInput = ({
  label,
  isRequired,
  labelClass,
  id,
  placeholder,
  name,
  onChange,
  value,
  reference,
  disabled,
  autoFocus,
  error,
  isShowSuggetion,
  isShowProgress,
  className,
}) => {
  const [inputType, setType] = useState("password");
  const [isShow, setIsShow] = useState(false);
  const handleType = (type) => {
    setType(type);
  };

  const isLower = /[a-z]/.test(value);
  const isUpper = /[A-Z]/.test(value);
  const isNumber = /[0-9]/.test(value);
  const isSpecial = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value);
  const isLen = value.length > 5;
  const suggetionArray = [
    {
      title: "One lowercase",
      isTrue: isLower,
    },
    {
      title: "One uppercase",
      isTrue: isUpper,
    },
    {
      title: "Number (0-9)",
      isTrue: isNumber,
    },
    {
      title: "Special Character (!@#$%^&*)",
      isTrue: isSpecial,
    },
    {
      title: "Atleast 6 Character",
      isTrue: isLen,
    },
  ];
  let count = 0;
  if (isLower) {
    count++;
  }
  if (isUpper) {
    count++;
  }
  if (isNumber) {
    count++;
  }
  if (isSpecial) {
    count++;
  }
  if (isLen) {
    count++;
  }
  let progressCount = (count / 5) * 100;

  return (
    <div id="password-input-container">
      {label && (
        <Label label={label} required={isRequired} className={labelClass} />
      )}
      <div className="password-container">
        <input
          id={id}
          autoComplete="new-password"
          placeholder={placeholder}
          name={name}
          type={inputType || "text"}
          className={`${className} noscroll text-truncate password-input ${
            value && isShowProgress ? "isValue-suggetion" : ""
          }`}
          onChange={(e) => {
            onChange({
              target: {
                id: id,
                value: trimLeftSpace(e.target.value),
              },
            });
          }}
          onBlur={() => {
            setIsShow(false);
          }}
          onFocus={() => {
            setIsShow(true);
          }}
          value={value}
          ref={reference}
          disabled={disabled}
          autoFocus={autoFocus}
        />
        <span
          className="password-icon h-14 pointer"
          onClick={() => {
            handleType(inputType === "text" ? "password" : "text");
          }}
        >
          <img
            src={inputType === "text" ? icons.eyeClose : icons.eye}
            className="fit-image"
            alt="eye"
          />
        </span>
        {isShow && isShowSuggetion && (
          <div className="password-suggetion-popup shadow">
            {suggetionArray.map((elm, index) => {
              return (
                <div
                  key={index}
                  className={`mb-2 fa-center ${
                    elm.isTrue ? "color-black-olive" : "color-raisin-black"
                  }`}
                >
                  <span className="text-14-400 h-15 d-flex">
                    <img
                      src={elm.isTrue ? icons.tickCircle : icons.closeCircle}
                      className={`fit-image ${
                        elm.isTrue ? "green-filter" : "red-filter"
                      }`}
                      alt="circle"
                    />
                  </span>
                  <span className={`text-12-400 ms-2`}>{elm.title}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {progressCount > 0 && isShowProgress && (
        <ProgressBar
          now={progressCount}
          className={`password-indicator success-${count}`}
        />
      )}
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default PasswordInput;
