import React, { useState } from "react";

const Pagination = ({ totalPage, totalRows, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      onChangePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onChangePage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row items-center my-3 justify-between">
      <p className="text-gray-400 text-sm">
        Total Data {totalRows} Page {currentPage} Of {totalPage}
      </p>
      <div className="join" onClick={prevPage}>
        <button
          className="join-item btn bg-gray-200 border-none hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn bg-gray-200 border-none hover:bg-gray-300">
          Page {currentPage} Of {totalPage}
        </button>
        <button
          className="join-item btn bg-gray-200 border-none hover:bg-gray-300"
          onClick={nextPage}
          disabled={currentPage === totalPage}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
