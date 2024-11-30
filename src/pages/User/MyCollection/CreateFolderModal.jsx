/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../services/api";
import { showSuccess, throwError } from "../../../store/globalSlice";

const CreateFolderModal = ({
  show,
  handleClose,
  renamingFolder,
  fetchFolder,
}) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { themeColor, selectedOrganizationId } = reduxData;
  const [folderName, setFolderName] = useState("");
  const [isPost, setIsPost] = useState(false);
  useEffect(() => {
    if (renamingFolder) setFolderName(renamingFolder.folder_name);
  }, [renamingFolder]);

  const handleCreateNewFolder = async (folderName) => {
    setIsPost(true);
    try {
      const req = {
        organization_id: selectedOrganizationId,
        folder_name: folderName,
      };
      const res = await api.post("interactions/add-folder", req);
      if (res.status === 201) {
        dispatch(showSuccess(res.data.message));
        fetchFolder();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsPost(false);
    handleClose();
  };

  const handleRenameFolder = async (id, folderName) => {
    setIsPost(true);
    try {
      const req = {
        folder_id: id,
        folder_name: folderName,
      };
      const res = await api.put("interactions/update-folder", req);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        fetchFolder();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsPost(false);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className="text-20-600" style={{ color: "#1B2559" }}>
          {renamingFolder ? "Rename Folder" : "Create New Folder"}
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="text-11-600">Folder Name</div>
          <div>
            {renamingFolder ? (
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="form-control rounded-3"
                placeholder="Enter Folder Name"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
              />
            ) : (
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="Enter Folder Name"
                onChange={(e) => setFolderName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "12px",
                }}
              />
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            style={{ width: "150px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              renamingFolder
                ? handleRenameFolder(renamingFolder._id, folderName)
                : handleCreateNewFolder(folderName);
            }}
            iconColor="#ffffff"
            className="f-center"
            style={{
              background: `linear-gradient(to right , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
              border: "none",
              color: "white",
              width: "150px",
            }}
            disabled={isPost}
          >
            {renamingFolder ? "Save" : "Create"}
            {isPost && <Spinner size="sm" className="ms-10" />}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateFolderModal;
