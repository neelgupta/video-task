import Select from "react-select";
import "./DropdownOption.scss";
import Label from "../Label";
const DropdownOption = ({
  options,
  placeholder,
  label,
  required,
  labelClass,
  onChange,
  value,
  error,
  id,
}) => {
  const customStyles = {
    input: (provided) => ({
      ...provided,
      borderReduce: "20px",
      height: "45px",
    }),
  };
  return (
    <div id="dropdownoption-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <Select
        styles={customStyles}
        classNamePrefix="do-block"
        options={options}
        value={value}
        required={required}
        placeholder={placeholder || "Select"}
        onChange={(e) => {
          onChange
            ? onChange({ target: { id: id, value: e || "" } })
            : () => {};
        }}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default DropdownOption;
