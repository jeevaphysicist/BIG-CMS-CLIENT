"use client";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import { Input } from "@nextui-org/react";
import RequiredSymbol from "../Content/RequiredSymbol";
import EditModal from "../EditModal";
import { toast } from "react-toastify";
import {
  handleGetAllTickers,
  handleTickerCreation,
  handleTickerStatusChange,
  handleTickerUpdate,
} from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Filtered data state
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    tickerTitle: "",
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const handleTicker = () => {
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateTicker = () => {
    setIsEditMode(false);
    setFormData({ tickerTitle: "" });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    let newErrors = {};
    let has = false;
    if (!formData.tickerTitle) {
      newErrors.tickerTitle = "Ticker Title is required";
      has = true;
    }
    setError(newErrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      toast.error("Please fill required details correctly!");
      return;
    }
    try {
      setLoading(true);
      const bodyData = {
        name: formData.tickerTitle,
        status: "Inactive",
      };
      const response = isEditMode
        ? await handleTickerUpdate(selectedRow._id, bodyData)
        : await handleTickerCreation(bodyData);
      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchTickerData();
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await handleTickerStatusChange(id, { status: status==="Active" ? "Inactive" : "Active" });
      if (response.status >= 200 && response.status <= 209) {
        fetchTickerData();
        toast.success(response.data.message);
      }
      else{
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTickerData = async () => {
    try {
      const response = await handleGetAllTickers();
      if (response.status >= 200 && response.status <= 209) {
        setTableData(response.data.ticker);
        setFilteredData(response.data.ticker); // Set filtered data initially
      } else {
        setTableData([]);
        setFilteredData([]);
      }
    } catch (error) {
      setTableData([]);
      setFilteredData([]);
    }
  };

  const handleSelectedTicker = (row) => {
    setSelectedRow(row);
    setFormData({ tickerTitle: row.name });
    setIsEditMode(true);
    handleTicker();
  };

  useEffect(() => {
    fetchTickerData();
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
            onClick={handleCreateTicker}
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
            className="border-2 pl-12 py-2 pr-5 border-[#D0D5DD] rounded-[10px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>
        <div className="w-[100%] mt-8 overflow-x-auto no-scrollbar">
          <ResponsiveTable
            fetchData={fetchTickerData}
            initialData={filteredData} 
            handleTicker={handleTicker}
            updateStatus={handleUpdateStatus}
            handleSelectedTicker={handleSelectedTicker}
            isLoading={loading}
          />
        </div>
      </div>
      <EditModal
        loading={loading}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modaltitle={isEditMode ? "Edit Ticker" : "Add New Ticker"}
        subtitle={
          isEditMode ? "Seamlessly Edit Ticker" : "Seamlessly Add New Ticker"
        }
        buttonname={isEditMode ? "Save" : "Save"}
        onSubmit={handleSubmit}
        fetchData={fetchTickerData}
      >
        <form onSubmit={handleSubmit} className="w-[100%] px-6 py-4 space-y-4">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="title"
              className="text-[16px] font-medium flex gap-1"
            >
              Ticker Title
              <RequiredSymbol />{" "}
              {errors.tickerTitle && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.tickerTitle}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="title"
              variant="bordered"
              placeholder="Nunc vel rutrum lectus. Mauris vulputate lacinia lacus ac ultricies"
              size="md"
              radius="sm"
              name="tickerTitle"
              value={formData.tickerTitle}
              onChange={handleFormChange}
            />
          </div>
        </form>
      </EditModal>
    </div>
  );
};

export default Index;
