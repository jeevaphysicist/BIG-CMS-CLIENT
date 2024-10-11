import { FiSearch } from "react-icons/fi";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Pagination } from "@nextui-org/react";

const ClientReviews = ({ fetchData, reviews, activeTab }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const paginatedReviews = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full px-4">      
      <div className="w-full min-h-[80vh] overflow-y-auto no-scrollbar">
        <ReviewCard initialData={paginatedReviews} fetchData={fetchData} activeTab={activeTab} />
      </div>
      <div className="w-full sticky z-30 bottom-0 bg-white">
        <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1 justify-between py-2 px-2 w-[100%] items-center gap-5">
          <button
            className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <LuArrowLeft />
            Previous
          </button>
          <Pagination 
            total={totalPages}
            initialPage={1} 
            page={currentPage} 
            classNames={{
              item: "bg-transparent text-[#475467] font-medium",
              cursor: "bg-[#F9FAFB] text-[#1D2939] font-medium",
            }}
            onChange={(page) => setCurrentPage(page)}
          />
          <button
            className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <LuArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
