import Label from "../Label";
import "./ColorPicker.scss";

const ColorPicker = ({
  label,
  required,
  labelClass,
  isRounded,
  onChange,
  value,
  id,
}) => {
  return (
    <div id="colorpicker-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <div className="color-input-container">
        <div className="color-input-block">
          <input
            id={id}
            type="color"
            className={isRounded ? "rounded-c-input" : ""}
            onChange={onChange}
            value={value}
          />
          <span>{value || "#000000"}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
