/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { folderData } from "./constants";
import "./Mycollection.scss";
import CustomFolderMenu from "./CustomFolderMenu";
import { Button, Spinner } from "react-bootstrap";
import CreateFolderModal from "./CreateFolderModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../../components/layouts/DeleteModal";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import { api } from "../../../services/api";
import { showSuccess, throwError } from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";

const MyCollection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { themeColor, selectedOrganizationId } = reduxData;

  // create state
  const [isCreateFolderModalShow, setIsCreateFolderModalShow] = useState(false);
  const [renamingFolder, setRenamingFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (selectedOrganizationId) {
      fetchFolder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  const fetchFolder = async () => {
    setFolders([]);
    try {
      const res = await api.get(
        `interactions/get-folders/${selectedOrganizationId}`
      );
      if (res.status === 200 && res.data?.response) {
        setFolders(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  const handleDeleteFolder = async (id) => {
    setDeleteId("");
    setIsDelete(true);
    try {
      const res = await api.delete(`interactions/delete-folder/${id}`);
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
    setIsDelete(false);
    setShowDeleteModal(false);
  };

  return (
    <div className="d-flex flex-wrap folder-container">
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          handleDeleteFolder(deleteId);
        }}
        isDelete={isDelete}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
      {folders.length > 0 ? (
        folders.map((item, idx) => {
          return (
            <div className="Folder-card " key={idx}>
              <div className="Folder-menu">
                {!item.is_default && (
                  <CustomFolderMenu
                    item={item}
                    setShowDeleteModal={(id) => {
                      setShowDeleteModal(true);
                      setDeleteId(id);
                    }}
                    setRenamingFolder={setRenamingFolder}
                    setIsCreateFolderModalShow={setIsCreateFolderModalShow}
                  />
                )}
              </div>
              <div
                className="pointer"
                onClick={() => {
                  navigate(`/user/collection/${item._id}`);
                }}
              >
                <img
                  src={icons.Folder2}
                  alt="Avatar"
                  className="Folder-image mt-5"
                />

                <div className="Folder-title text-14-700 mt-12 text-center">
                  {item.folder_name}
                </div>
                <div
                  className="text-10-500 text-center"
                  style={{ color: "#636363" }}
                >
                  {item?.count || 0} items
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="f-center wp-100">
          <Spinner size="xl" className="mt-50" />
        </div>
      )}
      <Button
        className="floating-button rounded-circle"
        onClick={() => setIsCreateFolderModalShow(true)}
        style={{
          background: `linear-gradient(to top , #4A25E1, #7B5AFF 100%)`,
          border: "none",
        }}
      >
        <img
          src={icons.addIcon}
          alt=""
          className="fit-image"
          style={{
            filter: creteImgFilter("#ffffff"),
          }}
        />
      </Button>
      <CreateFolderModal
        show={isCreateFolderModalShow}
        handleClose={() => {
          setRenamingFolder(null);
          setIsCreateFolderModalShow(false);
        }}
        renamingFolder={renamingFolder}
        fetchFolder={fetchFolder}
      />
    </div>
  );
};

export default MyCollection;
