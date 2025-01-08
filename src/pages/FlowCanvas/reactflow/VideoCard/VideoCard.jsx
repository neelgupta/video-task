import React, { useEffect } from "react";
import { memo, useState } from "react";
import { Handle, Position, NodeToolbar, useReactFlow } from "@xyflow/react";
import { useNavigate, useParams } from "react-router-dom";
import { api, TestApi } from "../../../../services/api";
import "./VideoCard.scss";
import { icons } from "../../../../utils/constants";
import { addWhitenessToHex, creteImgFilter } from "../../../../utils/helpers";
import Skeleton from "react-loading-skeleton";

import DeleteModal from "../../../../components/layouts/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  handleFetchFlowData,
  setQueModelConfig,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";
import AnswerSkeleton from "./AnswerSkeleton";
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
  const { interactionsStyle } = useSelector((state) => state.global);
  console.log("interactionsStyle", interactionsStyle);
  const [isToolbarVisible, setToolbarVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { getEdges, getNodes, setEdges, setNodes } = useReactFlow();
  const { id: flowId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDelete(true);
    try {
      const res = await api.delete(`interactions/delete-nodes/${data._id}`);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        dispatch(
          handleFetchFlowData({
            id: flowId,
            setEdges,
            setNodes,
            navigate,
          })
        );
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsDelete(false);
    setShowDeleteModal(false);
  };

  const toolbarItems = [
    {
      icon: icons.edit,
      label: "edit",
      onClick: () => {
        dispatch(
          setQueModelConfig({
            modalType: data?.flow_type || "",
            nodeData: data,
            isEdit: true,
            isShow: true,
          })
        );
      },
    },
    {
      icon: icons.deleteSVG,
      label: "delete",
      onClick: () => {
        setShowDeleteModal(true);
      },
    },
  ];

  return (
    <>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          handleDelete();
        }}
        isDelete={isDelete}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
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
                onClick={() => {
                  item.onClick();
                }}
              />
            ))}
          </div>
        </NodeToolbar>
        <div className="question">
          {data.answer_format.contact_form && (
            <div
              className="contact_icons"
              style={{ background: interactionsStyle.primary_color }}
            >
              <img
                src={icons.contact}
                alt=""
                style={{ filter: creteImgFilter("#ffffff") }}
                className="fit-image w-15 h-15"
              />
            </div>
          )}

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
              <img src={data.video_thumbnail} alt="" />
            </div>
            <div
              className="content-body-container"
              style={
                {
                  // background: addWhitenessToHex(
                  //   interactionsStyle.background_color,
                  //   0.6
                  // ),
                }
              }
            >
              <div
                className="text-14-600 "
                style={{
                  textTransform: "capitalize",
                  color: interactionsStyle.primary_color,
                }}
              >
                <span className="text-17-600" style={{ color: "#000" }}>
                  {data.index}.
                </span>{" "}
                {data.title}.
              </div>
              <div className="m-0 p-0 wp-100 hp-85">
                <AnswerSkeleton
                  answerType={data?.answer_type || ""}
                  interactionsStyle={interactionsStyle}
                />
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
    </>
  );
}

export default VideoCard;
