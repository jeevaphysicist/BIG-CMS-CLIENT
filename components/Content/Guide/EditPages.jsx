import {
  Button,
  Input,
  SelectSection,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Fragment, useState ,useEffect } from "react";
import RequiredSymbol from "../RequiredSymbol";
import { FiSave } from "react-icons/fi";
import DragAndDropImage from "../DragDropImage";
import Modal from "../../Modal";
import SeoAttributes from "../SeoAttributes";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import GemStoneGuide from "./GemStoneGuide";
import MeaningOfGemstones from "./MeaningOfGemstones";
import ProductFromGemstones from "./ProductFromGemstones";
import ContentSection from "./ContentSection";
import Faqs from "./Faqs";
import MoreAboutGemstones from "./MoreAboutGemStones";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleCreateGuide, handleUpdateGuide } from "@/API/api";

const EditPages = ({type,fetchData,editData, handleGuide }) => {
  const [selectedSection, setSelectedSection] = useState("gemstone-guide");
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    media: "",
  });
  const [title,setTitle] = useState("");
  const [loading,setLoading] = useState("");

  useEffect(() => {   
    setTitle(editData.title);
  }, [editData]);

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

  const handleSeoSubmit = async (formData) => {
    // console.log("Submitting data for Sitepages", formData);

    let bodyData = {
      title:title,
      seo:formData
};

// console.log("body data", bodyData);
let response ; 
try {
  setLoading(true);
  bodyData = convertObjectToFormData(bodyData);
  if(type === 'create'){
  response = await handleCreateGuide(bodyData,true);      
  }
  else if(type === 'edit'){
  response = await handleUpdateGuide(bodyData,editData._id,true); 
  }
// console.log("response",response);
if (response.status >= 200 && response.status <= 209) {
  let data = response.data;
  toast.success(response.data.message);
  fetchData();
  handleGuide();
}
else{
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
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-30 bg-white justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
            {type === "create" ? "Add New":"Edit"} Guide
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
          <div className="md:top-28 sticky z-20 bg-white">
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
                placeholder="Gemstone Guide"
                size="md"
                radius="sm"
                name="pageTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

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
                <option value="gemstone-guide">
                  Gemstone Guide (Section 1)
                </option>
                <option value="meaningOfGemstones">
                  Meaning of Gemstones (Section 2)
                </option>
                <option value="productsFromGemstones">
                  Products from Gemstones (Section 3)
                </option>
                <option value="moreAboutGemstones">
                  More About Gemstones (Section 4)
                </option>
                <option value="contentSection">
                  Content Section (Section 5)
                </option>
                <option value="faqs">
                  Frequently Asked Questions (Section 6)
                </option>
              </select>
            </div>
            <div className="w-[100%] h-[1px] bg-gray-200" />
          </div>
          <div className="  no-scrollbar md:min-h-[65vh]">
            {selectedSection === "gemstone-guide" && (
              <GemStoneGuide 
              sectionData={editData}
              fetchData={fetchData}
              type={type}
              title={title}
              handleGuide={handleGuide} />
            )}
            {selectedSection === "meaningOfGemstones" && (
              <MeaningOfGemstones
              sectionData={editData}
              fetchData={fetchData}
              type={type}
              title={title}
              handleGuide={handleGuide} />
            )}
            {selectedSection === "productsFromGemstones" && (
              <ProductFromGemstones 
              sectionData={editData}
              fetchData={fetchData}
              type={type}
              title={title}
              handleGuide={handleGuide} />
            )}
            {selectedSection === "moreAboutGemstones" && (
              <MoreAboutGemstones 
              sectionData={editData}
              fetchData={fetchData}
              type={type}
              title={title}
              handleGuide={handleGuide} />
            )}
            {selectedSection === "contentSection" && (
              <ContentSection 
              sectionData={editData}
              fetchData={fetchData}
              type={type}
              title={title}
              handleGuide={handleGuide} />
            )}
            {selectedSection === "faqs" &&(
             <Faqs  
              sectionData={editData}
              fetchData={fetchData}
              type={type}
              title={title}
              handleGuide={handleGuide} />
             )}
          </div>
        </section>
      )}
      {activeTab === "seoAttributes" && (
        <SeoAttributes
          isLoading={loading}
          onSubmit={handleSeoSubmit}
          handler={handleGuide}
          sectionData={editData?.seo}
          // handleModal={handleModal}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modeltitle="Diamond Guide"
      >
        <div className="flex gap-4 h-10 border-b-1 px-8 pt-3 sticky top-0 bg-white">
          <button
            className={`text-[16px] border-b-3 border-[#434CE7] text-black font-semibold`}
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
                  <p className="text-[14px] text-black/70">Diamond Guide</p>
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
                  <p className="text-[14px] text-black/80 text-justify">
                    At the heart of our business is an unwavering commitment to
                    quality. We traverse the globe, forging connections with
                    miners and artisans who share our dedication to sourcing the
                    rarest and most exquisite gemstones. In our pursuit of
                    authenticity, we steadfastly avoid artificial, synthetic, or
                    simulated gemstones, ensuring that each piece in our
                    collection is a genuine work of natures art. Our commitment
                    to transparency and education sets us apart. We believe in
                    empowering our customers with knowledge about the unique
                    characteristics and origins of each gemstone. Beyond being a
                    retailer, we are your partners in exploration, guiding you
                    through the fascinating world of gemstones and helping you
                    make informed choices. Ethics and integrity form the
                    cornerstone of our operations. From responsible sourcing to
                    our state-of-the-art factory in Jaipur, India, where over 40
                    skilled artisans bring our gemstones to life, we uphold the
                    highest standards. Each gemstone undergoes meticulous
                    cutting and shaping, transforming raw beauty into timeless
                    pieces that reflect our dedication to craftsmanship. Beyond
                    the allure of gemstones, our business is built on a
                    foundation of reliability, service, and dependability. When
                    you choose Best In Gems, you are not just making a purchase;
                    you are entering into a relationship grounded in trust and
                    excellence. Our team is here to ensure your experience is
                    seamless, from selecting the perfect gemstone to enjoying
                    its beauty for years to come. As we celebrate over 25 years
                    in the industry, we extend our gratitude to our patrons who
                    have made this journey possible. Join us at Best In Gems,
                    where the essence of natures wonders meets the artistry of
                    human hands, and every gemstone is a testament to the
                    enduring beauty of our Earth. Thank you for being part of
                    our story.
                  </p>
                </div>
                <div className="w-[100%]">
                  <img
                    src="/images/guidegemstone.svg"
                    alt=""
                    className="object-cover w-[100%] h-[100%]"
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
