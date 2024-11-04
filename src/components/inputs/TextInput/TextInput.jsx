// import { Label } from "components";
import { trimLeftSpace } from "../../../utils/helpers";
import "./TextInput.scss";
import Label from "../Label";

const TextInput = ({
  id,
  name,
  error,
  label,
  value,
  onBlur,
  disabled,
  onChange,
  required,
  placeholder,
  type,
  labelClass,
  numeric,
  maxLength,
  className,
  readOnly,
  style,
}) => {
  return (
    <div id="textinput-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <div className="text-input-container">
        <div className="text-input-block">
          <input
            id={id}
            name={name}
            className={className}
            type={type || "text"}
            value={value}
            onBlur={onBlur}
            readOnly={readOnly}
            autoComplete="new-password"
            onChange={(e) => {
              if (numeric) {
                e.target.value = e.target.value.replace(
                  /^(0|[^1-9][0-9]*)$/,
                  ""
                );
              }
              onChange({
                target: {
                  id: id,
                  value: trimLeftSpace(e.target.value),
                },
              });
            }}
            disabled={disabled}
            placeholder={placeholder}
            inputMode={numeric ? "numeric" : undefined}
            pattern={numeric ? "[0-9]*" : undefined}
            maxLength={maxLength}
            style={style || {}}
          />
        </div>
        {error && <div className="input-error">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
