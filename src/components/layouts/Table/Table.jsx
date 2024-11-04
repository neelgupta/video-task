import { icons } from "../../../utils/constants";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./Table.scss";

const Table = ({ header, row, min, hidePagination }) => {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  useEffect(() => {
    if (themeColor) {
      let elem = document.getElementsByClassName("selected");
      if (elem[0]) {
        elem[0].style.backgroundColor = themeColor.sColor;
        elem[0].style.color = themeColor.pColor;
      }
    }
  }, [themeColor]);

  return (
    <div id="table-container">
      <div className="table-body auri-scroll">
        <div className="header-row" style={{ minWidth: min || "1000px" }}>
          {header?.map((elm, index) => {
            const { title, className, isSort } = elm;
            return (
              <div
                className={`header-cell pointer ${className || ""}`}
                key={index}
              >
                <span>{title}</span>
                {isSort && (
                  <span className="h-12 w-12">
                    <img src={icons.sort} alt="sort" className="fit-image" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div
          className="body-container auri-scroll"
          style={{ minWidth: min || "1000px" }}
        >
          {row?.map((elm, index) => {
            return (
              <div className="body-row" key={index}>
                {elm?.data?.map((cElem, cIndex) => {
                  return (
                    <div
                      className={`body-cell ${cElem?.className || ""}`}
                      key={cIndex}
                    >
                      {cElem?.value}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {!hidePagination && (
        <div className="pagination-container">
          <div className="text-14-500 color-757f">Showing 1-5 from 100</div>
          <ReactPaginate
            pageCount={5}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            previousLabel={<img src={icons.left} alt="left" className="h-18" />}
            nextLabel={<img src={icons.right} alt="right" className="h-18" />}
            breakLabel="..."
          />
        </div>
      )}
    </div>
  );
};

export default Table;
