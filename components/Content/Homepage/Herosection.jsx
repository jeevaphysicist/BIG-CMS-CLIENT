/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Button, Input, Switch } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import DragAndDropImage from "../DragDropImage";

const Herosection = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState({
    banner1: "",
    banner2: "",
  });
  const [formData, setFormData] = useState({
    banner1: "",
    banner1Title: "",
    banner1Description: "",
    banner2: "",
    banner2Title: "",
    banner2Description: "",
    bannerContent: "",
    enableTimer: false,
    enableButton: false,
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const handleChange = (e) => {
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
      <form onSubmit={handleSubmit} className="w-full md:px-8 px-2 space-y-6">
        {/* Banner 1 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex  items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 318px X 548px</p>
                  <p className="md:mt-5 mt-2">
                    You can edit the Banner title, Description and Call to
                    action in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 1.png"} alt="banner1" />
              </div>
            </div>
          </div>
          <div className="md:w-[60%] flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor=""
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 1
                <RequiredSymbol />
              </label>
              <DragAndDropImage
                id="banner1"
                onImageSelect={(file) => handleImageSelect(file, "banner1")}
              />
              {imagePreview.banner1 && (
                <img src={imagePreview.banner1} alt="banner image" />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                name="banner1Title"
                id="banner_title"
                placeholder="Engagement Rings"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_desc"
                name="banner1Description"
                placeholder="Start the journey toward finding your perfect ring"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="timer"
                  className="md:text-[18px] text-[16px] gilroy-medium"
                >
                  Enable Timer
                </label>
                <Switch
                  checked={formData.enableTimer}
                  onChange={() => handleSwitchChange("enableTimer")}
                  aria-label="Enable Timer"
                />
              </div> 
              {formData.enableTimer && (
                <div className="w-full flex justify-between md:gap-4 gap-2">
                  <div className="grid gap-2">
                    <label
                      htmlFor="days"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Days
                    </label>
                    <Input
                      type="text"
                      id="banner_desc"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="days"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="days"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Hours
                    </label>
                    <Input
                      type="text"
                      id="banner_desc"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="hours"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="days"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Minutes
                    </label>
                    <Input
                      type="text"
                      id="banner_desc"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="minutes"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="days"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Seconds
                    </label>
                    <Input
                      type="text"
                      id="banner_desc"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="seconds"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Banner 2 */}
        <div className="w-full md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="w-full">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 1122px X 318px</p>
                  <p className="lg:my-3 my-2">
                    You can edit the Banner title, Description and Call to
                    action in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 2.png"} alt="banner2" />
              </div>
            </div>
          </div>
          <div className="md:w-[60%] flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor=""
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 2
                <RequiredSymbol />
              </label>
              <DragAndDropImage
                id="banner2"
                onImageSelect={(file) => handleImageSelect(file, "banner2")}
              />
              {imagePreview.banner2 && (
                <img src={imagePreview.banner2} alt="banner image" />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_title1"
                name="banner2Title"
                placeholder="Valentines Day"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_desc1"
                name="banner2Description"
                placeholder="Enjoy the added benefit of obtaining free shipping within United"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label htmlFor="timer" className="text-[18px] gilroy-medium">
                  Enable Button
                </label>
                <Switch
                  checked={formData.enableButton}
                  onChange={() => handleSwitchChange("enableButton")}
                  aria-label="Enable Button"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="btn_content"
                className="md:text-[18px] text-[16px] gilroy-medium"
              >
                Banner Content
              </label>
              <Input
                type="text"
                id="btn_content"
                variant="bordered"
                size="lg"
                radius="sm"
                name="bannerContent"
                onChange={handleChange}
              />
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

export default Herosection;
