import React from "react";
import { contactsData } from "../constants";
import { icons } from "../../../../utils/constants";
import styles from "./AllContacts.module.scss";
import { Button } from "react-bootstrap";
import ContactCard from "../ContactCard";

const AllContacts = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.headerContainer}>
        <div>{contactsData.length} Contacts</div>
        <Button>
          <img alt="Add icon" src={icons.addContactIcon} />
          Add
        </Button>
      </div>
      {contactsData.map((contact, idx) => (
        <div key={contact.id}>
          <ContactCard contact={contact} />
        </div>
      ))}
    </div>
  );
};

export default AllContacts;
