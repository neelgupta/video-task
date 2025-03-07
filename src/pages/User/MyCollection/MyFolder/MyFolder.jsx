import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../services/api";
import "./MyFolder.scss";
import { icons } from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  setWebcamModelConfig,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";
import { Spinner } from "react-bootstrap";
import CustomFileMenu from "./CustomFileMenu";
import DeleteModal from "../../../../components/layouts/DeleteModal";
import MoveFolderModel from "./MoveFolderModel";
import { creteImgFilter, encrypt } from "../../../../utils/helpers";
import LoaderCircle from "../../../../components/layouts/LoaderCircle/LoaderCircle";
import ShareView from "../../ShareView";
function MyFolder() {
  const { id } = useParams();
  const location = useLocation();
  const selectedItem = location.state?.selectedItem;
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
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
    setDeleteId("");
  };

  const handleView = (ele) => {
    const token = encrypt({ id: ele._id, type: "" });
    window.open(`/view-flow/${token}`, "_blank");
  };

  const handleDuplicate = async (int) => {
    setIsFetch(true);
    try {
      const req = {
        interaction_id: int._id,
        folder_id: id,
      };
      const res = await api.post("interactions/copy-interaction", req);
      if (res.status === 200) {
        getFolderCollection();
      }
    } catch (error) {
      console.log("error", error);
      getFolderCollection();
      dispatch(handelCatch(error));
    }
    setIsFetch(false);
  };

  const handleShare = (id) => {
    const token = encrypt({ id, type: "" });
    const url = `${window.location.origin}/view-flow/${token}`;
    setShareUrl(url);
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
        text="Once deleted, they can be recovered in trash. 🗑️"
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

      {shareUrl !== "" && (
        <ShareView
          show={shareUrl !== ""}
          handleClose={() => setShareUrl("")}
          shareUrl={shareUrl}
        />
      )}

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

      {isFetch ? (
        <div
          className="f-center wp-100 hp-100"
          style={{ flexDirection: "column" }}
        >
          <LoaderCircle size={150} />
          <div className="text-18-600 mt-15" style={{ color: "#1B2559" }}>
            We are getting things ready...
          </div>
        </div>
      ) : (
        <div className="collection-list-container">
          {fileList.length > 0 ? (
            <>
              {fileList.map((ele, index) => {
                return (
                  <div key={index} className="outer-card">
                    <div className="menu">
                      <CustomFileMenu
                        onEditClick={() => {
                          dispatch(
                            setWebcamModelConfig({
                              isShow: false,
                              blobFile: null,
                              blobUrl: "",
                            })
                          );
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
                        onShareClick={() => handleShare(ele._id)}
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

                      <div
                        className="hover_card"
                        onClick={() => {
                          navigate(`/user/asset-allocation/${ele._id}`);
                        }}
                      >
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
      )}
    </div>
  );
}

export default MyFolder;
