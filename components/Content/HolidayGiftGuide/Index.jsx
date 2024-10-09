"use client";
import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import EditPages from "./EditPages";
import { handleGetHolidayGiftGuideList } from "@/API/api";

const initialData = [
  {
    id: "1",
    giftGuide: "Holiday gift guide",
    status: "Active",
  },

  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [selectEditData, setSelectEditData] = useState({});
  const [holidayGiftGuide, setHolidayGiftGuide] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsClasses = {
    table: " bg-white  ",
    thead: "bg-white border ",
    tbody: "border",
    tfoot: "",
    tr: "",
    th: "bg-white font-medium w-[100px]  rounded-t-[10px]",
    td: "bg-[#F9FAFB] font-regular text-[#0A1215]",
  };

  const handleGiftGuide = () => {
    setIsTable(!isTable);
    let status = !isTable;
    if (status === false) {
      setSelectEditData({});
    }
  };

  useEffect(() => {
    fetchHolidayGiftGuideList();
  }, []);

  useEffect(() => {      
      setSelectEditData(holidayGiftGuide.find(item => item._id === selectEditData?._id));
  }, [holidayGiftGuide]);

  useEffect(() => {
    // Filter the holidayGiftGuide by title based on the search query
    if (searchQuery.trim() === '') {
      setFilteredData(holidayGiftGuide);
    } else {
      const filtered = holidayGiftGuide.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, holidayGiftGuide]);

  const fetchHolidayGiftGuideList = async () => {
    try {
      const response = await handleGetHolidayGiftGuideList();
      if (response.status >= 200 && response.status <= 209) {
        setHolidayGiftGuide(response.data);
        setFilteredData(response.data); 
      } else {
        setHolidayGiftGuide([]);
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
                Holiday Gift Guide
              </h1>
              <p className="text-[#4A5367]">Edit Holiday gift guide</p>
            </div>
          </div>
          <div className="flex mt-5 relative items-center justify-start">
            <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
            <input
              type="search"
              placeholder="Search by title"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
            />
          </div>
          <div className="w-[100%] mt-8 overflow-x-auto no-scrollbar ">
            <ResponsiveTable
              fetchData={fetchHolidayGiftGuideList}
              handleSetEditData={handleSetEditData}              
              initialData={filteredData}
              searchQuery={searchQuery}
              handleGiftGuide={handleGiftGuide}
            />
          </div>
        </div>
      ) : (
        <EditPages
        fetchData={fetchHolidayGiftGuideList}
        editData={selectEditData} 
        handleGiftGuide={handleGiftGuide} />
      )}
    </div>
  );
};

export default Index;
