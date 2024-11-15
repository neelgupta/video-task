import React, { useState } from "react";
import styles from "./FlowCanvas.scss";
import {
  Background,
  Controls,
  ReactFlow,
  NodeResizeControl,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CreateFlowOptionsModal from "./Modals/CreateFlowOptionsModal";
import Resizer from "../../components/reactflow/Resizer";
import QuestionMark from "../../components/reactflow/QuestionMark";
import MenuBar from "../../components/reactflow/MenuBar";
import TitleUndoRedo from "../../components/reactflow/TitleUndoRedo/TitleUndoRedo";

const FlowCanvas = () => {
  const [showCreateFlowModal, setShowCreateFlowModal] = useState(true);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow>
        <Background />
        {/* <Controls showFitView={false} showInteractive={false} /> */}
        <CreateFlowOptionsModal
          show={showCreateFlowModal}
          handleClose={setShowCreateFlowModal}
        />
        <Resizer />
        <QuestionMark />
        <MenuBar />
        <TitleUndoRedo />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
