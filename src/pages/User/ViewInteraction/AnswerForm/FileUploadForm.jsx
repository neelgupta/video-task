import React, { useState } from "react";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { VideoUpload } from "../../../../components";

function FileUploadForm({ onNext, node }) {
  const { answer_type, answer_format } = node;
  const [videoFile, setVideoFile] = useState(null);
  return (
    <div className="FileUploadForm-container">
      <div className="container">
        <div>
          <div className="mb-20">
            <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
              Title:
            </div>
            <div className="wp-100 InputBox">
              <input
                disabled
                type="text"
                name="title"
                placeholder="Enter title"
                className={`form-control`}
              />
            </div>
          </div>
          <div className="mb-20 wp-100 ">
            <div className={`text-12-600 mb-5`} style={{ color: "#666666" }}>
              Description:
            </div>
            <div className="InputBox">
              <textarea
                name="description"
                placeholder="Description..."
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  padding: "10px",
                  minHeight: "150px",
                  resize: "none",
                }}
                className={`form-control`}
              />
            </div>
          </div>
          <div className="mb-20 wp-100 ">
            <div
              className="text-12-600 mb-10 mt-20"
              style={{ color: "#666666" }}
            >
              Upload Video
            </div>

            <VideoUpload setFileValue={setVideoFile} videoFile={videoFile} />
          </div>
        </div>
        <div id="ans-btn-group" className="mb-30">
          <button className="next-btn" onClick={onNext}>
            <img
              src={icons.top_right_arrow}
              alt=""
              style={{
                transform: "rotate(45deg)",
                filter: creteImgFilter("#888888"),
              }}
              className="fit-image w-30"
            />
          </button>
          <button className="cancel-btn" onClick={() => {}}>
            <img
              src={icons.closeSvg}
              alt=""
              style={{ filter: creteImgFilter("#ffffff") }}
              className="fit-image w-12 pb-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadForm;
