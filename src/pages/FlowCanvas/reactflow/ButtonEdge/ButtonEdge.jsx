import React, { useEffect, useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { useParams } from "react-router-dom";
import { icons } from "../../../../utils/constants";
import "./ButtonEdge.scss";
import { creteImgFilter } from "../../../../utils/helpers";
import { useDispatch } from "react-redux";
import { showSuccess, throwError } from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
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
  // const onEdgeClick = async () => {
  //   try {
  //     const question = {
  //       type: "question",
  //       data: {
  //         label: "this is question",
  //       },
  //     };
  //     const {
  //       data: {
  //         data: { nodes, edges },
  //         message,
  //       },
  //     } = await createQuestion(flowId, source, target, question);
  //     setNodes(nodes.map((node) => ({ ...node, id: node._id })));
  //     setEdges(
  //       edges.map((edge) => ({ ...edge, id: edge._id, type: "button" }))
  //     );
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const createQuestion = async (flowId, sourceId, targetId, question) => {
  //   return await TestApi.post("/flow/add-question", {
  //     flowId,
  //     sourceId,
  //     targetId,
  //     question,
  //   });
  // };

  const createQuestion = async (event) => {
    try {
      const req = new FormData();
      req.append("targetId", target);
      req.append("sourceId", source);
      req.append("interaction_id", flowId);
      req.append("type", "Question");
      req.append("title", "dev-test");
      req.append("flow_type", "Upload");
      req.append("positionX", event.clientX - 100);
      req.append("positionY", event.clientY - 125);
      const res = await api.post("interactions/create-node", req, {
        "Content-Type": "multipart/form-data",
      });
      // console.log("res", res);
      if (res.status === 201) {
        dispatch(showSuccess(res.data.message));
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(
        throwError(
          throwError(error?.response?.data?.message || "Flow not created!")
        )
      );
    }
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
          // stroke: selected ? `url(#gradient-border)` : "#000",
          stroke: selected ? `url(#gradient-border)` : "#000",

          strokeWidth: selected ? 6 : 4,
          strokeLinecap: "square",
        }}
        className="custom-edge-path"
      />
      {selected && (
        <path
          d={edgePath}
          stroke="#fff"
          strokeWidth="1" // Border thickness (thicker when selected)
          fill="none" // No fill inside the path
          strokeDasharray="5,10" // Dashed line pattern (5px dash, 5px space)
          strokeLinecap="square" // Round end caps for the strokes
          strokeLinejoin="square" // Round corners at joins
          className="edge-border" // Class for custom styles (if any)
          style={{
            animation: "moveBorder 1s linear infinite", // If selected, animate the line
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
              console.log("e", e);
              e.preventDefault();
              createQuestion(e);
            }}
          >
            <img
              src={icons.addIcon}
              alt=""
              className="fit-image"
              style={{ filter: creteImgFilter("#fff") }}
            />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default ButtonEdge;
