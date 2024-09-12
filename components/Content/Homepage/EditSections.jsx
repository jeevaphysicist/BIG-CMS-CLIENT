/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
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

const EditSections = ({ handleHomepage }) => {
  const [selectedSection, setSelectedSection] = useState("herosection");
  const [activeTab, setActiveTab] = useState("generalInfo");

  const handleChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSeoSubmit = (formData) => {
    console.log("Submitting data for Homepage", formData);
  };

  return (
    <Fragment>
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-30 bg-white justify-between">
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
          <div className="w-full md:px-4 px-2 pt-2 flex flex-col gap-4 pb-3 md:top-28 sticky z-20 bg-white">
            <h3 className="text-[16px] font-semibold">
              Select your Section to Edit
            </h3>
            <select
              className="w-full h-[46px] rounded-[8px] border-1.5 border-[#D0D5DD] px-[10px] cursor-pointer"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              aria-label="Select section to edit"
            >
              <option value="herosection">Hero Section (Section 1)</option>
              <option value="contentbox">Content Box (Section 2)</option>
              <option value="categories">Categories (Section 3)</option>
              <option value="recommended">Recommended (Section 4)</option>
              <option value="exploregemstones">
                Explore Gemstones (Section 5)
              </option>
              <option value="explorejewelry">
                Explore Jewellery (Section 6)
              </option>
              <option value="dropsbeads">Drops & Beads (Section 7)</option>
              <option value="semimounts">Semi-Mounts (Section 8)</option>
              <option value="gifts">Gifts (Section 9)</option>
              <option value="offers">Offers (Section 10)</option>
              <option value="birthstoneinfo">
                Birthstone Information (Section 11)
              </option>
              <option value="gemshows">Gemshows (Section 12)</option>
              <option value="testimonials">Testimonials (Section 13)</option>
              <option value="customjewellery">
                Custom Jewellery (Section 14)
              </option>
              <option value="faqs">
                Frequently Asked Questions (Section 15)
              </option>
              <option value="contentsection">
                Content Section (Section 16)
              </option>
              <option value="updates">Updates Section (Section 17)</option>
              <option value="socialfollow">Social Follow (Section 18)</option>
            </select>
          </div>
          <div className="px-4 my-2 no-scrollbar md:min-h-[65vh]">
            {selectedSection === "herosection" && (
              <Herosection handleHomepage={handleHomepage} />
            )}
            {selectedSection === "contentbox" && (
              <ContentBox handleHomepage={handleHomepage} />
            )}
            {selectedSection === "categories" && (
              <Categories handleHomepage={handleHomepage} />
            )}
            {selectedSection === "recommended" && (
              <Recommended handleHomepage={handleHomepage} />
            )}
            {selectedSection === "exploregemstones" && (
              <ExploreGemstones handleHomepage={handleHomepage} />
            )}
            {selectedSection === "explorejewelry" && (
              <ExploreJwellery handleHomepage={handleHomepage} />
            )}
            {selectedSection === "dropsbeads" && (
              <DropsBeads handleHomepage={handleHomepage} />
            )}
            {selectedSection === "semimounts" && (
              <SemiMounts handleHomepage={handleHomepage} />
            )}
            {selectedSection === "gifts" && (
              <Gifts handleHomepage={handleHomepage} />
            )}
            {selectedSection === "offers" && (
              <Offers handleHomepage={handleHomepage} />
            )}
            {selectedSection === "birthstoneinfo" && (
              <BirthStoneInfo handleHomepage={handleHomepage} />
            )}
            {selectedSection === "gemshows" && (
              <Gemshows handleHomepage={handleHomepage} />
            )}
            {selectedSection === "testimonials" && (
              <Testimonials handleHomepage={handleHomepage} />
            )}
            {selectedSection === "customjewellery" && (
              <CustomJewellery handleHomepage={handleHomepage} />
            )}
            {selectedSection === "faqs" && (
              <Faqs handleHomepage={handleHomepage} />
            )}
            {selectedSection === "contentsection" && (
              <ContentSection handleHomepage={handleHomepage} />
            )}
            {selectedSection === "updates" && (
              <Updates handleHomepage={handleHomepage} />
            )}
            {selectedSection === "socialfollow" && (
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
