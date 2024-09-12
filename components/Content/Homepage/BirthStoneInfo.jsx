/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import DragAndDropImage from "../DragDropImage";

const BirthStoneInfo = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState({
    banner: "",
    selectionImage: "",
  });
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionDescription: "",
    month: "",
    banner: "",
    selectionImage: "",
    title: "",
    description: "",
    readMoreLink: "",
    productLink: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageSelect = (file, bannerkey) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview((prev) => ({ ...prev, [bannerkey]: blobUrl }));
      setFormData((prev) => ({ ...prev, [bannerkey]: file }));
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
                placeholder="Know More About Your Birthstone"
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
              <Input
                type="text"
                id="banner_desc"
                placeholder="Gemstone name"
                variant="bordered"
                size="lg"
                radius="sm"
                name="sectionDescription"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 619px X 578px</p>
                  <p className="md:mt-3 mt-2">
                    You can edit the Banner Title,Description and Call to Action
                    in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 13.png"} alt="birthstone" />
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
                    htmlFor="banner_month"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Birthstone Month
                    <RequiredSymbol />
                  </label>
                  <Select
                    type="text"
                    id="banner_month"
                    placeholder="Select Birthstone Month"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="month"
                    onChange={handleFormChange}
                  >
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="Febraury">Febraury</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="January">June</SelectItem>
                    <SelectItem value="June">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                  </Select>
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Birthstone Banner
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
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Selection Image
                    <RequiredSymbol />
                  </label>
                  <DragAndDropImage
                    id="selectionImage"
                    onImageSelect={(file) =>
                      handleImageSelect(file, "selectionImage")
                    }
                  />
                  {imagePreview.selectionImage && (
                    <img src={imagePreview.selectionImage} alt="banner image" />
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
                    placeholder="Aquamarine - March"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="title"
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
                    placeholder="Birthstones are good"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="description"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full flex md:gap-4 gap-2">
                  <div className="w-full space-y-2">
                    <label
                      htmlFor="rm_link"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Read More Link
                    </label>
                    <Input
                      type="text"
                      id="rm_link"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="readMoreLink"
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <label
                      htmlFor="product_link"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Product Link
                    </label>
                    <Input
                      type="text"
                      id="product_link"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="productLink"
                      onChange={handleFormChange}
                    />
                  </div>
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

export default BirthStoneInfo;
