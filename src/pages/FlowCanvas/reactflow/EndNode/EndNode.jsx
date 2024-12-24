import React from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import "./EndNode.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function EndNode(props) {
  return (
    <div className="EndNode-container">
      <div className="EndNode-text text-18-600">
        <div className="end-node-header">End Screen</div>
        <Skeleton
          baseColor="#d0e6ff"
          highlightColor="#f0f7ff"
          width={120}
          borderRadius={"5px"}
          height={10}
        />
        <div
          className="wp-100"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="ps-10 pe-10 wp-50">
            <div>
              <Skeleton
                baseColor="#d0e6ff"
                highlightColor="#f0f7ff"
                borderRadius={"10px"}
                height={10}
              />
            </div>
            <div>
              <Skeleton
                baseColor="#d0e6ff"
                highlightColor="#f0f7ff"
                borderRadius={"10px"}
                width={50}
                height={10}
              />
            </div>
            <div className="custom-skeleton-btn">
              <div className="wrap">
                <div className="content"></div>
              </div>
            </div>
          </div>
          <div className="wp-50 h-70">
            <Skeleton
              baseColor="#d0e6ff"
              highlightColor="#f0f7ff"
              width={120}
              borderRadius={"10px"}
              height={70}
            />
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} className="dote-Left" />
      <Handle type="source" position={Position.Right} className="dote-Right" />
    </div>
  );
}

export default EndNode;
