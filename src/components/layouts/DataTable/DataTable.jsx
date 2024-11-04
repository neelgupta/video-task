import ReactPaginate from "react-paginate";
import "./DataTable.scss";

const DataTable = ({
  columns,
  rows,
  handlePageClick,
  pageCount,
  currentPage,
  selectedValue,
  totalItems,
}) => {
  const start = currentPage * selectedValue + 1;
  const end = Math.min(start + selectedValue - 1, totalItems);

  return (
    <div id="datatable-container">
      <div className="table-wrapper auri-scroll">
        <div className="table-header">
          {columns?.map((column, index) => (
            <div key={index} className="table-cell header-cell text-12-700">
              {column?.Header}
            </div>
          ))}
        </div>
        <div className="table-body auri-scroll">
          {rows?.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              {columns?.map((column, colIndex) => (
                <div key={colIndex} className="table-cell text-12-400">
                  <span>{row[column?.accessor]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="pb-16 pt-16 ps-28 pe-28 fb-center">
        <div className="text-14-500 color-7f95">{`Showing ${start}-${end} from ${totalItems}`}</div>
        <div className="f-center">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            disabledClassName={"disabled"}
            previousLinkClassName={"prev-link"}
            nextLinkClassName={"next-link"}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
