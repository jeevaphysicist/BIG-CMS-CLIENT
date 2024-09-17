"use client";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import EditPages from "./EditPages";

const initialData = [
  {
    id: "1",
    name: "Gemstones",
    link: "bit.ly/1213",
    page: "Rings",
    status: "Active",
  },
  {
    id: "2",
    name: "Jewellery",
    link: "bit.ly/4353",
    page: "Engagement Rings",
    status: "Active",
  },
  {
    id: "3",
    name: "Drops & Beats",
    link: "bit.ly/1213",
    page: "Wedding Rings",
    status: "Active",
  },
  {
    id: "4",
    name: "Semi-Mounts",
    link: "bit.ly/1213",
    page: "Opal Rings",
    status: "Active",
  },
  {
    id: "5",
    name: "Findings",
    link: "bit.ly/1255",
    page: "Diamond Rings",
    status: "Active",
  },
  {
    id: "6",
    name: "Gifts",
    link: "bit.ly/5253",
    page: "Emerald Rings",
    status: "Active",
  },
  {
    id: "7",
    name: "Custom Jewellery",
    link: "bit.ly/5555",
    page: "Sappire Rings",
    status: "Active",
  },

  // ... more data
];

const Index = () => {
  const [isList, setIsList] = useState(true);
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
  const handleCategoryPage = () => {
    setIsList(!isList);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%]">
      {isList ? (
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Category Pages
              </h1>
              <p className="text-[#4A5367]">
                Add and view Your Category Pages.
              </p>
            </div>
            <button
              className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
              onClick={handleCategoryPage}
            >
              <CiCirclePlus />
              Add new Category Page
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
              handleCategoryPage={handleCategoryPage}
            />
          </div>
        </div>
      ) : (
        <EditPages handleCategoryPage={handleCategoryPage} />
      )}
    </div>
  );
};

export default Index;
