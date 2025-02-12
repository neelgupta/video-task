import React, { useEffect, useState } from "react";
import "./FlowTemplate.scss";
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDispatch } from "react-redux";
import { handleFetchTemplate } from "../../../../store/globalSlice";
import { useNavigate } from "react-router-dom";
import StartNode from "../../../FlowCanvas/reactflow/StartNode/StartNode";
import EndNode from "../../../FlowCanvas/reactflow/EndNode/EndNode";
import VideoCard from "../../../FlowCanvas/reactflow/VideoCard";
import RedirectCard from "../../../FlowCanvas/reactflow/RedirectCard";
import ButtonEdge from "../../../FlowCanvas/reactflow/ButtonEdge/ButtonEdge";
import { icons } from "../../../../utils/constants";
import LoaderCircle from "../../../../components/layouts/LoaderCircle/LoaderCircle";
import parse from "html-react-parser";

const about_template = `<div>
              <h1 class="text-20-700 py-5">About this template</h1>
              <p class="text-16-500 py-5">
                Using VideoAsk to capture contact details adds a personal touch
                and a human element that's all too often missing from
                run-of-the-mill contact forms.
              </p>
              <ul>
                <li class="text-16-500 py-5">
                  The first step in this videoask asks respondents what they
                  need help with. They can choose from four multiple-choice
                  options.
                </li>
                <li class="text-16-500 py-5">
                  The second (and final) step that respondents see depends on
                  the answer they choose in the first step. In most cases,
                  they’re asked to provide more information or give feedback via
                  video, audio, or text. They're then taken to a contact form
                  that asks them to leave their name and email address, as well
                  as consenting to some data processing terms and conditions.
                </li>
                <li class="text-16-500 py-5">
                  The exception is if they choose the first option in step one
                  (“I want to know more about you”). In this case, they’re taken
                  to a second step where they’re given some more information
                  about the company before being redirected to a webpage with
                  further information.
                </li>
              </ul>
            </div>`;

const nodeTypes = {
  Start: StartNode,
  End: EndNode,
  Question: VideoCard,
  Redirect: RedirectCard,
};

const edgeTypes = {
  button: ButtonEdge,
};

function FlowTemplate({ templateId }) {
  return (
    <ReactFlowProvider>
      <FlowContent templateId={templateId} />
    </ReactFlowProvider>
  );
}

function FlowContent({ templateId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const { zoomIn, zoomOut, setViewport } = useReactFlow();
  const [isFetch, setIsFetch] = useState(false);

  const getInt = () => {
    dispatch(
      handleFetchTemplate({
        id: templateId,
        setEdges,
        setNodes,
        navigate,
        setIsFetch,
      })
    );
  };

  useEffect(() => {
    getInt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  useEffect(() => {
    setViewport({ x: 0, y: 0, zoom: 0.3 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  return (
    <div className="TemplateFlow-container">
      {isFetch ? (
        <div
          className="wp-100 hp-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <LoaderCircle size={150} />
        </div>
      ) : (
        <>
          <div className="template-flow-body">
            <div
              id="react_flow_canvas_body"
              style={{ width: "100%", height: "530px" }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                minZoom={0.01}
                maxZoom={100}
                panOnScroll={false}
                zoomOnScroll={false}
                zoomOnDoubleClick={true}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
              >
                <Background
                  style={{ background: "#f1f1f1" }}
                  gap={10000}
                  size={0}
                />
              </ReactFlow>

              <div className="template-flow-body-control-footer">
                <button onClick={() => setViewport({ x: 0, y: 0, zoom: 0.3 })}>
                  <img src={icons.replace} alt="" className="fit-image" />
                </button>
                <button onClick={zoomIn}>
                  <img src={icons.addIcon} alt="" className="fit-image" />
                </button>
                <button onClick={zoomOut}>
                  <img src={icons.minus} alt="" className="fit-image" />
                </button>
              </div>
            </div>
          </div>
          <div className="template-description">{parse(about_template)}</div>
        </>
      )}
    </div>
  );
}

export default FlowTemplate;
