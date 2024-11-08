import "../AssetAllocation.scss";
import Header from "../Header";
import Flowchart from "./Flowchart";

function Results() {
  return (
    <div className="Results-container">
      <Header />
      <div className="pt-30">
        <Flowchart />
      </div>
    </div>
  );
}

export default Results;
