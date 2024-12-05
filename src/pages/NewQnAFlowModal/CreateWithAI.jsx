import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import "./CreateWithAI.scss";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, throwError } from "../../store/globalSlice";
import { api, TestApi } from "../../services/api";

const options = [
  { value: "english", label: "English" },
  { value: "dutch", label: "Dutch" },
  { value: "spanish", label: "Spanish" },
];
const CreateWithAI = ({ show, handleClose, createFlowModalSubmitData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxData = useSelector((state) => state.global);
  const { themeColor, selectedOrganizationId } = reduxData;
  const [errorMessage, setErrorMessage] = useState("");
  const [folderList, setFolderList] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    is_collect_contact: true,
    folder: "",
    language: { value: "english", label: "English" },
  });

  useEffect(() => {
    if (!createFlowModalSubmitData) navigate("/user/dashboard");
  }, [createFlowModalSubmitData, navigate]);

  useEffect(() => {
    if (selectedOrganizationId) fetchFolderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  const fetchFolderList = async () => {
    try {
      const res = await api.get(
        `interactions/get-folders/${selectedOrganizationId}`
      );
      if (res.status === 200 && res?.data?.response?.length > 0) {
        const folders = res.data.response.map((ele) => ({
          value: ele._id,
          label: ele.folder_name,
          is_default: ele.is_default,
        }));
        setFolderList(folders);
        setForm({
          ...form,
          folder: folders.find((o) => o.is_default),
        });
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  const handleSubmit = async () => {
    setIsCreate(true);
    if (form.title === "") {
      setErrorMessage("Title is required");
      setIsCreate(false);
      return;
    }
    try {
      const req = {
        title: form.title,
        is_collect_contact: form.is_collect_contact,
        folder_id: form.folder?.value || "",
        language: form.language?.value,
        interaction_type: createFlowModalSubmitData.type, // accept only Template, Scratch, FlowAI
        is_lead_crm: createFlowModalSubmitData.leadCRM === "yes",
        organization_id: selectedOrganizationId,
        flows: [
          {
            type: "Start",
            position: {
              x: 200,
              y: window.innerHeight / 2 - 200,
            },
            title: "Start",
          },
          {
            type: "End",
            position: {
              x: window.innerWidth - 300,
              y: window.innerHeight / 2 + 200,
            },
            title: "End",
          },
        ],
      };
      const res = await api.post("interactions/add-interactions", req);
      if (res.status === 201) {
        const { _id } = res.data.response;
        if (_id) {
          navigate(`/user/flow/${_id}`);
          dispatch(showSuccess(res.data.message));
        }
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsCreate(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="createWithAIContainer"
    >
      <div className="p-20 " style={{ zIndex: "100" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div
              className="text-24-700 text-center"
              style={{ color: "#1B2559" }}
            >
              Create New Flōw AI
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bodyContainer">
            <div className="form-items">
              <div className="text-16-500 mb-5">Title</div>
              <div>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="Name your QnAFlow"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "14px",
                  }}
                  required
                  name="title"
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value });
                  }}
                />
                {errorMessage && !form.title && (
                  <div
                    className="text-12-500 mt-5"
                    style={{ color: "var(--dc35)" }}
                  >
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
            <div className="form-items">
              <div className="text-16-500 mb-15">Collect Contact Details</div>
              <div className="d-flex gap-3 customChecksYesNoContainer">
                <div
                  onClick={() => setForm({ ...form, is_collect_contact: true })}
                  className={form.is_collect_contact && "active"}
                >
                  Yes
                </div>
                <div
                  onClick={() =>
                    setForm({ ...form, is_collect_contact: false })
                  }
                  className={!form.is_collect_contact && "active"}
                >
                  No
                </div>
              </div>
            </div>
            <div className="form-items">
              <div className="text-16-500 mb-5">Language</div>
              <div>
                <Select
                  options={options}
                  value={form.language}
                  name="language"
                  onChange={(option) => {
                    setForm({ ...form, language: option });
                  }}
                />
              </div>
            </div>
            <div className="form-items">
              <div className="text-16-500 mb-5">Folder</div>
              <div>
                <Select
                  options={folderList}
                  value={form.folder}
                  onChange={(option) => {
                    setForm({ ...form, folder: option });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="buttonContainer" onClick={handleSubmit}>
            <Button disabled={isCreate}>
              Create QnAFlow
              {isCreate && <Spinner size="sm" className="ms-10" />}
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default CreateWithAI;
