'use client'
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import EditPages from "./EditPages";

const initialData = [
  {
    id: "1",
    name: "Gemstone Guide",
    status: "Active",
  },
  {
    id: "2",
    name: "Diamond Guide",
    status: "InActive",
  },
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const itemsClasses = {
    table: " bg-white  ",
    thead: "bg-white border ",
    tbody: "border",
    tfoot: "",
    tr: "",
    th: "bg-white font-medium w-[100px]  rounded-t-[10px]",
    td: "bg-[#F9FAFB] font-regular text-[#0A1215]",
  };
  const handleGuide = () => {
    setIsTable(!isTable);
  };

  const handleAddSitePage = () => {};

  return (
  
        <div className="w-[100%]">
        {isTable ? (
            <div className="w-[100%] p-5">
            <div className="flex items-center justify-between w-[100%]">
                <div className="flex flex-col items-start justify-start">
                <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                    Guides:
                </h1>
                <p className="text-[#4A5367]">Add and View Your Guides.</p>
                </div>
                <button
                className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
                onClick={handleAddSitePage}
                >
                <CiCirclePlus />
                Add new Guide
                </button>
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
                <ResponsiveTable
                initialData={initialData}
                handleGuide={handleGuide}
                />
            </div>
            </div>
        ) : (
            <EditPages handleGuide={handleGuide} />
        )}
        </div>
    
  );
};

export default Index;
