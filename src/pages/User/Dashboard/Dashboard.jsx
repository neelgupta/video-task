import { useDispatch, useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
import "./Dashboard.scss";
import { Button, CheckBox, Table } from "../../../components";
import { useEffect, useState } from "react";
import {
  creteImgFilter,
  getColorFromLetter,
  getDateRangeByTag,
} from "../../../utils/helpers";
import { api } from "../../../services/api";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import DeleteModal from "../../../components/layouts/DeleteModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const dashboardCard = [
  {
    title: "Total Landed",
    value: "landed",
    count: 0,
    icon: icons.eyeVisible,
    minWidth: "300",
  },
  {
    title: "Total Completed",
    count: 0,
    icon: icons.checkVerified,
    minWidth: "300",
    value: "completed",
  },
  {
    title: "Contacts collected",
    count: 0,
    icon: icons.usersOutline,
    minWidth: "330",
    value: "contacts_collected",
  },
];
function Dashboard() {
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor, profileData, selectedOrganizationId } =
    reduxData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [userUsesCard, setUserUsesCard] = useState(dashboardCard);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [isContactLoad, setIsContactLoad] = useState(true);
  const [interactionList, setInteractionList] = useState([]);
  const [isInteractionLoad, setIsInteractionLoad] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [paginationOption, setPaginationOption] = useState({
    currentPage: 0,
    pageSize: 5,
    count: 0,
  });

  useEffect(() => {
    if (selectedOrganizationId) {
      getCount();
      getContact();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  useEffect(() => {
    if (
      selectedOrganizationId &&
      tabIndex &&
      ((startDate && endDate) || (!startDate && !endDate))
    ) {
      getInteraction();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paginationOption.currentPage,
    selectedOrganizationId,
    startDate,
    endDate,
    searchText,
  ]);

  useEffect(() => {
    const obj = getDateRangeByTag(tabIndex);
    setStartDate(
      dateRange[0]
        ? dayjs(dateRange[0]).format("YYYY-MM-DD")
        : obj?.startDate || null
    );
    setEndDate(
      dateRange[1]
        ? dayjs(dateRange[1]).format("YYYY-MM-DD")
        : obj?.endDate || null
    );
  }, [dateRange, tabIndex]);

  useEffect(() => {
    const rowData = [];
    interactionList?.forEach((elem) => {
      let obj = [
        {
          value: <CheckBox className="s-18" />,
          className: "wp-5 justify-content-center",
        },
        {
          value: <div style={{ color: "#636363" }}>{elem.title}</div>,
          className: "wp-15 ",
        },
        {
          value: (
            <div>
              <span style={{ color: "#636363" }}>
                {dayjs(elem.createdAt).format("DD MMM YYYY")}
              </span>
            </div>
          ),
          className: "wp-15",
        },

        {
          value: <div style={{ color: "#636363" }}> {elem.landedCount}</div>,
          className: "wp-10 color-757f justify-content-center",
        },
        {
          value: <div style={{ color: "#636363" }}>{elem.contactCount}</div>,
          className: "wp-15 color-757f justify-content-center",
        },
        {
          value: (
            <div style={{ color: "#636363" }}> {elem.interactionCount} </div>
          ),
          className: "wp-15 color-757f justify-content-center",
        },

        {
          value: (
            <div
              className="f-center "
              onClick={() => {
                navigate(`/user/asset-allocation/${elem._id}`);
              }}
            >
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
              <div
                className="pointer h-16 w-16"
                onClick={() => {
                  navigate(`/user/flow/${elem._id}`);
                }}
              >
                <img
                  src={icons.edit}
                  alt="edit"
                  className="fit-image hover-icons-effect"
                />
              </div>
              <div
                className="pointer h-16 w-16"
                onClick={() => {
                  setShowDeleteModal(true);
                  setDeleteId(elem._id);
                }}
              >
                <img
                  src={icons.deleteSVG}
                  alt="eyeView"
                  className="fit-image deleteSVG-hover-icons-effect"
                />
              </div>
            </div>
          ),
          className: "wp-10 justify-content-end",
        },
      ];
      rowData.push({ data: obj });
    });
    setTableData(rowData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactionList]);

  const getCount = async () => {
    try {
      const res = await api.get(
        `dashboard/dashboard-count/${selectedOrganizationId}`
      );
      if (res.status === 200) {
        const data = res.data.response;
        const newArray = userUsesCard.map((ele) => {
          return {
            ...ele,
            count: data[ele.value],
          };
        });
        setUserUsesCard(newArray);
      } else {
        dispatch(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const getContact = async () => {
    setIsContactLoad(true);
    try {
      const res = await api.get(
        `dashboard/dashboard-contact/${selectedOrganizationId}`
      );
      if (res.status === 200) {
        setContactList(res.data.response || []);
      } else {
        dispatch(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsContactLoad(false);
  };

  const getInteraction = async () => {
    setIsInteractionLoad(true);
    try {
      const dataRange = getDateRangeByTag(tabIndex);
      const res = await api.get(
        `dashboard/dashboard-interaction/${selectedOrganizationId}?search=${searchText}&limit=${
          paginationOption.pageSize
        }&page=${paginationOption.currentPage}&startDate=${
          startDate || ""
        }&endDate=${endDate || ""}`
      );
      if (res.status === 200) {
        setInteractionList(
          res.data.response.Records.length > 0 ? res.data.response.Records : []
        );
        setPaginationOption({
          ...paginationOption,
          count: res.data?.response?.totalRecords || 0,
        });
      } else {
        dispatch(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsInteractionLoad(false);
  };

  const onPaginationChange = (page) => {
    setPaginationOption({
      ...paginationOption,
      currentPage: page,
    });
  };

  const handelDeleteInt = async (id) => {
    try {
      setIsDelete(true);
      const res = await api.delete(`interactions/delete-interactions/${id}`);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        getInteraction();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setShowDeleteModal(false);
    setIsDelete(false);
    setDeleteId("");
  };

  return (
    <div className="Dashboards-container">
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          onDelete={() => {
            handelDeleteInt(deleteId);
          }}
          isDelete={isDelete}
          title="Are you sure you want to proceed?"
          text="Once deleted, they cannot be recovered."
        />
      )}

      <div className="">
        <h5 className="text-30-500">
          Welcome Back{" "}
          <strong style={{ textTransform: "capitalize" }}>
            {profileData?.profile?.user_name || ""}
          </strong>
        </h5>
        <p className="text-19-400">
          {`Here's an overview of your stats for the last `}
          <strong className="text-19-600">All</strong> days
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
          <div className="card-body flow ">
            {isContactLoad ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Spinner size="lg" color="black" />
              </div>
            ) : (
              <>
                {contactList?.length > 0 ? (
                  contactList.map((contact, index) => {
                    const { contact_email, phone_number } = contact;
                    return (
                      <div key={index} className="user-card p-10 ">
                        <div
                          className="w-50 h-50 rounded-circle f-center text-22-800"
                          style={{
                            overflow: "hidden",
                            color: "white",
                            backgroundColor: contact_email
                              ? getColorFromLetter(
                                  contact_email?.charAt(0) || ""
                                )
                              : "#1B2559",
                          }}
                        >
                          {(contact_email
                            ? contact_email?.charAt(0) || ""
                            : "A"
                          )
                            .toString()
                            .toUpperCase()}
                        </div>
                        <div className="card-det">
                          <div className="p-0 m-0 text-14-400">
                            {contact_email}
                          </div>
                          <div
                            style={{
                              textWrap: "nowrap",
                              color: "rgba(127, 127, 127, 1)",
                            }}
                            className="text-12-400"
                          >
                            {phone_number || "-"}
                          </div>
                        </div>
                        <div className="f-center ms-10">
                          <Button
                            btnText="Connect"
                            className="text-14-500 h-30 ps-25 pe-25"
                            btnStyle="linear-gradient"
                            style={{ borderRadius: "50px" }}
                            onClick={() => {
                              navigate("/user/contacts/visit");
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="wp-100 hp-100 text-16-600"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Contact not found!
                  </div>
                )}
              </>
            )}
          </div>
          <div
            className="footer"
            style={{ fontSize: "14px", fontWeight: "300" }}
            onClick={() => {
              navigate("/user/contacts");
            }}
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
                  onClick={() => setTabIndex("all")}
                  className={tabIndex === "all" ? "active" : ""}
                >
                  All
                </div>
                <div
                  onClick={() => setTabIndex("today")}
                  className={tabIndex === "today" ? "active" : ""}
                >
                  Today
                </div>
                <div
                  onClick={() => setTabIndex("lastWeek")}
                  className={tabIndex === "lastWeek" ? "active" : ""}
                >
                  Last Week
                </div>
                <div
                  onClick={() => setTabIndex("lastMonth")}
                  className={tabIndex === "lastMonth" ? "active" : ""}
                >
                  Last One Month
                </div>
              </div>
              <div className="f-center date-btn">
                <div className="">
                  <img
                    src={icons.calendar}
                    alt=""
                    className="w-20 fit-image date-label"
                  />
                </div>
                <DatePicker
                  selected={dateRange[0]}
                  onChange={(dates) => setDateRange(dates)}
                  selectsRange
                  startDate={dateRange[0]}
                  endDate={dateRange[1]}
                  dateFormat="yyyy/MM/dd"
                  isClearable
                  className="custom-date-picker-input"
                  calendarClassName="custom-calendar"
                  placeholderText="Select a date range"
                />
              </div>
            </div>
            <div className="search-container">
              <div
                className="w-20 h-20 f-center ms-20 pointer"
                style={{ position: "absolute", left: "0px" }}
              >
                <img
                  src={icons.search}
                  alt=""
                  className="fit-image"
                  style={{ filter: creteImgFilter("#aaaaaa") }}
                />
              </div>
              <div className="w-300 flow-ai-input d-flex">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search..."
                  style={{ borderRadius: "5px", paddingLeft: "50px" }}
                />
              </div>
            </div>
          </div>
          <Table
            header={header}
            row={tableData}
            min="1000px"
            loader={isInteractionLoad}
            paginationOption={paginationOption}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
