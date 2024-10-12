import React, { useEffect, useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { Switch, Pagination } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDragMove2Fill } from "react-icons/ri";
import { PiTrashBold } from "react-icons/pi";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { PiArrowDownBold } from "react-icons/pi";
import { handleTickerDeletion, handleTickerStatusChange } from "@/API/api";
import { toast } from "react-toastify";
import Loading from "../Loading";
import AlertModel from "@/components/AlertModal";

const DraggableRow = ({
  updateStatus,
  fetchData,
  row,
  handleSelectedTicker,
  isLoading,
}) => {
  const controls = useDragControls();
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [collectID, setCollectID] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await handleTickerDeletion(collectID);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Ticker deleted successfully");
        fetchData(); // Refresh the data after deletion
      } else {
        toast.error("Failed to delete ticker");
      }
    } catch (error) {     
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    setOpenAlertModal(false);
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
          <Switch
            size="sm"
            aria-label="Active Inactive"
            isSelected={row.status === "Active"}
            onChange={() => updateStatus(row._id, row.status )}
            disabled={isLoading}
          />
          <button
            onClick={() => {
              setCollectID(row._id);
              setOpenAlertModal(true);
            }}
            className="text-[20px] text-[#475467]"
          >
            <PiTrashBold />
          </button>
          <button
            className="text-[20px] text-[#475467]"
            onClick={() => handleSelectedTicker(row)}
          >
            <FiEdit2 />
          </button>
        </div>
      </td>
      <AlertModel
        loading={loading}
        isVisible={openAlertModal}
        modeltitle="Delete Ticker"
        message="Are you sure you want to delete this ticker?"
        onConfirm={handleDelete}
        onCancel={() => setOpenAlertModal(false)}
      />
    </Reorder.Item>
  );
};

const ResponsiveTable = ({
  initialData,
  updateStatus,
  handleSelectedTicker,
  isLoading,
  fetchData,
}) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    setData(initialData);
    setCurrentPage(1);
  }, [initialData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
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
            paginatedData.length > 0 && (
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
                <Reorder.Group as="tbody" axis="y" values={data} onReorder={setData}>
                  {paginatedData.map((row) => (
                    <DraggableRow
                      key={row._id}
                      row={row}
                      fetchData={fetchData}
                      updateStatus={updateStatus}
                      handleSelectedTicker={handleSelectedTicker}
                      isLoading={isLoading}
                    />
                  ))}
                </Reorder.Group>
              </table>
            )
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
