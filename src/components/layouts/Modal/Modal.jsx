import Modal from "react-bootstrap/Modal";
import { icons } from "../../../utils/constants";
import "./Modal.scss";

const CustomModal = ({ title, children, width, onHide, hideHead }) => {
  return (
    <div id="modal-container">
      <Modal centered show onHide={onHide}>
        <div className="p-34 modal-b" style={{ width: width }}>
          {!hideHead && (
            <div className="fb-center mb-24">
              <span className="text-22-500 color-1923">{title}</span>
              <span className="h-18 w-18 d-flex pointer" onClick={onHide}>
                <img src={icons.close} alt="close" className="fit-image" />
              </span>
            </div>
          )}
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
