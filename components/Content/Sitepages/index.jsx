'use client'
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import EditPages from "./EditPages";
import { handleGetSitepageList } from "@/API/api";

// Sample initial data structure: [{ title, content, media }]
const initialData = [
  {
    id: "1",
    title: "About",
    content: {
      description: "Exhibiting a mesmerizing blend of amethyst and citrine colors..",
    },
    media: {},
    status: "Active",
  },
  {
    id: "2",
    title: "History",
    content: {
      description: "Exhibiting a mesmerizing blend of amethyst and citrine colors..",
    },
    media: {},
    status: "InActive",
  },
  // ... more data
];

const Index = () => {
  const [isList, setIsList] = useState(true);
  const [selectEditData, setSelectEditData] = useState({});
  const [sitepageList, setSitepageList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [type, setType] = useState('create');
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const itemsClasses = {
    table: " bg-white ",
    thead: "bg-white border ",
    tbody: "border",
    tfoot: "",
    tr: "",
    th: "bg-white font-medium w-[100px]  rounded-t-[10px]",
    td: "bg-[#F9FAFB] font-regular text-[#0A1215]",
  };

  const handleSitePage = () => {
    setIsList(!isList);
    let status = !isList;
    if (status === false) {
      setSelectEditData({});
    }
  };

  const handleType = (value) => {
    setType(value);
  };

  useEffect(() => {
    fetchSitepageList();
  }, []);

  useEffect(() => {
    // If in edit mode, set the selected data for editing
    if (type === 'edit') {
      setSelectEditData(sitepageList.find(item => item._id === selectEditData._id));
    }
  }, [sitepageList]);

  useEffect(() => {
    // Filter the sitepageList by title based on the search query
    if (searchQuery.trim() === '') {
      setFilteredData(sitepageList);
    } else {
      const filtered = sitepageList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, sitepageList]);

  const fetchSitepageList = async () => {
    try {
      const response = await handleGetSitepageList();
      if (response.status >= 200 && response.status <= 209) {
        setSitepageList(response.data);
        setFilteredData(response.data); // Initialize filtered data with the full list
      } else {
        setSitepageList([]);
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
      {isList ? (
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Site Pages:
              </h1>
              <p className="text-[#4A5367]">Add and view Your Site Pages.</p>
            </div>
            <button
              className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
              onClick={() => {
                handleSitePage();
                handleType('create');
              }}
            >
              <CiCirclePlus />
              Add new Sitepage
            </button>
          </div>

          {/* Search Input */}
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
          
          {/* Table to display filtered data */}
          <div className="w-[100%] mt-8 overflow-x-auto no-scrollbar ">
            <ResponsiveTable
              fetchData={fetchSitepageList}
              handleSetEditData={handleSetEditData}
              handleType={handleType}
              initialData={filteredData} // Use filtered data
              handleSitePage={handleSitePage}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      ) : (
        <EditPages
          fetchData={fetchSitepageList}
          editData={selectEditData}
          type={type}
          handleSitePage={handleSitePage}
          
        />
      )}
    </div>
  );
};

export default Index;
