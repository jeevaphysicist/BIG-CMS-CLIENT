/* eslint-disable react/prop-types */
import { Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";
import SeoAttributes from "../SeoAttributes";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import HeaderSection from "./HeaderSection";
import ContentBox from "./ContentBox";
import Faqs from "./Faqs";
import UpdatesSection from "./UpdatesSection";

const EditPages = ({ handleCategoryPage }) => {
  const [selectedSection, setSelectedSection] = useState("header");
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [formData, setFormData] = useState({
    media: "",
  });

  const [loading, setLoading] = useState(false);

  const handleImageSelect = async (file, width, height, media) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [media]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.media === "" || formData.media === null) {
      newerrors.media = "Image is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    // API Call Here

    console.log("Form submitted with data:", formData);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSeoSubmit = (formData) => {
    console.log("Submitting data for Sitepages", formData);
  };

  return (
    <Fragment>
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-30 bg-white justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
              Edit Category Page
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
            onClick={() => handleTabChange("generalInfo")}
          >
            General Info
          </button>
          <button
            className={`text-[16px] ${
              activeTab === "seoAttributes"
                ? "border-b-3 border-[#434CE7] text-black"
                : "text-black/50"
            }  font-semibold`}
            onClick={() => handleTabChange("seoAttributes")}
          >
            SEO Attributes
          </button>
        </div>
      </div>
      {activeTab === "generalInfo" && (
        <section>
          <div className="w-full md:px-12 px-4 pt-2 flex flex-col gap-3 pb-3 md:top-28 sticky z-20 bg-white border-b-1.5">
            <div className="space-y-2">
              <label
                htmlFor="page-title"
                className="text-[16px]  font-semibold flex gap-1"
              >
                Title
                <RequiredSymbol />
                {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
              </label>
              <Input
                type="text"
                minRows={4}
                id="page-title"
                variant="bordered"
                placeholder="Gemstones"
                size="md"
                radius="sm"
                name="pageTitle"
                // onChange={handleFormChange}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-[16px] font-semibold">
                Select your Section to Edit
              </h3>
              <select
                className="w-full h-[46px] rounded-[8px] border-1.5 border-[#D0D5DD] px-[10px] cursor-pointer"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                aria-label="Select section to edit"
              >
                <option value="header">Header (Section 1)</option>
                <option value="contentBox">Content Box (Section 2)</option>
                <option value="faqs">
                  Frequently Asked Questions (Section 3)
                </option>
                <option value="updates">Updates Section (Section 4)</option>
              </select>
            </div>
          </div>
          <div className=" my-2 no-scrollbar md:min-h-[40vh]">
            {selectedSection === "header" && (
              <HeaderSection handleCategoryPage={handleCategoryPage} />
            )}
            {selectedSection === "contentBox" && (
              <ContentBox handleCategoryPage={handleCategoryPage} />
            )}
            {selectedSection === "faqs" && (
              <Faqs handleCategoryPage={handleCategoryPage} />
            )}
            {selectedSection === "updates" && (
              <UpdatesSection handleCategoryPage={handleCategoryPage} />
            )}
          </div>
        </section>
      )}
      {activeTab === "seoAttributes" && (
        <SeoAttributes
          onSubmit={handleSeoSubmit}
          handler={handleCategoryPage}
        />
      )}
    </Fragment>
  );
};
export default EditPages;
