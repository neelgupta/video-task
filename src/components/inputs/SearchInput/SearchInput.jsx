import { icons } from "../../../utils/constants";
import "./SearchInput.scss";

const SearchInput = ({ placeholder }) => {
  return (
    <div id="searchinput-container">
      <input type="text" placeholder={placeholder} />
      <span className="h-18 w-18 d-flex">
        <img src={icons.search} alt="search" className="fit-image" />
      </span>
    </div>
  );
};

export default SearchInput;
