import React, { useEffect, useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { RiDragMove2Fill } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { Switch } from "@nextui-org/react";
import {  PiArrowDownBold } from "react-icons/pi";
import { toast } from "react-toastify";
import {  handleUpdateHolidayGiftGuideStatus } from "@/API/api";

const DraggableRow = ({ UpdateStatus, row, handleGiftGuide, handleSetEditData }) => {
  const controls = useDragControls(); 

  return (
    <Reorder.Item
      value={row}
      as="tr"
      className="border-b bg-[#F9FAFB] hover:bg-white"
      dragListener={false}
      dragControls={controls}
    >
      <td className="px-4 py-4 font-regular text-[14px] gap-2 flex mt-1 text-nowrap items-center">
        <motion.div
          className="cursor-move mr-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onPointerDown={(e) => controls.start(e)}
        >
          <RiDragMove2Fill size={16} className="text-[#676767]" />
        </motion.div>
        {row.name}
      </td>
      
      <td className="px-4 py-2 text-[14px]">
        {row.status === "Active" ? (
          <span className="flex text-[14px] font-regular items-center w-max -ml-2 justify-center gap-2 px-4 rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
            <span className="w-2 h-2 rounded-full bg-[#17B26A]" />
            Active
          </span>
        ) : (
          <span className="flex text-[14px] font-regular items-center w-max -ml-2 justify-center gap-2 px-4 rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
            <span className="w-2 h-2 rounded-full bg-[red]" />
            Inactive
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-[14px]">
        <div className="flex items-center gap-5">
          <Switch onChange={() => UpdateStatus(row.status, row._id)} isSelected={row.status === "Active"} size="sm" aria-label="Automatic updates" />
          
          <button className="text-[20px] text-[#475467]" onClick={() => { handleGiftGuide();  handleSetEditData(row); }}>
            <FiEdit2 />
          </button>
        </div>
      </td>
     
    </Reorder.Item>
  );
};

const ResponsiveTable = ({ searchQuery, initialData, handleSetEditData, fetchData,  handleGiftGuide }) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const UpdateStatus = async (status, id) => {
    try {
      const response = await handleUpdateHolidayGiftGuideStatus({ status }, id);
      if (response.status >= 200 && response.status <= 209) {
        fetchData();
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error!");
    }
  };

  // Get paginated data but don't affect the reordering logic
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle reorder on the full dataset
  const handleReorder = (newOrder) => {
    setData(newOrder); // Update the full data set
  };

  return (
    <section className="w-[100%]">
      <div className="overflow-x-auto border-r-1 border-l-1 border-t-1 rounded-t-lg">
        <table className="min-w-full rounded-2xl bg-white">
          <thead className="bg-white rounded-2xl">
            <tr>
              <th className="px-4 text-[12px] text-start py-3 border-b-1 text-[#475467] text-nowrap">
                <span className="flex items-center gap-2">
                  Gift Guide Type <PiArrowDownBold />
                </span>
              </th>             
              <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467] text-nowrap">
                Status
              </th>
              <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467] text-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          {/* Use Reorder.Group on the entire data but only display the paginated data */}
          <Reorder.Group as="tbody" axis="y" values={data} onReorder={handleReorder}>
            {paginatedData.map((row) => (
              <DraggableRow
                fetchData={fetchData}
                UpdateStatus={UpdateStatus}
                handleSetEditData={handleSetEditData}
                key={row._id}
                row={row}
                handleGiftGuide={handleGiftGuide}
              />
            ))}
          </Reorder.Group>
        </table>
      </div>      
    </section>
  );
};

export default ResponsiveTable;
