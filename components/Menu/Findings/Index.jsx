"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ResponsiveCard from "./ResponsiveCard";

const dropsbeads = [
  {
    id: "1",
    image: "/images/image 41.png",
    title: "Backing",
  },
  {
    id: "2",
    image: "/images/image 42.png",
    title: "Rings",
  },
  {
    id: "3",
    image: "/images/image 43.png",
    title: "Earrings",
  },
  {
    id: "4",
    image: "/images/image 44.png",
    title: "Pendants",
  },
];

const Index = () => {
  const [isList, setIsList] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const handleFindingsPage = () => {
    setIsList(!isList);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%]">
     
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Findings
              </h1>
              <p className="text-[#4A5367]">
                View and Edit Different Findings Submenus
              </p>
            </div>
          </div>
          <div className="flex mt-5 relative items-center justify-start">
            <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
            <input
              type="search"
              placeholder="Search"
              className="border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
            />
          </div>
          <div className="w-[100%] mt-8 overflow-x-auto no-scrollbar ">
            <ResponsiveCard
              initialData={dropsbeads}
              handleFindingsPage={handleFindingsPage}
            />
          </div>
        </div>
      
    </div>
  );
};

export default Index;
