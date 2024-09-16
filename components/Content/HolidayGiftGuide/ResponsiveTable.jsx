import React, { useState } from "react";
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

const ResponsiveTable = ({ initialData, handleGiftGuide }) => {
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);

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

  return (
    <section className="w-[100%] ">
      <div className="overflow-x-auto border-r-1 border-l-1   border-t-1 rounded-t-lg ">
        <table className="min-w-full rounded-2xl bg-white">
          <thead className="bg-white rounded-2xl  ">
            <tr>
              <th className="px-4 text-[12px] text-start py-3 border-b-1 text-[#475467]  text-nowrap">
                <span className="flex items-center gap-2">
                  Gift Guide <PiArrowDownBold />
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
              <Reorder.Item
                key={row.id}
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
                    <RiDragMove2Fill size={16} className="text-[#676767]" />
                  </motion.div>
                  {/* <Checkbox /> */}
                  {row.giftGuide}
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
                    <Switch size="sm" aria-label="Automatic updates" />
                    <button className="text-[20px] text-[#475467]">
                      <PiTrashBold />
                    </button>
                    <button
                      className="text-[20px] text-[#475467]"
                      onClick={handleGiftGuide}
                    >
                      <FiEdit2 />
                    </button>
                  </div>
                </td>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </table>
      </div>
      <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1  justify-between py-2 px-2 w-[100%] items-center gap-5">
        <button className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px]  text-[#344054] items-center justify-center px-4 py-2 gap-2">
          <LuArrowLeft />
          Previous
        </button>
        <Pagination
          initialPage={1}
          total={5}
          classNames={{
            item: "bg-transparent text-[#475467] font-medium",
            cursor: "bg-[#F9FAFB] text-[#1D2939] font-medium  ",
          }}
        />
        <button className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px]  text-[#344054] items-center justify-center px-4 py-2 gap-2">
          Next
          <LuArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ResponsiveTable;
