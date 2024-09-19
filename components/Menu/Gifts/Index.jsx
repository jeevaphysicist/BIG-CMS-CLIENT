"use client";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import ResponsiveTable from "./ResponsiveTable";

const Gemstone = [
  {
    id: "1",
    slug: "top-gifts",
    type: "Top gifts",
    content: [
      {
        id: "1",
        name: "Gemstone",
        status: "Active",
      },
      {
        id: "2",
        name: "Rings",
        status: "Active",
      },
      {
        id: "3",
        name: "Huggie hoop",
        status: "Active",
      },
      {
        id: "4",
        name: "Earrings",
        status: "Active",
      },
    ],
  },
  {
    id: "2",
    type: "By Recipient",
    slug: "by-recipient",
    content: [
      {
        id: "1",
        name: "Amestrine",
        status: "Active",
      },
    ],
  },
  {
    id: "3",
    type: "By Occasion",
    slug: "by-occasion",
    content: [
      {
        id: "1",
        name: "Amestrine",
        status: "Active",
      },
    ],
  },
  {
    id: "4",
    type: "By Popularity",
    slug: "by-opularity",
    content: [
      {
        id: "1",
        name: "Amestrine",
        status: "Active",
      },
    ],
  },
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
  const handleGiftsPage = () => {
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
                Gifts
              </h1>
              <p className="text-[#4A5367]">
                View and Edit Different Gifts sections
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
            <ResponsiveTable
              initialData={Gemstone}
              handleGiftsPage={handleGiftsPage}
            />
          </div>
        </div>
      ) : (
        <EditPages handleGiftsPage={handleGiftsPage} />
      )}
    </div>
  );
};

export default Index;
