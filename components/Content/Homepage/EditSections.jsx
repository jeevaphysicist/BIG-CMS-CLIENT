/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import Herosection from "./Herosection";
import ContentBox from "./ContentBox";
import Categories from "./Categories";
import { Tab, Tabs } from "@nextui-org/react";
import Recommended from "./Recommended";
import ExploreGemstones from "./ExploreGemstones";
import ExploreJwellery from "./ExploreJwellery";
import DropsBeads from "./DropsBeads";
import SemiMounts from "./SemiMounts";
import Gifts from "./Gifts";
import Offers from "./Offers";
import BirthStoneInfo from "./BirthStoneInfo";
import Gemshows from "./Gemshows";
import Testimonials from "./Testimonials";
import CustomJewellery from "./CustomJewellery";
import Faqs from "./Faqs";
import ContentSection from "./ContentSection";
import Updates from "./Updates";
import SocialFollow from "./SocialFollow";
import SeoAttributes from "../SeoAttributes";
import { GetCurrentUserDetails } from "@/utils/GetCurrentUserDetails";
import { handleGetHomepageSection } from "@/API/api";

const EditSections = ({ handleHomepage }) => {
  const  { template } = GetCurrentUserDetails();  
  const [selectedSection, setSelectedSection] = useState("hero-section");
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [sectionData,setSectionData]= useState({});

  useEffect(()=>{
        fetchSectionData();
  },[selectedSection])

  const fetchSectionData = async ()=>{
       try {
         const response = await handleGetHomepageSection('homepage',selectedSection);
          if(response.status >=200 && response.status <=209 ){
              setSectionData(response.data.data);
          } 
          else{
             setSectionData({});
          }
         console.log("response",response);
        } catch (error) {
           setSectionData({});
       }
  }

  const handleChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSeoSubmit = (formData) => {
    console.log("Submitting data for Homepage", formData);
  };

  const handleSelectDropDown = (slug)=>{
    const findmodule = template?.find(temp=>temp.moduleSlug === slug );
    return findmodule || {};
  }

 

  console.log("template",template);

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
              {handleSelectDropDown('homepage')?.sections?.map((item,index)=> 
              <option value={`${item.sectionSlug}`}>{item.sectionName}</option>
            )}
             
            </select>
          </div>
          <div className=" my-2 no-scrollbar md:min-h-[65vh]">
            {selectedSection === "hero-section" && (
              <Herosection sectionData={sectionData} handleHomepage={handleHomepage} />
            )}
            {selectedSection === "content-box" && (
              <ContentBox sectionData={sectionData} handleHomepage={handleHomepage} />
            )}
            {selectedSection === "categories" && (
              <Categories handleHomepage={handleHomepage} />
            )}
            {selectedSection === "recommended" && (
              <Recommended handleHomepage={handleHomepage} />
            )}
            {selectedSection === "explore-gemstones" && (
              <ExploreGemstones handleHomepage={handleHomepage} />
            )}
            {selectedSection === "explore-jewelry" && (
              <ExploreJwellery handleHomepage={handleHomepage} />
            )}
            {selectedSection === "drops-beads" && (
              <DropsBeads handleHomepage={handleHomepage} />
            )}
            {selectedSection === "semi-mounts" && (
              <SemiMounts handleHomepage={handleHomepage} />
            )}
            {selectedSection === "gifts" && (
              <Gifts handleHomepage={handleHomepage} />
            )}
            {selectedSection === "offers" && (
              <Offers handleHomepage={handleHomepage} />
            )}
            {selectedSection === "birthstone-information" && (
              <BirthStoneInfo handleHomepage={handleHomepage} />
            )}
            {selectedSection === "gemshows" && (
              <Gemshows handleHomepage={handleHomepage} />
            )}
            {selectedSection === "testimonials" && (
              <Testimonials handleHomepage={handleHomepage} />
            )}
            {selectedSection === "custom-jewelry" && (
              <CustomJewellery handleHomepage={handleHomepage} />
            )}
            {selectedSection === "faqs" && (
              <Faqs handleHomepage={handleHomepage} />
            )}
            {selectedSection === "content-section" && (
              <ContentSection handleHomepage={handleHomepage} />
            )}
            {selectedSection === "update-section" && (
              <Updates handleHomepage={handleHomepage} />
            )}
            {selectedSection === "social-media" && (
              <SocialFollow handleHomepage={handleHomepage} />
            )}
          </div>
        </section>
      )}
      {activeTab === "seoAttributes" && (
        <SeoAttributes onSubmit={handleSeoSubmit} handler={handleHomepage} />
      )}
    </Fragment>
  );
};

export default EditSections;
