import React, { useEffect, useState } from "react";
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
import VideoModal from "./VideoModal";
import { useDispatch, useSelector } from "react-redux";
import { handleSetQueModelData, throwError } from "../../store/globalSlice";
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
  const { queModelData } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCreateFlowModal, setShowCreateFlowModal] = useState(true);
  const [isCanvasLock, seyIsCanvasLock] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { id } = useParams();
  // const fetchFlow = async () => {
  //   try {
  //     const res = await getFlow(id);
  //     if (res.status !== 200) {
  //       dispatch(throwError(res.data.message || "Flow not found"));
  //     }
  //     const {
  //       data: {
  //         data: { nodes, edges },
  //         message,
  //       },
  //     } = res;
  //     if (nodes && edges && nodes.length > 1 && edges.length > 0) {
  //       setNodes(nodes.map((node) => ({ ...node, id: node._id })));
  //       setEdges(
  //         edges.map((edge) => ({ ...edge, id: edge._id, type: "button" }))
  //       );
  //     } else {
  //       dispatch(throwError(res.data.message || "Nodes & edges are empty"));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     dispatch(throwError(error.data.response.message || "Flow not found"));
  //     // navigate("/user/dashboard");
  //   }
  // };

  const fetchFlowData = async () => {
    try {
      const res = await api.get(`interactions/get-nodes/${id}`);
      console.log("res", res);
      if (res.status === 200) {
        const {
          data: {
            response: { edges, nodes },
          },
        } = res;
        if (nodes && edges && nodes.length > 1 && edges.length > 0) {
          setNodes(
            nodes.map((node, index) => ({
              ...node,
              id: node._id,
              index: index + 1,
              intId: id,
            }))
          );
          setEdges(
            edges.map((edge, index) => ({
              ...edge,
              id: edge._id,
              type: "button",
              index: index + 1,
              intId: id,
            }))
          );
        } else {
          dispatch(throwError("Nodes & edges are empty"));
        }
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error?.data?.response?.message || "Flow not found"));
      navigate("/user/dashboard");
    }
  };

  useEffect(() => {
    if (id) {
      fetchFlowData();
    } else {
      navigate("/user/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // const getFlow = async (id) => {
  //   try {
  //     return await TestApi.get(`/flow/get-flow/${id}`);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <>
      <CreateFlowOptionsModal
        show={showCreateFlowModal}
        handleClose={() => {
          setShowCreateFlowModal(false);
        }}
      />
      {queModelData.isShow && (
        <VideoModal
          show={queModelData.isShow}
          handleClose={() => dispatch(handleSetQueModelData.closeModel())}
        />
      )}

      <div
        id="react_flow_canvas_body"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
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
          {/* <Controls /> */}
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
