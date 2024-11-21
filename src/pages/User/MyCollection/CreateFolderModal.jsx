/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const CreateFolderModal = ({
  show,
  handleClose,
  onCreate,
  renamingFolder,
  onRename,
}) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const [folderName, setFolderName] = useState("");
  useEffect(() => {
    if (renamingFolder) setFolderName(renamingFolder.title);
  }, [renamingFolder]);
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
                ? onRename(renamingFolder.id, folderName)
                : onCreate(folderName);
              handleClose();
            }}
            iconColor="#ffffff"
            style={{
              background: `linear-gradient(to right , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
              border: "none",
              color: "white",
              width: "150px",
            }}
          >
            {renamingFolder ? "Save" : "Create"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateFolderModal;
