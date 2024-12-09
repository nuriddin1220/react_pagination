import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNavigate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    // Previous Button
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handleNavigate(currentPage - 1)}
      >
        Oldingisi
      </Pagination.Prev>
    );

    // Page Numbers
    for (let num = 1; num <= totalPages; num++) {
      if (
        num <= 3 || // First three pages
        num > totalPages - 3 || // Last three pages
        Math.abs(num - currentPage) === 1 || // One page before/after the current page
        num === currentPage // Current page
      ) {
        items.push(
          <Pagination.Item
            key={num}
            active={num === currentPage}
            onClick={() => handleNavigate(num)}
          >
            {num}
          </Pagination.Item>
        );
      } else if (
        (num === 4 && currentPage > 5) || // Ellipsis after first three pages
        (num === totalPages - 4 && currentPage < totalPages - 3) // Ellipsis before last three pages
      ) {
        items.push(
          <Pagination.Ellipsis key={`ellipsis-${num}`} disabled />
        );
      }
    }

    // Next Button
    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handleNavigate(currentPage + 1)}
      >
        Keyingisi
      </Pagination.Next>
    );

    return items;
  };

  return <Pagination className="justify-content-center">{renderPaginationItems()}</Pagination>;
};

export default CustomPagination;
