import React, { useEffect, useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { RiDragMove2Fill } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { Switch } from "@nextui-org/react";
import { PiTrashBold, PiArrowDownBold } from "react-icons/pi";
import { Pagination } from "@nextui-org/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { toast } from "react-toastify";
import { handleUpdateSitepageStatus } from "@/API/api";

const DraggableRow = ({ UpdateStatus , row, handleSitePage, handleType ,handleSetEditData }) => {
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
      <td className="px-4 py-4 font-regular text-[14px] ">
        <p className="text-balance w-[200px]">{row.description ? row.description :"-"}</p>
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
            InActive
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-[14px]">
        <div className="flex items-center gap-5">
          <Switch onChange={()=>{UpdateStatus(row.status,row._id)}} isSelected={row.status === "Active"} size="sm" aria-label="Automatic updates" />
          <button className="text-[20px] text-[#475467]">
            <PiTrashBold />
          </button>
          <button
            className="text-[20px] text-[#475467]"
            onClick={()=>{handleSitePage();handleType('edit');handleSetEditData(row)}}
          >
            <FiEdit2 />
          </button>
        </div>
      </td>
    </Reorder.Item>
  );
};

const ResponsiveTable = ({ initialData, handleSetEditData , fetchData ,handleType, handleSitePage }) => {
  const [data, setData] = useState(initialData);

  useEffect(()=>{
      setData(initialData);
  },[initialData])

  const UpdateStatus = async (status,id)=>{
        try {
            const response = await handleUpdateSitepageStatus({status:status},id) ;
            if(response.status >= 200 && response.status <= 209){
                fetchData();
                toast.success(response.data.message);
            }
            else{
              toast.error(response.response.data.message);
            }
        } catch (error) {
          toast.error('Internal Server Error!');
           
        }
  }

  const handleDelete=()=>{

  }


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
          <Reorder.Group as="tbody" axis="y" values={data} onReorder={setData}>
            {data?.map((row) => (
              <DraggableRow UpdateStatus={UpdateStatus} handleSetEditData={handleSetEditData} handleType={handleType} key={row._id} row={row} handleSitePage={handleSitePage} />
            ))}
          </Reorder.Group>
        </table>
      </div>
      <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1 justify-between py-2 px-2 w-[100%] items-center gap-5">
        <button className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2">
          <LuArrowLeft />
          Previous
        </button>
        <Pagination
          initialPage={1}
          total={5}
          classNames={{
            item: "bg-transparent text-[#475467] font-medium",
            cursor: "bg-[#F9FAFB] text-[#1D2939] font-medium",
          }}
        />
        <button className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2">
          Next
          <LuArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ResponsiveTable;