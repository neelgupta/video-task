import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../../../services/api";
import { showSuccess, throwError } from "../../../../../store/globalSlice";

function EditOrganizationName({
  show,
  handleClose,
  OrganizationData,
  fetchOverview,
}) {
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
      const req = {
        organization_id: selectedOrganizationId,
        organization_name: name,
      };
      const res = await api.put("user/update-organization", req);
      if ([201, 200].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        handleClose();
        fetchOverview(true);
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className="text-20-600" style={{ color: "#1B2559" }}>
          Rename Organization
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="text-11-600">Organization Name</div>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="form-control rounded-3"
              placeholder="Enter Folder Name"
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "12px",
              }}
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
    </Modal>
  );
}

export default EditOrganizationName;
