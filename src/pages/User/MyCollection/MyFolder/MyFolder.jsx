import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
function MyFolder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      getFolderCollection();
      return;
    }
    navigate("/user/collection");
    // eslint-disable-next-line
  }, [id]);

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
                        title
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <p>data not found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyFolder;
