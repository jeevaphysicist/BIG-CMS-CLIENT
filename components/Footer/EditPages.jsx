/* eslint-disable react/prop-types */
import { Tab, Tabs } from "@nextui-org/react";
import { Fragment } from "react";
import EditFooterLinks from "./EditFooterLinks";
import EditTable from "./EditTable";

const EditPages = ({categoryName, fetchData, type ,handleFooterPage, selectedCategory, selectedItem }) => {
  return (
    <Fragment>
      <section className="h-full w-full">
        <div className="w-full md:h-20  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
          <div className="flex md:flex-row flex-col gap-4 justify-between">
            <div>
              <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
               {type ==="create" ? "Add New" :"Edit"}  Footer Item
              </h2>
              <p className="text-[#4A5367] md:text-[14px] text-[12px]">
                Seamlessly {type ==="create" ? "Add New" :"Edit"}  Footer Item
              </p>
            </div>
            <Tabs aria-label="Options">
              <Tab key="draft" title="Draft"></Tab>
              <Tab key="publish" title="Publish"></Tab>
            </Tabs>
          </div>
        </div>
        {selectedCategory === "footer-links" ? (
          <EditFooterLinks
            type={type}
            fetchData={fetchData}
            handleFooterPage={handleFooterPage}
            categoryName={categoryName}
            selectedCategory={selectedCategory}
            selectedItem={selectedItem}
          />
        ) : (
          <EditTable
            type={type}
            fetchData={fetchData}
            categoryName={categoryName}
            handleFooterPage={handleFooterPage}
            selectedCategory={selectedCategory}
            selectedItem={selectedItem}
          />
        )}
      </section>
    </Fragment>
  );
};
export default EditPages;
