import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewInteraction.scss";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { api } from "../../../services/api";
import { handelCatch } from "../../../store/globalSlice";
function ViewInteraction() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const data = query.get("data");
  const [queryParams, setQueryParams] = useState(null);
  const [key, setKey] = useState(0);
  const [queNodes, setQueNodes] = useState([]);
  const [endNodes, setEndNodes] = useState([]);
  const [intData, setIntData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setQueryParams(JSON.parse(data));
    }
  }, [data]);

  useEffect(() => {
    if (queryParams) {
      fetchInteraction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const fetchInteraction = async () => {
    try {
      const res = await api.get(`interactions/get-nodes/${queryParams.intId}`);
      if (res.status === 200) {
        const {
          response: { nodes, edges, ...intr },
        } = res.data;
        setIntData(intr);
        setQueNodes(nodes.filter((x) => x.type === "Question"));
        setEndNodes(nodes.find((x) => x.type === "End"));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
      navigate();
    }
  };

  const handleNext = (index) => {
    if (index === queNodes.length - 1) {
      setKey("End");
      return;
    }
    setKey(index + 1);
  };

  return (
    <div className="ViewInteraction-container">
      <div>{queryParams?.intId}</div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        className="mb-3"
        style={{ border: "none" }}
      >
        {queNodes.length > 0 &&
          queNodes.map((node, index) => {
            return (
              <Tab eventKey={index} key={index}>
                <div className="w-200 h-125">
                  <img
                    src={node.video_thumbnail}
                    alt=""
                    className="fit-image"
                  />
                </div>
                <button onClick={() => handleNext(index)}>Next</button>
              </Tab>
            );
          })}
        <Tab eventKey="End">
          <div>End</div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ViewInteraction;
