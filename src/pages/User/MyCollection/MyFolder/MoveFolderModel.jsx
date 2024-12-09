import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import Select from "react-select";
import { api } from "../../../../services/api";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: "5px 10px", // Example padding
    border: "1px solid #CCCCCC", // Customize the border
    boxShadow: "none", // Customize the box shadow
    borderRadius: "8px",
    "&:hover": {
      border: "1px solid gray", // Customize the border on hover
    },
  }),
  indicatorSeparator: () => ({
    display: "none", // Remove the divider
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "black" : "gray", // Customize the dropdown indicator color
    "&:hover": {
      color: state.isFocused ? "black" : "gray", // Customize the dropdown indicator color on hover
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "gray", // Customize the placeholder color
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "black", // Customize the selected value color
  }),
};

function MoveFolderModel({
  show,
  handleClose,
  int,
  selectedFolder,
  getFolderCollection,
}) {
  const dispatch = useDispatch();
  const [moveFolderList, setMoveFolderList] = useState([]);
  const [isOneFolder, setIsOneFolder] = useState(false);
  const [selectFolder, setSelectFolder] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [folderList, setFolderList] = useState([]);

  useEffect(() => {
    setIsOneFolder(false);
    if (folderList.length < 2) {
      setIsOneFolder(true);
      return;
    }
    const optionList = folderList.map((o) => {
      return {
        value: o._id,
        label: o.folder_name,
        _id: o._id,
      };
    });
    setMoveFolderList(optionList);
    setSelectFolder(optionList.find((x) => x._id === selectedFolder._id));
  }, [folderList, selectedFolder]);

  useEffect(() => {
    if (selectedFolder) fetchFolderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolder]);

  const fetchFolderList = async () => {
    try {
      const res = await api.get(
        `interactions/get-folders/${selectedFolder.organization_id}`
      );
      console.log("res", res);
      if (res.status === 200) {
        setFolderList(res.data.response);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const handleSubmit = async () => {
    setIsUpdate(true);
    try {
      const req = {
        interaction_id: int._id,
        folder_id: selectFolder.value,
      };
      const res = await api.put("interactions/update-interactions", req);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        getFolderCollection();
        handleClose();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsUpdate(false);
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      onHide={handleClose}
      className="move-folder-container"
      centered
    >
      <div className="p-30">
        <Modal.Header closeButton className="p-0 move-folder-header">
          <div className="text-20-600" style={{ color: "#1B2559" }}>
            Move{" "}
            <span
              style={{ textTransform: "capitalize" }}
            >{`'${int.title}'`}</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="m-0 p-0">
              <div className="title">Selected folder...</div>
              <div
                style={{
                  margin: "10px 0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="w-30">
                  <img
                    src={icons.folderMove}
                    alt=""
                    className="fit-image"
                    style={{ filter: creteImgFilter("#7C5BFF") }}
                  />
                </div>
                <div
                  className="text-18-600 ms-5 mt-5"
                  style={{ color: "#7C5BFF" }}
                >
                  {selectedFolder.folder_name}
                </div>
              </div>
            </div>

            <div className="m-0 p-0 mt-30">
              <div className="title">Choose a folder...</div>
              <div className="mt-10">
                <Select
                  options={moveFolderList}
                  placeholder={"Select"}
                  name="selectCRM"
                  value={selectFolder}
                  onChange={(select) => {
                    setSelectFolder(select);
                  }}
                  isDisabled={isOneFolder}
                  styles={customStyles}
                />
              </div>
              {isOneFolder && (
                <div
                  className="text-12-500 mt-5"
                  style={{ color: "var(--dc35)" }}
                >
                  {`You have only one folder. You can't move items to another
                  folder.`}
                </div>
              )}
            </div>

            <div className="move-folder-btn-group">
              <Button
                className="btn"
                style={{ background: "#7C5BFF", color: "white" }}
                disabled={isOneFolder || isUpdate}
                onClick={handleSubmit}
              >
                Move
                {isUpdate ? (
                  <div className="w-20 ms-10">
                    <Spinner size="sm" />
                  </div>
                ) : (
                  <div className="w-20 ms-10">
                    <img
                      src={icons.outlineFolderOpen}
                      alt=""
                      className="fit-image "
                      style={{ filter: creteImgFilter("#ffffff") }}
                    />
                  </div>
                )}
              </Button>
              <Button
                className="btn "
                style={{ background: "#f0f0f0", color: "black" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default MoveFolderModel;
