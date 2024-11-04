import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import "./CheckBox.scss";

const CheckBox = ({ className, isCheck, onChange }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;

  return (
    <div id="checkbox-container">
      <Form.Check className={className}>
        <Form.Check.Input
          type="checkbox"
          checked={isCheck}
          onChange={onChange}
          style={{
            borderColor: isCheck ? themeColor.pColor : "#757F95",
            backgroundColor: isCheck ? themeColor.pColor : "#fff",
          }}
        />
      </Form.Check>
    </div>
  );
};

export default CheckBox;
