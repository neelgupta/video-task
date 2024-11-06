import Select from "react-select";
import Label from "../Label";
import "./Dropdown.scss";

const Dropdown = ({
  options,
  placeholder,
  label,
  required,
  labelClass,
  value,
  id,
  onChange,
  customStyles,
}) => {
  const findVal = options?.find((o) => o.value === value) || null;

  return (
    <div id="dropdown-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <Select
        id={id}
        classNamePrefix="dropdown-block"
        options={options}
        placeholder={placeholder || "Select"}
        value={findVal}
        onChange={(e) => {
          onChange({ target: { id: id, value: e?.value || "" } });
        }}
        styles={customStyles || {}}
      />
    </div>
  );
};

export default Dropdown;
