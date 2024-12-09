import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../services/api";
import "./MyFolder.scss";
import { icons } from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";
import { Spinner } from "react-bootstrap";
import CustomFileMenu from "./CustomFileMenu";
import DeleteModal from "../../../../components/layouts/DeleteModal";
import MoveFolderModel from "./MoveFolderModel";
import { creteImgFilter } from "../../../../utils/helpers";
function MyFolder() {
  const { id } = useParams();
  const location = useLocation();
  const selectedItem = location.state?.selectedItem;
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoveFolderModal, setShowMoveFolderModal] = useState(false);
  const [moveFolderItem, setMoveFolderItem] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (id && selectedItem) {
      getFolderCollection();
      return;
    }
    navigate("/user/collection");
    // eslint-disable-next-line
  }, [id, selectedItem]);

  const getFolderCollection = async () => {
    setIsFetch(true);
    try {
      const res = await api.get(`interactions/get-interactions/${id}`);
      console.log("res", res);
      if (res.status === 200) {
        setFileList(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsFetch(false);
  };

  const handelDeleteInt = async (id) => {
    try {
      setIsDelete(true);
      const res = await api.delete(`interactions/delete-interactions/${id}`);
      console.log("res", res);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        getFolderCollection();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setShowDeleteModal(false);
    setIsDelete(false);
  };

  const handleView = (ele) => {
    const req = {
      intId: ele._id,
      organizationId: ele.organization_id,
    };
    const query = new URLSearchParams({
      data: JSON.stringify(req),
    }).toString();
    window.open(`/user/view-flow?${query}`, "_blank");
  };

  const handleDuplicate = async (int) => {
    try {
      const req = {
        interaction_id: int._id,
        folder_id: id,
      };
      const res = await api.post("interactions/copy-interaction", req);
      if (res.status === 200) {
        getFolderCollection();
      }
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };
  return (
    <div className="MyFolder">
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          handelDeleteInt(deleteId);
        }}
        isDelete={isDelete}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />

      <MoveFolderModel
        show={showMoveFolderModal}
        int={moveFolderItem}
        selectedFolder={selectedItem}
        getFolderCollection={getFolderCollection}
        handleClose={() => {
          setShowMoveFolderModal(false);
        }}
      />
      <div
        className="ms-10"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="w-25 h-25 me-10 mb-3">
          <img
            src={icons.fillFolderOpen}
            alt=""
            className="fit-image"
            style={{ filter: creteImgFilter("#4b4b4b") }}
          />
        </div>
        <div
          className="text-24-500 m-0 p-0"
          style={{
            color: "rgb(75, 75, 75)",
            textTransform: "capitalize",
          }}
        >
          {selectedItem.folder_name}
        </div>
      </div>
      <div className="collection-list-container">
        {isFetch ? (
          <Spinner />
        ) : fileList.length > 0 ? (
          <>
            {fileList.map((ele, index) => {
              return (
                <div key={index} className="outer-card">
                  <div className="menu">
                    <CustomFileMenu
                      onEditClick={() => {
                        navigate(`/user/flow/${ele._id}`);
                      }}
                      onDeleteClick={() => {
                        setDeleteId(ele._id);
                        setShowDeleteModal(true);
                      }}
                      onMoveClick={() => {
                        setMoveFolderItem(ele);
                        setShowMoveFolderModal(true);
                      }}
                      onViewClick={() => handleView(ele)}
                      onDuplicateClick={() => handleDuplicate(ele)}
                    />
                  </div>
                  <div className="file-card">
                    {ele.thumbnailUrl ? (
                      <img
                        src={ele.thumbnailUrl}
                        alt=""
                        className="file-image"
                      />
                    ) : (
                      <div className="no-img-box"></div>
                    )}

                    <div className="hover_card">
                      <div
                        style={{
                          padding: "10px 10px",
                          color: "white",
                          width: "100%",
                          textTransform: "capitalize",
                          textAlign: "center",
                        }}
                        className="text-16-600"
                      >
                        {ele.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-16-500 ms-15">
            <p>Folder data not found..!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyFolder;
