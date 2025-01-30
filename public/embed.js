(function () {
  // Ensure there's a config object
  const MY_WIDGET_CONFIG = window.MY_WIDGET_CONFIG || {
    url: "https://adorable-custard-9de130.netlify.app",
    options: {
      widgetType: "circle",
      text: "",
      backgroundColor: "#5CD6C8",
      position: "bottom-right",
      dismissible: false,
      videoPosition: "center center",
    },
  };

  console.log("MY_WIDGET_CONFIG", window.MY_WIDGET_CONFIG);

  // Create a style block for widget styling
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    .circle-widget-container {
      border-radius: 50%;
      width: 200px;
      height: 200px;
    }
    .circle-widget-box{
      border-radius: 50%;
    }

    .horizontalSquire-widget-container{
      border-radius: 10px;
      width: 300px;
      height: 150px;
    }
    .horizontalSquire-widget-box{
      border-radius: 7px;
    }

    .verticalSquire-widget-container{
      border-radius: 10px;
      width: 200px;
      height: 300px;
    }
    .verticalSquire-widget-box{
      border-radius: 7px;
    }

    .toggle-widget-container{
      border-radius: 100px;
      width: 300px;
      height: 80px;
    }
    .toggle-widget-box{
      border-radius: 100px;
      justify-content: start;
    }

    .widget-container {
      position: fixed;
      z-index: 10000;
      padding: 4px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      ${MY_WIDGET_CONFIG.options.position.split("-")[0]}: 20px;
      ${MY_WIDGET_CONFIG.options.position.split("-")[1]}: 20px;
      background-color: ${MY_WIDGET_CONFIG.options.backgroundColor};
    }

    .widget-box {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #8000ff;
      overflow: hidden;
    }

    .widget-box .overly-text {
      margin: 0;
      font-family: Arial, sans-serif;
      color: #000;
      text-align: center;
      font-size: 30px;
      position: absolute;
      z-index: 100000;
    }

    .widget-box{
      width: 100%;
      height: 100%;
      border: none;
    }

    .circle-iframe{
      border-radius: 50%;
    }
    .horizontalSquire-iframe{
      border-radius: 7px;
    }
    .verticalSquire-iframe{
      border-radius: 7px;
    }
    .toggle-iframe{
      border-radius: 50%;
    }
  `;
  document.head.appendChild(style);

  const widgetHTMLObject = {
    circle: `
    <div class="circle-widget-container widget-container">
      <div class="widget-box circle-widget-box">
        <iframe class="circle-iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>;
        <spa class="overly-text">${MY_WIDGET_CONFIG.options.text}</spa>
      </div>
    </div>`,
    horizontalSquire: `
    <div class="horizontalSquire-widget-container widget-container">
      <div class="widget-box horizontalSquire-widget-box">
        <iframe class="horizontalSquire-iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>;
        <spa class="overly-text">${MY_WIDGET_CONFIG.options.text}</spa>
      </div>
    </div>`,
    verticalSquire: `
    <div class="verticalSquire-widget-container widget-container">
      <div class="widget-box verticalSquire-widget-box">
        <iframe class="verticalSquire-iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>;
        <spa class="overly-text">${MY_WIDGET_CONFIG.options.text}</spa>
      </div>
    </div>`,
    toggle: `
    <div class="toggle-widget-container widget-container">
      <div class="widget-box toggle-widget-box">
      <div>
      <iframe class="toggle-iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>;
      </div>
      <spa class="overly-text">${MY_WIDGET_CONFIG.options.text}</spa>
        
      </div>
    </div>`,
  };

  // Create the widget's HTML as a string
  const widgetHTML = widgetHTMLObject[MY_WIDGET_CONFIG.options.widgetType];

  // Insert the widget into the DOM
  const widgetContainer = document.createElement("div");
  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);

  // Add event listener for the close button (if dismissible)
  if (MY_WIDGET_CONFIG.options.dismissible) {
    const closeButton = widgetContainer.querySelector(".my-widget-close-btn");
    closeButton.style.display = "inline-block";
    closeButton.addEventListener("click", function () {
      widgetContainer.style.display = "none";
    });
  }
})();

//
