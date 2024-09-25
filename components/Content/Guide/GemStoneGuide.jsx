import React, { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";
import { Button, Input } from "@nextui-org/react";
import DragAndDropImage from "../DragDropImage";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";

const GemStoneGuide = ({ handleGuide }) => {
  const [formData, setFormData] = useState({
    headerBannerImage: "",
    headerTitle: "",
    bannerTitle: "",
    moduleId: null,
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleImageSelect = async (file, width, height, headerBannerImage) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [headerBannerImage]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (
      formData.headerBannerImage === "" ||
      formData.headerBannerImage === null
    ) {
      newerrors.headerBannerImage = "Banner is required";
      has = true;
    }
    if (formData.headerTitle === "" || formData.headerTitle === null) {
      newerrors.headerTitle = "Header Title is required";
      has = true;
    }
    if (formData.bannerTitle === "" || formData.bannerTitle === null) {
      newerrors.bannerTitle = "Banner title is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    // API Call Here

    console.log("Form submitted with data:", formData);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
          <div className="w-[100%] md:px-8 px-4">
            <div className="flex flex-col  my-3 pt-2 gap-3">
              <label
                htmlFor="intro"
                className="text-[16px]  font-semibold flex gap-1"
              >
                Header Title
                <RequiredSymbol />
                {errors.headerTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.headerTitle}
                  </span>
                )}
              </label>
              <Input
                type="text"
                minRows={4}
                id="intro"
                variant="bordered"
                placeholder="Facts About Emerald Gemstones"
                size="lg"
                radius="sm"
                name="headerTitle"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="" className=" text-[16px] font-medium flex gap-1">
                Header Banner
                <RequiredSymbol />{" "}
                {errors.headerBannerImage && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.headerBannerImage}
                  </span>
                )}
              </label>
              <DragAndDropImage
                accept={`images/*`}
                label="banner image"
                id="headerBannerImage"
                width={1122}
                height={318}
                onImageSelect={handleImageSelect}
              />
              {formData.headerBannerImage && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.headerBannerImage)}
                  alt="Image Preview"
                />
              )}
            </div>
            <div className="flex flex-col  my-3 pt-2 gap-3">
              <label
                htmlFor="banner-title"
                className="text-[16px]  font-semibold flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
                {errors.bannerTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerTitle}
                  </span>
                )}
              </label>
              <Input
                type="text"
                minRows={4}
                id="banner-title"
                variant="bordered"
                placeholder="EMERALD GEMSTONES"
                size="lg"
                radius="sm"
                name="bannerTitle"
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="w-[100%] mt-10">
            <div className="border flex-col rounded-[20px] p-4 flex items-start gap-2">
              <h1 className="text-[#0A1215] font-medium text-[22px]">
                Guidelines
              </h1>
              <h2 className="text-[16px] font-medium text-[#4A5367]">
                The Following Banner Dimensions are 1248px x 356px
              </h2>
              <h2 className="text-[16px] font-medium text-[#4A5367]">
                You can edit the Banner title, Description and Call to action in
                the edit section.
              </h2>
              <div className="w-[100%] h-[100%]">
                <img
                  src="/images/guidegemstone.svg"
                  alt=""
                  className="object-cover w-[100%] h-[100%]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleGuide}
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

export default GemStoneGuide;
