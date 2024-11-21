import React, { useState } from "react";
import "./MediaLibrary.scss";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import { Button } from "react-bootstrap";
import UploadMedia from "./UploadMedia";
function MediaLibrary() {
  const [isUpload, setIsUpload] = useState(false);
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
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="search-container wp-70">
              <span className="d-flex">
                <img
                  src={icons.search}
                  alt="search"
                  className="fit-image icon-color-1B2559"
                />
              </span>
              <input type="text" placeholder="Search" />
            </div>
            <div className="btn-group">
              <div className="ms-20 w-40 h-30">
                <img
                  src={icons.control_menu}
                  alt=""
                  style={{ filter: creteImgFilter("#1B2559") }}
                  className="fit-image"
                />
              </div>
              <Button
                className="ms-20"
                style={{
                  border: "none",
                  background:
                    "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "15px",
                }}
                onClick={() => setIsUpload(true)}
              >
                <img
                  src={icons.imgUpload}
                  alt=""
                  style={{ filter: creteImgFilter("#ffffff") }}
                  className="fit-image w-15"
                />
                <span className="text-14-600">Upload Media</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="Media-gallery">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((ele, index) => {
            return (
              <div className="Media_card" key={index}>
                <img
                  src={icons.avatar9}
                  alt=""
                  className="fit-image media_img"
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
                    <img
                      src={icons.single_arrow}
                      alt=""
                      className="fit-image icon_img_double_arrow"
                    />
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
                    Title {index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MediaLibrary;
