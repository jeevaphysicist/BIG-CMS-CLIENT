"use client";
import { useState ,useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import EditPages from "./EditPages";
import { handleGetGemstoneCertificationList } from "@/API/api";

const initialData = [
  {
    id: "1",
    sizeGuide: "Gemstone Certification",
    status: "Active",
  },

  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [selectEditData, setSelectEditData] = useState({});
  const [gemstoneCertificationList, setGemstoneCertificationList] = useState([]);
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

  const handleGemstoneCertification = () => {
    setIsTable(!isTable);
    let status = !isTable;
    if (status === false) {
      setSelectEditData({});
    }
  };

  useEffect(() => {
    fetchGemstoneCertificationList();
  }, []);

  useEffect(() => {      
      setSelectEditData(gemstoneCertificationList.find(item => item._id === selectEditData?._id));
  }, [gemstoneCertificationList]);

  useEffect(() => {
    // Filter the gemstoneCertificationList by title based on the search query
    if (searchQuery.trim() === '') {
      setFilteredData(gemstoneCertificationList);
    } else {
      const filtered = gemstoneCertificationList.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, gemstoneCertificationList]);

  const fetchGemstoneCertificationList = async () => {
    try {
      const response = await handleGetGemstoneCertificationList();
      if (response.status >= 200 && response.status <= 209) {
        setGemstoneCertificationList(response.data);
        setFilteredData(response.data); // Initialize filtered data with the full list
      } else {
        setGemstoneCertificationList([]);
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
                Gemstone Certification
              </h1>
              <p className="text-[#4A5367]">Edit Gemstone Certification</p>
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
              fetchData={fetchGemstoneCertificationList}
              handleSetEditData={handleSetEditData}              
              initialData={filteredData}
              searchQuery={searchQuery}
              handleGemstoneCertification={handleGemstoneCertification}
            />
          </div>
        </div>
      ) : (
        <EditPages 
        fetchData={fetchGemstoneCertificationList}
        editData={selectEditData}        
        handleGemstoneCertification={handleGemstoneCertification} />
      )}
    </div>
  );
};

export default Index;
