import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import "./CheckBox.scss";
import { useState } from "react";

const CheckBox = ({ className, isCheck, onChange }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const [checked, setChecked] = useState(isCheck);

  return (
    <div id="checkbox-container">
      <Form.Check type="checkbox" className={className} checked={checked}>
        <Form.Check.Input
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          style={{
            borderColor: checked ? themeColor.darkColor : "#757F95",
            backgroundColor: checked ? themeColor.darkColor : "#fff",
          }}
        />
      </Form.Check>
    </div>
  );
};

export default CheckBox;
