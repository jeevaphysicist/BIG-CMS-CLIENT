import { Fragment, useEffect, useState } from "react";
import Herosection from "./Herosection";
import ContentBox from "./ContentBox";
import Categories from "./Categories";
import { Tab, Tabs } from "@nextui-org/react";
import Recommended from "./Recommended";
import ExploreGemstones from "./ExploreGemstones";
import ExploreJewelry from "./ExploreJewelry";
import DropsBeads from "./DropsBeads";
import SemiMounts from "./SemiMounts";
import Gifts from "./Gifts";
import Offers from "./Offers";
import BirthStoneInfo from "./BirthStoneInfo";
import Gemshows from "./Gemshows";
import Testimonials from "./Testimonials";
import CustomJewelry from "./CustomJewelry";
import Faqs from "./Faqs";
import ContentSection from "./ContentSection";
import Updates from "./Updates";
import SocialFollow from "./SocialFollow";
import SeoAttributes from "../SeoAttributes";
import { GetCurrentUserDetails } from "@/utils/GetCurrentUserDetails";
import { handleGetHomepageSection, handleHomepageCreateEditSection } from "@/API/api";
import { toast } from "react-toastify";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const EditSections = ({ handleHomepage }) => {
  const { template } = GetCurrentUserDetails();
  const [selectedSection, setSelectedSection] = useState("hero-section");
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [sectionData, setSectionData] = useState({});
  const [getSection, setGetSection] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSelectDropDown("homepage");
    fetchSectionData();
  }, [selectedSection]);

  const fetchSectionData = async () => {
    try {
      const response = await handleGetHomepageSection(
        "homepage",
        selectedSection
      );
      if (response.status >= 200 && response.status <= 209) {
        setSectionData(response.data.data.contents);
      } else {
        setSectionData({});
      }
      // console.log("response", response);
    } catch (error) {
      setSectionData({});
    }
  };

  useEffect(()=>{
    if(activeTab === 'seoAttributes')
    setSelectedSection('seo');

    if(activeTab === 'generalInfo')
      setSelectedSection('hero-section');
  },[activeTab])

  const handleChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSeoSubmit = async (formData) => {
    console.log("Submitting data for Homepage", formData);
    handleSectionSlug();
    let bodyData = {
      contents: formData,
      moduleSlug: 'homepage',
      moduleName: 'Homepage',
      sectionSlug: 'seo',
      sectionName: 'SEO',
      pageName: "homepage",
      pageSlug: 'homepage',
    };
    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);
      const response = await handleHomepageCreateEditSection(bodyData);
      if (response.status >= 200 && response.status <= 209) {
        let data = response.data;
        toast.success(response.data.message);
        fetchSectionData();
      } else {
        toast.error(response.data.message);
      }
      // console.log("response", response);
    } catch (error) {
      toast.error("Internal server error");
      //  console.log("error",error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDropDown = (slug) => {
    const findmodule = template?.find((temp) => temp.moduleSlug === slug);
    setGetSection(findmodule || {});
  };

  const handleSectionSlug = (value) => {
    let currentSection = getSection?.sections?.find(
      (item) => value === item.sectionSlug
    );
    currentSection = {
      ...currentSection,
      moduleSlug: getSection?.moduleSlug,
      moduleName: getSection?.moduleName,
    };
    return currentSection || {};
  };

  // console.log("template", template);

  return (
    <Fragment>
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-40 bg-white justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
              Edit Homepage
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
          <div className="w-full  md:px-8 px-4 pt-2 flex flex-col gap-4 pb-3 md:top-28 sticky z-40 bg-white">
            <h3 className="text-[16px] font-semibold">
              Select your Section to Edit
            </h3>
            <select
              className="w-full h-[46px] rounded-[8px] border-1.5 border-[#D0D5DD] px-[10px] cursor-pointer"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              aria-label="Select section to edit"
            >
              {getSection?.sections?.map((item, index) => (
                <option value={`${item.sectionSlug}`}>
                  {item.sectionName}
                </option>
              ))}
            </select>
          </div>
          <div className=" my-2 no-scrollbar md:min-h-[65vh]">
            {selectedSection === "hero-section" && (
              <Herosection
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "content-box" && (
              <ContentBox
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "categories" && (
              <Categories
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "recommended" && (
              <Recommended
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "gemstones" && (
              <ExploreGemstones
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "jewelry" && (
              <ExploreJewelry
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "drops-beads" && (
              <DropsBeads
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "semi-mounts" && (
              <SemiMounts
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "gifts" && (
              <Gifts
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "offers" && (
              <Offers
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "birthstone-information" && (
              <BirthStoneInfo
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "gemshows" && (
              <Gemshows
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "testimonials" && (
              <Testimonials
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "custom-jewelry" && (
              <CustomJewelry
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "faqs" && (
              <Faqs
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "content-section" && (
              <ContentSection
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "update-section" && (
              <Updates
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
            {selectedSection === "social-follow" && (
              <SocialFollow
                sectionData={sectionData}
                fetchData={fetchSectionData}
                handleHomepage={handleHomepage}
                currentSection={handleSectionSlug(selectedSection)}
              />
            )}
          </div>
        </section>
      )}
      {activeTab === "seoAttributes" && (
        <SeoAttributes sectionData={sectionData} onSubmit={handleSeoSubmit} isLoading={loading} handler={handleHomepage} />
      )}
    </Fragment>
  );
};

export default EditSections;
