import { FiSearch } from "react-icons/fi";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Pagination } from "@nextui-org/react";

const reviews = [
  {
    id: 1,
    profile: "C",
    name: "Charlie",
    verifiedBuyer: true,
    title: "Extremely happy!",
    message:
      "Love this gemstone. Great quality. Very nice shipping. Fast delivery.",
    image: "/images/image 46.png",
    date: "11/12/2023",
  },
  {
    id: 2,
    profile: "S",
    name: "Srimathi",
    verifiedBuyer: false,
    title: "I like the purchase",
    message:
      "Love this gemstone. Great quality. Very nice shipping. Fast delivery.",
    image: "/images/image 46.png",
    date: "11/12/2023",
  },
  {
    id: 3,
    profile: "J",
    name: "John",
    verifiedBuyer: true,
    title: "Better than expected",
    message:
      "Love this gemstone. Great quality. Very nice shipping. Fast delivery.",
    image: "/images/image 46.png",
    date: "11/12/2023",
  },
];

const ClientReviews = ({ activeTab }) => {
  return (
    <div className="w-full px-4">
      <div className="w-full flex justify-end px-8 sticky z-30 top-28 bg-white ">
        <div className="flex mt-5 relative items-center justify-start">
          <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
          <input
            type="search"
            placeholder="Search"
            className="border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
          />
        </div>
      </div>
      <div>
        <ReviewCard initialData={reviews} activeTab={activeTab} />
      </div>
      <div className="w-full sticky z-30 bottom-0 bg-white">
        <div className="flex rounded-b-[10px]  justify-between py-2 px-2 w-[100%] items-center gap-5">
          <div className="flex gap-4">
            <button className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px]  text-[#344054] items-center justify-center px-4 py-2 gap-2">
              Previous
            </button>
            <button className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px]  text-[#344054] items-center justify-center px-4 py-2 gap-2">
              Next
            </button>
          </div>
          <p className="font-medium text-[14px]  text-[#344054]">
            Page 1 of 10
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
