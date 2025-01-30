import React, { useEffect } from "react";

const CustomWidget = () => {
  useEffect(() => {
    // Define the widget configuration on the global object
    window.MY_WIDGET_CONFIG = {
      kind: "widget",
      url: "http://192.168.1.26:3000/view-flow/v-ZI3Ffbyg-ED2hbTJ8oqCQkXQuRziR8LIwguPNnpCI",
      options: {
        widgetType: "toggle",
        text: "texts",
        backgroundColor: "#5CD6C8",
        position: "bottom-left",
        dismissible: false,
        videoPosition: "center center",
      },
    };

    // Dynamically add the script
    const script = document.createElement("script");
    script.src = "http://192.168.1.26:3000/embed.js"; // Replace with the production URL
    script.async = true;

    // Handle errors while loading the script
    script.onerror = () => {
      console.error("Failed to load the widget script.");
    };

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      {/* Optional fallback while the script loads */}
      <noscript>
        <p>The widget requires JavaScript to work. Please enable JavaScript.</p>
      </noscript>
    </div>
  );
};

export default CustomWidget;
