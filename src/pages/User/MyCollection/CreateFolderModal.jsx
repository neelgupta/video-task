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
    setFolderName("");
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
        handleClose();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsPost(false);
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
        handleClose();
        fetchFolder();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsPost(false);
  };

  const validateFolderName = (name) => {
    // Check if name is empty
    if (!name.trim()) {
      return "Folder name cannot be empty.";
    }

    // Check for invalid characters
    const invalidChars = /[^a-zA-Z0-9-_]/;
    if (invalidChars.test(name)) {
      return "Folder name can only contain letters, numbers, '-', and '_'.";
    }

    return "";
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="p-20 w-500">
        <Modal.Header closeButton className="p-0">
          <div className="text-20-600" style={{ color: "#1B2559" }}>
            {renamingFolder ? "Rename Folder" : "Create New Folder"}
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-12-600 mb-5" style={{ color: "#666666" }}>
              Folder Name
            </div>
            <div className="flow-ai-input">
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter Folder Name"
              />
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
                const valid = validateFolderName(folderName);
                if (valid) {
                  dispatch(throwError(valid));
                  return;
                }
                renamingFolder
                  ? handleRenameFolder(renamingFolder._id, folderName.trim())
                  : handleCreateNewFolder(folderName.trim());
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
      </div>
    </Modal>
  );
};

export default CreateFolderModal;
