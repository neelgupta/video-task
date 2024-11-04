import { trimLeftSpace } from "../../../utils/helpers";
import Label from "../Label";
import "./TextArea.scss";

const TextArea = ({
  label,
  required,
  labelClass,
  placeholder,
  onChange,
  id,
  rows,
  value,
}) => {
  return (
    <div id="textarea-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <div className="text-area-block">
        <textarea
          className="text-area"
          rows={rows || "3"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange({
              target: {
                id: id,
                value: trimLeftSpace(e.target.value),
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default TextArea;