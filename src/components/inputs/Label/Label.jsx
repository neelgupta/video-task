import "./Label.scss";

const Label = ({ label, required, labelClass }) => {
  return (
    <div id="label-container">
      <label
        className={`${labelClass ? labelClass : `text-18-400 color-1923`}`}
        htmlFor={`${label}`}
      >
        {label}
        {required && "*"}
      </label>
    </div>
  );
};

export default Label;
