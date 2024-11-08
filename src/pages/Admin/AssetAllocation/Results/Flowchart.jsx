import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

const initDiagram = () => {
  const $ = go.GraphObject.make;
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 }),
  });

  diagram.nodeTemplate = $(
    go.Node,
    "Horizontal",
    $(
      go.TextBlock,
      "Default Text",
      { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
      new go.Binding("text", "key")
    )
  );

  diagram.linkTemplate = $(
    go.Link,
    $(go.Shape),
    $(go.Shape, { toArrow: "OpenTriangle" })
  );

  diagram.model = new go.GraphLinksModel(
    [
      { key: "Asset Allocation (Start)", color: "lightblue" },
      { key: "Campaign Structure\n50%\n👤 1", color: "lightgreen" },
      { key: "Learn Facebook basics", color: "lightyellow" },
      { key: "Get More Conversions", color: "lightcoral" },
    ],
    [
      { from: "Asset Allocation (Start)", to: "Campaign Structure\n50%\n👤 1" },
      { from: "Asset Allocation (Start)", to: "Learn Facebook basics" },
      { from: "Asset Allocation (Start)", to: "Get More Conversions" },
    ]
  );

  return diagram;
};

const Flowchart = () => {
  return (
    <ReactDiagram
      initDiagram={initDiagram}
      divClassName="diagram-component"
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default Flowchart;
