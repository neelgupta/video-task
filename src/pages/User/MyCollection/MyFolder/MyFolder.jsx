import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../services/api";
import "./MyFolder.scss";
import { icons } from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import { handelCatch, throwError } from "../../../../store/globalSlice";
import { Spinner } from "react-bootstrap";
function MyFolder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
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
  return (
    <div className="MyFolder">
      <div className="collection-list-container">
        {isFetch ? (
          <Spinner />
        ) : fileList.length > 0 ? (
          <>
            {fileList.map((ele, index) => {
              return (
                <div className="file-card" key={index}>
                  {ele.thumbnailUrl ? (
                    <img src={ele.thumbnailUrl} alt="" className="file-image" />
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
