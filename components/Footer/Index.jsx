"use client";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import ResponsiveTable from "./ResponsiveTable";
import LogoAndContact from "./LogoAndContact";
import EditPages from "./EditPages";
import { GetCurrentUserDetails } from "@/utils/GetCurrentUserDetails";
import { handleGetFooterCategoryList } from "@/API/api";

const Index = () => {
  const { template } = GetCurrentUserDetails();
  const [isTable, setIsTable] = useState(true);
  const [selectType, setSelectType] = useState("create");
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedSection, setSelectedSection] = useState("logo-and-contact");
  const [selectedSectionName, setSelectedSectionName] = useState("Logo and Contact");
  const [selectedItem, setSelectedItem] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetchList();
  }, [selectedSection]);

  const fetchList = async () => {
    try {
      const response = await handleGetFooterCategoryList(selectedSection);
      if (response.status >= 200 && response.status <= 209) {
        setList(response.data);
        setFilteredList(response.data); // Initially, set filteredList to the complete list
      } else {
        setList([]);
        setFilteredList([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the list based on the title (or other fields if needed)
    const filtered = list.filter((item) =>
      item.contents.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleFooterPage = () => {
    setIsTable(!isTable);
    if (!isTable) {
      setSelectedItem({});
    }
  };

  const handleSelectedRow = (item) => {
    setIsTable(!isTable);
    setSelectedItem(item);
  };

  const handleSelectCreateEdit = (value) => {
    setSelectType(value);
  };

  const handleSelectName = (slug) => {
    const find = template.find(
      (module) => module.moduleSlug === "footer"
    ).sections.find((section) => section.sectionSlug === slug);
    setSelectedSectionName(find.sectionName);
  };

  return (
    <div className="w-[100%] relative">
      {isTable ? (
        <div className="w-[100%] pb-5">
          <div className="sticky z-40 top-0 bg-white pt-5">
            <div className="flex items-center justify-between w-[100%] px-5">
              <div className="flex flex-col items-start justify-start">
                <h1 className="flex text-[#0A1215] font-medium text-[20px]">Footer</h1>
                <p className="text-[#4A5367]">Add and view Your Footer Items</p>
              </div>
              <button
                className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
                onClick={() => {
                  handleFooterPage();
                  handleSelectCreateEdit("create");
                }}
              >
                <CiCirclePlus />
                Add New Footer Item
              </button>
            </div>
            <div className="w-full flex items-center justify-between py-5 px-5 border-b-1.5">
              <div className="w-[60%] flex items-center justify-between">
                <h2 className="font-semibold text-black/70">Select your section</h2>
                <select
                  className="w-[75%] h-[42px] rounded-[8px] border-2 border-[#D0D5DD] px-[10px] cursor-pointer"
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(e.target.value);
                    handleSelectName(e.target.value);
                  }}
                  aria-label="Select section to edit"
                >
                  {template.find((module) => module.moduleSlug === "footer").sections.map((item, index) => (
                    <option key={index} value={item.sectionSlug}>
                      {item.sectionName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex relative items-center justify-start">
                <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
                <input
                  type="search"
                  value={searchTerm} // Bind search input
                  onChange={handleSearch}
                  placeholder="Search by title"
                  className="border-2 pl-12 py-2 pr-5 border-[#D0D5DD] rounded-[10px]"
                />
              </div>
            </div>
          </div>

          <div className="w-[100%] mt-4 overflow-x-auto no-scrollbar">
            {selectedSection === "logo-and-contact" && (
              <LogoAndContact
                categoryName={selectedSectionName}
                category={selectedSection}
                handleFooterPage={handleFooterPage}
              />
            )}

            {["company", "policies", "gemstone", "jewelry", "drops-beads", "gifts", "semi-mounts", "guide", "footer-links"].includes(
              selectedSection
            ) && (
              <ResponsiveTable
                fetchData={fetchList}
                categoryName={selectedSectionName}
                category={selectedSection}
                handleType={handleSelectCreateEdit}
                initialData={filteredList} // Use the filtered list for displaying
                handleFooterPage={handleFooterPage}
                handleSelectedRow={handleSelectedRow}
              />
            )}
          </div>
        </div>
      ) : (
        <EditPages
          categoryName={selectedSectionName}
          type={selectType}
          handleFooterPage={handleFooterPage}
          selectedCategory={selectedSection}
          selectedItem={selectedItem}
          fetchData={fetchList}
        />
      )}
    </div>
  );
};

export default Index;
