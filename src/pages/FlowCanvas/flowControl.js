export const getVideoDuration = (blob) => {
  return new Promise((resolve) => {
    const videoElement = document.createElement("video");

    // Attach the blob as the video source
    videoElement.src = URL.createObjectURL(blob);

    // Listen for metadata load
    videoElement.onloadedmetadata = () => {
      if (videoElement.duration === Infinity) {
        // Seek to the end of the video to calculate duration
        videoElement.currentTime = Number.MAX_SAFE_INTEGER;
        videoElement.ontimeupdate = () => {
          videoElement.ontimeupdate = null; // Clear the event listener
          resolve(videoElement.currentTime); // Resolve with the duration
          URL.revokeObjectURL(videoElement.src); // Clean up object URL
        };
      } else {
        resolve(videoElement.duration); // Duration in seconds
        URL.revokeObjectURL(videoElement.src); // Clean up object URL
      }
    };

    // Handle errors
    videoElement.onerror = () => {
      resolve(0); // Return 0 if duration cannot be determined
      URL.revokeObjectURL(videoElement.src); // Clean up object URL
    };
  });
};

export const processVideoMetadata = async (videoSrc) => {
  const tempVideo = document.createElement("video");
  tempVideo.src = videoSrc;

  return new Promise((resolve) => {
    tempVideo.onloadedmetadata = () => {
      if (tempVideo.duration === Infinity) {
        // Fix for Infinity duration: Seek to the end of the video
        tempVideo.currentTime = Number.MAX_SAFE_INTEGER;
        tempVideo.ontimeupdate = () => {
          tempVideo.ontimeupdate = null; // Clear the listener
          resolve(tempVideo.currentTime.toFixed(0)); // Return the actual duration
        };
      } else {
        resolve(tempVideo.duration.toFixed(0)); // Return video duration
      }
    };

    tempVideo.onerror = () => {
      console.error("Failed to load video metadata.");
      resolve(0); // Return 0 if metadata loading fails
    };
  });
};
