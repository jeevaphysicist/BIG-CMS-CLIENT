"use client";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import { Input } from "@nextui-org/react";
import RequiredSymbol from "../Content/RequiredSymbol";
import EditModal from "../EditModal";
import EditPages from "./EditPages";
import LogoAndContact from "./LogoAndContact";

const initialData = [
  {
    id: "1",
    name: "Rings",
    link: "bit.ly/1213",
    page: "Rings",
    status: "Active",
  },
  {
    id: "2",
    name: "Engagement Rings",
    link: "bit.ly/4353",
    page: "Engagement Rings",
    status: "Active",
  },
  {
    id: "3",
    name: "Wedding Rings",
    link: "bit.ly/1213",
    page: "Wedding Rings",
    status: "Active",
  },
  {
    id: "4",
    name: "Opal Rings",
    link: "bit.ly/1213",
    page: "Opal Rings",
    status: "Active",
  },
  {
    id: "5",
    name: "Diamond Rings",
    link: "bit.ly/1255",
    page: "Diamond Rings",
    status: "Active",
  },
  {
    id: "6",
    name: "Emerald Rings",
    link: "bit.ly/5253",
    page: "Emerald Rings",
    status: "Active",
  },
  {
    id: "7",
    name: "Sappire Rings",
    link: "bit.ly/5555",
    page: "Sappire Rings",
    status: "Active",
  },
  {
    id: "8",
    name: "Earrings",
    link: "bit.ly/3253",
    page: "Earrings",
    status: "Active",
  },
  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("jewellery");
  const itemsClasses = {
    table: " bg-white  ",
    thead: "bg-white border ",
    tbody: "border",
    tfoot: "",
    tr: "",
    th: "bg-white font-medium w-[100px]  rounded-t-[10px]",
    td: "bg-[#F9FAFB] font-regular text-[#0A1215]",
  };

  const handleFooterPage = () => {
    setIsTable(!isTable);
  };

  const handleAddSitePage = () => {};

  return (
    <div className="w-[100%] relative">
      {isTable ? (
        <div className="w-[100%] pb-5">
          <div className="sticky z-40 top-0 bg-white pt-5">
            <div className="flex items-center justify-between w-[100%] px-5">
              <div className="flex flex-col items-start justify-start">
                <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                  Footer
                </h1>
                <p className="text-[#4A5367]">Add and view Your Footer Items</p>
              </div>
              <button
                className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
                onClick={handleFooterPage}
              >
                <CiCirclePlus />
                Add New Footer Item
              </button>
            </div>
            <div className="w-full flex items-center justify-between py-5 px-5 border-b-1.5">
              <div className="w-[60%] flex items-center justify-between">
                <h2 className="font-semibold text-black/70">
                  Select your section
                </h2>
                <select
                  className="w-[75%] h-[42px] rounded-[8px] border-2 border-[#D0D5DD] px-[10px] cursor-pointer"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  aria-label="Select section to edit"
                >
                  <option value="logoContact">Logo and Contact</option>
                  <option value="company">Company</option>
                  <option value="policies">Policies</option>
                  <option value="gemstones">Gemstones</option>
                  <option value="jewellery">Jewellery</option>
                  <option value="dropsBeads">Drops & Beads</option>
                  <option value="gifts">Gifts</option>
                  <option value="semiMounts">Semi-Mounts</option>
                  <option value="guide">Guide</option>
                </select>
              </div>
              <div className="flex relative items-center justify-start">
                <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
                <input
                  type="search"
                  placeholder="Search"
                  className="border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
                />
              </div>
            </div>
          </div>

          <div className="w-[100%] mt-4 overflow-x-auto no-scrollbar">
            {selectedSection === "logoContact" && (
              <LogoAndContact handleFooterPage={handleFooterPage} />
            )}
            {selectedSection !== "logoContact" && (
              <ResponsiveTable
                initialData={initialData}
                handleFooterPage={handleFooterPage}
              />
            )}
          </div>
        </div>
      ) : (
        <EditPages
          handleFooterPage={handleFooterPage}
          selectedCategory={selectedSection}
        />
      )}
    </div>
  );
};

export default Index;
