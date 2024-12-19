import React from "react";
import { getTrackBackground, Range } from "react-range";
import { Button, Spinner } from "react-bootstrap";
import Select from "react-select";
import "./VideoConfiguration.scss";
import { TextArea } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import DropdownOption from "../../../../../components/inputs/DropdownOption/DropdownOption";
import { setWebcamModelConfig } from "../../../../../store/globalSlice";
import { icons } from "../../../../../utils/constants";

function VideoConfiguration({
  onSubmit,
  videoConfigForm,
  setVideoConfigForm,
  MAX,
  isCreate,
  setCurrentKey,
}) {
  const dispatch = useDispatch();
  const MIN = 0;
  const positionOption = [
    { value: "center center", label: "Center Center" },
    { value: "center start", label: "Center Left" },
    { value: "center end", label: "Center Right" },
    { value: "flex-start center", label: "Top Center" },
    { value: "flex-end center", label: "Bottom Center" },
    { value: "flex-start flex-start", label: "Top Left" },
    { value: "flex-start flex-end", label: "Top Right" },
    { value: "flex-end flex-start", label: "Bottom Left" },
    { value: "flex-end flex-end", label: "Bottom Right" },
  ];
  const sizeOption = [
    {
      label: "Extra Small",
      value: "20px",
    },
    {
      label: "Small",
      value: "22px",
    },
    {
      label: "Medium",
      value: "34px",
    },
    {
      label: "Large",
      value: "46px",
    },
    {
      label: "Extra Large",
      value: "58px",
    },
  ];

  const {
    queModelConfig: { nodeData, isEdit, modalType },
  } = useSelector((state) => state.global);
  console.log("modalType", modalType);

  const processDownloadVideo = async () => {
    try {
      if (!nodeData?.video_url) return;
      // Fetch the video file from the URL
      const response = await fetch(nodeData.video_url);

      // Ensure the request was successful
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      // Get the video data as a Blob
      const videoBlob = await response.blob();

      // Create a URL for the Blob
      const videoUrl = URL.createObjectURL(videoBlob);

      // Create a download link and trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = "flow-ai.mp4";
      downloadLink.click();

      URL.revokeObjectURL(videoUrl);
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  return (
    <div className="VideoConfiguration-container">
      {isEdit && (
        <>
          <h3 className="text-22-600 mb-10">Thumbnail</h3>
          <div className="thumbnail-content">
            <img src={nodeData.video_thumbnail} alt="" className="fit-image" />
            <div
              className="replace-btn"
              onClick={() => {
                if (modalType === "Webcam") {
                  dispatch(
                    setWebcamModelConfig({
                      isShow: true,
                      blobFile: null,
                      blobUrl: "",
                    })
                  );
                }
                if (modalType === "Upload") {
                  setCurrentKey(1);
                }
              }}
            >
              <div className="w-25">
                <img src={icons.replace} alt="" className="fit-image" />
              </div>
              <div>Replace</div>
            </div>

            <div className="download-btn" onClick={processDownloadVideo}>
              <img src={icons.download} alt="" className="fit-image w-15" />
            </div>
          </div>
        </>
      )}
      <h3 className="text-22-600 mb-20">Video</h3>
      <div className="align-option mb-20">
        <div className="text-18-500" style={{ color: "#7D8185" }}>
          Align Video
        </div>
        <div style={{ display: "flex" }}>
          <div
            onClick={() =>
              setVideoConfigForm((pre) => {
                return { ...pre, alignVideo: true };
              })
            }
            className={`align-btn ${videoConfigForm.alignVideo && "active"}`}
          >
            Yes
          </div>
          <div
            onClick={() =>
              setVideoConfigForm((pre) => {
                return { ...pre, alignVideo: false };
              })
            }
            className={`align-btn ${!videoConfigForm.alignVideo && "active"}`}
          >
            No
          </div>
        </div>
      </div>
      <div
        className="mb-20"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="text-18-500" style={{ color: "#7D8185" }}>
          Select video position Manually
        </div>
        <div className="w-200">
          <DropdownOption
            style={{}}
            isDisabled={videoConfigForm.alignVideo}
            options={positionOption}
            value={positionOption.find(
              (x) => x.value === videoConfigForm.videoPosition
            )}
            onChange={(select) => {
              setVideoConfigForm((pre) => {
                return { ...pre, videoPosition: select.value };
              });
            }}
          />
        </div>
      </div>
      <div className="Overlay-content">
        <h3 className="text-22-600 mt-20 mb-20">Overlay</h3>
        <div className="mb-20">
          <div className="text-18-500 mb-10" style={{ color: "#7D8185" }}>
            Overlay Text
          </div>
          <TextArea
            id="overlayText"
            placeholder="Enter Overlay Text ..."
            style={{ borderRadius: "10px" }}
            value={videoConfigForm.overlayText}
            onChange={(e) => {
              setVideoConfigForm((pre) => {
                return { ...pre, overlayText: e.target.value };
              });
            }}
          />
        </div>
        <div
          className="mb-20"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Text Size
          </div>
          <div className="w-220">
            <DropdownOption
              value={sizeOption.find(
                (x) => x.value === videoConfigForm.textSize
              )}
              isDisabled={!videoConfigForm.overlayText}
              onChange={(select) => {
                setVideoConfigForm((pre) => {
                  return { ...pre, textSize: select.value };
                });
              }}
              options={sizeOption}
            />
          </div>
        </div>
        <div
          className="mb-20"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-18-500" style={{ color: "#7D8185" }}>
            Fade/Reveal
          </div>
          <div className="slider-container">
            <Range
              values={videoConfigForm.textReveal}
              step={1}
              min={MIN}
              max={MAX}
              disabled={!videoConfigForm.overlayText}
              onChange={(values) => {
                setVideoConfigForm((pre) => {
                  return { ...pre, textReveal: values };
                });
              }}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      borderRadius: "4px",
                      background: getTrackBackground({
                        values: videoConfigForm.textReveal,
                        colors: [
                          videoConfigForm.overlayText
                            ? "#7b5aff"
                            : "rgba(0,0,0,0.3)",
                          "rgba(0,0,0,0.1)",
                        ],
                        min: MIN,
                        max: MAX,
                      }),
                      alignSelf: "center",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: isDragged ? "28px" : "28px",
                    width: isDragged ? "28px" : "28px",
                    borderRadius: "50%",
                    backgroundColor: isDragged ? "#7b5aff" : "#fff",
                    border: "2px solid",
                    borderColor: !videoConfigForm.overlayText
                      ? "rgba(0,0,0,0.3)"
                      : "#7b5aff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: isDragged ? "white" : "black",
                    fontWeight: "600",
                  }}
                >
                  {videoConfigForm.textReveal}
                </div>
              )}
            />
            <div className="slider-labels mt-10">
              <span style={{ color: "#7D8185" }} className="text-14-600">
                0 sec
              </span>
              <span style={{ color: "#7D8185" }} className="text-14-600">
                {MAX} sec
              </span>
            </div>
          </div>
        </div>
        <div className="p-20 pt-0">
          <Button
            className="text-18-600 wp-100 "
            style={{
              background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
              border: "none",
              padding: "10px 0px",
            }}
            onClick={onSubmit}
            disabled={isCreate}
          >
            Done
            {isCreate && <Spinner className="ms-10" size="sm" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VideoConfiguration;
