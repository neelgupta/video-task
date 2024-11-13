import React, { useState } from "react";
import styles from "./ContactCard.module.scss";
import { icons } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import AddEditContactModal from "./RecentContacts/AddEditContactModal";
import DeleteModal from "../../../components/layouts/DeleteModal";

const ContactCard = ({ contact, isFavourite }) => {
  const [isShowAddEditModal, setIsShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.contactItemContainer}>
        <div className={styles.contactItemCard}>
          <div className="d-flex gap-4 ">
            <div className={`${styles.contactItems} d-flex align-items-center`}>
              <div>
                <img src={icons.avatar7} alt="Profile icon" />
              </div>
            </div>
            <div
              className={`d-flex flex-column align-items-center justify-content-center`}
            >
              <div className="text-18-600">{contact?.name}</div>
              <div className="text-12-500">{contact?.email}</div>
              <div className="text-12-500" style={{ color: "#4D4AEA" }}>
                {contact?.mobile}
              </div>
            </div>
          </div>
          <div
            className={` d-flex gap-2 align-items-center  pointer`}
            onClick={() => navigate("/admin/contacts/visit")}
          >
            <div>
              <img src={icons.profileIcon} alt="Profile icon" />
            </div>
            <div style={{ color: "#1B2559" }}>Visit Contact</div>
          </div>
          <div
            className={` d-flex gap-2 align-items-center pointer`}
            onClick={() => {
              setIsShowAddEditModal(true);
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
              <img src={icons.deleteIcon} alt="Trash icon" />
            </div>
            <div>Delete Contact </div>
          </div>

          <div className={`d-flex gap-2 align-items-center pointer`}>
            <div>
              <img src={icons.conversationIcon} alt="Interaction icon" />
            </div>
            <div>Start new Interaction</div>
          </div>
          <div className={` d-flex gap-2 align-items-center pointer`}>
            <div>
              {isFavourite ? (
                <img src={icons.fillHeartIcon} alt="Favorite icon" />
              ) : (
                <img src={icons.heartIcon} alt="Favorite icon" />
              )}
            </div>
            <div>{!isFavourite && "Add to favourites"}</div>
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
          setShowDeleteModal(false);
          // TODO: Implement delete functionality here
        }}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
    </>
  );
};

export default ContactCard;
