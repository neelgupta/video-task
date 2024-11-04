import React from "react";
import { icons } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import "./Breadcrumb.scss";

const Breadcrumb = ({ list }) => {
  const navigate = useNavigate();
  return (
    <div id="breadcrumb-container" className="fa-center gap-1 un">
      {list?.map((elm, index) => {
        const isLast = list.length - 1 === index;
        return (
          <React.Fragment key={index}>
            <span
              className={`text-14-400 pointer ${
                isLast ? "color-1923" : "color-757f"
              }`}
              onClick={() => {
                if (!isLast && elm.link) {
                  navigate(elm.link);
                }
              }}
            >
              {elm?.title}
            </span>
            {!isLast && (
              <span className="h-15 w-16 d-flex">
                <img src={icons.right} alt="right" className="fit-image" />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
