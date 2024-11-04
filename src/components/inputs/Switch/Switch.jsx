import { useSelector } from "react-redux";
import "./Switch.scss";

const Switch = ({ isChecked, onChange }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  return (
    <div id="switch-container">
      <label className="switch" onClick={() => {}}>
        <input
          type="checkbox"
          checked={isChecked || false}
          onChange={onChange}
        />
        <span
          className="slider"
          style={{
            backgroundColor: isChecked ? themeColor.pColor : "#757f951a",
          }}
        ></span>
      </label>
    </div>
  );
};

export default Switch;
