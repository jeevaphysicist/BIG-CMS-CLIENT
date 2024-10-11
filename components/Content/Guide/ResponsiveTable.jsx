import React, { useEffect, useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { RiDragMove2Fill } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { Switch } from "@nextui-org/react";
import { PiTrashBold, PiArrowDownBold } from "react-icons/pi";
import { Pagination } from "@nextui-org/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { toast } from "react-toastify";
import { handleDeleteGuide, handleDeleteSitepage, handleUpdateGuideStatus, handleUpdateSitepageStatus } from "@/API/api";
import AlertModel from "@/components/AlertModal";

const DraggableRow = ({ UpdateStatus, fetchData, row, handleGuide, handleType, handleSetEditData }) => {
  const controls = useDragControls();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [collectID, setCollectID] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await handleDeleteGuide(collectID);
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
        {row.title}
      </td>
      <td className="px-4 py-4 font-regular text-[14px]">
        <p className="text-balance w-[200px]">{row.description ? row.description : "-"}</p>
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
          <button onClick={() => { setCollectID(row._id); setOpenAlertModal(true); }} className="text-[20px] text-[#475467]">
            <PiTrashBold />
          </button>
          <button className="text-[20px] text-[#475467]" onClick={() => { handleGuide(); handleType('edit'); handleSetEditData(row); }}>
            <FiEdit2 />
          </button>
        </div>
      </td>
      <AlertModel
        loading={loading}
        isVisible={openAlertModal}
        modeltitle="Delete SitePage"
        message="Are you sure you want to delete this sitepage?"
        onConfirm={handleDelete}
        onCancel={() => setOpenAlertModal(false)}
      />
    </Reorder.Item>
  );
};

const ResponsiveTable = ({ searchQuery, initialData, handleSetEditData, fetchData, handleType, handleGuide }) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const UpdateStatus = async (status, id) => {
    try {
      const response = await handleUpdateGuideStatus({ status }, id);
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
                  Name <PiArrowDownBold />
                </span>
              </th>
              <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467] text-nowrap">
                Description
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
                handleType={handleType}
                key={row._id}
                row={row}
                handleGuide={handleGuide}
              />
            ))}
          </Reorder.Group>
        </table>
      </div>
      <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1 justify-between py-2 px-2 w-[100%] items-center gap-5">
        <button
          className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <LuArrowLeft />
          Previous
        </button>
        <Pagination 
        total={totalPages}
        initialPage={1} 
        page={currentPage} 
        classNames={{
          item: "bg-transparent text-[#475467] font-medium",
          cursor: "bg-[#F9FAFB] text-[#1D2939] font-medium  ",
        }}
        onChange={(page) => setCurrentPage(page)}
         />
        <button
          className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <LuArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ResponsiveTable;
