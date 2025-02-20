import { RemoveFormatting, ShieldClose } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { icons } from "../../../utils/constants";
import { creteImgFilter, encrypt } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { handelCatch, throwError } from "../../../store/globalSlice";
import { api } from "../../../services/api";
import LoaderCircle from "../../../components/layouts/LoaderCircle/LoaderCircle";

function LinkFlowModel({
  show,
  handleModalClose,
  selectedOrganizationId,
  setVideoAnswerForm,
  videoAnswerForm,
}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [interactionsList, setInteractionsList] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (selectedOrganizationId) {
      fetchAllInteraction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  useEffect(() => {
    if (search.length > 2) {
      fetchAllInteraction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const selectInt = (int) => {
    console.log("int", int);
    const token = encrypt({ id: int._id, type: "" });
    const url = `${window.location.origin}/view-flow/${token}`;
    setVideoAnswerForm({ ...videoAnswerForm, btn_url: url });
    handleModalClose();
  };

  const fetchAllInteraction = async () => {
    setIsLoad(true);
    try {
      const res = await api.get(
        `interactions/get-all-interaction/${selectedOrganizationId}?search=${search}`
      );
      if (res.status === 200) {
        setInteractionsList(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(false);
  };
  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      className="link-flow-modal"
      onHide={handleModalClose}
    >
      <div className="link-flow-container">
        <div className="link-flow-container-header">
          <div>Select a flow to redirect to....</div>
          <div
            className="w-30 h-30 "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50px",
              cursor: "pointer",
            }}
            onClick={handleModalClose}
          >
            <img src={icons.closeSvg} alt="" className="fit-image w-15 h-15" />
          </div>
        </div>

        <div className="link-int">
          <div className="link-int-search-container">
            <input
              type="text"
              placeholder="Search flow..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <img
              src={icons.search}
              alt=""
              className="fit-image w-20 h-20"
              style={{ filter: creteImgFilter("#7b5aff") }}
            />
          </div>
          <div className="link-int-group-container flow">
            {isLoad && (
              <div
                className="wp-100 hp-100"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LoaderCircle size={100} />
              </div>
            )}
            {!isLoad &&
              interactionsList.map((ele, index) => {
                console.log("ele", ele);
                return (
                  <div
                    className="link-int-group-container-card"
                    key={index}
                    onClick={() => {
                      selectInt(ele);
                    }}
                  >
                    <div>
                      <img src={ele.interaction_thumbnail} />
                    </div>
                    <p>{ele.title}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LinkFlowModel;
