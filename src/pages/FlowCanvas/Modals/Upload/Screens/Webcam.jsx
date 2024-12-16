import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { VideoPlayer } from "../../../../../components";

function Webcam({ videoConfigForm }) {
  console.log("videoConfigForm", videoConfigForm);
  return (
    <div
      className="wp-100 hp-100 f-center"
      style={{ background: "black", flexDirection: "column" }}
    >
      <h1>Webcam Recorder</h1>
      <ReactMediaRecorder
        video
        audio
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <div className="wp-100">
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            {mediaBlobUrl && (
              //   <video
              //     src={mediaBlobUrl}
              //     controls
              //     autoPlay
              //     loop
              //     style={{ width: "100%" }}
              //   />

              <VideoPlayer
                videoUrl={mediaBlobUrl}
                videoConfigForm={videoConfigForm}
              />
            )}
          </div>
        )}
      />
    </div>
  );
}

export default Webcam;
