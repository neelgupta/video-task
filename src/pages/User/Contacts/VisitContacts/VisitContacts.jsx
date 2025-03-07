import React, { useEffect, useState } from "react";
import styles from "./VisitContacts.module.scss";
import QnaFlow from "./QnaFlow";
import DirectMessage from "./DirectMessage";

const VisitContact = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className={styles.VisitContactContainer}>
      <div className={styles.VisitContactMenuTab}>
        <div
          onClick={() => {
            setSelectedTab(1);
          }}
          className={`${selectedTab === 1 ? styles.active : ""} text-14-500`}
        >
          Flōw AI
        </div>
        <div
          onClick={() => {
            setSelectedTab(2);
          }}
          className={`${selectedTab === 2 ? styles.active : ""} text-14-500`}
        >
          Direct Message
        </div>
      </div>
      <div className={styles.VisitContactContent}>
        {selectedTab === 1 && <QnaFlow />}
        {selectedTab === 2 && <DirectMessage />}
      </div>
    </div>
  );
};

export default VisitContact;
