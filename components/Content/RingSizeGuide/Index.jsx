"use client";
import { useState ,useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import EditPages from "./EditPages";
import { handleGetRingSizeGuideList } from "@/API/api";

const initialData = [
  {
    id: "1",
    sizeGuide: "Ring Size Guide",
    status: "Active",
  },

  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [selectEditData, setSelectEditData] = useState({});
  const [ringSizeList, setRingSizeList] = useState([]);
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

  const handleSizeGuide = () => {
    setIsTable(!isTable);
    let status = !isTable;
    if (status === false) {
      setSelectEditData({});
    }
  };

  

  useEffect(() => {
    fetchRingSizeGuideList();
  }, []);

  useEffect(() => {      
      setSelectEditData(ringSizeList.find(item => item._id === selectEditData?._id));
  }, [ringSizeList]);

  useEffect(() => {
    // Filter the ringSizeList by title based on the search query
    if (searchQuery.trim() === '') {
      setFilteredData(ringSizeList);
    } else {
      const filtered = ringSizeList.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, ringSizeList]);

  const fetchRingSizeGuideList = async () => {
    try {
      const response = await handleGetRingSizeGuideList();
      if (response.status >= 200 && response.status <= 209) {
        setRingSizeList(response.data);
        setFilteredData(response.data); // Initialize filtered data with the full list
      } else {
        setRingSizeList([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetEditData = (editdata) => {
    setSelectEditData(editdata);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%]">
      {isTable ? (
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Ring size guide
              </h1>
              <p className="text-[#4A5367]">Edit Ring size guide</p>
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
              fetchData={fetchRingSizeGuideList}
              handleSetEditData={handleSetEditData}              
              initialData={filteredData}
              searchQuery={searchQuery}
              handleSizeGuide={handleSizeGuide}
            />
          </div>
        </div>
      ) : (
        <EditPages 
        fetchData={fetchRingSizeGuideList}
        editData={selectEditData}        
        handleSizeGuide={handleSizeGuide}
        />
      )}
    </div>
  );
};

export default Index;
