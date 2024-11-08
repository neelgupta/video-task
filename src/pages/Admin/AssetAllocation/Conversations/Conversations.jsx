import React, { useState } from "react";
import "./Conversations.scss";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
function Conversations() {
  const [selectChat, setSelectChat] = useState(1);
  const [selectMetingCard, setSelectMetingCard] = useState(1);

  return (
    <div className="Conversations-container">
      <div className="Conversations-sidebar ">
        <div className="profile-det">
          <div className="w-89 h-79 profile-img">
            <img src={icons.avatar7} alt="" className="fit-image" />
          </div>
          <div className="det p-5 w-200 ms-10">
            <div className="text-18-600">Asset Allocation</div>
            <div className="fb-center mt-10">
              <div className="w-18">
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
              <div className="w-18">
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
        <div className="recent-chats">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px",
              paddingTop: "15px",
            }}
          >
            <div className="color-darkText text-14-600">Recent Chats</div>
            <div style={{ display: "flex", gap: "0px 10px" }}>
              <div className="w-24 h-24 f-center">
                <img
                  src={icons.double_arrow}
                  alt=""
                  className="fit-image hover-icons-effect w-18"
                />
              </div>
              <div className="w-24 h-24 f-center">
                <img
                  src={icons.control_menu}
                  alt=""
                  className="fit-image hover-icons-effect w-18"
                />
              </div>
            </div>
          </div>
          <div className="p-5 pt-20 hp-100 auri-scroll list">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, index) => {
              const isActive = ele === selectChat;
              return (
                <div
                  className="chat_card mb-20 pointer"
                  key={index}
                  onClick={() => setSelectChat(ele)}
                  style={{ background: isActive ? "#b19eff" : "white" }}
                >
                  <div className="d-flex ps-30">
                    <div
                      className="w-50 h-50 rounded-circle f-center"
                      style={{ overflow: "hidden" }}
                    >
                      <img
                        src={icons.avatar5}
                        alt="avatar"
                        className="fit-image "
                      />
                    </div>
                    <div style={{ padding: "5px", paddingLeft: "10px" }}>
                      <div
                        className="pb-5 text-14-500"
                        style={{ color: isActive ? "white" : "#1B2559" }}
                      >
                        Jacob Jones (3)
                      </div>
                      <div
                        className="text-12-500"
                        style={{ color: isActive ? "white" : "#8C8E90" }}
                      >
                        +1 123456789
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "30px",
                      height: "60px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="w-24 h-24">
                      <img
                        src={icons.three_dots}
                        alt=""
                        className="fit-image"
                        style={{
                          filter: creteImgFilter(
                            isActive ? "#ffffff" : "#8C8E90"
                          ),
                        }}
                      />
                    </div>
                    <div style={{ color: isActive ? "white" : "#8C8E90" }}>
                      5m
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="Conversations-body">
        <div className="h-90 Conversations-header">
          <div className="f-center">
            <div className="w-79 h-69 profile-img">
              <img src={icons.avatar7} alt="" className="fit-image" />
            </div>
            <div className="text-18-600 color-darkText ms-10">
              QnA Flow-Flow 2
            </div>
          </div>
          <div className="icon-group">
            <div className="w-20 h-20">
              <img
                src={icons.edit}
                alt=""
                className="fit-image hover-icons-effect"
              />
            </div>
            <div className="w-20 h-20">
              <img
                src={icons.teg_svg}
                alt=""
                className="fit-image hover-icons-effect"
              />
            </div>
            <div className="w-20 h-20">
              <img
                src={icons.exportPng}
                alt=""
                className="fit-image hover-icons-effect"
              />
            </div>
          </div>
        </div>
        <div className="Conversations-content"></div>
        <div className="Conversations-footer">
          <div className="meting-card-body">
            {[1, 2, 3].map((ele, index) => {
              const isActive = selectMetingCard === ele;
              return (
                <div
                  className="meting-card"
                  key={index}
                  onClick={() => setSelectMetingCard(ele)}
                  style={
                    isActive
                      ? {
                          borderBottom: "3px solid blue",
                        }
                      : {}
                  }
                >
                  <div className="w-100" style={{ position: "relative" }}>
                    <img src={icons.avatar8} alt="" className="fit-image" />
                    <div className="img-btn w-100">
                      <div className="text-12-500">Jacob</div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="text-11-500 color-darkText m-0 p-0 mt-10">
                      29 OCT 24 | 09:36
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversations;
