import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import "./ChatInput.scss";

const ChatInput = ({ themeColor, isAttach }) => {
  return (
    <div id="chatinput-container">
      <div className="d-flex h-18 w-18 pointer">
        <img src={icons.emoji} alt="emoji" className="fit-image" />
      </div>
      {isAttach && (
        <div className="d-flex h-18 w-18 pointer">
          <img src={icons.attachment} alt="attachment" className="fit-image" />
        </div>
      )}
      <div className="input-block">
        <input type="text" placeholder="Type a message..." />
      </div>
      <div className="f-center h-18 w-18 pointer">
        <img
          src={icons.send}
          alt="send"
          className="fit-image"
          style={{
            filter: creteImgFilter(themeColor.pColor),
          }}
        />
      </div>
    </div>
  );
};

export default ChatInput;
