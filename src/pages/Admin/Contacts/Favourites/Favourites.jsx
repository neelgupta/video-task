import React from "react";
import { contactsData } from "../constants";
import { icons } from "../../../../utils/constants";
import styles from "./Favourites.module.scss";
import { Button } from "react-bootstrap";
import ContactCard from "../ContactCard";

const RecentContacts = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.headerContainer}>
        <div>{contactsData.length} Contacts</div>
      </div>
      <div className={styles.tableWrapper}>
        {contactsData.map((contact, idx) => (
          <div key={contact.id}>
            <ContactCard contact={contact} isFavourite />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentContacts;
