import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-end mt-6">
      <nav aria-label="Pagination" className="flex gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center text-gray-300 rounded-full
            bg-gradient-to-br from-green-900 to-black hover:opacity-80 disabled:opacity-50"
        >
          <FaChevronLeft className="text-gray-200" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold 
              ${
                page === currentPage
                  ? "bg-gradient-to-br from-green-600 to-green-900 text-white"
                  : "bg-gradient-to-br from-green-900 to-black text-gray-300 hover:opacity-80"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center text-gray-300 rounded-full
            bg-gradient-to-br from-green-900 to-black hover:opacity-80 disabled:opacity-50"
        >
          <FaChevronRight className="text-gray-200" />
        </button>
      </nav>
    </div>
  );
}
