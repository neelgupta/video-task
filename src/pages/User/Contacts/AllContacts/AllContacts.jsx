import React, { useEffect, useState } from "react";
import { contactsData } from "../constants";
import { icons } from "../../../../utils/constants";
import styles from "./AllContacts.module.scss";
import { Button } from "react-bootstrap";
import ContactCard from "../ContactCard";
import AddEditContactModal from "../AddEditContactModal";
import { useDispatch, useSelector } from "react-redux";
import { handelCatch, throwError } from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
import LoaderCircle from "../../../../components/layouts/LoaderCircle/LoaderCircle";

const AllContacts = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const [isShowAddEditModal, setIsShowAddEditModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactCount, setContactsCount] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const fetchAllContact = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(
        `contact/get-list/${selectedOrganizationId}?search=&type=`
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
    if (selectedOrganizationId) fetchAllContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);
  return (
    <>
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
          fetchContact={fetchAllContact}
        />
      )}

      <div className={styles.contactContainer}>
        {isLoad && (
          <div>
            <div className={styles.headerContainer}>
              <div>{contactCount} Contacts</div>
              <Button
                onClick={() => {
                  setEditContact(null);
                  setIsEdit(false);
                  setIsShowAddEditModal(true);
                }}
              >
                <img alt="Add icon" src={icons.addContactIcon} />
                Add
              </Button>
            </div>
            <div className={styles.tableWrapper}>
              {contactCount > 0 ? (
                contacts.map((contact, idx) => (
                  <div key={contact.id} className={styles.tableRow}>
                    <ContactCard
                      contact={contact}
                      fetchContact={fetchAllContact}
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
                  Contact not found!
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
    </>
  );
};

export default AllContacts;
