"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ResponsiveCard from "./ResponsiveCard";

const dropsbeads = [
  {
    id: "1",
    image: "/images/image 32.png",
    title: "Pairs",
  },
  {
    id: "2",
    image: "/images/image 33.png",
    title: "Singles",
  },
  {
    id: "3",
    image: "/images/image 34.png",
    title: "Lines",
  },
  {
    id: "4",
    image: "/images/image 35.png",
    title: "Beads",
  },
];

const Index = () => {
  const [isList, setIsList] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const handleDropsBeadsPage = () => {
    setIsList(!isList);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%]">
      
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Drops & Beads
              </h1>
              <p className="text-[#4A5367]">
                View and Edit Different Drops & Beads Submenus
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
              handleDropsBeadsPage={handleDropsBeadsPage}
            />
          </div>
        </div>

    </div>
  );
};

export default Index;
