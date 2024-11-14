import React, { useState } from "react";
import { contactsData } from "../constants";
import { icons } from "../../../../utils/constants";
import styles from "./RecentContact.module.scss";
import { Button } from "react-bootstrap";
import ContactCard from "../ContactCard";
import AddEditContactModal from "./AddEditContactModal";

const RecentContacts = () => {
  const [isShowAddEditModal, setIsShowAddEditModal] = useState(false);

  return (
    <>
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
      <AddEditContactModal
        show={isShowAddEditModal}
        handleClose={() => setIsShowAddEditModal(false)}
        isEdit={false}
      />
    </>
  );
};

export default RecentContacts;
