"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ResponsiveCard from "./ResponsiveCard";

const dropsbeads = [
  {
    id: "1",
    image: "/images/image 36.png",
    title: "Rings",
  },
  {
    id: "2",
    image: "/images/image 37.png",
    title: "Earrings",
  },
  {
    id: "3",
    image: "/images/image 38.png",
    title: "Pendants",
  },
  {
    id: "4",
    image: "/images/image 39.png",
    title: "Men's Ring",
  },
  {
    id: "5",
    image: "/images/image 40.png",
    title: "Setting Service",
  },
];

const Index = () => {
  const [isList, setIsList] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const handleSemiMountsPage = () => {
    setIsList(!isList);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%]">
    
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Semi-Mounts
              </h1>
              <p className="text-[#4A5367]">
                View and Edit Different Semi-Mounts Submenus
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
              handleSemiMountsPage={handleSemiMountsPage}
            />
          </div>
        </div>
     
    </div>
  );
};

export default Index;
