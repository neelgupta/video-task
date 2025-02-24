import React, { useEffect, useState } from "react";
import "./MediaLibrary.scss";
import { Button, Modal, Spinner } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { VideoUpload } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";
import { api } from "../../../../../services/api";

function UploadMedia({ onHide, show, fetchMediaList }) {
  const dispatch = useDispatch();
  const { selectedOrganizationId } = useSelector((state) => state.global);
  const [form, setForm] = useState({
    file: null,
    title: "",
    descriptions: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = (value) => {
    if (!value.file) {
      dispatch(throwError("file required"));
      return false;
    }
    if (!value.title) {
      dispatch(throwError("title required"));
      return false;
    }

    return true;
  };
  const onSubmit = async () => {
    if (!isFormValid(form)) {
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("media", form.file);
      formData.append("title", form.title);
      formData.append("description", form.descriptions);
      formData.append("organization_id", selectedOrganizationId);
      formData.append("media_type", "library");
      formData.append("is_link", false);
      const response = await api.post("user/upload-media", formData, {
        "Content-Type": "multipart/form-data",
      });
      if (response.status === 201) {
        dispatch(showSuccess("Media uploaded successfully"));
        setForm({
          file: null,
          title: "",
          descriptions: "",
        });
        onHide();
        fetchMediaList();
      } else {
        dispatch(throwError(response.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal onHide={onHide} show={show} centered className="UploadMedia-Model">
      <Modal.Body>
        <div style={{ width: "600px" }} className="pt-15 ps-15 pe-15">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="wp-100"
          >
            <div className="text-24-700" style={{ color: "#1B2559" }}>
              Upload Media
            </div>
            <div className="w-20 pointer" onClick={onHide}>
              <img src={icons.close} alt="" className="fit-image" />
            </div>
          </div>
          <div
            className="text-12-500 mt-5"
            style={{ color: "#989BA1", textAlign: "start" }}
          >
            Add new team members to collaborate and achieve your goals together.
          </div>
          <div className="mt-30">
            <VideoUpload
              videoFile={form.file}
              setFileValue={(file) => setForm({ ...form, file })}
            />
            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Title:
              </div>
              <div>
                <input
                  className="input wp-100"
                  type="text"
                  name="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  id="Title"
                  placeholder="Title"
                />
              </div>
            </div>

            <div className="mt-20">
              <div
                className="text-12-500 ps-5 pb-5"
                style={{ color: "#666666", textAlign: "start" }}
              >
                Description::
              </div>
              <div>
                <textarea
                  className="input wp-100"
                  name="Title"
                  id="Title"
                  placeholder="Descriptions"
                  rows={4}
                  value={form.descriptions}
                  onChange={(e) =>
                    setForm({ ...form, descriptions: e.target.value })
                  }
                  style={{ resize: "none" }}
                />
              </div>
            </div>
          </div>
          <div
            className="wp-100"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              margin: "20px 0px",
            }}
          >
            <Button
              style={{
                background: "#8C8E90",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              className="text-14-500 w-150 p-10"
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button
              style={{
                background:
                  "linear-gradient(91.9deg, #7B5BFF -2.22%, #B3A1FF 101.51%)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={onSubmit}
              className="text-14-500 w-150 p-10 ms-10"
            >
              Upload
              {isLoading && (
                <Spinner animation="grow" size="sm" className="ms-10" />
              )}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UploadMedia;
