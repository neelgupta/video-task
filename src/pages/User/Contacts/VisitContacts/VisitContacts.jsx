import React, { useEffect, useState } from "react";
import styles from "./VisitContacts.module.scss";
import QnaFlow from "./QnaFlow";
import DirectMessage from "./DirectMessage/DirectMessage";
import QnaFlowContext from "../../../../services/context/QnaContext/QnaFlowContext";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../../../../services/api";
import { handelCatch, throwError } from "../../../../store/globalSlice";

const VisitContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(1);
  const [answersDetails, setAnswersDetails] = useState([]);
  const [contact, setContact] = useState({});

  useEffect(() => {
    if (id) {
      fetchContactConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchContactConversation = async () => {
    try {
      const res = await api.get(`contact/contact-conversation/${id}`);
      if (res.status === 200) {
        const { answersDetails, ...contact } = res.data.response;
        setAnswersDetails(answersDetails);
        setContact(contact);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

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
          // onClick={() => {
          //   setSelectedTab(2);
          // }}
          className={`${selectedTab === 2 ? styles.active : ""} text-14-500`}
        >
          Direct Message
        </div>
      </div>
      <div className="mt-20 ">
        {selectedTab === 1 && (
          <QnaFlow contact={contact} answersDetails={answersDetails} />
        )}
        {selectedTab === 2 && <QnaFlow />}
      </div>
    </div>
  );
};

export default VisitContact;
