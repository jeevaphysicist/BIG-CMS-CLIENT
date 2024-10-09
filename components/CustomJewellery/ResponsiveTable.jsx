import React, { useEffect, useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { Switch } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDragMove2Fill } from "react-icons/ri";
import { PiArrowDownBold } from "react-icons/pi";
import { handleUpdateCustomJewleryStatus } from "@/API/api";
import { toast } from "react-toastify";

const DraggableRow = ({
  UpdateStatus,
  row,
  handleCustomJeweleryPage,
  handleSetEditData,
}) => {
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
        {row.title}
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
            onChange={() => UpdateStatus(row._id, row.status)}
            isSelected={row.status === "Active"}
            size="sm"
            aria-label="Automatic updates"
          />
          <button
            className="text-[20px] text-[#475467]"
            onClick={() => {
              handleCustomJeweleryPage();
              handleSetEditData(row);
            }}
          >
            <FiEdit2 />
          </button>
        </div>
      </td>
    </Reorder.Item>
  );
};

const ResponsiveTable = ({
  initialData,
  handleCustomJeweleryPage,
  handleSetEditData,
  fetchData,
}) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const UpdateStatus = async (id, status) => {
    try {
      const response = await handleUpdateCustomJewleryStatus(id, {
        status: status,
      });
      if (response.status >= 200 && response.status <= 209) {
        fetchData();
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="w-[100%] ">
      <div className="overflow-x-auto border-r-1 border-l-1   border-t-1 rounded-t-lg ">
        <table className="min-w-full rounded-2xl bg-white">
          <thead className="bg-white rounded-2xl  ">
            <tr>
              <th className="px-4 text-[12px] text-start py-3 border-b-1 text-[#475467]  text-nowrap">
                <span className="flex items-center gap-2">
                  Name <PiArrowDownBold />
                </span>
              </th>

              <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467]  text-nowrap">
                Status
              </th>
              <th className="px-4 text-[12px] py-3 text-start border-b-1 text-[#475467]  text-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <Reorder.Group as="tbody" axis="y" values={data} onReorder={setData}>
            {data?.map((row) => (
              <DraggableRow
                UpdateStatus={UpdateStatus}
                handleSetEditData={handleSetEditData}
                handleCustomJeweleryPage={handleCustomJeweleryPage}
                fetchData={fetchData}
                key={row._id}
                row={row}
              />
            ))}
          </Reorder.Group>
        </table>
      </div>
    </section>
  );
};

export default ResponsiveTable;
