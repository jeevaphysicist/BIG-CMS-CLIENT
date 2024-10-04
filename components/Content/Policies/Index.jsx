"use client";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import EditPages from "./EditPages";
import { handleGetAllPolicies } from "@/API/api";

const initialData = [
  {
    id: "1",
    name: "Privacy Policy",
    status: "Active",
  },
  {
    id: "2",
    name: "Shipping Policy",
    status: "InActive",
  },
  {
    id: "3",
    name: "Return Policy",
    status: "Active",
  },
  {
    id: "4",
    name: "Refund Policy",
    status: "Active",
  },
  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Filtered data state
  const [searchQuery, setSearchQuery] = useState("");

  const handlePolicies = () => {
    setIsTable(!isTable);
  };

  const fetchPoliciesData = async () => {
    try {
      const response = await handleGetAllPolicies();

      if (response.status >= 200 && response.status <= 209) {
        setTableData(response.data);
        setFilteredData(response.data); // Set filtered data initially
      } else {
        setTableData([]);
        setFilteredData([]);
      }
    } catch (error) {
      setTableData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchPoliciesData();
  }, []);

  // Filter the data based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = tableData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(tableData);
    }
  }, [searchQuery, tableData]);

  return (
    <div className="w-[100%]">
      {isTable ? (
        <div className="w-[100%] p-5">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Policies:
              </h1>
              <p className="text-[#4A5367]">Add and View Your Policies.</p>
            </div>
            <button
              className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
              onClick={handlePolicies}
            >
              <CiCirclePlus />
              Add new Policy
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
              initialData={filteredData}
              handlePolicies={handlePolicies}
            />
          </div>
        </div>
      ) : (
        <EditPages handlePolicies={handlePolicies} />
      )}
    </div>
  );
};

export default Index;
