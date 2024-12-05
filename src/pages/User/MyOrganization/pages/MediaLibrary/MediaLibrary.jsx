import React, { useEffect, useState } from "react";
import "./MediaLibrary.scss";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import { Button, Spinner } from "react-bootstrap";
import UploadMedia from "./UploadMedia";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../../../services/api";
import { handelCatch, throwError } from "../../../../../store/globalSlice";
function MediaLibrary() {
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor, selectedOrganizationId } = reduxData;
  const [isUpload, setIsUpload] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedOrganizationId) {
      fetchMediaList();
    }
    // eslint-disable-next-line
  }, [selectedOrganizationId]);

  const fetchMediaList = async () => {
    setIsFetch(true);
    try {
      setMediaList([]);
      const res = await api.get(
        `interactions/get-library/${selectedOrganizationId}?search=${searchValue}`
      );
      console.log("res", res);
      if (res.status === 200) {
        setMediaList(res.data.response);
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
    <>
      <UploadMedia show={isUpload} onHide={() => setIsUpload(false)} />
      <div className="MediaLibrary">
        <div>
          <div className="text-24-600" style={{ color: "#1B2559" }}>
            Media
          </div>
          <div className="text-12-500 mt-5" style={{ color: "#696F8C" }}>
            You can find your videos used in replies and creation of QnAFlow.
          </div>
          <div
            className="mt-20"
            style={{
              display: "flex",
              alignItems: isResponsive ? "start" : "center",
              justifyContent: "start",
              ...(isResponsive
                ? { flexDirection: "column-reverse", gap: "30px 0px" }
                : {}),
            }}
          >
            <div className={`search-container wp-100`}>
              <span className="d-flex">
                <img
                  src={icons.search}
                  alt="search"
                  className="fit-image icon-color-1B2559"
                />
              </span>
              <input
                type="text"
                value={searchValue}
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => fetchMediaList()}
              />
            </div>
            <div
              className="btn-group wp-100"
              style={isResponsive ? { justifyContent: "space-between" } : {}}
            >
              <div className="ms-20 w-40 h-30">
                <img
                  src={icons.control_menu}
                  alt=""
                  style={{ filter: creteImgFilter("#1B2559") }}
                  className="fit-image"
                />
              </div>
              <div>
                <Button
                  className="ms-20 "
                  style={{
                    border: "none",
                    background:
                      "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
                    borderRadius: "10px",
                    padding: "15px",
                    width: "200px !important",
                  }}
                  disabled={true}
                  onClick={() => setIsUpload(true)}
                >
                  <img
                    src={icons.imgUpload}
                    alt=""
                    style={{ filter: creteImgFilter("#ffffff") }}
                    className="fit-image w-15 me-10"
                  />
                  <span className="text-14-600 w-100">Upload Media</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="Media-gallery">
          {isFetch ? (
            <div>
              <Spinner style={{ color: "black" }} size="xl" />
            </div>
          ) : (
            <>
              {mediaList.length > 0 &&
                mediaList.map((ele, index) => {
                  return (
                    <div className="Media_card" key={index}>
                      <img
                        src={ele.video_thumbnail}
                        alt=""
                        className="media_img"
                      />
                      <div className="hover_card">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            padding: "10px",
                            width: "100%",
                          }}
                        >
                          {/* <img
                      src={icons.single_arrow}
                      alt=""
                      className="fit-image icon_img_double_arrow"
                      /> */}
                        </div>
                        <div
                          style={{
                            background: "rgba(0,0,0,0.2)",
                            padding: "5px 10px",
                            color: "white",
                            width: "100%",
                          }}
                          className="text-14-400"
                        >
                          {ele.title}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {mediaList.length === 0 && (
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <p className="text-18-600">Media not found!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MediaLibrary;
