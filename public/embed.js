(function () {
  // Ensure there's a config object
  const MY_WIDGET_CONFIG = window.FLOW_WIDGET_CONFIG || {
    url: "https://adorable-custard-9de130.netlify.app",
    options: {
      widgetType: "circle",
      text: "",
      backgroundColor: "#8000ff",
      position: "bottom-right",
      dismissible: false,
      videoPosition: "center center",
    },
  };

  // Create a style block for widget styling
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    .iframe {
      width: 100%;
      height: 100%;
      border:none;
    }
    .circle-widget-container {
      border-radius: 50%;
      width: 150px;
      height: 150px;
    }
    .circle-widget-box {
      border-radius: 50%;
    }

    .horizontalSquire-widget-container {
      border-radius: 10px;
      width: 200px;
      height: 150px;
    }
    .horizontalSquire-widget-box {
      border-radius: 7px;
    }

    .verticalSquire-widget-container {
      border-radius: 10px;
      width: 200px;
      height: 300px;
    }
    .verticalSquire-widget-box {
      border-radius: 7px;
    }

    .toggle-widget-container {
      width: 300px;
      height: 100px;
      border-radius: 100px;
      justify-content: start;
    }
    .toggle-widget-box {
      border-radius: 100px;
      justify-content: space-between;
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
    }

    .widget-box {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: start;
      align-items: center;
      overflow: hidden;
      border: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
    }

    .widget-box .overly-text {
      margin: 0;
      font-family: Arial, sans-serif;
      color: #000;
      text-align: center;
      font-size: 30px;
      position: absolute;
      z-index: 100000;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toggle-overly-text {
      height: 100%;
    }

    .circle-iframe {
      border-radius: 50%;
    }
    .horizontalSquire-iframe {
      border-radius: 7px;
    }
    .verticalSquire-iframe {
      border-radius: 7px;
    }
    .toggle-iframe {
      width: 90px;
      height: 100%;
      border-radius: 100px;
      display: block;
    }
    .widget-close-btn {
      width: 20px;
      height: 20px;
      border-radius: 30px;
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: -12px;
      top: -12px;
      color: white;
      background-color: ${MY_WIDGET_CONFIG.options.backgroundColor};
      z-index: 100000;
      font-size: 12px;
      font-weight: 800;
      box-shadow:0px 5px 10px rgba(0,0,0,0.2);
    }
    .mobile-view-container {
      width: 300px;
      height: 550px;
      border-radius: 10px;
      padding: 0px;
      border:4px solid ${MY_WIDGET_CONFIG.options.backgroundColor};
      display:flex;
      align-items: center;
      justify-content: center;
    }
    .mobile-view {
      width: 100%;
      height: 100%;
      overflow:hidden;
      border-radius: 10px;

    }
    .mobile-view .circle-iframe{
      border-radius: 10px;
    }
      .mobile-view .toggle-iframe{
      border-radius: 10px;
      width:100%;
    }
  `;
  document.head.appendChild(style);

  const widgetHTMLObject = {
    circle: `
    <div class="circle-widget-container widget-container">
    <div class="widget-close-btn">-</div>
      <div class="widget-box circle-widget-box" id="mobile_view">
        <iframe class="circle-iframe iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>;
        <spa class="overly-text" id="widget-overly-text">${MY_WIDGET_CONFIG.options.text}</spa>
      </div>
      </div>
    </div>`,
    horizontalSquire: `
    <div class="horizontalSquire-widget-container widget-container">
      <div class="widget-close-btn">-</div>
      <div class="horizontalSquire-widget-box widget-box" id="mobile_view" >
        <iframe class="horizontalSquire-iframe iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>;
        <spa class="overly-text" id="widget-overly-text">${MY_WIDGET_CONFIG.options.text}</spa>
      </div>
    </div>`,
    verticalSquire: `
    <div class="verticalSquire-widget-container widget-container">
      <div class="widget-close-btn">-</div>
      <div class="widget-box verticalSquire-widget-box" id="mobile_view" >
        <iframe class="verticalSquire-iframe iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>;
        <spa class="overly-text" id="widget-overly-text">${MY_WIDGET_CONFIG.options.text}</spa>
      </div>
    </div>`,
    toggle: `
    <div class="toggle-widget-container widget-container">
      <div class="widget-close-btn">-</div>
      <div class="widget-box toggle-widget-box" id="mobile_view" >
        <iframe class="toggle-iframe iframe" src="${MY_WIDGET_CONFIG.url}"></iframe>
        <div class="overly-text toggle-overly-text" id="widget-overly-text">${MY_WIDGET_CONFIG.options.text}</div>
      </div>
    </div>`,
  };

  // Create the widget's HTML as a string
  const widgetHTML = widgetHTMLObject[MY_WIDGET_CONFIG.options.widgetType];

  // Insert the widget into the DOM
  const widgetContainer = document.createElement("div");
  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);

  widgetContainer
    .querySelector("#mobile_view")
    ?.addEventListener("click", () => {
      const widget_container =
        widgetContainer.querySelector(".widget-container");
      if (widget_container) {
        widget_container?.classList.remove(
          `${MY_WIDGET_CONFIG.options.widgetType}-widget-container`
        );
        widget_container?.classList.add("mobile-view-container");
      }

      const mobile_view = widgetContainer.querySelector("#mobile_view");
      if (mobile_view) {
        widget_container?.classList.remove(
          `${MY_WIDGET_CONFIG.options.widgetType}-widget-box`
        );
        mobile_view?.classList.add("mobile-view");
      }

      const widget_overly = widgetContainer.querySelector(
        "#widget-overly-text"
      );
      if (widget_overly) {
        widget_overly.style.display = "none";
      }

      if (!MY_WIDGET_CONFIG.options.dismissible) {
        const closeButton = widgetContainer.querySelector(".widget-close-btn");
        closeButton.style.display = "flex";
        closeButton.addEventListener("click", function () {
          widgetContainer.remove();
        });
      }
    });

  // Add event listener for the close button (if dismissible)
  if (MY_WIDGET_CONFIG.options.dismissible) {
    const closeButton = widgetContainer.querySelector(".widget-close-btn");
    closeButton.style.display = "flex";
    closeButton.addEventListener("click", function () {
      widgetContainer.remove();
    });
  }
})();
