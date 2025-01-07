import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import "./AnswerForm.scss";

function ButtonForm({ onNext, node, videoTime, isPost, flowStyle }) {
  const { answer_type, answer_format } = node;
  const [isDelay, setIsDelay] = useState(null);

  useEffect(() => {
    if (videoTime.duration && videoTime.currentTime) {
      const delay = parseInt(answer_format.delay);
      const currentTime = parseInt(videoTime?.currentTime.toFixed(0)) || 0;
      const duration = parseInt(videoTime?.duration) || 0;
      if (
        delay - currentTime === 0 ||
        currentTime === duration ||
        currentTime > delay
      ) {
        setIsDelay(false);
      } else if (delay !== 0) {
        setIsDelay(true);
      }
    }
  }, [videoTime, answer_format]);
  return (
    <div className="ButtonForm-container">
      {isDelay && answer_format.delay !== 0 && (
        <div
          className="wp-100 hp-100"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="text-26-500"
            style={{ fontFamily: `${flowStyle.font}` }}
          >
            Interact in{" "}
            <span style={{ color: "#7b5aff" }}>
              {parseInt(answer_format.delay) -
                parseInt(videoTime?.currentTime.toFixed(0)) || 0}
            </span>
            s...
          </div>
        </div>
      )}
      {!isDelay && isDelay !== null && (
        <div
          className="wp-100 hp-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => !isPost && onNext({ ans: true })}
            style={{ fontFamily: `${flowStyle.font}` }}
          >
            {answer_format.button_title}
            {isPost && <Spinner size="sm" className="ms-10" />}
          </button>
        </div>
      )}
    </div>
  );
}

export default ButtonForm;
