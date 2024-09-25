/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Button, Input, Switch } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import DragAndDropImage from "../DragDropImage";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";

const Herosection = ({ handleHomepage }) => {
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

  const handleImageSelect = async (file, width, height, bannerkey) => {
    try {
      // console.log(bannerkey, width, height);
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [bannerkey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.banner1 === "" || formData.banner1 === null) {
      newerrors.banner1 = "Banner 1 required";
      has = true;
    }
    if (formData.banner2 === "" || formData.banner2 === null) {
      newerrors.banner2 = "Banner 2 required";
      has = true;
    }
    if (formData.banner1Title === "" || formData.banner1Title === null) {
      newerrors.banner1Title = "Banner title required";
      has = true;
    }
    if (
      formData.banner1Description === "" ||
      formData.banner1Description === null
    ) {
      newerrors.banner1Description = "Banner description required";
      has = true;
    }
    if (formData.banner2Title === "" || formData.banner2Title === null) {
      newerrors.banner2Title = "Banner title required";
      has = true;
    }
    if (
      formData.banner2Description === "" ||
      formData.banner2Description === null
    ) {
      newerrors.banner2Description = "Banner description required";
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

    // status 200 - 209
    // response.data
    
    //  status 210 - 505 
    // response.response.data
    // API Call Here



    // console.log("Form submitted with data:", formData);
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
                {errors.banner1 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner1}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="banner1"
                label="banner image"
                accept={`images/*`}
                width={318}
                height={548}
                onImageSelect={handleImageSelect}
              />
              
             {formData.banner1 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner1 )} alt="Image Preview" />}

              
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
                {errors.banner1Title && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner1Title}
                  </span>
                )}
              </label>
              <Input
                type="text"
                name="banner1Title"
                id="banner_title"
                placeholder="Engagement Rings"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
                {errors.banner1Description && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner1Description}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="banner_desc"
                name="banner1Description"
                placeholder="Start the journey toward finding your perfect ring"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleFormChange}
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
                id="timer"
                  checked={formData.enableTimer}
                  onChange={() => handleSwitchChange("enableTimer")}
                  aria-label="Enable Timer"
                />
              </div>
              <div className="w-full flex justify-between md:gap-4 gap-2">
                <div className="w-[100%] gap-2">
                  <label
                    htmlFor="days"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    Start Date
                  </label>
                  <Input
                    type="date"
                    id="banner_desc"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="bannerOneStartDate"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-[100%] gap-2">
                  <label
                    htmlFor="end-date"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    End Date
                  </label>
                  <Input
                    type="date"
                    id="end-date"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="bannerOneEndDate"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
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
                <RequiredSymbol />{" "}
                {errors.banner2 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2}
                  </span>
                )}
              </label>
              <DragAndDropImage
                accept={`images/*`}
                label="banner image"
                id="banner2"
                width={1122}
                height={318}
                onImageSelect={handleImageSelect}
              />
             {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />}

            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
                {errors.banner2Title && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2Title}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="banner_title1"
                name="banner2Title"
                placeholder="Valentines Day"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
                {errors.banner2Description && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2Description}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="banner_desc1"
                name="banner2Description"
                placeholder="Enjoy the added benefit of obtaining free shipping within United"
                variant="bordered"
                size="lg"
                radius="sm"
                onChange={handleFormChange}
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
                Button Content
              </label>
              <Input
                type="text"
                id="btn_content"
                variant="bordered"
                size="lg"
                radius="sm"
                name="buttonContent"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="btn_content"
                className="md:text-[18px] text-[16px] gilroy-medium"
              >
                Button Link 
             </label>
              <Input
                type="text"
                id="btn_content"
                variant="bordered"
                size="lg"
                radius="sm"
                name="buttonLink"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            type="button"
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
