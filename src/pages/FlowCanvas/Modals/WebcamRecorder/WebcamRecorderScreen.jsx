import React, { useEffect, useRef } from "react";

function WebcamRecorderScreen({ stream, status }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (stream && status === "stopped") {
      stream.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <video
        ref={videoRef}
        width="50%"
        height="50%"
        autoPlay={true}
        controls
        playsInline
      />
    </>
  );
}

export default WebcamRecorderScreen;
