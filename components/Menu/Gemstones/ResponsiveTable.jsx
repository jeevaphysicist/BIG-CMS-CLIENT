import React, { Fragment, useState } from "react";
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
import { MdKeyboardArrowRight } from "react-icons/md";

const ResponsiveTable = ({ initialData, handleGemstonePage }) => {
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openList, setOpenList] = useState("by-gemstone");

  // const toggleSelectAll = () => {
  //   if (selectedRows.length === data.length) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(data.map((item) => item.id));
  //   }
  // };

  // const toggleSelectRow = (id) => {
  //   setSelectedRows((prev) =>
  //     prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
  //   );
  // };

  const handleTypeChange = (type) => {
    setOpenList((prevOpenList) => (prevOpenList === type ? "" : type));
  };

  return (
    <section className="w-[100%] ">
      <div className="overflow-x-auto border-r-1 border-l-1   border-t-1 rounded-t-lg ">
        <table className="min-w-full rounded-2xl bg-white">
          <thead className="bg-white rounded-2xl  ">
            <tr>
              <th className="w-[60%] px-4 text-[12px] text-start py-3 border-b-1 text-[#475467]  text-nowrap">
                <span className="flex items-center gap-2">
                  Gemstone Type <PiArrowDownBold />
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

          <tbody>
            {data.map((item, index) => {
              return (
                <Fragment>
                  <tr onClick={() => handleTypeChange(item.slug)}>
                    <td className="px-6 text-sm font-semibold py-4 flex gap-3 items-center bg-[#F9F9F9] cursor-pointer">
                      {item.type}{" "}
                      <MdKeyboardArrowRight
                        className={`${
                          openList === item.slug ? "rotate-90" : "rotate-0"
                        } transition-all duration-300 text-[20px]`}
                      />
                    </td>
                    <td className="bg-[#F9F9F9]"></td>
                    <td className="bg-[#F9F9F9]"></td>
                  </tr>
                  {openList === item.slug &&
                    item.content?.map((row) => (
                      <tr
                        key={row.id}
                        value={row}
                        as="tr"
                        className="border-b hover:bg-[#F9FAFB] bg-white"
                      >
                        <td className="w-[60%] px-4 py-4 font-regular text-[14px] gap-2 flex mt-1 text-nowrap items-center">
                          <Checkbox />
                          <div className="p-3 border-2 rounded-[12px]">
                            <img src={row.icon} alt="icon" className="w-5" />
                          </div>
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
                            <Switch size="sm" aria-label="Automatic updates" />
                            <button className="text-[20px] text-[#475467]">
                              <PiTrashBold />
                            </button>
                            <button
                              className="text-[20px] text-[#475467]"
                              onClick={handleGemstonePage}
                            >
                              <FiEdit2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {openList === item.slug && (
                    <tr>
                      <td className="bg-[#F9F9F9] border-b-1 text-end text-blue-500 py-1 pr-20">
                        {"View More"}
                      </td>
                      <td className="px-6 text-sm border-b-1 font-semibold py-5 flex gap-3 items-center bg-[#F9F9F9]"></td>

                      <td className="bg-[#F9F9F9] border-b-1 py-1"></td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1  justify-between py-2 px-2 w-[100%] items-center gap-5">
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
      </div> */}
    </section>
  );
};

export default ResponsiveTable;
