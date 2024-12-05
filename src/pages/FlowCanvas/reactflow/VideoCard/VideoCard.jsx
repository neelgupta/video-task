import React from "react";
import { memo, useState } from "react";
import { Handle, Position, NodeToolbar, useReactFlow } from "@xyflow/react";
import { Video, MessageCircleMore, Workflow, Copy, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { TestApi } from "../../../../services/api";
import "./VideoCard.scss";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
const IconRenderer = ({ icon, label, onClick, style }) => {
  const [btnHover, setBtnHover] = useState(false);
  return (
    <div>
      <button
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        onClick={onClick}
        className="f-center btn-scale"
        style={{
          background: "transparent",
          padding: "0px 10px",
          border: "none",
          height: "25px",
          width: "40px",
          transform: "scale(1)",
          transitionDuration: "0.1s",
          transitionProperty: "transform",
          ...(btnHover
            ? {
                transform: "scale(1.1)",
              }
            : {}),
        }}
      >
        <img
          src={icon}
          alt=""
          className="fit-image h-20"
          style={{ filter: creteImgFilter(btnHover ? "#7F5FFF" : "#0f0f0f") }}
        />
      </button>
    </div>
  );
};
function VideoCard(props) {
  const { data, id, title, index } = props;
  const [isToolbarVisible, setToolbarVisible] = useState(false);

  const { getEdges, setEdges, setNodes } = useReactFlow();
  const { id: flowId } = useParams();
  // const handleDuplicate = async () => {
  //   try {
  //     const targetId = getEdges().find((edge) => edge.source === id).target;
  //     const {
  //       data: {
  //         data: { nodes, edges },
  //         message,
  //       },
  //     } = await createQuestion(flowId, id, targetId, null);
  //     setNodes(nodes.map((node) => ({ ...node, id: node._id })));
  //     setEdges(
  //       edges.map((edge) => ({ ...edge, id: edge._id, type: "button" }))
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleDelete = async (e) => {
    console.log("e", e);
  };

  // const createQuestion = async (flowId, sourceId, targetId, question) => {
  //   return await TestApi.post("/flow/add-question", {
  //     flowId,
  //     sourceId,
  //     targetId,
  //     question,
  //   });
  // };

  const toolbarItems = [
    { icon: icons.edit, label: "edit" },
    { icon: icons.deleteSVG, label: "delete" },
  ];

  return (
    <div
      onMouseEnter={() => setToolbarVisible(true)}
      onMouseLeave={() => setToolbarVisible(false)}
      className="VideoCard-container"
    >
      <NodeToolbar
        isVisible={isToolbarVisible}
        style={{
          marginTop: "10px",
          padding: "10px",
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <div
          className="d-flex"
          style={{
            background: "white",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0px 4px 20px 0px #00000026",
          }}
        >
          {toolbarItems.map((item, index) => (
            <IconRenderer
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
      </NodeToolbar>
      <div className="question">
        <div
          style={{
            background: "white",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div className="img-box-content">
            <img
              src={icons[index % 2 === 0 ? "avatar10" : "avatar11"]}
              alt=""
            />
          </div>
          <div className="content-body-container">
            <div className="text-14-500">
              <span className="text-16-700">{index || 0}.</span> {` ${title}`}
            </div>
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="VideoCard-dote-Left"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="VideoCard-dote-Right"
      />
    </div>
  );
}

export default VideoCard;
