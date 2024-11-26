import React, { useState } from "react";
import styles from "./FlowCanvas.scss";
import {
  Background,
  Controls,
  ReactFlow,
  NodeResizeControl,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Resizer from "../../components/reactflow/Resizer";
import QuestionMark from "../../components/reactflow/QuestionMark";
import MenuBar from "../../components/reactflow/MenuBar";
import TitleUndoRedo from "../../components/reactflow/TitleUndoRedo/TitleUndoRedo";
import CreateFlowOptionsModal from "./Modals/CreateFlowOptionsModal";
import VideoModal from "./Modals/VideoModal";
import { useParams } from "react-router-dom";

const FlowCanvas = () => {
  const [showCreateFlowModal, setShowCreateFlowModal] = useState(true);
  const [showVideoEditModal, setShowVideoEditModal] = useState(false);

  return (
    <>
      <CreateFlowOptionsModal
        show={showCreateFlowModal}
        handleClose={() => {
          setShowCreateFlowModal(false);
          setShowVideoEditModal(true);
        }}
      />
      <VideoModal
        show={showVideoEditModal}
        handleClose={() => setShowVideoEditModal(false)}
      />
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow>
          <Background />

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
