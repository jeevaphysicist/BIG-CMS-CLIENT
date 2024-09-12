/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Switch, Textarea } from "@nextui-org/react";
import customImg from "../../../assets/image 16.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const CustomJewellery = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState({
    banner: "",
    icon1: "",
    icon2: "",
    icon3: "",
  });
  const [formData, setFormData] = useState({
    sectionTitle: "",
    description: "",
    banner: "",
    icon1: "",
    title1: "",
    icon2: "",
    title2: "",
    icon3: "",
    title3: "",
    enableIcons: false,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  const handleImageSelect = (file, iconkey) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview((prev) => ({ ...prev, [iconkey]: blobUrl }));
      setFormData((prev) => ({ ...prev, [iconkey]: file }));
    };
    reader.readAsArrayBuffer(file);
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
                placeholder="Create Your Custom Jwellery"
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
                Description
                <RequiredSymbol />
              </label>
              <Textarea
                type="text"
                id="banner_desc"
                placeholder="Dive into our 'Custom Gemstone Jewelry' section, where your unique vision takes center stage. Design personalized masterpieces that tell your story, blending style and sentiment in every handpicked Gemstone"
                variant="bordered"
                size="lg"
                radius="sm"
                name="description"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>
                    This is a Content box that contains Icon, Title and a short
                    Description.
                  </p>
                  <p className="md:mt-5 mt-2">
                    You can edit the Content Title, Description and the icon in
                    the edit section.
                  </p>
                  <h2 className="text-[18px] font-semibold py-2 text-start">
                    Banner
                  </h2>
                  <div className="py-2">
                    <img src={"/images/image 16.png"} alt="content" />
                  </div>
                  <h2 className="text-[18px] font-semibold py-2 text-start">
                    Icon
                  </h2>
                </div>
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
                    SectionBanner
                    <RequiredSymbol />
                  </label>
                  <DragAndDropImage
                    id="banner"
                    onImageSelect={(file) => handleImageSelect(file, "banner")}
                  />
                  {imagePreview.banner && (
                    <img src={imagePreview.banner} alt="banner image" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="icons" className="text-[18px] gilroy-medium">
                    Enable Icons
                  </label>
                  <Switch
                    checked={formData.enableTimer}
                    onChange={() => handleSwitchChange("enableIcons")}
                    aria-label="Enable Icons"
                  />
                </div>
                {/* Icons form */}

                {formData.enableIcons && (
                  <div className="space-y-6">
                    {/* Icon 1 */}
                    <div className=" flex flex-col gap-4">
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="icon"
                          className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                        >
                          Icon 1
                          <RequiredSymbol />
                        </label>
                        <DragAndDropImage
                          id="icon1"
                          onImageSelect={(file) =>
                            handleImageSelect(file, "icon1")
                          }
                        />
                        {imagePreview.icon1 && (
                          <img src={imagePreview.icon1} alt="banner image" />
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="banner_title"
                          className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                        >
                          Title
                          <RequiredSymbol />
                        </label>
                        <Input
                          type="text"
                          id="banner_title"
                          placeholder="Select Gemstone"
                          variant="bordered"
                          size="lg"
                          radius="sm"
                          name="title1"
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    {/* Icon 2 */}
                    <div className=" flex flex-col gap-4">
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="icon"
                          className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                        >
                          Icon 2
                          <RequiredSymbol />
                        </label>
                        <DragAndDropImage
                          id="icon2"
                          onImageSelect={(file) =>
                            handleImageSelect(file, "icon2")
                          }
                        />
                        {imagePreview.icon2 && (
                          <img src={imagePreview.icon2} alt="banner image" />
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="banner_title2"
                          className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                        >
                          Title
                          <RequiredSymbol />
                        </label>
                        <Input
                          type="text"
                          id="banner_title2"
                          placeholder="Pick Semi-mount"
                          variant="bordered"
                          size="lg"
                          radius="sm"
                          name="title2"
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    {/* Icon 3 */}
                    <div className=" flex flex-col gap-4">
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="icon"
                          className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                        >
                          Icon 3
                          <RequiredSymbol />
                        </label>
                        <DragAndDropImage
                          id="icon3"
                          onImageSelect={(file) =>
                            handleImageSelect(file, "icon3")
                          }
                        />
                        {imagePreview.icon3 && (
                          <img src={imagePreview.icon3} alt="banner image" />
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="banner_title3"
                          className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                        >
                          Title
                          <RequiredSymbol />
                        </label>
                        <Input
                          type="text"
                          id="banner_title3"
                          placeholder="Place Order"
                          variant="bordered"
                          size="lg"
                          radius="sm"
                          name="title3"
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
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

export default CustomJewellery;
