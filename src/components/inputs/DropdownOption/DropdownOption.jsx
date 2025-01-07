import Select from "react-select";
import "./DropdownOption.scss";
import Label from "../Label";
import { useEffect } from "react";
const DropdownOption = ({
  options,
  placeholder,
  label,
  required,
  labelClass,
  onChange,
  value,
  isDisabled,
  isFont = false,
}) => {
  const customStyles = {
    // Style for the dropdown container
    control: (provided, state) => ({
      ...provided,
      boxShadow: "none", // Removes default box shadow
      borderRadius: "10px", // Rounded corners
      border: state.isFocused ? "1px solid #8000ff" : "1px solid #cccccc", // Border color based on focus
      padding: "5px 10px", // Inner padding
      "&:hover": {
        borderColor: "#8000ff", // Border color on hover
      },
    }),
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected
          ? "#8000ff !important"
          : state.isFocused
          ? "#000 !important"
          : "#757f95 !important",
        backgroundColor: "transparent",
        ...(isFont ? { fontFamily: state.data.value } : {}), // Apply font dynamically
      };
    },
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "gray" : "black", // Text color
      fontSize: "14px", // Font size
      fontWeight: 400, // Normal font weight
      ...(isFont ? { fontFamily: state.data.value } : {}),
    }),
  };

  return (
    <div id="dropdownoption-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <Select
        isDisabled={isDisabled}
        styles={customStyles}
        classNamePrefix="do-block"
        options={options}
        value={value}
        required={required}
        placeholder={placeholder || "Select"}
        onChange={(e) => {
          onChange ? onChange(e) : () => {};
        }}
      />
    </div>
  );
};

export default DropdownOption;
