/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import Testimonials from "./Testimonials";
import Faqs from "./Faqs";
import Updates from "./Updates";
import IconBox from "./IconBox";
import HowItWorks from "./HowItWorks";
import Content from "./Content";
import SeoAttributes from "../Content/SeoAttributes";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleUpdateCustomJewelry } from "@/API/api";
import { toast } from "react-toastify";

const EditSections = ({ handleCustomJeweleryPage, fetchData, editData }) => {
  const [selectedSection, setSelectedSection] = useState("iconBox");
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    setTitle(editData.title);
  }, [editData]);

  const handleChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSeoSubmit = async (formData) => {
    // console.log("Submitting data for Sitepages", formData);

    let bodyData = {
      title: title,
      seo: formData,
    };

    // console.log("body data", bodyData);
    let response;
    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);

      response = await handleUpdateCustomJewelry(bodyData, editData._id, false);
      // console.log("response",response);
      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
        handleCustomJeweleryPage();
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-40 bg-white justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
              Edit Custom Jewelry
            </h2>
            <p className="text-[#4A5367] md:text-[14px] text-[12px]">
              Select and Edit Sections to Personalize Your Content.
            </p>
          </div>
          <Tabs aria-label="Options">
            <Tab key="draft" title="Draft"></Tab>
            <Tab key="publish" title="Publish"></Tab>
          </Tabs>
        </div>
        <div className="flex gap-[24px] h-10">
          <button
            className={`text-[16px] ${
              activeTab === "generalInfo"
                ? "border-b-3 border-[#434CE7] text-black"
                : "text-black/50"
            }  font-semibold  `}
            onClick={() => handleChange("generalInfo")}
          >
            General Info
          </button>
          <button
            className={`text-[16px] ${
              activeTab === "seoAttributes"
                ? "border-b-3 border-[#434CE7] text-black"
                : "text-black/50"
            }  font-semibold`}
            onClick={() => handleChange("seoAttributes")}
          >
            SEO Attributes
          </button>
        </div>
      </div>
      {activeTab === "generalInfo" && (
        <section>
          <div className="w-full md:h-24  md:px-8 px-4 pt-2 flex flex-col gap-4 md:top-28 sticky z-40 bg-white">
            <h3 className="text-[16px] font-semibold">
              Select your Section to Edit
            </h3>
            <select
              className="w-full h-[46px] rounded-[8px] border-1.5 border-[#D0D5DD] px-[10px] cursor-pointer"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              aria-label="Select section to edit"
            >
              <option value="iconBox">Icon Box (Section 1)</option>
              <option value="howitWorks">How Does it Work (Section 2)</option>
              <option value="content">Content (Section 3)</option>
              <option value="testimonials">Testimonials (Section 4)</option>
              <option value="faqs">
                Frequently Asked Questions (Section 5)
              </option>
              <option value="updates">Updates Section (Section 6)</option>
            </select>
          </div>
          <div className="no-scrollbar md:min-h-[65vh]">
            {selectedSection === "iconBox" && (
              <IconBox
                sectionData={editData}
                title={title}
                fetchData={fetchData}
                handleCustomJeweleryPage={handleCustomJeweleryPage}
              />
            )}
            {selectedSection === "howitWorks" && (
              <HowItWorks
                sectionData={editData}
                title={title}
                fetchData={fetchData}
                handleCustomJeweleryPage={handleCustomJeweleryPage}
              />
            )}
            {selectedSection === "content" && (
              <Content
                sectionData={editData}
                title={title}
                fetchData={fetchData}
                handleCustomJeweleryPage={handleCustomJeweleryPage}
              />
            )}
            {selectedSection === "testimonials" && (
              <Testimonials
                sectionData={editData}
                title={title}
                fetchData={fetchData}
                handleCustomJeweleryPage={handleCustomJeweleryPage}
              />
            )}

            {selectedSection === "faqs" && (
              <Faqs
                sectionData={editData}
                title={title}
                fetchData={fetchData}
                handleCustomJeweleryPage={handleCustomJeweleryPage}
              />
            )}

            {selectedSection === "updates" && (
              <Updates
                sectionData={editData}
                title={title}
                fetchData={fetchData}
                handleCustomJeweleryPage={handleCustomJeweleryPage}
              />
            )}
          </div>
        </section>
      )}
      {activeTab === "seoAttributes" && (
        <SeoAttributes
          onSubmit={handleSeoSubmit}
          handler={handleCustomJeweleryPage}
          isLoading={loading}
          sectionData={editData?.seo}
        />
      )}
    </Fragment>
  );
};

export default EditSections;
