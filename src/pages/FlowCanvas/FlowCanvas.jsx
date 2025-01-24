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
import VideoCard from "./reactflow/VideoCard";
import ButtonEdge from "./reactflow/ButtonEdge/ButtonEdge";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  handelNodePosition,
  handleFetchFlowData,
  setNewQueModalData,
  setQueModelConfig,
  setShowCreateFlowModal,
  setWebcamModelConfig,
  throwError,
} from "../../store/globalSlice";
import Upload from "./Modals/Upload/Upload";
import DeleteModal from "../../components/layouts/DeleteModal";
import WebcamRecorder from "./Modals/WebcamRecorder/WebcamRecorder";
import RedirectCard from "./reactflow/RedirectCard";

// import { showVideoModel } from "../../utils/helpers";

const nodeClassName = (node) => node.type;

const nodeTypes = {
  Start: StartNode,
  End: EndNode,
  Question: VideoCard,
  Redirect: RedirectCard,
};

const edgeTypes = {
  button: ButtonEdge,
};

const FlowCanvas = () => {
  const { id } = useParams();
  const {
    queModelConfig,
    showCreateFlowModal,
    webcamModelConfig,
    interactionsStyle,
  } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCanvasLock, seyIsCanvasLock] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (nodes.length === 2) {
      const startNode = nodes.find((x) => x.type === "Start");
      const endNode = nodes.find((x) => x.type === "End");
      if (endNode && startNode) {
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
          dispatch(throwError("Field to move card."));
          fetchFlowData();
        }
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
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
      {webcamModelConfig.isShow && (
        <WebcamRecorder
          show={webcamModelConfig.isShow}
          recorderConfig={{
            audio: true,
            ...(queModelConfig.modalType === "Webcam"
              ? { video: true }
              : { screen: true }),
          }}
          modalType={queModelConfig.modalType}
          handleClose={() => {
            dispatch(
              setWebcamModelConfig({
                isShow: false,
                blobFile: null,
                blobUrl: "",
              })
            );
            dispatch(
              setQueModelConfig({
                modalType: "",
                nodeData: null,
                isEdit: false,
                isShow: false,
              })
            );
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
          onConnect={(connection) => {
            // connection contains source, target and other details
            const { source, target } = connection;

            // Here you can handle the connection logic, such as updating state, adding an edge, etc.
            setEdges((prevEdges) => [
              ...prevEdges,
              {
                id: `${source}-${target}`,
                source,
                target,
                type: "bezier", // or any other edge type you want to use
                animated: true,
              },
            ]);
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
          {/* <Background style={{ background: "#f1f1f1" }} gap={10000} size={0} /> */}
          <Background style={{ background: "#F8F6F1" }} gap={10000} size={0} />
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
