"use client";
import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import EditPages from "./EditPages";
import { handleGetGuides } from "@/API/api";

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
  {
    id: "3",
    name: "Pendant Mount",
    status: "Active",
  },
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [selectEditData, setSelectEditData] = useState({});
  const [guideList, setGuideList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [type, setType] = useState("create");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

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
    let status = !isTable;
    if (status === false) {
      setSelectEditData({});
    }
  };

  const handleType = (value) => {
    setType(value);
  };

  useEffect(() => {
    fetchGuideList();
  }, []);

  useEffect(() => {
    // If in edit mode, set the selected data for editing
    if (type === "edit") {
      setSelectEditData(
        guideList.find((item) => item._id === selectEditData._id)
      );
    }
  }, [guideList]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(guideList);
    } else {
      const filtered = guideList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, guideList]);

  const fetchGuideList = async () => {
    try {
      const response = await handleGetGuides();
      if (response.status >= 200 && response.status <= 209) {
        setGuideList(response.data);
        setFilteredData(response.data);
      } else {
        setGuideList([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetEditData = (editdata) => {
    setSelectEditData(editdata);
  };

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
              onClick={() => {
                handleGuide();
                handleType("create");
              }}
            >
              <CiCirclePlus />
              Add new Guide
            </button>
          </div>
          <div className="flex mt-5 relative items-center justify-start">
            <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
            <input
              type="search"
              placeholder="Search by title"
              value={searchQuery} // Bind searchQuery state to the input field
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery when typing
              className="border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
            />
          </div>
          <div className="w-[100%] mt-8 overflow-x-auto no-scrollbar ">
            <ResponsiveTable
              fetchData={fetchGuideList}
              handleSetEditData={handleSetEditData}
              handleType={handleType}
              initialData={filteredData} // Use filtered data
              handleGuide={handleGuide}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      ) : (
        <EditPages
          fetchData={fetchGuideList}
          editData={selectEditData}
          type={type}
          handleGuide={handleGuide}
        />
      )}
    </div>
  );
};

export default Index;
