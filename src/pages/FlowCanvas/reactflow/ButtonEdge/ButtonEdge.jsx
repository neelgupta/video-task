import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { useNavigate, useParams } from "react-router-dom";
import { icons } from "../../../../utils/constants";
import "./ButtonEdge.scss";
import { creteImgFilter } from "../../../../utils/helpers";
import { useDispatch } from "react-redux";
import {
  setNewQueModalData,
  setShowCreateFlowModal,
} from "../../../../store/globalSlice";
function ButtonEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
  intId,
  index,
  data: { isHover },
}) {
  const { setEdges, setNodes } = useReactFlow();
  const { id: flowId } = useParams();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createQuestion = async () => {
    const req = {
      targetId: target,
      sourceId: source,
      interaction_id: flowId,
      type: "Question",
      title: "untitled",
      positionX: (sourceX + targetX) / 2 - 100,
      positionY: (sourceY + targetY) / 2 - 125,
    };
    dispatch(setNewQueModalData(req));
    dispatch(setShowCreateFlowModal(true));
  };
  return (
    <>
      <defs>
        {selected && (
          <linearGradient
            id="gradient-border"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="27.43%" stopColor="#68c7e8" />
            <stop offset="35.64%" stopColor="#68c7e8" />
            <stop offset="60%" stopColor="#fb82c1" />
          </linearGradient>
        )}
      </defs>

      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: selected ? `url(#gradient-border)` : "#393939",
          strokeWidth: selected ? 4 : isHover ? 3 : 2,
          strokeLinecap: "square",
        }}
        className="custom-edge-path"
      />
      {(isHover || selected) && (
        <path
          d={edgePath}
          stroke={selected ? "#fff" : "#f1f1f1"}
          strokeWidth={selected ? "1" : "4"}
          fill="none"
          strokeDasharray={selected ? "5,10" : "5,10"}
          strokeLinecap="square"
          strokeLinejoin="square"
          className="edge-border"
          style={{
            animation: `moveBorder 2s linear infinite`,
          }}
        />
      )}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button
            className="edgebutton"
            onClick={(e) => {
              e.preventDefault();
              createQuestion();
            }}
          >
            <img
              src={icons.addIcon}
              alt=""
              className="fit-image w-12"
              style={{ filter: creteImgFilter("#fff") }}
            />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default ButtonEdge;
