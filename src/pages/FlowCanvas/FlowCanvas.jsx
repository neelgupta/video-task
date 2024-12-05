import React, { useCallback, useEffect, useState } from "react";
import "./FlowCanvas.scss";
import {
  Background,
  Controls,
  ReactFlow,
  NodeResizeControl,
  useNodesState,
  useEdgesState,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Resizer from "./reactflow/Resizer";
import QuestionMark from "./reactflow/QuestionMark";
import MenuBar from "./reactflow/MenuBar";
import TitleUndoRedo from "./reactflow/TitleUndoRedo/TitleUndoRedo";
import CreateFlowOptionsModal from "./Modals/CreateFlowOptionsModal";
import { useNavigate, useParams } from "react-router-dom";
import { api, TestApi } from "../../services/api";
import StartNode from "./reactflow/StartNode/StartNode";
import EndNode from "./reactflow/EndNode/EndNode";
import VideoCard from "./reactflow/VideoCard/VideoCard";
import ButtonEdge from "./reactflow/ButtonEdge/ButtonEdge";
import { useDispatch, useSelector } from "react-redux";
import {
  handelNodePosition,
  handleFetchFlowData,
  setQueModelConfig,
  setShowCreateFlowModal,
  throwError,
} from "../../store/globalSlice";
import Upload from "./Modals/Upload/Upload";
// import { showVideoModel } from "../../utils/helpers";

const nodeClassName = (node) => node.type;

const nodeTypes = {
  Start: StartNode,
  End: EndNode,
  Question: VideoCard,
};

const edgeTypes = {
  button: ButtonEdge,
};

const FlowCanvas = () => {
  const { id } = useParams();
  const { queModelConfig, showCreateFlowModal, newQueModalData } = useSelector(
    (state) => state.global
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCanvasLock, seyIsCanvasLock] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // if (nodes.length === 2) dispatch(setShowCreateFlowModal(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length]);

  const fetchFlowData = async () => {
    dispatch(
      handleFetchFlowData({
        id,
        setEdges,
        setNodes,
        navigate,
      })
    );
  };

  useEffect(() => {
    if (id) {
      fetchFlowData();
    } else {
      navigate("/user/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setPosition = async (change) => {
    seyIsCanvasLock(true);
    try {
      if (change) {
        const { id: node_id, position } = change;
        const req = {
          nodes: [
            {
              node_id,
              position,
            },
          ],
        };
        const res = await api.put("interactions/update-cordinates", req);
        console.log("res", res);
        if (res.status !== 200) {
          console.log("field");
          fetchFlowData();
        }
      }
    } catch (error) {
      console.log("error", error);
      fetchFlowData();
    }
    seyIsCanvasLock(false);
  };

  return (
    <>
      <CreateFlowOptionsModal
        show={showCreateFlowModal}
        handleClose={() => {
          dispatch(setShowCreateFlowModal(false));
        }}
      />
      {/* {queModelConfig.isShow && (
        <VideoModal
          show={queModelConfig.isShow}
          handleClose={() => {}}
        />
      )} */}

      {queModelConfig.modalType === "upload" && (
        <Upload
          show={queModelConfig.modalType === "upload"}
          handleClose={() => {
            dispatch(
              setQueModelConfig({ modalType: "", nodeId: null, isEdit: true })
            );
            fetchFlowData();
          }}
        />
      )}

      <div
        id="react_flow_canvas_body"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(change) => {
            onNodesChange(change);
            change.forEach((nodeChange) => {
              if (nodeChange.type === "position" && !nodeChange?.dragging) {
                setPosition(nodeChange);
              }
            });
          }}
          onEdgesChange={(change) => {
            console.log("onEdgesChange", change);
            onEdgesChange(change);
          }}
          className="react_flow_canvas"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          panOnScroll={!isCanvasLock} // Prevent panning using scroll
          zoomOnScroll={!isCanvasLock} // Prevent zooming using scroll
          zoomOnDoubleClick={!isCanvasLock} // Prevent zooming using double-click
          nodesDraggable={!isCanvasLock} // Disable dragging nodes
          nodesConnectable={!isCanvasLock} // Disable connecting nodes
          elementsSelectable={!isCanvasLock} // Disable selecting elements (nodes/edges)
        >
          <Background />
          <MiniMap zoomable pannable nodeClassName={nodeClassName} />
          <Background style={{ background: "#F1F1F1" }} />
          <Resizer />
          <QuestionMark />
          <MenuBar />
          <TitleUndoRedo />
        </ReactFlow>
      </div>
    </>
  );
};

export default FlowCanvas;
