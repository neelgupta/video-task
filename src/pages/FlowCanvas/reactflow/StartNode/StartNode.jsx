import React from "react";
import { Handle, Position } from "@xyflow/react";
import "./StartNode.scss";
function StartNode(props) {
  return (
    <div className="startNode-container">
      <div className="startNode-text text-18-600">Start</div>
      <Handle type="target" position={Position.Left} className="dote-Left" />
      <Handle type="source" position={Position.Right} className="dote-Right" />
    </div>
  );
}

export default StartNode;
