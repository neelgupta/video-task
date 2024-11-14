import React, { useState } from "react";
import styles from "./VisitContacts.module.scss";
import QnaFlow from "./QnaFlow";
import DirectMessage from "./DirectMessage/DirectMessage";
import QnaFlowContext from "../../../../services/context/QnaContext/QnaFlowContext";

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
          QnAFlow
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
      <div className="mt-20 ">
        {selectedTab === 1 && (
          <QnaFlowContext>
            <QnaFlow />
          </QnaFlowContext>
        )}
        {selectedTab === 2 && (
          <QnaFlowContext>
            <QnaFlow isDirectMessageScreen />
          </QnaFlowContext>
        )}
      </div>
    </div>
  );
};

export default VisitContact;
