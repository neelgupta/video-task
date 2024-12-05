import React from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import "./EndNode.scss";
function EndNode(props) {
  return (
    <div className="EndNode-container">
      <div className="EndNode-text text-18-600">End</div>
      <Handle type="target" position={Position.Left} className="dote-Left" />
      <Handle type="source" position={Position.Right} className="dote-Right" />
    </div>
  );
}

export default EndNode;
