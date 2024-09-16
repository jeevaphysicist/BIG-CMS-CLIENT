/* eslint-disable react/prop-types */
import {
  Button,
  Input,
  SelectSection,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";
// import About from "./About";
// import Offers from "./Offers";
import { FiSave } from "react-icons/fi";
import DragAndDropImage from "../DragDropImage";
import Modal from "../../Modal";
import SeoAttributes from "../SeoAttributes";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import HeroSection from "./HeroSection";
import Introduction from "./Introduction";
import MoreAboutGemstones from "./MoreAboutGemstones";
import ContentSection from "./ContentSection";
import Faqs from "./Faqs";
import BirthstoneInfo from "./BirthstoneInfo";

const EditPages = ({ handleBirthStones }) => {
  const [selectedSection, setSelectedSection] = useState("herosection");
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [modalActiveTab, setModalActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModalTab = (tab) => {
    setModalActiveTab(tab);
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
              Add Birthstones
            </h2>
            <p className="text-[#4A5367] md:text-[14px] text-[12px]">
              Select and Edit Sections to Personalize Content.
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
          <div className="md:top-28 sticky z-20 bg-white">
            {selectedSection === "herosection" && (
              <div className="flex flex-col md:px-8 px-4 my-3 pt-2 gap-3">
                <label
                  htmlFor="page-title"
                  className="text-[16px]  font-semibold flex gap-1"
                >
                  Page Title
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
                  placeholder="Meaning of Emerald Gemstone"
                  size="lg"
                  radius="sm"
                  name="pageTitle"
                  // onChange={handleFormChange}
                />
              </div>
            )}
            <div className="w-full md:px-8 px-4 pt-2 flex flex-col gap-4 pb-3   ">
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
                <option value="introduction">Introduction (Section 2)</option>
                <option value="moreAboutGemstones">
                  More About Gemstones (Section 3)
                </option>
                <option value="contentSection">
                  Content Section (Section 4)
                </option>
                <option value="faqs">
                  Frequently Asked Questions (Section 5)
                </option>
                <option value="birthstoneInformation">
                  Birthstone Information (Section 6)
                </option>
              </select>
            </div>
            <div className="w-[100%] h-[1px] bg-gray-200" />
          </div>
          <div className="  no-scrollbar md:min-h-[65vh]">
            {selectedSection === "herosection" && (
              <HeroSection handleBirthStones={handleBirthStones} />
            )}
            {selectedSection === "introduction" && (
              <Introduction handleBirthStones={handleBirthStones} />
            )}
            {selectedSection === "moreAboutGemstones" && (
              <MoreAboutGemstones handleBirthStones={handleBirthStones} />
            )}
            {selectedSection === "contentSection" && (
              <ContentSection handleBirthStones={handleBirthStones} />
            )}
            {selectedSection === "faqs" && (
              <Faqs handleBirthStones={handleBirthStones} />
            )}
            {selectedSection === "birthstoneInformation" && (
              <BirthstoneInfo handleBirthStones={handleBirthStones} />
            )}
          </div>
        </section>
      )}
      {activeTab === "seoAttributes" && (
        <SeoAttributes
          onSubmit={handleSeoSubmit}
          handleModal={handleModal}
          handler={handleBirthStones}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modeltitle="About Us"
      >
        <div className="flex gap-4 h-10 border-b-1 px-8 pt-3 sticky top-0 bg-white">
          <button
            className={`text-[16px] border-b-3 border-[#434CE7] text-black font-semibold  `}
          >
            Details
          </button>
        </div>
        <section className="px-6 w-full h-full">
          <div className="xl:h-[65%] h-[62%] overflow-y-auto no-scrollbar">
            <section className="h-full w-full">
              <div className=" pt-4 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-[16px] font-semibold">Header</h4>
                  <p className="text-[14px] text-black/70">
                    May Birthstone: Emerald - Gem Of Spring And Prosperity
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[16px] font-semibold">Introduction</h4>
                  <p className="text-[14px] text-black/80 text-justify">
                    Welcome to BestInGems, where the artistry of nature meets
                    the precision of craftsmanship. Since our establishment in
                    March 1999, we have grown into a distinguished name in the
                    gemstone industry, with a legacy that spans over 25 years.
                    As curators of the finest gemstones, beads & drops, gemstone
                    jewelry, and semi-mounts, we embark on a journey marked by
                    quality, ethics, and a passion for the extraordinary.
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[16px] font-semibold">Main Content</h4>
                  <h4 className="text-[14px] font-semibold">
                    Meanings And Legends Of Emerald:
                  </h4>
                  <p className="text-[14px] text-black/80 text-justify">
                    At the heart of our business is an unwavering commitment to
                    quality. We traverse the globe, forging connections with
                    miners and artisans who share our dedication to sourcing the
                    rarest and most exquisite gemstones. In our pursuit of
                    authenticity, we steadfastly avoid artificial, synthetic, or
                    simulated gemstones, ensuring that each piece in our
                    collection is a genuine work of natures art. Our commitment
                    to transparency and education sets us apart.
                  </p>
                </div>
                <div className="w-full">
                  <img
                    src="/images/guidegemstone.svg"
                    alt=""
                    className="w-full"
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="xl:h-[35%] space-y-2 md:space-y-3 w-full md:pt-3 pt-2">
            <Tabs aria-label="Options" fullWidth size="lg" radius="sm">
              <Tab key="draft" title="Draft"></Tab>
              <Tab key="publish" title="Publish"></Tab>
            </Tabs>
            <Button radius="sm" variant="bordered" className="w-full">
              Edit Page
            </Button>
          </div>
        </section>
      </Modal>
    </Fragment>
  );
};
export default EditPages;
