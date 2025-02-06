import React, { useState } from "react";
import { useSelector } from "react-redux";
import { icons } from "../../../../utils/constants";
import { creteImgFilter, encrypt } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import ShareView from "../../ShareView";

function MetricsHeader({ interaction, setSelectedTab, selectedTab }) {
  const reduxData = useSelector((state) => state.global);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [shareUrl, setShareUrl] = useState("");
  const { isResponsive, themeColor } = reduxData;
  return (
    <div
      className="Metrics-header"
      style={
        isResponsive ? { flexDirection: "column" } : { alignItems: "center" }
      }
    >
      {shareUrl !== "" && (
        <ShareView
          show={shareUrl !== ""}
          handleClose={() => setShareUrl("")}
          shareUrl={shareUrl}
        />
      )}
      <div className="profile-det">
        <div
          className="w-89 h-79 profile-img"
          onClick={() => {
            const token = encrypt(interaction._id);
            window.open(`/view-flow/${token}`, "_blank");
          }}
        >
          <img src={interaction?.thumbnailUrl || ""} alt="" className="" />
          <div className="redirect-icons">
            <img
              src={icons.top_right_arrow}
              alt=""
              className="fit-image "
              style={{ filter: creteImgFilter("#ffffff") }}
            />
          </div>
        </div>
        <div className="det p-5 w-200 ms-10">
          <div className="text-18-600">{interaction?.title || ""}</div>
          <div className="fb-center mt-10">
            <div
              className="w-18"
              onClick={() => navigate(`/user/flow/${interaction._id}`)}
            >
              <img
                src={icons.branch}
                alt=""
                className="fit-image hover-icons-effect"
              />
            </div>
            <div className="w-18">
              <img
                src={icons.downloads_box}
                alt=""
                className="fit-image hover-icons-effect"
              />
            </div>
            <div
              className="w-18"
              onClick={() => {
                const token = encrypt(interaction._id);
                const url = `${window.location.origin}/view-flow/${token}`;
                setShareUrl(url);
              }}
            >
              <img
                src={icons.link}
                alt=""
                className="fit-image hover-icons-effect"
              />
            </div>
            <div className="w-18">
              <img
                src={icons.screen}
                alt=""
                className="fit-image hover-icons-effect"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="header-menu"
        style={isResponsive ? { paddingTop: "20px", width: "100%" } : {}}
      >
        <div
          className={`f-center menu ${selectedTab === "all" && "active"} ${
            isResponsive ? "p-5" : "p-15"
          }`}
          onClick={() => setSelectedTab("all")}
        >
          <div className="w-18 h-18">
            <img
              src={icons.allDevices}
              alt=""
              className="fit-image"
              style={{
                filter: creteImgFilter(
                  selectedTab === "all" ? themeColor.darkColor : "#757F95"
                ),
              }}
            />
          </div>
          <div className="ms-15 text-14-500">All Devices</div>
        </div>
        <div
          className={`f-center menu ${selectedTab === "desktop" && "active"} ${
            isResponsive ? "p-5" : "p-15"
          }`}
          onClick={() => setSelectedTab("desktop")}
        >
          <div className="w-18 h-18">
            <img
              src={icons.desktop}
              alt=""
              className="fit-image"
              style={{
                filter: creteImgFilter(
                  selectedTab === "desktop" ? themeColor.darkColor : "#757F95"
                ),
              }}
            />
          </div>
          <div className="ms-15 text-14-500">Desktop</div>
        </div>
        <div
          className={`f-center menu ${selectedTab === "mobile" && "active"} ${
            isResponsive ? "p-5" : "p-15"
          }`}
          onClick={() => setSelectedTab("mobile")}
        >
          <div className="w-18 h-18">
            <img
              src={icons.mobile}
              alt=""
              className="fit-image"
              style={{
                filter: creteImgFilter(
                  selectedTab === "mobile" ? themeColor.darkColor : "#757F95"
                ),
              }}
            />
          </div>
          <div className="ms-15 text-14-500">Mobile</div>
        </div>
        <div
          className={`f-center menu ${selectedTab === "tablet" && "active"} ${
            isResponsive ? "p-5" : "p-15"
          }`}
          onClick={() => setSelectedTab("tablet")}
        >
          <div className="w-18 h-18">
            <img
              src={icons.tablet}
              alt=""
              className="fit-image"
              style={{
                filter: creteImgFilter(
                  selectedTab === "tablet" ? themeColor.darkColor : "#757F95"
                ),
              }}
            />
          </div>
          <div className="ms-15 text-14-500">Tablet</div>
        </div>
        <div
          className={`f-center menu ${selectedTab === "others" && "active"} ${
            isResponsive ? "p-5" : "p-15"
          }`}
          onClick={() => setSelectedTab("others")}
        >
          <div className="w-18 h-18">
            <img
              src={icons.others}
              alt=""
              className="fit-image"
              style={{
                filter: creteImgFilter(
                  selectedTab === "others" ? themeColor.darkColor : "#757F95"
                ),
              }}
            />
          </div>
          <div className="ms-15 text-14-500">Others</div>
        </div>
      </div>
    </div>
  );
}

export default MetricsHeader;
