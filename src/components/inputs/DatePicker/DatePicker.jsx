import Label from "../Label";
import DatePicker from "react-datepicker";
import { icons } from "@/utils/constants";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const CustomDatePicker = ({ label, labelClass, required, placeholder }) => {
  return (
    <div id="datepicker-container">
      {label && (
        <Label label={label} required={required} labelClass={labelClass} />
      )}
      <div className="custom-date-picker-block">
        <DatePicker
          selected={null}
          onChange={(date) => {}}
          placeholderText={placeholder || "Start date"}
        />
        <span className="h-18 w-18 d-flex c-icon">
          <img src={icons.calendar} alt="calendar" className="fit-image" />
        </span>
      </div>
    </div>
  );
};

export default CustomDatePicker;
