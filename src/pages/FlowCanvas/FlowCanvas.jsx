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
  setNewQueModalData,
  setQueModelConfig,
  setShowCreateFlowModal,
  throwError,
} from "../../store/globalSlice";
import Upload from "./Modals/Upload/Upload";
import DeleteModal from "../../components/layouts/DeleteModal";

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
    if (nodes.length === 2) {
      const startNode = nodes.find((x) => x.type === "Start");
      const endNode = nodes.find((x) => x.type === "End");
      const req = {
        targetId: endNode.id,
        sourceId: startNode.id,
        interaction_id: id,
        type: "Question",
        title: "untitled",
        positionX: (startNode.position.x + endNode.position.x) / 2 - 100,
        positionY: (startNode.position.y + endNode.position.y) / 2 - 125,
      };
      dispatch(setNewQueModalData(req));
      dispatch(setShowCreateFlowModal(true));
    }
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

      {queModelConfig.isShow && (
        <Upload
          show={queModelConfig.isShow}
          handleClose={() => {
            dispatch(
              setQueModelConfig({
                modalType: "",
                nodeData: null,
                isEdit: false,
                isShow: false,
              })
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
            onEdgesChange(change);
          }}
          onEdgeMouseEnter={(event, edge) => {
            setEdges((eds) =>
              eds.map((e) =>
                e.id === edge.id
                  ? { ...e, data: { ...e.data, isHover: true } }
                  : e
              )
            );
          }}
          onEdgeMouseLeave={(event, edge) => {
            setEdges((eds) =>
              eds.map((e) =>
                e.id === edge.id
                  ? { ...e, data: { ...e.data, isHover: false } }
                  : e
              )
            );
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
          <MiniMap zoomable pannable nodeClassName={nodeClassName} />
          <Background style={{ background: "#f1f1f1" }} gap={10000} size={0} />
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
