import { useNavigate } from "react-router-dom";
import { icons } from "../../../utils/constants";
import "./mediaSelect.scss";
import Modal from "react-bootstrap/Modal";

import { creteImgFilter } from "../../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import { BiWebcam } from "react-icons/bi";
import { LuScreenShare } from "react-icons/lu";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoLibrarySharp } from "react-icons/io5";
import UploadVideo from "./UploadVideo/UploadVideo";

const MediaSelect = () => {
  const navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [tab, setTab] = useState(1);

  const videoRef = useRef(null);

  const onHide = () => {
    navigate("/new/board");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onHide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //for web camera

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsCameraOn(false);
  };

  return (
    <Modal
      centered
      show
      onHide={onHide}
      fullscreen
      className="create-video-start"
    >
      <div className="p-34 modal-b hp-95" style={{ width: "100vw" }}>
        <div className="d-flex justify-content-end">
          <div>
            <img
              src={icons.close}
              alt="close"
              className="fit-image h-18 w-18 pointer d-block"
              onClick={onHide}
              style={{
                filter: creteImgFilter("#8000ff"),
              }}
            />
            <span className="color-sColor text-12-400">ESC</span>
          </div>
        </div>
        <div className="media-content">
          {tab === 1 && (
            <form className="media-form">
              <p className="mb-30 text-22-500 color-19232b0a">
                How would you like to create this step?
              </p>
              <div className="row gy-3 wp-100 overflow-y-auto">
                <div className="col-12">
                  <div
                    className="media-card"
                    onClick={isCameraOn ? stopCamera : startCamera}
                  >
                    <BiWebcam size={70} color="#8000ff" />
                    <span className="text-16-500 mt-10">Webcam</span>
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className="media-card">
                    <LuScreenShare size={70} color="#8000ff" />
                    <span className="text-16-500 mt-10">Screen Share</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="media-card"
                    onClick={() => {
                      setSelectedType("upload");
                      setTab(2);
                    }}
                  >
                    <MdOutlineCloudUpload size={70} color="#8000ff" />
                    <span className="text-16-500 mt-10">Upload</span>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="media-card">
                    <IoLibrarySharp size={70} color="#8000ff" />
                    <span className="text-16-500 mt-10">Library</span>
                  </div>
                </div>
              </div>
            </form>
          )}
          {tab === 2 && selectedType === "upload" ? (
            <UploadVideo
              onBack={() => {
                setTab((prev) => prev - 1);
                setSelectedType(null);
              }}
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default MediaSelect;
