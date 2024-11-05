import { useState } from "react";
import "./Price.scss";
import PriceCard from "./PriceCard";
function Price() {
  const [planType, setPlanType] = useState("Yearly");
  return (
    <div id="Price-container">
      <div>
        <div className="w-300 title-text">
          Meaningful Conversations, at scale.
        </div>
        <div className="text-18-600 mt-20">Pick a plan, cancel any time.</div>
      </div>
      <div className="f-center">
        <div className="btn-box">
          <button
            className={planType === "Yearly" ? "active" : ""}
            onClick={() => setPlanType("Yearly")}
          >
            Yearly
          </button>
          <button
            className={planType === "Yearly" ? "" : "active"}
            onClick={() => setPlanType("Monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="mt-20">
        <PriceCard className="wp-100" planType={planType} />
      </div>
    </div>
  );
}

export default Price;
