import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function ButtonForm({ onNext, node, videoTime }) {
  const { answer_type, answer_format } = node;
  console.log("answer_format", answer_format);
  const [isDelay, setIsDelay] = useState(true);

  useEffect(() => {
    if (videoTime.duration && videoTime.currentTime) {
      const delay = parseInt(answer_format.delay);
      const currentTime = parseInt((videoTime?.currentTime || 0).toFixed(0));
      const duration = parseInt((videoTime?.duration || 0).toFixed(0));
      if (delay - currentTime === 0 || currentTime === duration) {
        setIsDelay(false);
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
          <div className="text-26-600">
            Interact in{" "}
            <span style={{ color: "#7b5aff" }}>
              {parseInt(answer_format.delay) -
                parseInt((videoTime?.currentTime || 0).toFixed(0))}
            </span>
            s...
          </div>
        </div>
      )}
      {!isDelay && (
        <div
          className="wp-100 hp-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={onNext}>{answer_format.button_title}</button>
        </div>
      )}
    </div>
  );
}

export default ButtonForm;
