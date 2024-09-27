"use client";
import { Fragment, useState } from "react";
import EditSections from "./EditSections";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";

const Index = () => {
  const [homePage, setHomePage] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const itemsClasses = {
    table: " bg-white  ",
    thead: "bg-white border-b-1 ",
    tbody: "",
    tfoot: "",
    tc: "",
    tr: "bg-[#F9FAFB] ",
    th: "bg-white font-medium  ",
    td: "bg-[#F9FAFB] font-regular border-b-1 text-[#0A1215]",
  };

  const handleCustomJeweleryPage = () => {
    setHomePage(!homePage);
  };

  return (
    <Fragment>
      {homePage ? (
        <div className=" p-5 no-scrollbar">
          <h2 className="font-semibold text-black text-[20px]">
            Customize Jewelry
          </h2>
          <p className="text-[#4A5367] font-regular text-[16px] mb-8">
            Edit Your Custom Jewelry page
          </p>

          <div className="w-[100%] overflow-x-auto rounded-[10px] border no-scrollbar ">
            <Table
              radius="20px"
              classNames={itemsClasses}
              removeWrapper
              aria-label="Example static border collection table"
            >
              <TableHeader className="bg-white">
                <TableColumn>
                  <span className="flex items-center justify-start gap-3">
                    Name
                    <IoArrowDown />
                  </span>
                </TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>
                    <p className="text-nowrap">Custom Jewelry</p>
                  </TableCell>
                  <TableCell>
                    {isChecked ? (
                      <span className="flex items-center w-[100px] -ml-2 justify-center gap-2 px-2  rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
                        <span className="w-2 h-2 rounded-full bg-[#17B26A]" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center w-[100px] -ml-2 justify-center gap-2 px-2  rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]">
                        <span className="w-2 h-2 rounded-full bg-[red]" />
                        InActive
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-5">
                      <Switch
                        size="sm"
                        isSelected={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        aria-label="Automatic updates"
                      />
                      <button
                        onClick={handleCustomJeweleryPage}
                        className="text-[20px] text-[#475467]"
                      >
                        <FiEdit2 />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <EditSections handleCustomJeweleryPage={handleCustomJeweleryPage} />
      )}
    </Fragment>
  );
};

export default Index;
