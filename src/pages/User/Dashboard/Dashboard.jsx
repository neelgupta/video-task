import { useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
import "./Dashboard.scss";
import { Button, CheckBox, Table } from "../../../components";
import { useEffect, useState } from "react";
import { creteImgFilter } from "../../../utils/helpers";
function Dashboard() {
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor, profileData } = reduxData;
  console.log("profileData", profileData);
  const [tabIndex, setTabIndex] = useState(1);

  const header = [
    {
      title: <CheckBox className="s-18" />,
      className: "wp-5 justify-content-center color-darkText text-16-600",
    },
    {
      title: "Name",
      className: "wp-15 color-darkText text-16-600",
    },
    {
      title: "Created",
      className: "wp-15 color-darkText text-16-600",
    },
    {
      title: "Landed",
      className: "wp-10 justify-content-center color-darkText text-16-600",
    },
    {
      title: "Contacts collected",
      className: "wp-15 justify-content-center color-darkText text-16-600",
    },

    {
      title: "Total interactions",
      className: "wp-15 justify-content-center color-darkText text-16-600",
    },
    {
      title: "View All",
      className: "wp-10 justify-content-center color-darkText text-16-600",
    },
    {
      title: "Action",
      className: "wp-15 justify-content-center color-darkText text-16-600",
    },
  ];

  const data = [
    {
      name: "Analysis Name",
      created: "21.03.2021",
      landed: "1",
      contacts_collected: "1",
      interactions: "2",
    },
    {
      name: "Analysis Name",
      created: "21.03.2021",
      landed: "1",
      contacts_collected: "1",
      interactions: "2",
    },
    {
      name: "Analysis Name",
      created: "21.03.2021",
      landed: "1",
      contacts_collected: "1",
      interactions: "2",
    },
    {
      name: "Analysis Name",
      created: "21.03.2021",
      landed: "1",
      contacts_collected: "1",
      interactions: "2",
    },
    {
      name: "Analysis Name",
      created: "21.03.2021",
      landed: "1",
      contacts_collected: "1",
      interactions: "2",
    },
  ];

  const userUsesCard = [
    {
      title: "Total Landed",
      count: 5000,
      icon: icons.eyeVisible,
      minWidth: "300",
    },
    {
      title: "Total Completed",
      count: 50,
      icon: icons.checkVerified,
      minWidth: "300",
    },
    {
      title: "Contacts collected",
      count: 50,
      icon: icons.usersOutline,
      minWidth: "330",
    },
  ];

  const rowData = [];
  data?.forEach((elem) => {
    let obj = [
      {
        value: <CheckBox className="s-18" />,
        className: "wp-5 justify-content-center",
      },
      {
        value: <div style={{ color: "#636363" }}>{elem.name}</div>,
        className: "wp-15 ",
      },
      {
        value: (
          <div>
            <span style={{ color: "#636363" }}>{elem.created}</span>
          </div>
        ),
        className: "wp-15",
      },

      {
        value: <div style={{ color: "#636363" }}> {elem.landed}</div>,
        className: "wp-10 color-757f justify-content-center",
      },
      {
        value: (
          <div style={{ color: "#636363" }}>{elem.contacts_collected}</div>
        ),
        className: "wp-15 color-757f justify-content-center",
      },
      {
        value: <div style={{ color: "#636363" }}> {elem.interactions} </div>,
        className: "wp-15 color-757f justify-content-center",
      },

      {
        value: (
          <div className="f-center ">
            <img
              src={icons.top_right_arrow}
              alt="eyeView"
              className="fit-image w-16 hover-icons-effect"
              style={{ filter: creteImgFilter(themeColor.darkColor) }}
            />
          </div>
        ),
        className: "wp-10 color-757f justify-content-center",
      },

      {
        value: (
          <div className="f-center gap-3">
            <div className="pointer h-16 w-16" onClick={() => {}}>
              <img
                src={icons.edit}
                alt="edit"
                className="fit-image hover-icons-effect"
              />
            </div>
            <div className="pointer h-16 w-16">
              <img
                src={icons.deleteSVG}
                alt="eyeView"
                className="fit-image hover-icons-effect"
              />
            </div>
          </div>
        ),
        className: "wp-10 justify-content-end",
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="Dashboards-container">
      <div className="">
        <h5 className="text-30-500">
          Welcome Back{" "}
          <strong style={{ textTransform: "capitalize" }}>{` ${
            profileData.profile?.user_name || ""
          }`}</strong>
        </h5>
        <p className="text-19-400">
          {`Here's an overview of your stats for the last`}
          <strong className="text-19-600">30</strong> days
        </p>
      </div>
      <div className="big-card-body container-fluid row">
        {userUsesCard.map((ele, index) => {
          const { title, icon, count, minWidth } = ele;
          return (
            <div
              className={`${isResponsive ? "mb-20" : ""} big-card col-4`}
              style={{
                width: isResponsive ? "100%" : `max(${minWidth}px,31%)`,
              }}
              key={index}
            >
              <div className="fb-center">
                <div
                  className="text-25-400"
                  style={{
                    color: "rgba(28, 29, 29, 1)",
                  }}
                >
                  {title}
                </div>
                <div className="w-47 h-47 card-icon">
                  <img src={icon} alt="eyeView" className="fit-image w-35" />
                </div>
              </div>
              <div
                className="text-36-700 pt-10"
                style={{ color: "rgba(28, 29, 29, 1)" }}
              >
                {count}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-60">
        <h6 className="text-24-700 mb-30">Recent Contacts</h6>
        <div className="user-card-body">
          <div className="card-body auri-scroll ">
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <div key={index} className="user-card p-10 w-300">
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
                  <div className="card-det">
                    <div className="p-0 m-0 text-14-400">Neil</div>
                    <div
                      style={{
                        textWrap: "nowrap",
                        color: "rgba(127, 127, 127, 1)",
                      }}
                      className="text-12-400"
                    >
                      Added to contacts
                    </div>
                  </div>
                  <div className="f-center ms-10">
                    <Button
                      btnText="Connect"
                      className="text-14-500 h-30 ps-25 pe-25"
                      btnStyle="linear-gradient"
                      style={{ borderRadius: "50px" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="footer"
            style={{ fontSize: "14px", fontWeight: "300" }}
          >
            see more
          </div>
        </div>
      </div>
      <div className="pt-60">
        <h6 className="text-24-700 mb-30">Your Recent QnAFlow</h6>
        <div className="table-card">
          <div className="fb-center">
            <div className="table-header">
              <div className="tab-btn">
                <div
                  onClick={() => setTabIndex(1)}
                  className={tabIndex === 1 ? "active" : ""}
                >
                  All
                </div>
                <div
                  onClick={() => setTabIndex(2)}
                  className={tabIndex === 2 ? "active" : ""}
                >
                  Today
                </div>
                <div
                  onClick={() => setTabIndex(3)}
                  className={tabIndex === 3 ? "active" : ""}
                >
                  Last Week
                </div>
                <div
                  onClick={() => setTabIndex(4)}
                  className={tabIndex === 4 ? "active" : ""}
                >
                  Last One Month
                </div>
              </div>
              <div className="f-center date-btn">
                <div className="me-20">Created</div>
                <div className="w-18 h-18 f-center">
                  <img src={icons.calendar} alt="" className="w-20 fit-image" />
                </div>
              </div>
              <div className="w-24 h-24 f-center ms-20 pointer">
                <img
                  src={icons.search}
                  alt=""
                  className="w-20 fit-image hover-icons-effect"
                />
              </div>
            </div>
            <div className="w-50 h-50 f-center pointer">
              <img
                src={icons.deleteSVG}
                alt=""
                className="w-20 fit-image hover-icons-effect"
              />
            </div>
          </div>
          <Table header={header} row={rowData} min="1000px" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
