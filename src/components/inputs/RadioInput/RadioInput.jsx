import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import "./RadioInput.scss";

const RadioInput = ({ className, isCheck, onChange }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;

  return (
    <div id="radioinput-container">
      <Form.Check className={className}>
        <Form.Check.Input
          type="radio"
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

export default RadioInput;
