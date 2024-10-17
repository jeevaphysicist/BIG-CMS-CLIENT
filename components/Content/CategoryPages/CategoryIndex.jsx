"use client";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import EditPages from "./EditPages";
import { handleGetCategoryList, handleGetSubCategoryList } from "@/API/api";

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
    name: "Jewelry",
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
    status: "Inactive",
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

  // ... more data
];

const Index = () => {
  const [isList, setIsList] = useState(true);
  const [type, setType] = useState("create");
  const [sectionType, setSectionType] = useState("category");
  const [isChecked, setIsChecked] = useState(true);
  const [editData, setEditData] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const itemsClasses = {
    table: " bg-white  ",
    thead: "bg-white border ",
    tbody: "border",
    tfoot: "",
    tr: "",
    th: "bg-white font-medium w-[100px]  rounded-t-[10px]",
    td: "bg-[#F9FAFB] font-regular text-[#0A1215]",
  };

  useEffect(() => {
    fetchCategorySubCategory();
  }, [sectionType, categoryID]);

  useEffect(() => {
    if(categoryList.length > 0){
      setEditData(categoryList.find(item => item?._id === editData?._id));
    }
  },[categoryList])

  useEffect(() => {
    const filtered = categoryList.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
      // item.link.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // item.page.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchQuery, categoryList]);

  const fetchCategorySubCategory = async () => {
    if (sectionType === "category") {
      const response = await handleGetCategoryList();
      setCategoryList(response.data.categories);
    } else {
      const response = await handleGetSubCategoryList(categoryID);
      setCategoryList(response.data.subcategories);
    }
  };
  
  const handleCategoryPage = () => {
    setIsList(!isList);
  };

  const handleSectionType = (type) => {
    setSectionType(type);
  };

  const handleCategoryID = (id) => {
    setCategoryID(id);
  };

  const handleSetEditData = (data) => {
    setEditData(data);
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-[100%]">
      {isList ? (
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                {sectionType === "category" ? "Category Pages" : "Sub Category Pages"}
              </h1>
              <p className="text-[#4A5367]">
                Add and view Your {sectionType === "category" ? "Category Pages" : "Sub Category Pages"}.
              </p>
            </div>
            {
              sectionType === "subcategory" && (
                <button
                  className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] text-black px-5 py-2 flex items-center justify-center gap-1"
                  onClick={()=>handleSectionType('category')}
            >
                  Back to Category List 
                </button>
              )
            }
            
          </div>
          <div className="flex mt-5 relative items-center justify-start">
            <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
            <input
              type="search"
              placeholder="Search"
              className="border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
              onChange={(e) => handleSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-[100%] mt-8 overflow-x-auto no-scrollbar ">
            <ResponsiveTable
              fetchData={fetchCategorySubCategory}
              searchQuery={searchQuery}
              initialData={filteredList}             
              handleCategoryPage={handleCategoryPage}
              handleSetEditData={handleSetEditData}
              handleSectionType={handleSectionType}
              sectionType={sectionType}
              handleCategoryID={handleCategoryID}
            />
          </div>
        </div>
      ) : (
        <EditPages  
        editData={editData}
        handleCategoryID={handleCategoryID}
        handleSectionType={handleSectionType}
        handleCategoryPage={handleCategoryPage}
        sectionType={sectionType} 
        categoryID={categoryID}
        fetchData={fetchCategorySubCategory}
        />
      )}
    </div>
  );
};

export default Index;
