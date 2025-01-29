import React, { useEffect } from "react";
import "./EndScreen.scss";
import { icons } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../services/api";
import { useDispatch } from "react-redux";
import { handelCatch, throwError } from "../../../../store/globalSlice";
function EndScreen({ answerId, flowStyle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateAnswerStatus = async () => {
    try {
      const res = await api.put(`interactions/update-is-completed-answer`, {
        answer_id: answerId,
      });
      if (res.status !== 200) {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  useEffect(() => {
    if (answerId) updateAnswerStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId]);

  return (
    <div className="EndScreen-container">
      <div className="end-header">
        <div> 🙌 </div>{" "}
        <div style={{ fontFamily: `${flowStyle?.font}` }}>
          All done! Thank you for answering.
        </div>
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
