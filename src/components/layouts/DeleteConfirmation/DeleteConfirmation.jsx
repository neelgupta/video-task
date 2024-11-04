import { icons } from "../../../utils/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { creteImgFilter } from "../../../utils/helpers";
import "./DeleteConfirmation.scss";
import Modal from "../Modal";
import Button from "../../inputs/Button";
const DeleteConfirmation = ({ onHide, title, onDelete }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const [deleteLoader, setDeleteLoader] = useState(false);
  const handleDelete = () => {
    setDeleteLoader(true);
    onDelete();
  };

  return (
    <div id="deleteconfirmation-container">
      <Modal width="500px" onHide={onHide} hideHead>
        <div className="">
          <div className="delete-image-block">
            <svg
              width="100%"
              height="90"
              viewBox="0 0 216 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                style={{ fill: themeColor.pColor }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M46 70H137C137.515 70 138.017 69.9444 138.5 69.8389C138.983 69.9444 139.485 70 140 70H192C195.866 70 199 66.866 199 63C199 59.134 195.866 56 192 56H186C182.134 56 179 52.866 179 49C179 45.134 182.134 42 186 42H205C208.866 42 212 38.866 212 35C212 31.134 208.866 28 205 28H183C186.866 28 190 24.866 190 21C190 17.134 186.866 14 183 14H119C122.866 14 126 10.866 126 7C126 3.13401 122.866 0 119 0H62C58.134 0 55 3.13401 55 7C55 10.866 58.134 14 62 14H22C18.134 14 15 17.134 15 21C15 24.866 18.134 28 22 28H47C50.866 28 54 31.134 54 35C54 38.866 50.866 42 47 42H7C3.13401 42 0 45.134 0 49C0 52.866 3.13401 56 7 56H46C42.134 56 39 59.134 39 63C39 66.866 42.134 70 46 70ZM209 70C212.866 70 216 66.866 216 63C216 59.134 212.866 56 209 56C205.134 56 202 59.134 202 63C202 66.866 205.134 70 209 70Z"
                fill="black"
                fillOpacity="0.05"
              />
            </svg>
            <div className="h-100 w-120 delete-ic">
              <img
                src={icons.deleteCIcon}
                alt="deleteCIcon"
                className="fit-image"
                style={{ filter: creteImgFilter(themeColor.pColor) }}
              />
            </div>
          </div>
          <div className={`text-center text-18-600 mb-12`}>Are you sure?</div>
          <div className={`text-center text-16-400 color-757f cmb-26`}>
            Are you sure you want to <br />
            delete this {title}?
          </div>
          <div className="f-center gap-3 mt-24">
            <Button
              btnStyle="GD"
              btnText="Cancel"
              className="w-120"
              onClick={onHide}
            />
            <Button
              className="w-120"
              btnStyle="RD"
              btnText="Delete"
              loading={deleteLoader}
              onClick={handleDelete}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteConfirmation;
