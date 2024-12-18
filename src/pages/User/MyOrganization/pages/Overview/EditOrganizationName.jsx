import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../../../services/api";
import {
  handleProfileStore,
  showSuccess,
  throwError,
} from "../../../../../store/globalSlice";
import "./Overview.scss";
import { css } from "@emotion/react";

const inputStyle = css`
  width: 100%;
  padding: 10px 15px;
  outline: none;
  border: 1px solid #cccccc;
  font-size: 16px;
  border-radius: 10px;
  color: #1b2559;
  box-shadow: none;

  &:focus {
    border-color: #7b5aff;
  }

  &:hover {
    border-color: #333333;
  }
`;
function EditOrganizationName({ show, handleClose }) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState({});
  const [isPost, setIsPost] = useState(false);
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedOrganizationId) fetchOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  useEffect(() => {
    if (organization) {
      setName(organization.organization_name || "");
    }
  }, [organization]);

  const fetchOrganization = async () => {
    try {
      const res = await api.get(`user/organization/${selectedOrganizationId}`);
      console.log("res", res);
      if (res.status === 200) {
        setOrganization(res.data.response);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
  };

  const handleSubmit = async () => {
    setIsPost(true);
    try {
      if (!name || name === "") {
        dispatch(throwError("Organization name is not allowed to be empty"));
        setIsPost(false);
        return;
      }
      const req = {
        organization_id: selectedOrganizationId,
        organization_name: name,
      };
      const res = await api.put("user/update-organization", req);
      console.log("res", res);
      if ([201, 200].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        dispatch(handleProfileStore());
        handleClose();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsPost(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="EditOrg-container"
    >
      <div className="p-20 w-500">
        <Modal.Header closeButton style={{ margin: "0px", padding: "0px" }}>
          <div className="text-20-600" style={{ color: "#1B2559" }}>
            Rename Organization
          </div>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-11-600 mb-5" style={{ color: "#666666" }}>
              Organization Name
            </div>
            <div className="InputBox">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="form-control rounded-3"
                placeholder="Enter Folder Name"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button
              style={{ width: "150px" }}
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              iconColor="#ffffff"
              className="f-center"
              style={{
                background:
                  "linear-gradient(91.9deg, #7B5BFF -2.22%, #B3A1FF 101.51%)",
                border: "none",
                color: "white",
                width: "150px",
              }}
              disabled={isPost}
            >
              Save
              {isPost && <Spinner size="sm" className="ms-10" />}
            </Button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default EditOrganizationName;
