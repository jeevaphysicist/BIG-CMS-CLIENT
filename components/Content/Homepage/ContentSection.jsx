/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Textarea } from "@nextui-org/react";
import contentImg from "../../../assets/image 18.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const ContentSection = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    sectionTitle: "",
    subtitle: "",
    banner: "",
    description: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
      setFormData((prevData) => ({
        ...prevData,
        banner: blobUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full md:h-full md:px-8 px-2 space-y-6"
      >
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="section_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Section Title
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="BestInGems - Online Gemstone Store"
                variant="bordered"
                size="lg"
                radius="sm"
                name="sectionTitle"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Subtitle
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_desc"
                placeholder="Get in touch with us for a complete Jewelry shopping experience!"
                variant="bordered"
                size="lg"
                radius="sm"
                name="subtitle"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Image Dimensions are 487px X 410px</p>
                  <p className="md:mt-3 mt-2">
                    You can edit the Banner Image and its details.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 18.png"} alt="content" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
            {/* Banner */}
            <div className="w-full flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Banner
                    <RequiredSymbol />
                  </label>
                  <DragAndDropImage
                    id="banner"
                    onImageSelect={(file) => handleImageSelect(file)}
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="banner_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Description
                    <RequiredSymbol />
                  </label>
                  <Textarea
                    type="text"
                    minRows={4}
                    id="banner_desc"
                    placeholder="Welcome to BestInGems, Inc., your premier destination for exquisite Gemstones, Beads, Drops, Gemstone Jewelry, and Semi-Mounts. Since our establishment in March 1999, we have been curating a stunning collection of Natural Gemstones sourced from around the globe. More than just a Gemstone retailer, we are dedicated to both providing you with unparalleled Gemstone offerings and educating you on the quality and unique characteristics of each Gemstone in our inventory."
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="description"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            onClick={handleHomepage}
            variant="bordered"
            className="font-semibold"
          >
            Back to list
          </Button>
          <Button
            color="primary"
            type="submit"
            className="font-semibold text-white"
            startContent={<FiSave size={20} />}
          >
            Save
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default ContentSection;
