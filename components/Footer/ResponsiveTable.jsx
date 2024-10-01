import React, { useEffect, useState } from "react";
import { motion, Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Button, Switch } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDragMove2Fill } from "react-icons/ri";
import { Checkbox } from "@nextui-org/react";
import { PiTrashBold } from "react-icons/pi";
import { Pagination } from "@nextui-org/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { PiArrowDownBold } from "react-icons/pi";
import { handleFooterStatusChange } from "@/API/api";

const ResponsiveTable = ({
  initialData,
  handleFooterPage,
  handleSelectedRow,
  handleType,
  fetchData,
}) => {
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change the number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleTableHead = data.length > 0 && data?.some((row) => row.page);

  useEffect(() => {
    setData(initialData);
    setCurrentPage(1);
  }, [initialData]);

  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEdit = (row) => {
    if (handleSelectedRow) {
      handleSelectedRow(row);
    }
    handleType("edit");
  };

  const handleStatus = async (id, status) => {
    const response = await handleFooterStatusChange(id, { status });
    if (response.status === 200) {
      fetchData();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.length > 0 && data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="w-[100%] ">
      <div className="overflow-x-auto border-r-1 border-l-1 border-t-1 rounded-t-lg">
        {data.length > 0 ? (
          <table className="min-w-full rounded-2xl bg-white">
            <thead className="bg-white rounded-2xl">
              <tr>
                <th className="px-4 text-[12px] text-start py-3 border-b-1 text-[#475467] text-nowrap">
                  <span className="flex items-center gap-2">
                    Menu Name <PiArrowDownBold />
                  </span>
                </th>
                <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467] text-nowrap">
                  Link
                </th>
                {handleTableHead && (
                  <th className="px-4 text-[12px] text-start py-3 border-b-1 text-[#475467] text-nowrap">
                    <span className="flex items-center gap-2">
                      Corresponding Page <PiArrowDownBold />
                    </span>
                  </th>
                )}
                <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467] text-nowrap">
                  Status
                </th>
                <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467] text-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <Reorder.Group as="tbody" axis="y" values={paginatedData} onReorder={setData}>
              {paginatedData.map((row) => (
                <Reorder.Item
                  key={row._id}
                  value={row}
                  as="tr"
                  className="border-b bg-[#F9FAFB] hover:bg-white"
                >
                  <td className="px-4 py-4 font-regular text-[14px] gap-2 flex mt-1 text-nowrap items-center">
                    <motion.div
                      className="cursor-move mr-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RiDragMove2Fill size={16} className="text-[#676767]" />
                    </motion.div>
                    <Checkbox />
                    {row.contents.title}
                  </td>
                  <td className="px-4 py-4 font-regular text-[14px] ">
                    <p className="text-balance w-[150px]">{row.contents.link}</p>
                  </td>
                  {handleTableHead && (
                    <td className="px-4 py-4 font-regular text-[14px] ">
                      <p className="text-balance w-[200px]">
                        {row.contents.correspondingPage}
                      </p>
                    </td>
                  )}
                  <td className="px-4 py-2 text-[14px]">
                    {row.status === "Active" ? (
                      <span className="flex text-[14px] font-regular items-center w-max -ml-2 justify-center gap-2 px-4 rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
                        <span className="w-2 h-2 rounded-full bg-[#17B26A]" />
                        Active
                      </span>
                    ) : (
                      <span className="flex text-[14px] font-regular items-center w-max -ml-2 justify-center gap-2 px-4 rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
                        <span className="w-2 h-2 rounded-full bg-[red]" />
                        InActive
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-[14px]">
                    <div className="flex items-center gap-5">
                      <Switch
                        isSelected={row.status === "Active"}
                        onChange={() => {
                          handleStatus(row._id, row.status);
                        }}
                        size="sm"
                        aria-label="Automatic updates"
                      />
                      <button
                        className="text-[20px] text-[#475467]"
                        onClick={() => handleEdit(row)}
                      >
                        <FiEdit2 />
                      </button>
                    </div>
                  </td>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </table>
        ) : (
          <div className="text-black font-medium my-10 text-center w-[100%]">
            No List
          </div>
        )}
      </div>
      {
      totalPages >0 && 
      <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1 justify-between py-2 px-2 w-[100%] items-center gap-5">
        <button
          className="flex disabled:opacity-0 active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
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
          className="flex disabled:opacity-0 active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
          onClick={() =>
            handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          disabled={currentPage === totalPages}
        >
          Next
          <LuArrowRight />
        </button>
         
      </div>
       }
    </section>
  );
};

export default ResponsiveTable;
