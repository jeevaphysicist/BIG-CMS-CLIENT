"use client";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import ResponsiveTable from "./ResponsiveTable";

const Gemstone = [
  {
    id: "1",
    slug: "by-gemstone",
    type: "By Gemstone",
    content: [
      {
        id: "1",
        name: "Amestrine",
        icon: "/images/image 30.png",
        status: "Active",
      },
      {
        id: "2",
        name: "Amethyst",
        icon: "/images/image 31.png",
        status: "Active",
      },
      {
        id: "3",
        name: "Ammolite",
        icon: "/images/image 27.png",
        status: "Active",
      },
      {
        id: "4",
        name: "Apatite",
        icon: "/images/image 28.png",
        status: "Active",
      },
      {
        id: "5",
        name: "Aquamarine",
        icon: "/images/image 26.png",
        status: "Active",
      },
      {
        id: "6",
        name: "Black Spinel",
        icon: "/images/image 29.png",
        status: "Active",
      },
    ],
  },
  {
    id: "2",
    type: "By Birthstone",
    slug: "by-birthstone",
    content: [
      {
        id: "1",
        name: "Amestrine",
        icon: "/images/image 25.png",
        status: "Active",
      },
    ],
  },
  {
    id: "3",
    type: "By Shape",
    slug: "by-shape",
    content: [
      {
        id: "1",
        name: "Amestrine",
        icon: "/images/image 25.png",
        status: "Active",
      },
    ],
  },
  {
    id: "4",
    type: "All Gemstone",
    slug: "all-gemstone",
    content: [
      {
        id: "1",
        name: "Amestrine",
        icon: "/images/image 25.png",
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
  const handleGemstonePage = () => {
    setIsList(!isList);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%]">
     
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Gemstones
              </h1>
              <p className="text-[#4A5367]">
                View and Edit Different Gemstone sections
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
              handleGemstonePage={handleGemstonePage}
            />
          </div>
        </div>
     
    </div>
  );
};

export default Index;
