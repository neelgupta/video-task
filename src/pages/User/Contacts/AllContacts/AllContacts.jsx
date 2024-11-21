import React, { useState } from "react";
import { contactsData } from "../constants";
import { icons } from "../../../../utils/constants";
import styles from "./AllContacts.module.scss";
import { Button } from "react-bootstrap";
import ContactCard from "../ContactCard";
import AddEditContactModal from "../RecentContacts/AddEditContactModal";

const AllContacts = () => {
  const [isShowAddEditModal, setIsShowAddEditModal] = useState(false);
  return (
    <>
      <AddEditContactModal
        show={isShowAddEditModal}
        handleClose={() => setIsShowAddEditModal(false)}
        isEdit={false}
      />
      <div className={styles.contactContainer}>
        <div className={styles.headerContainer}>
          <div>{contactsData.length} Contacts</div>
          <Button onClick={() => setIsShowAddEditModal(true)}>
            <img alt="Add icon" src={icons.addContactIcon} />
            Add
          </Button>
        </div>
        <div className={styles.tableWrapper}>
          {contactsData.map((contact, idx) => (
            <div key={contact.id} className={styles.tableRow}>
              <ContactCard contact={contact} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllContacts;
