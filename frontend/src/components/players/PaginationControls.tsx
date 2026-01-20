import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  disabled?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  disabled = false,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    onItemsPerPageChange(newItemsPerPage);
  };

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show pages 1, 2, 3
      pages.push(1, 2, 3);

      // Check if current page is in the middle (not in first 3 or last 3)
      const isCurrentInMiddle = currentPage > 3 && currentPage < totalPages - 2;

      if (isCurrentInMiddle) {
        // Show first ellipsis, current page, second ellipsis
        pages.push("...");
        pages.push(currentPage);
        pages.push("...");
      } else if (totalPages > 6) {
        // Just show one ellipsis between first 3 and last 3
        pages.push("...");
      }

      // Show last 3 pages
      for (let i = totalPages - 2; i <= totalPages; i++) {
        // Only add if not already in the first 3 pages
        if (i > 3) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className="pagination-controls">
      <div className="pagination-navigation">
        <div className="items-per-page">
          <label htmlFor="items-per-page">Items per page:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            disabled={disabled}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {totalPages > 1 && (
          <div className="page-navigation">
            <button
              className="pagination-button previous"
              onClick={handlePrevious}
              disabled={disabled || currentPage === 1}
              aria-label="Go to previous page"
            >
              ← Previous
            </button>

            <div className="page-numbers">
              {generatePageNumbers().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="pagination-ellipsis"
                    >
                      ...
                    </span>
                  );
                }

                const pageNumber = page as number;
                return (
                  <button
                    key={pageNumber}
                    className={`pagination-button page-number ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                    onClick={() => handlePageClick(pageNumber)}
                    disabled={disabled}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              className="pagination-button next"
              onClick={handleNext}
              disabled={disabled || currentPage === totalPages}
              aria-label="Go to next page"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginationControls;
