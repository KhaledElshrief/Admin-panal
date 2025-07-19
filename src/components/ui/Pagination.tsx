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
      {[...Array(totalPages)].map((_, idx) => {
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
      })}
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