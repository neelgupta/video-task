import { useEffect, useState } from "react";
import "./AssetAllocation.scss";
import Metrics from "./Metrics";
import { useDispatch, useSelector } from "react-redux";
import Conversations from "./Conversations";
import { useNavigate, useParams } from "react-router-dom";
import { handelCatch, throwError } from "../../../store/globalSlice";
import { api } from "../../../services/api";
// import Conversations from "./Conversations/Conversations";
function AssetAllocation() {
  const { id } = useParams();
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor } = reduxData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(1);
  const [interactionDetails, setInteractionDetails] = useState({});
  const [contacts, setContacts] = useState("");
  const [results, setResults] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  const fetchAllConversationsAnswer = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(`interactions/get-interaction-answers/${id}`);
      if (res.status === 200) {
        const { interactionData, contactData } = res.data.response;
        setContacts(contactData);
        setInteractionDetails(interactionData || {});
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(true);
  };

  const fetchAllResultAnswer = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(`interactions/get-node-wise-answers/${id}`);
      if (res.status === 200) {
        const { groupedNodeAnswers, ...intData } = res.data.response;
        setResults(groupedNodeAnswers);
        setInteractionDetails(intData || {});
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
    if (selectedTab === 1) {
      fetchAllConversationsAnswer();
    }
    fetchAllResultAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return (
    <div className="AssetAllocation-container">
      <div className="AssetAllocation-menu-tab">
        <div
          onClick={() => {
            setSelectedTab(1);
          }}
          className={`${selectedTab === 1 ? "active" : ""} text-14-500`}
        >
          Conversations
        </div>
        <div
          onClick={() => {
            setSelectedTab(2);
          }}
          className={`${selectedTab === 2 ? "active" : ""} text-14-500`}
        >
          Results
        </div>
        <div
          onClick={() => {
            setSelectedTab(3);
          }}
          className={`${selectedTab === 3 ? "active" : ""} text-14-500`}
        >
          Metrics
        </div>
      </div>
      <div className="mt-20 ">
        {selectedTab === 1 && (
          <Conversations
            id={id}
            interactionDetails={interactionDetails}
            isLoad={isLoad}
            contacts={contacts}
            selectedType={"Conversations"}
          />
        )}
        {selectedTab === 2 && (
          <Conversations
            id={id}
            interactionDetails={interactionDetails}
            isLoad={isLoad}
            results={results}
            selectedType={"Results"}
          />
        )}
        {selectedTab === 3 && <Metrics />}
      </div>
    </div>
  );
}

export default AssetAllocation;
