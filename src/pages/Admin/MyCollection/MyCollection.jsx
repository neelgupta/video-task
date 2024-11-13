/* eslint-disable react/display-name */
import React, { useState } from "react";
import { folderData } from "./constants";
import "./Mycollection.scss";
import CustomFolderMenu from "./CustomFolderMenu";
import { Button } from "react-bootstrap";
import CreateFolderModal from "./CreateFolderModal";
import { useSelector } from "react-redux";
import DeleteModal from "../../../components/layouts/DeleteModal";
import CustomFileMenu from "./CustomFileMeu";
import { icons } from "../../../utils/constants";

const FolderCard = ({
  item,
  onDeleteFolder,
  setRenamingFolder,
  setIsCreateFolderModalShow,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  return (
    <>
      <div className="Folder-card">
        <div className="Folder-menu">
          <CustomFolderMenu
            item={item}
            setShowDeleteModal={setShowDeleteModal}
            setRenamingFolder={setRenamingFolder}
            setIsCreateFolderModalShow={setIsCreateFolderModalShow}
          />
        </div>
        <img src={item.avatar} alt="Avatar" className="Folder-image mt-5" />

        <div className="Folder-title text-14-700 mt-12">{item.title}</div>
        <div className="text-10-500" style={{ color: "#636363" }}>
          {item.items.length} items
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          onDeleteFolder();
          setShowDeleteModal(false);
          // TODO: Implement delete functionality here
        }}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
    </>
  );
};

const FileCard = ({ item, onDeleteFile }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <div className="file-custom-card">
        <img
          src={item.avatar}
          alt="Avatar"
          className="file-custom-card-image"
        />
        <div className="file-custom-card-title">{item.title}</div>
        <div className="file-custom-card-menu">
          <CustomFileMenu
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          onDeleteFile();
          setShowDeleteModal(false);
          // TODO: Implement delete functionality here
        }}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
    </>
  );
};

const MyCollection = () => {
  const [isCreateFolderModalShow, setIsCreateFolderModalShow] = useState(false);
  const [renamingFolder, setRenamingFolder] = useState(null);
  const [folders, setFolders] = useState(folderData);
  const [files, setFiles] = useState(folderData[0].items);
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;

  const handleDeleteFolder = (id) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };
  const handleRenameFolder = (id, value) => {
    setFolders((prev) =>
      prev.map((folder) => ({
        ...folder,
        title: id !== folder.id ? folder.title : value,
      }))
    );
    setRenamingFolder(null);
  };

  const handleDeleteFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleCreateNewFolder = (folderName) => {
    // TODO: Implement functionality to create new folder
    console.log({ folderName });
    setFolders((prev) => [
      ...prev,
      {
        id: folders.length + 1,
        avatar: icons.Folder2,
        title: folderName,
        items: [],
      },
    ]);
  };
  return (
    <div className="d-flex flex-wrap folder-container">
      {folders &&
        folders.map((item, idx) => {
          return (
            <FolderCard
              key={item.id}
              item={item}
              onDeleteFolder={() => handleDeleteFolder(item.id)}
              setRenamingFolder={setRenamingFolder}
              setIsCreateFolderModalShow={setIsCreateFolderModalShow}
            />
          );
        })}
      {/* {files &&
        files.map((item, idx) => {
          return (
            <FileCard
              key={item.id}
              item={item}
              onDeleteFile={() => handleDeleteFile(item.id)}
            />
          );
        })} */}
      <Button
        className="floating-button rounded-circle"
        onClick={() => setIsCreateFolderModalShow(true)}
        style={{
          background: `linear-gradient(to right , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
          border: "none",
        }}
      >
        +
      </Button>
      <CreateFolderModal
        show={isCreateFolderModalShow}
        handleClose={() => {
          setRenamingFolder(null);
          setIsCreateFolderModalShow(false);
        }}
        onCreate={handleCreateNewFolder}
        renamingFolder={renamingFolder}
        onRename={handleRenameFolder}
      />
    </div>
  );
};

export default MyCollection;
