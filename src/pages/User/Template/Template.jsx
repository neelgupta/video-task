import React, { useState } from "react";
import "./Template.scss";
import { icons } from "../../../utils/constants";
import FlowTemplate from "./FlowTemplate";
import { creteImgFilter, encrypt } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
import { api } from "../../../services/api";
import FolderSelectModel from "./FolderSelectModel";
import { Spinner } from "react-bootstrap";
const templateCategory = [
  {
    categoryId: "grow_qualify",
    title: "Grow and qualify your audience",
    children: [
      {
        id: 1,
        icons: icons.contact,
        title: "Contact Form",
        template_id: "67a9d7956741cfeedf286ca9",
      },
      {
        id: 2,
        icons: icons.filter,
        title: "Lead Generation",
        template_id: "67a9d7b76741cfeedf286cf1",
      },
      {
        id: 3,
        icons: icons.filter,
        title: "Lead Generation (Spanish)",
        template_id: "67a9d7d56741cfeedf286d42",
      },
      {
        id: 4,
        icons: icons.filter,
        title: "Lead Nurture",
        template_id: "67a9dc366741cfeedf2871fc",
      },
      {
        id: 5,
        icons: icons.filter,
        title: "Lead Qualification",
        template_id: "67a9e0fb6741cfeedf287669",
      },
      {
        id: 6,
        icons: icons.event,
        title: "Event Welcome",
        template_id: "67a9e3736741cfeedf28785b",
      },
    ],
  },
  {
    categoryId: "learn_improve",
    title: "Learn and improve",
    children: [
      {
        id: 7,
        icons: icons.rating,
        title: "Feedback Survey (NPS®)",
        template_id: "67a9e8d3543e98085da971cc",
      },
      {
        id: 8,
        icons: icons.bug,
        title: "Report an Issue",
        template_id: "67a9ead1543e98085da97305",
      },
    ],
  },
  {
    categoryId: "manage_recruitment",
    title: "Manage Recruitment",
    children: [
      {
        id: 9,
        icons: icons.officebriefcase,
        title: "Candidate Outreach",
        template_id: "67a9f1a8543e98085da976ef",
      },
      {
        id: 10,
        icons: icons.officebriefcase,
        title: "Job Application Form",
        template_id: "67a9f67f543e98085da979b0",
      },
      {
        id: 11,
        icons: icons.officebriefcase,
        title: "Applicant Screening",
        template_id: "67a9f8ba543e98085da97af7",
      },
      {
        id: 12,
        icons: icons.officebriefcase,
        title: "Interview Tips",
        template_id: "67a9fd89543e98085da97d6d",
      },
      {
        id: 13,
        icons: icons.officebriefcase,
        title: "Schedule Candidate Interview",
        template_id: "67aa0001543e98085da97eb1",
      },
      {
        id: 14,
        icons: icons.officebriefcase,
        title: "Async Job Interview",
        template_id: "67aa022a543e98085da9802c",
      },
      {
        id: 15,
        icons: icons.officebriefcase,
        title: "Interview Follow-Up",
        template_id: "67aadf5a70416cea99b80d1f",
      },
      {
        id: 16,
        icons: icons.officebriefcase,
        title: "Candidate Rejection & Feedback",
        template_id: "67aae3b070416cea99b80fb9",
      },

      {
        id: 17,
        icons: icons.officebriefcase,
        title: "Employee Onboarding",
        template_id: "67aae88070416cea99b81180",
      },
    ],
  },
  {
    categoryId: "turn_customers",
    title: "Turn customers into promoters",
    children: [
      {
        id: 18,
        icons: icons.usersetting,
        title: "Testimonials",
        template_id: "67aaec3370416cea99b81395",
      },
      {
        id: 19,
        icons: icons.usersetting,
        title: "Customer Case Study",
        template_id: "67aaf04970416cea99b815aa",
      },
    ],
  },
];
function Template() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { themeColor, selectedOrganizationId } = reduxData;
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [selectTemplates, setSelectTemplates] = useState(
    templateCategory?.[0].children?.[0]
  );
  const [isCopy, setIsCopy] = useState(false);

  const copyTemplate = async (folder) => {
    setIsCopy(true);
    try {
      const res = await api.post("template/copy-template", {
        interaction_id: selectTemplates?.template_id,
        folder_id: folder?._id,
      });
      if (res.status === 200) {
        console.log("res", res);
        dispatch(showSuccess(res.data.message));
        if (res.data?.response?.interaction_id)
          navigate(`/user/flow/${res.data?.response?.interaction_id}`);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsCopy(false);
  };

  return (
    <div className="Template">
      <FolderSelectModel
        show={showFolderModal}
        organization_id={selectedOrganizationId}
        handleClose={() => {
          setShowFolderModal(false);
        }}
        copyTemplate={(folder_id) => copyTemplate(folder_id)}
      />
      <div className="Template-container">
        <div className="Template-sidebar">
          <div className="sidebar-header">
            <div
              className="back_btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              <img src={icons.arrow_left} alt="" className="fit-image" />
              <p>Back to flow</p>
            </div>
            <div className="sidebar-title">
              <h1>Hi User 👋</h1>
              <h1>
                Need some inspiration? Take a look at our templates to get
                started :
              </h1>
            </div>
          </div>
          <div className="sidebar-menu auri-scroll">
            {templateCategory.map((menu) => {
              return (
                <>
                  <div className="menu-title">
                    <div>{menu.title}</div>
                    <span></span>
                  </div>
                  {menu.children.map((ele) => {
                    return (
                      <div
                        className={`Template-menu-card ${
                          selectTemplates?.id === ele.id && "active"
                        }`}
                        key={ele.id}
                        onClick={() => {
                          setSelectTemplates(ele);
                        }}
                      >
                        <div
                          className={`Template-menu-card-icon ${
                            selectTemplates?.id === ele.id && "active-icon"
                          }`}
                        >
                          <img
                            src={ele.icons}
                            alt=""
                            className="w-25 h-25 fit-image"
                            style={{
                              filter: creteImgFilter(
                                selectTemplates?.id === ele.id
                                  ? "#8000ff"
                                  : "#000000"
                              ),
                            }}
                          />
                        </div>
                        <div
                          className="Template-menu-card-text"
                          style={{
                            color:
                              selectTemplates?.id === ele.id
                                ? "#8000ff"
                                : "#000",
                          }}
                        >
                          {ele.title}
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
        <div className="Template-content">
          <div className="Template-content-header">
            <h1>{selectTemplates?.title}</h1>
            <div>
              <button
                onClick={() => {
                  setShowFolderModal(true);
                }}
                disabled={!selectTemplates?.template_id || isCopy}
              >
                {isCopy ? (
                  <div className="w-20 h-20">
                    <Spinner size="sm" />
                  </div>
                ) : (
                  <img
                    src={icons.copy}
                    alt=""
                    className="w-20 h-20 fit-image"
                  />
                )}
                <div>Use this template</div>
              </button>
              <button
                disabled={!selectTemplates?.template_id}
                onClick={() => {
                  const token = encrypt(selectTemplates.template_id);
                  window.open(`/view-flow/${token}/template`, "_blank");
                }}
              >
                <img src={icons.video} alt="" className="w-20 h-20 fit-image" />
                <div>Preview</div>
              </button>
            </div>
          </div>
          <div className="Template-content-info auri-scroll">
            {selectTemplates.template_id ? (
              <FlowTemplate templateId={selectTemplates.template_id} />
            ) : (
              <div
                className="wp-100 hp-100 "
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "900",
                }}
              >
                Template not fond.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
