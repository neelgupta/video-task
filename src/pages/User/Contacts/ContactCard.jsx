import React, { useState } from "react";
import styles from "./ContactCard.module.scss";
import { icons } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import AddEditContactModal from "./AddEditContactModal/AddEditContactModal";
import DeleteModal from "../../../components/layouts/DeleteModal";
import { creteImgFilter, getColorFromLetter } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
import { api } from "../../../services/api";

const ContactCard = ({ contact, onEdit, fetchContact }) => {
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const dispatch = useDispatch();
  const [isShowAddEditModal, setIsShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [favoriteClick, setFavoriteClick] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  const deleteContact = async () => {
    setIsDelete(true);
    try {
      const res = await api.delete(`contact/delete/${contact._id}`);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        fetchContact();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsDelete(false);
    setShowDeleteModal(false);
  };

  const handelFavorite = async () => {
    try {
      const req = {
        contact_id: contact._id,
        organization_id: selectedOrganizationId,
        is_favorite: !contact.is_favorite,
      };
      const res = await api.put(`contact/update`, req);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        fetchContact();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };
  return (
    <>
      <div className={`${styles.contactItemContainer} `}>
        <div className={`${styles.contactItemCard} ${styles.tableCell}`}>
          <div className="d-flex gap-4 ">
            <div className={`${styles.contactItems} d-flex align-items-center`}>
              <div
                className="w-50 h-50 rounded-circle f-center"
                style={{
                  overflow: "hidden",
                  color: "white",
                  backgroundColor: getColorFromLetter(
                    contact?.contact_email?.charAt(0) || ""
                  ),
                }}
              >
                <div
                  className="w-50 h-50 f-center text-22-800"
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  {(contact?.contact_email?.charAt(0) || "A")
                    .toString()
                    .toUpperCase()}
                </div>
              </div>
            </div>
            <div
              className={`d-flex flex-column align-items-start justify-content-center w-150`}
            >
              <div className="text-18-600">{contact?.contact_name || "-"}</div>
              <div className="text-12-500">{contact?.contact_email || "-"}</div>
              <div className="text-12-500" style={{ color: "#4D4AEA" }}>
                {contact?.phone_number || "-"}
              </div>
            </div>
          </div>
          <div
            className={` d-flex gap-2 align-items-center  pointer`}
            onClick={() => navigate("/user/contacts/visit")}
          >
            <div>
              <img src={icons.profileIcon} alt="Profile icon" />
            </div>
            <div style={{ color: "#1B2559" }}>Visit Contact</div>
          </div>
          <div
            className={` d-flex gap-2 align-items-center pointer`}
            onClick={() => {
              onEdit(contact);
            }}
          >
            <div>
              <img src={icons.editIcon} alt="Edit icon" />
            </div>
            <div>Edit Contact</div>
          </div>
          <div
            className={`d-flex gap-2 align-items-center pointer`}
            onClick={() => setShowDeleteModal(true)}
          >
            <div>
              <img
                src={icons.deleteIcon}
                alt="Trash icon"
                style={{ filter: creteImgFilter("#ff0000") }}
              />
            </div>
            <div style={{ color: "#ff0000" }}> Delete Contact </div>
          </div>

          <div className={`d-flex gap-2 align-items-center pointer`}>
            <div>
              <img src={icons.conversationIcon} alt="Interaction icon" />
            </div>
            <div>Start new Interaction</div>
          </div>

          <div
            className={` d-flex gap-2 align-items-center pointer`}
            onClick={() => handelFavorite()}
          >
            <div>
              {contact?.is_favorite ? (
                <img src={icons.fillHeartIcon} alt="Favorite icon" />
              ) : (
                <img src={icons.heartIcon} alt="Favorite icon" />
              )}
            </div>
            <div>{"Add to Favorite"}</div>
          </div>
        </div>
      </div>
      <AddEditContactModal
        show={isShowAddEditModal}
        handleClose={() => setIsShowAddEditModal(false)}
        isEdit
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          deleteContact();
          // TODO: Implement delete functionality here
        }}
        isDelete={isDelete}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
    </>
  );
};

export default ContactCard;
