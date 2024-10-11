import React, { useEffect, useState } from "react";
import { motion, Reorder,useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Button, Switch } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDragMove2Fill } from "react-icons/ri";
import { Checkbox } from "@nextui-org/react";
import { PiTrashBold } from "react-icons/pi";
import { Pagination } from "@nextui-org/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { PiArrowDownBold } from "react-icons/pi";
import { handleFooterDelete, handleFooterStatusChange } from "@/API/api";
import { toast } from "react-toastify";
import AlertModel from "../AlertModal";

const DraggableRow = ({ row, handleEdit, handleStatus,fetchData, toggleSelectRow, selectedRows }) => {
  const controls = useDragControls();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [collectID, setCollectID] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await handleFooterDelete(collectID);
      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpenAlertModal(false);
    }
  };


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
        {row.contents.title}
      </td>
      <td className="px-4 py-4">
        {row.contents.link}
      </td>
      
        {/* <td className="px-4 py-4 font-regular text-[14px]">{row.page}</td> */}
    
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
          <Switch
            onChange={() => handleStatus(row._id, row.status)}
            isSelected={row.status === "Active"}
            size="sm"
            aria-label="Automatic updates"
          />
          <button onClick={() => { setCollectID(row._id); setOpenAlertModal(true); }} className="text-[20px] text-[#475467]">
            <PiTrashBold />
          </button>
          <button
            className="text-[20px] text-[#475467]"
            onClick={() => handleEdit(row)}
          >
            <FiEdit2 />
          </button>
        </div>
      </td>
      <AlertModel
        loading={loading}
        isVisible={openAlertModal}
        modeltitle="Delete Footer Content"
        message="Are you sure you want to delete this Footer Content?"
        onConfirm={handleDelete}
        onCancel={() => setOpenAlertModal(false)}
      />
    </Reorder.Item>
  );
};


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
  const itemsPerPage = 20; // You can change the number of items per page
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
    if (response.status >= 200 && response.status < 300) {
      fetchData();
      toast.success(response.data.message);
    }
    else{
      toast.error(response.response.data.message);
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
    <section className="w-[100%] px-5 ">
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
            <Reorder.Group as="tbody" axis="y" values={data} onReorder={setData}>
              {paginatedData.map((row) => (
                <DraggableRow
                  key={row._id}
                  row={row}
                  handleStatus={handleStatus}
                  fetchData={fetchData}
                  handleEdit={handleEdit}
                />
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
