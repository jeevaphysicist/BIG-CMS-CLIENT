import React, { useEffect, useState } from "react";
import { motion, Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Button, Switch, Pagination } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDragMove2Fill } from "react-icons/ri";
import { Checkbox } from "@nextui-org/react";
import { PiTrashBold } from "react-icons/pi";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { PiArrowDownBold } from "react-icons/pi";
import { handleTickerStatusChange } from "@/API/api";
import { toast } from "react-toastify";
import Loading from "../Loading";

const ResponsiveTable = ({
  initialData,
  updateStatus,
  handleSelectedTicker,
  isLoading,
}) => {
  const [activeTickerId, setActiveTickerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows to display per page

  const totalPages = Math.ceil(initialData.length / rowsPerPage); // Calculate total pages

  useEffect(() => {
    const activeTicker = initialData.find((row) => row.status === "Active");
    if (activeTicker) {
      setActiveTickerId(activeTicker._id);
    }
    setCurrentPage(1);
  }, [initialData]);

  const handleSwitch = async (id, currentStatus) => {
    try {
      if (currentStatus === "Active") {
        await updateStatus(id, "Inactive");
        setActiveTickerId(null);
      } else {
        if (activeTickerId) {
          await updateStatus(activeTickerId, "Inactive");
        }
        await updateStatus(id, "Active");
        setActiveTickerId(id);
      }
    } catch (error) {
      toast.error("Failed to Update Status");
    }
  };

  const selectedTicker = (row) => {
    if (handleSelectedTicker) {
      handleSelectedTicker(row);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get rows for the current page
  const paginatedData = initialData.length >0 && initialData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <section className="w-[100%] ">
        <div className="overflow-x-auto border-r-1 border-l-1 border-t-1 rounded-t-lg ">
          {isLoading ? (
            <Loading />
          ) : (
            paginatedData.length >0 &&
            <table className="min-w-full rounded-2xl bg-white">
              <thead className="bg-white rounded-2xl  ">
                <tr>
                  <th className="px-4 text-[12px] text-start py-3 border-b-1 text-[#475467] text-nowrap">
                    <span className="flex items-center gap-2">
                      Ticker Title <PiArrowDownBold />
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
              <tbody
                as="tbody"
                axis="y"
                // values={paginatedData}
                // onReorder={setPaginateData}
              >
                {paginatedData &&
                  paginatedData.map((row, index) => (
                    <tr
                      key={index}
                      value={row}
                      as="tr"
                      className="border-b bg-[#F9FAFB] hover:bg-white"
                    >
                      <td className="px-4 py-4 font-regular text-[14px] gap-2 flex mt-1 text-nowrap items-center">
                        <motion.div
                          className="cursor-move mr-2 "
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <RiDragMove2Fill
                            size={16}
                            className="text-[#676767]"
                          />
                        </motion.div>
                        {/* <Checkbox /> */}
                        {row.name}
                      </td>
                      <td className="px-4 py-2 text-[14px]">
                        {row.status === "Active" ? (
                          <span className="flex text-[14px] font-regular items-center w-max -ml-2 justify-center gap-2 px-4  rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
                            <span className="w-2 h-2 rounded-full bg-[#17B26A]" />
                            Active
                          </span>
                        ) : (
                          <span className="flex text-[14px] font-regular items-center w-max -ml-2 justify-center gap-2 px-4  rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
                            <span className="w-2 h-2 rounded-full bg-[red]" />
                            InActive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-[14px]">
                        <div className="flex items-center gap-5">
                          <Switch
                            size="sm"
                            aria-label="Active Inactive"
                            isSelected={activeTickerId === row._id}
                            onChange={() => handleSwitch(row._id, row.status)}
                            disabled={isLoading}
                          />
                          <button className="text-[20px] text-[#475467]">
                            <PiTrashBold />
                          </button>
                          <button
                            className="text-[20px] text-[#475467]"
                            onClick={() => selectedTicker(row)}
                          >
                            <FiEdit2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1 justify-between py-2 px-2 w-[100%] items-center gap-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px]  text-[#344054] items-center justify-center px-4 py-2 gap-2"
          >
            <LuArrowLeft />
            Previous
          </button>
          <Pagination
            initialPage={1}
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            classNames={{
              item: "bg-transparent text-[#475467] font-medium",
              cursor: "bg-[#F9FAFB] text-[#1D2939] font-medium",
            }}
          />
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px]  text-[#344054] items-center justify-center px-4 py-2 gap-2"
          >
            Next
            <LuArrowRight />
          </button>
        </div>
      </section>
    </>
  );
};

export default ResponsiveTable;
