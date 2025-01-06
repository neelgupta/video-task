import { icons } from "../../../utils/constants";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import "./Table.scss";
import { Spinner } from "react-bootstrap";
import LoaderCircle from "../LoaderCircle/LoaderCircle";

const Table = ({
  header,
  row,
  min,
  hidePagination,
  paginationOption,
  onPaginationChange,
  loader,
}) => {
  const handlePageChange = (selectedObject) => {
    onPaginationChange && onPaginationChange(selectedObject.selected);
    // Add your logic here to fetch new data based on the selected page.
  };
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
          {!loader ? (
            row?.map((elm, index) => {
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
            })
          ) : (
            <div className="f-center py-50">
              <LoaderCircle size={100} />
            </div>
          )}
        </div>
      </div>
      {!hidePagination && (
        <div className="pagination-container">
          {paginationOption?.count === 0 ? (
            <div className="text-16-700">
              {loader ? "Please wait..." : "No records"}
            </div>
          ) : (
            <div className="text-14-500 color-757f">{`Showing ${
              paginationOption?.currentPage * paginationOption?.pageSize + 1
            }-${
              paginationOption?.count <
              (paginationOption?.currentPage + 1) * paginationOption?.pageSize
                ? paginationOption?.count
                : (paginationOption?.currentPage + 1) *
                  paginationOption?.pageSize
            } from ${paginationOption?.count}`}</div>
          )}

          <ReactPaginate
            pageCount={
              Math.ceil(paginationOption?.count / paginationOption?.pageSize) ||
              1
            }
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            previousLabel={<div className="prev-btn">Prev</div>}
            nextLabel={<div className="next-btn">Next</div>}
            breakLabel="..."
            activeClassName={"selected"}
            onPageChange={handlePageChange}
            forcePage={paginationOption?.currentPage || 0}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
