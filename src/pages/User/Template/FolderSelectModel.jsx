import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { api } from "../../../services/api";
import { handelCatch } from "../../../store/globalSlice";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import DropdownOption from "../../../components/inputs/DropdownOption/DropdownOption";

function FolderSelectModel({
  show,
  handleClose,
  organization_id,
  copyTemplate,
}) {
  const dispatch = useDispatch();
  const [moveFolderList, setMoveFolderList] = useState([]);
  const [isOneFolder, setIsOneFolder] = useState(false);
  const [selectFolder, setSelectFolder] = useState(null);
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
    setSelectFolder(optionList?.[0]);
  }, [folderList]);

  useEffect(() => {
    if (organization_id) fetchFolderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organization_id]);

  const fetchFolderList = async () => {
    try {
      const res = await api.get(`interactions/get-folders/${organization_id}`);
      if (res.status === 200) {
        setFolderList(res.data.response);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
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
            >{`Copy Template`}</span>
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
                  {selectFolder?.label}
                </div>
              </div>
            </div>

            <div className="m-0 p-0 mt-30">
              <div className="title">Choose a folder...</div>
              <div className="mt-10">
                <DropdownOption
                  options={moveFolderList}
                  placeholder={"Select"}
                  name="selectCRM"
                  value={selectFolder}
                  onChange={(select) => {
                    setSelectFolder(select);
                  }}
                  isDisabled={isOneFolder}
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
                disabled={isOneFolder}
                onClick={() => {
                  copyTemplate(
                    folderList.find((ele) => ele._id === selectFolder._id)
                  );
                  handleClose();
                }}
              >
                Add Template
                <div className="w-20 ms-10">
                  <img
                    src={icons.outlineFolderOpen}
                    alt=""
                    className="fit-image "
                    style={{ filter: creteImgFilter("#ffffff") }}
                  />
                </div>
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

export default FolderSelectModel;
