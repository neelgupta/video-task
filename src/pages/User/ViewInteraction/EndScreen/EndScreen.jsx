import React from "react";
import "./EndScreen.scss";
import { icons } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
function EndScreen() {
  const navigate = useNavigate();
  return (
    <div className="EndScreen-container">
      <div className="end-header">
        <div> 🙌 </div> <div> All done! Thank you for answering.</div>
      </div>

      <div className="EndScreen-content-box">
        <div className="EndScreen-content">
          <h1>Elevate your storytelling with the perfect video tool.</h1>
          <h5>
            Create personalized video experiences, foster meaningful
            connections, and boost lead conversions effortlessly.
          </h5>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Try Flōw AI for free <span>✌️</span>
          </button>
        </div>
        <div className="image-box">
          <img src={icons.endScreen} alt="" className="fit-image" />
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
