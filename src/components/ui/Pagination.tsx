import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-row-reverse justify-center items-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded bg-dark-200 text-white"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        التالي
      </button>
      {totalPages <= 3 ? (
        [...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              className={`px-3 py-1 rounded transition-colors ${
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-200 text-white hover:bg-dark-100'
              }`}
              onClick={() => handleClick(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          );
        })
      ) : (
        <>
          {/* First page */}
          <button
            key={1}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === 1
                ? 'bg-primary-600 text-white'
                : 'bg-dark-200 text-white hover:bg-dark-100'
            }`}
            onClick={() => handleClick(1)}
            disabled={currentPage === 1}
          >
            1
          </button>
          {/* Ellipsis before current page if needed */}
          {currentPage > 3 && (
            <span key="start-ellipsis" className="px-2 text-white">...</span>
          )}
          {/* Current page (if not first or last) */}
          {currentPage !== 1 && currentPage !== totalPages && (
            <button
              key={currentPage}
              className="px-3 py-1 rounded bg-primary-600 text-white transition-colors"
              onClick={() => handleClick(currentPage)}
              disabled
            >
              {currentPage}
            </button>
          )}
          {/* Ellipsis after current page if needed */}
          {currentPage < totalPages - 2 && (
            <span key="end-ellipsis" className="px-2 text-white">...</span>
          )}
          {/* Last page */}
          <button
            key={totalPages}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === totalPages
                ? 'bg-primary-600 text-white'
                : 'bg-dark-200 text-white hover:bg-dark-100'
            }`}
            onClick={() => handleClick(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="px-3 py-1 rounded bg-dark-200 text-white"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        السابق
      </button>
    </div>
  );
};

export default Pagination;