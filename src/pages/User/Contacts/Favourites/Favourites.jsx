import React, { useEffect, useState } from "react";
import { contactsData } from "../constants";
import { icons } from "../../../../utils/constants";
import styles from "./Favourites.module.scss";
import { Button } from "react-bootstrap";
import ContactCard from "../ContactCard";
import { handelCatch, throwError } from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import LoaderCircle from "../../../../components/layouts/LoaderCircle/LoaderCircle";
import AddEditContactModal from "../AddEditContactModal";

const FavoriteContacts = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const [isLoad, setIsLoad] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactsCount, setContactsCount] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [isShowAddEditModal, setIsShowAddEditModal] = useState(false);

  const fetchFavoriteContact = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(
        `contact/get-list/${selectedOrganizationId}?search=&type=favorites`
      );
      if (res.status === 200) {
        setContacts(res.data.response?.contactData || []);
        setContactsCount(res.data.response?.count || 0);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(true);
  };

  useEffect(() => {
    if (selectedOrganizationId) fetchFavoriteContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);
  return (
    <div className={styles.contactContainer}>
      {isShowAddEditModal && (
        <AddEditContactModal
          show={isShowAddEditModal}
          handleClose={() => {
            setEditContact(null);
            setIsEdit(false);
            setIsShowAddEditModal(false);
          }}
          selectedOrganizationId={selectedOrganizationId}
          isEdit={isEdit}
          editContact={editContact}
          fetchContact={fetchFavoriteContact}
        />
      )}
      {isLoad && (
        <div>
          <div className={styles.headerContainer}>
            <div>{contactsCount} Contacts</div>
          </div>
          <div className={styles.tableWrapper}>
            {contactsCount > 0 ? (
              contacts.map((contact, idx) => (
                <div key={contact.id}>
                  <ContactCard
                    contact={contact}
                    fetchContact={fetchFavoriteContact}
                    onEdit={(value) => {
                      setEditContact(value);
                      setIsEdit(true);
                      setIsShowAddEditModal(true);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="wp-100 f-center text-18-700">
                Favorite contact not found!
              </div>
            )}
          </div>
        </div>
      )}
      {!isLoad && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "200px",
            }}
          >
            <LoaderCircle size={150} />
            <div className="text-18-600 mt-10" style={{ color: "#1B2559" }}>
              We are getting things ready...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteContacts;
