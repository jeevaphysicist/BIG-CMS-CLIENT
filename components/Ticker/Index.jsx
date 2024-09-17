"use client";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import { Input } from "@nextui-org/react";
import RequiredSymbol from "../Content/RequiredSymbol";
import EditModal from "../EditModal";

const initialData = [
  {
    id: "1",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "2",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "3",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "4",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "5",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "6",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "7",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "8",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },
  {
    id: "9",
    title:
      "Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies",
    status: "Active",
  },

  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsClasses = {
    table: " bg-white  ",
    thead: "bg-white border ",
    tbody: "border",
    tfoot: "",
    tr: "",
    th: "bg-white font-medium w-[100px]  rounded-t-[10px]",
    td: "bg-[#F9FAFB] font-regular text-[#0A1215]",
  };

  const handleTicker = () => {
    setIsModalOpen(true);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%]">
      <div className="w-[100%] p-5">
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-col items-start justify-start">
            <h1 className="flex text-[#0A1215] font-medium text-[20px]">
              Ticker
            </h1>
            <p className="text-[#4A5367]">Add and Edit Your Ticker Details</p>
          </div>
          <button
            className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
            onClick={handleTicker}
          >
            <CiCirclePlus />
            Add New Ticker
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
            handleTicker={handleTicker}
          />
        </div>
      </div>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modaltitle="Add New Ticker"
        subtitle="Seamlessly Add New Ticker"
        buttonname="Save New Ticker"
      >
        <div className="w-[100%] px-6 py-4 space-y-4">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="title"
              className="text-[16px] font-medium flex gap-1"
            >
              Ticker Title
              <RequiredSymbol />{" "}
              {/* {errors.banner2 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2}
                  </span>
                )} */}
            </label>
            <Input
              type="text"
              minRows={4}
              id="title"
              variant="bordered"
              placeholder="Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies"
              size="md"
              radius="sm"
              name="title"
              // onChange={handleFormChange}
            />
            {/* {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />} */}
          </div>
        </div>
      </EditModal>
    </div>
  );
};

export default Index;
