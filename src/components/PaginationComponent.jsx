import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
  filteredProfiles,
}) => {
  const startIndex = currentPage * pageCount + 1;
  const endIndex = Math.min(startIndex + pageCount - 1, filteredProfiles);
  const adjustedStartIndex = startIndex < 1 ? 1 : startIndex;

  return (
    <div className="d-flex justify-content-end mb-4">
      <div className="pagination-modify">
        {/* <div className="page-counter">
          <span>
            {adjustedStartIndex} to {endIndex} out of {filteredProfiles} entries
          </span>
        </div> */}
        <ReactPaginate
          previousLabel={<FiChevronLeft />}
          nextLabel={<FiChevronRight />}
          breakLabel={<BsThreeDots />}
          breakClassName="page-item"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          labelClassName="page-link"
          nextLinkClassName="page-link"
          forcePage={currentPage}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
