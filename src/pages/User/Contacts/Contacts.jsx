import React, { useState } from "react";
import styles from "./Contacts.module.scss";
import RecentContacts from "./RecentContacts";
import Favourites from "./Favourites";
import AllContacts from "./AllContacts";

const Contacts = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <div className={styles.ContactsContainer}>
      <div className={styles.ContactsMenuTab}>
        <div
          onClick={() => {
            setSelectedTab(1);
          }}
          className={`${selectedTab === 1 ? styles.active : ""} text-14-500`}
        >
          Recent Contacts
        </div>
        <div
          onClick={() => {
            setSelectedTab(2);
          }}
          className={`${selectedTab === 2 ? styles.active : ""} text-14-500`}
        >
          All Contacts
        </div>
        <div
          onClick={() => {
            setSelectedTab(3);
          }}
          className={`${selectedTab === 3 ? styles.active : ""} text-14-500`}
        >
          Favourites
        </div>
      </div>
      <div className={styles.contactListContainer + " mt-20"}>
        {selectedTab === 1 && <RecentContacts />}
        {selectedTab === 2 && <AllContacts />}
        {selectedTab === 3 && <Favourites />}
      </div>
    </div>
  );
};

export default Contacts;
