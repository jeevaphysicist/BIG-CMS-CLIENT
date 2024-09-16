import React from "react";
import RequiredSymbol from "../RequiredSymbol";
import { Button, Input } from "@nextui-org/react";
import DragAndDropImage from "../DragDropImage";
import { FiSave } from "react-icons/fi";

const HeroSection = ({ handleBirthStones }) => {
  const handleImageSelect = () => {};

  return (
    <section>
      <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
        <div className="w-[100%] md:px-8 px-4">
          <div className="flex flex-col  my-3 pt-2 gap-3">
            <label
              htmlFor="intro"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Header Title
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
              id="intro"
              variant="bordered"
              placeholder="May Birthstone: Emerald - Gem Of Spring And Prosperity"
              size="lg"
              radius="sm"
              name="introduction"
              // onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className=" text-[16px] font-medium flex gap-1">
              Header Banner
              <RequiredSymbol />{" "}
              {/* {errors.banner2 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2}
                  </span>
                )} */}
            </label>
            <DragAndDropImage
              accept={`images/*`}
              label="banner image"
              id="banner2"
              width={1248}
              height={356}
              onImageSelect={handleImageSelect}
            />
            {/* {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />} */}
          </div>
          <div className="flex flex-col  my-3 pt-2 gap-3">
            <label
              htmlFor="banner-title"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Banner Title
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
              id="banner-title"
              variant="bordered"
              placeholder="Birthstones"
              size="lg"
              radius="sm"
              name="banner-title"
              // onChange={handleFormChange}
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
          onClick={handleBirthStones}
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
    </section>
  );
};

export default HeroSection;
