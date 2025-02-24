import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./LibraryUpload.scss";
import { useDispatch, useSelector } from "react-redux";
import { AlignLeft, ArrowRight, List, X } from "lucide-react";
import {
  setLibraryModelConfig,
  setQueModelConfig,
  throwError,
} from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
import { VideoPlayer } from "../../../../components";

const interactionsStyle = {
  border_radius: 10,
  background_color: "#a200ff",
  primary_color: "#a200ff",
  secondary_color: "#a200ff",
  language: "en",
  font: "Arial",
};
function LibraryUpload({ show, handleClose }) {
  const dispatch = useDispatch();
  const { selectedOrganizationId } = useSelector((state) => state.global);
  const [activeTab, setActiveTab] = useState("video");
  const [libraryList, setLibraryList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getLibraryList = async () => {
    try {
      const res = await api.get(
        `interactions/get-library/${selectedOrganizationId}`
      );
      console.log("res", res);
      if (res.status === 200) {
        setLibraryList(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  useEffect(() => {
    if (selectedOrganizationId) {
      getLibraryList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  const handleUpload = (ele) => {
    dispatch(
      setLibraryModelConfig({
        isShow: false,
        libraryData: selectedVideo,
      })
    );
    dispatch(
      setQueModelConfig({
        isShow: true,
      })
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="library-upload-modal"
    >
      <div className="library-upload-container">
        <div className="library-upload-container-video">
          {!selectedVideo ? (
            <div className="library-upload-container-video-text">
              Select video
            </div>
          ) : (
            <div className="library-upload-container-video-view">
              <VideoPlayer
                flowStyle={interactionsStyle}
                videoUrl={selectedVideo.media_url}
                videoBlob={null}
                isBlob={false}
                videoConfigForm={{
                  alignVideo: false,
                  videoPosition: "center center",
                  overlayText: "",
                  textSize: "20px",
                  textReveal: [0],
                }}
              />
            </div>
          )}
        </div>
        <div className="library-upload-container-content">
          <div className="library-upload-header">
            <h2>Library Upload</h2>
            <div className="library-upload-header-close">
              <X className="close-icon" onClick={handleClose} />
            </div>
          </div>
          <div className="details-container">
            <div className="details-container-tab">
              <div
                className={`details-container-tab-item ${
                  activeTab === "video" ? "active" : ""
                }`}
                onClick={() => setActiveTab("video")}
              >
                Video
              </div>
              <div
                className={`details-container-tab-item ${
                  activeTab === "pixels" ? "active" : ""
                }`}
                onClick={() => setActiveTab("pixels")}
              >
                Pixels
              </div>
              <div
                className={`details-container-tab-item ${
                  activeTab === "giphy" ? "active" : ""
                }`}
                onClick={() => setActiveTab("giphy")}
              >
                Giphy
              </div>
            </div>
            <div style={{ width: "100%", height: "calc(100% - 140px)" }}>
              {activeTab === "video" && (
                <div className="details-container-description flow">
                  {libraryList.map((item, index) => (
                    <div
                      className="Media_card"
                      key={index}
                      onClick={() => {
                        setSelectedVideo(item);
                      }}
                    >
                      <video
                        src={item.media_url}
                        controls={false}
                        autoPlay={false}
                        muted
                        style={{ width: "auto", height: "100%" }}
                      />
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "pixels" && (
                <div className="details-container-description flow">
                  Not found
                </div>
              )}
              {activeTab === "giphy" && (
                <div className="details-container-description flow">
                  Not found
                </div>
              )}
            </div>

            <div className="details-container-button-group">
              <button
                className="details-container-button-group-cancel"
                onClick={() => {
                  setSelectedVideo(null);
                }}
              >
                <div>Cancel</div> <X />
              </button>
              <button
                className="details-container-button-group-upload"
                onClick={() => {
                  handleUpload();
                }}
              >
                <div>Upload</div> <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LibraryUpload;
