"use client";
import { useState ,useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import EditPages from "./EditPages";
import { handleGetBirthStones } from "@/API/api";

const initialData = [
  {
    id: "1",
    name: "May Birthstone: Emerald - Gem Of Spring And Prosperity",
    status: "Active",
  },
  {
    id: "2",
    name: "May Birthstone: Emerald - Gem Of Spring And Prosperity",
    status: "InActive",
  },
  {
    id: "3",
    name: "May Birthstone: Emerald - Gem Of Spring And Prosperity",
    status: "Active",
  },
  {
    id: "4",
    name: "May Birthstone: Emerald - Gem Of Spring And Prosperity",
    status: "Active",
  },
  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [selectEditData, setSelectEditData] = useState({});
  const [birthStoneList, setBirthStoneList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [type, setType] = useState('create');
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
  const handleBirthStones = () => {
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
    fetchBirthStoneList();
  }, []);

  useEffect(() => {
    // If in edit mode, set the selected data for editing
    if (type === 'edit') {
      setSelectEditData(birthStoneList.find(item => item._id === selectEditData._id));
    }
  }, [birthStoneList]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(birthStoneList);
    } else {
      const filtered = birthStoneList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, birthStoneList]);

  const fetchBirthStoneList = async () => {
    try {
      const response = await handleGetBirthStones();
      if (response.status >= 200 && response.status <= 209) {
        setBirthStoneList(response.data);
        setFilteredData(response.data); 
      } else {
        setBirthStoneList([]);
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
                Birthstones
              </h1>
              <p className="text-[#4A5367]">Add and View Your Birthstones.</p>
            </div>
            <button
              className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
              onClick={()=>{
                handleBirthStones();
                handleType('create');
              }}
            >
              <CiCirclePlus />
              Add New Birthstone
            </button>
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
            fetchData={fetchBirthStoneList}
            handleSetEditData={handleSetEditData}
            handleType={handleType}
            initialData={filteredData}
            searchQuery={searchQuery}
            handleBirthStones={handleBirthStones}
           />
          </div>
        </div>
      ) : (
        <EditPages
        fetchData={fetchBirthStoneList}
        editData={selectEditData}
        type={type}
        handleBirthStones={handleBirthStones}
        />
      )}
    </div>
  );
};

export default Index;
