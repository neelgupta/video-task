import { Handle, Position } from "@xyflow/react";
import React from "react";
import "./RedirectCard.scss";
import { icons } from "../../../../utils/constants";
function RedirectCard(props) {
  console.log("props", props);
  const { data } = props;
  return (
    <>
      <div className={`redirect `}>
        <div className="redirect_body">
          <img src={icons.redirect} alt="" className="fit-image w-50 h-50" />
          <p>{data.redirection_url}</p>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="redirect-card-dote-Left"
      />
    </>
  );
}

export default RedirectCard;
