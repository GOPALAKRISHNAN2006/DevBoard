import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Projects pagination">
      <ul className="pagination">

        {/* Previous Button */}
        <li
          className={`page-item ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <button
            type="button"
            className="page-link"
            data-testid="pagination-previous"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
        </li>

        {/* Page Numbers */}
        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map((page) => (
          <li
            key={page}
            className={`page-item ${
              currentPage === page ? "active" : ""
            }`}
          >
            <button
              type="button"
              className="page-link"
              data-testid={`pagination-page-${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            type="button"
            className="page-link"
            data-testid="pagination-next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FiChevronRight />
          </button>
        </li>

      </ul>
    </nav>
  );
}