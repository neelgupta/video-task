import React, { useState } from "react";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import UploadFile from "../../../../components/layouts/UploadFile";
import { throwError } from "../../../../store/globalSlice";
import { useDispatch } from "react-redux";
import "./AnswerForm.scss";
import { Spinner } from "react-bootstrap";

function FileUploadForm({ onNext, node, isPost }) {
  const { answer_type, answer_format } = node;
  const dispatch = useDispatch();
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
                type="text"
                name="title"
                value={answer_format?.title || ""}
                placeholder="Enter title"
                className="form-control"
                style={{
                  background: "#f1f1f1",
                }}
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
                value={answer_format?.description || ""}
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  padding: "10px",
                  minHeight: "150px",
                  resize: "none",
                  background: "#f1f1f1",
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

            <UploadFile setFileValue={setVideoFile} videoFile={videoFile} />
          </div>
        </div>
        <div id="ans-btn-group" className="mb-30">
          <button
            className="next-btn"
            onClick={() => {
              if (!videoFile) {
                dispatch(throwError("Please enter an answer."));
                return;
              }
              if (!isPost) {
                onNext({ ans: videoFile });
              }
            }}
          >
            {isPost ? (
              <Spinner size="lg" color="#888888" />
            ) : (
              <img
                src={icons.top_right_arrow}
                alt=""
                style={{
                  transform: "rotate(45deg)",
                  filter: creteImgFilter("#888888"),
                }}
                className="fit-image w-30"
              />
            )}
          </button>
          <button className="cancel-btn" onClick={() => setVideoFile(null)}>
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
