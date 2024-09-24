/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs, Textarea } from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";
import { FiSave } from "react-icons/fi";
import DragAndDropImage from "../DragDropImage";
import Modal from "../../Modal";
import SeoAttributes from "../SeoAttributes";
import GeneralInfo from "./GeneralInfo";

const EditPages = ({ handlePolicies }) => {
  const [selectedSection, setSelectedSection] = useState("about");
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [modalActiveTab, setModalActiveTab] = useState("details");
  const [imagePreview, setImagePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
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
              Add New Policy
            </h2>
            <p className="text-[#4A5367] md:text-[14px] text-[12px]">
              Enter Page Contents.
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
          <div className="px-4 my-2 no-scrollbar md:min-h-[65vh]">
            <GeneralInfo handlePolicies={handlePolicies} />
          </div>
        </section>
      )}
      {activeTab === "seoAttributes" && (
        <SeoAttributes handler={handlePolicies} onSubmit={handleSeoSubmit} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modeltitle="About Us"
      >
        <div className="flex gap-4 h-10 border-b-1 px-8 pt-3 sticky top-0 bg-white">
          <button
            className={`text-[16px] ${
              modalActiveTab === "details"
                ? "border-b-3 border-[#434CE7] text-black"
                : "text-black/50"
            }  font-semibold  `}
            onClick={() => handleModalTab("details")}
          >
            Details
          </button>
          <button
            className={`text-[16px] ${
              modalActiveTab === "mediaPrev"
                ? "border-b-3 border-[#434CE7] text-black"
                : "text-black/50"
            }  font-semibold`}
            onClick={() => handleModalTab("mediaPrev")}
          >
            Media
          </button>
        </div>
        <section className="px-6 w-full h-full">
          <div className="xl:h-[65%] h-[62%] overflow-y-auto no-scrollbar">
            {modalActiveTab === "details" && (
              <section className="h-full w-full">
                <div className=" pt-4 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-semibold">Header</h4>
                    <p className="text-[14px] text-black/70">
                      About BestInGems
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-semibold">Introduction</h4>
                    <p className="text-[14px] text-black/80 text-justify">
                      Welcome to BestInGems, where the artistry of nature meets
                      the precision of craftsmanship. Since our establishment in
                      March 1999, we have grown into a distinguished name in the
                      gemstone industry, with a legacy that spans over 25 years.
                      As curators of the finest gemstones, beads & drops,
                      gemstone jewelry, and semi-mounts, we embark on a journey
                      marked by quality, ethics, and a passion for the
                      extraordinary.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-semibold">Content</h4>
                    <p className="text-[14px] text-black/80 text-justify">
                      At the heart of our business is an unwavering commitment
                      to quality. We traverse the globe, forging connections
                      with miners and artisans who share our dedication to
                      sourcing the rarest and most exquisite gemstones. In our
                      pursuit of authenticity, we steadfastly avoid artificial,
                      synthetic, or simulated gemstones, ensuring that each
                      piece in our collection is a genuine work of natures art.
                      Our commitment to transparency and education sets us
                      apart. We believe in empowering our customers with
                      knowledge about the unique characteristics and origins of
                      each gemstone. Beyond being a retailer, we are your
                      partners in exploration, guiding you through the
                      fascinating world of gemstones and helping you make
                      informed choices. Ethics and integrity form the
                      cornerstone of our operations. From responsible sourcing
                      to our state-of-the-art factory in Jaipur, India, where
                      over 40 skilled artisans bring our gemstones to life, we
                      uphold the highest standards. Each gemstone undergoes
                      meticulous cutting and shaping, transforming raw beauty
                      into timeless pieces that reflect our dedication to
                      craftsmanship. Beyond the allure of gemstones, our
                      business is built on a foundation of reliability, service,
                      and dependability. When you choose Best In Gems, you are
                      not just making a purchase; you are entering into a
                      relationship grounded in trust and excellence. Our team is
                      here to ensure your experience is seamless, from selecting
                      the perfect gemstone to enjoying its beauty for years to
                      come. As we celebrate over 25 years in the industry, we
                      extend our gratitude to our patrons who have made this
                      journey possible. Join us at Best In Gems, where the
                      essence of natures wonders meets the artistry of human
                      hands, and every gemstone is a testament to the enduring
                      beauty of our Earth. Thank you for being part of our
                      story.
                    </p>
                  </div>
                </div>
              </section>
            )}
            {modalActiveTab === "mediaPrev" && (
              <section className="py-4">Media</section>
            )}
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
