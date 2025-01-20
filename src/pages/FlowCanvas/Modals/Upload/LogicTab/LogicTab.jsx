import React, { useEffect, useRef, useState } from "react";
import "./LogicTab.scss";
import { icons } from "../../../../../utils/constants";
import { Switch } from "../../../../../components";
import { Button, Col, Spinner } from "react-bootstrap";
import { useReactFlow } from "@xyflow/react";
import { api } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../../store/globalSlice";
function LogicTab({ nodeData, onClose }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isAdvance, setIsAdvance] = useState(false);
  const [show, setShow] = useState(false);
  const [nodeOption, setNodeOption] = useState([]);
  const [targetNode, setTargetNode] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const menuRef = useRef(false);

  useEffect(() => {
    if (nodeOption.length > 0) {
      const endNode = nodeOption.find((ele) => ele.type === "End");
      setTargetNode(endNode);
    }
  }, [nodeOption]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    if (nodeData && id) {
      getNodeList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeData, id]);

  const getNodeList = async () => {
    try {
      const res = await api.get(
        `interactions/logic-nodes/${id}?selectedNodeId=${nodeData?._id}`
      );
      if (res.status === 200) {
        setNodeOption(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const handelSubmitLogic = async () => {
    setIsLoad(true);
    try {
      const req = {
        interactionId: id,
        selectedNodeId: nodeData?._id,
        newTargetId: targetNode?._id,
      };
      const res = await api.put(`interactions/update-edges`, req);
      if (res.status) {
        dispatch(showSuccess(res.data.message));
        onClose();
      } else {
        dispatch(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(false);
  };

  return (
    <div className="LogicTab-container">
      <div className="node-index">{nodeData.index}</div>
      <div className="selected-node-card">
        <div className="title-box" onClick={() => setShow((pre) => !pre)}>
          <div className="node-img">
            <img src={nodeData.video_thumbnail} alt="" className="w-50" />
          </div>
          <div className="node-label">
            <p>Always jump to</p>
            <img src={icons.arrowRight} alt="" />
          </div>
        </div>
        <div className="end-screen-label">
          {targetNode && targetNode.type !== "End" ? (
            <>
              <img
                src={targetNode?.video_thumbnail}
                alt=""
                className="target-node-image"
              />
              <div className="end-index">{targetNode?.index}</div>
            </>
          ) : (
            <>
              <img src={icons.hand} alt="" className="w-30 fit-image ms-10" />
              <div className="end-index">END</div>
            </>
          )}
        </div>
        {show && (
          <div className="jump-menu-container" ref={menuRef}>
            <p className="m-0 p-0 text-14-500 " style={{ color: "#aaa" }}>
              Choose your next stop
            </p>
            <div className="divider"></div>
            <div className="node-option-group">
              {nodeOption.map((ele, index) => {
                const active = targetNode?._id === ele._id;
                return ele.type !== "End" ? (
                  <div
                    className={`node-option ${
                      active ? "active-node-option" : ""
                    } `}
                    key={index}
                    onClick={() => setTargetNode(ele)}
                  >
                    <div className="node-det">
                      <div
                        className="node-option-img"
                        style={{ border: `1px solid goldenrod` }}
                      >
                        <img
                          src={ele.video_thumbnail}
                          alt=""
                          className="w-45"
                        />
                      </div>
                      <div className="text-16-500 ps-10">{ele.title}</div>
                    </div>
                    <div className="node-index">{ele.index}</div>
                  </div>
                ) : (
                  <div
                    className={`node-option ${
                      active ? "active-node-option" : ""
                    } `}
                    key={index}
                    onClick={() => setTargetNode(ele)}
                  >
                    <div className="node-det">
                      <div className="node-option-img">
                        <img src={icons.hand} alt="" className="w-35" />
                      </div>
                      <div className="text-16-500  ps-10">End Screen</div>
                    </div>
                    <div className="node-index text-12-500">END</div>
                  </div>
                );
              })}
            </div>
            <div className="divider"></div>
            <div className="redirect-input flow-ai-input">
              <div className="text-14-500 ps-5" style={{ color: "gray" }}>
                Redirect to URL
              </div>
              <input
                type="text"
                id="redirect"
                name="redirect"
                placeholder="Enter redirect url"
              />
            </div>
            <div className="pt-20">
              <Button
                className="text-18-600 wp-100 "
                style={{
                  background:
                    "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
                  border: "none",
                  padding: "10px 0px",
                }}
                onClick={() => {
                  handelSubmitLogic();
                }}
                disabled={isLoad}
              >
                Done
                {isLoad && (
                  <Spinner
                    size="sm"
                    style={{ color: "white" }}
                    className="ms-10"
                  />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="logic-divider"></div>
      <div className="advance-logic-container">
        <div className="advance-logic-input">
          <p>Advance Logic</p>
          <Switch
            isChecked={isAdvance}
            onChange={() => setIsAdvance((pre) => !pre)}
          />
        </div>
        <div className="pt-30">
          <Button
            className="text-18-600 wp-100 "
            style={{
              background: "linear-gradient(90deg, #7C5BFF 0%, #B3A1FF 100%)",
              border: "none",
              padding: "10px 0px",
            }}
            type="submit"
            onClick={() => {
              handelSubmitLogic();
            }}
            disabled={isLoad}
          >
            Done
            {isLoad && (
              <Spinner size="sm" style={{ color: "white" }} className="ms-10" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LogicTab;
