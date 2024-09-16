/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Switch } from "@nextui-org/react";
import banner1 from "../../../assets/image 12.png";
import banner2 from "../../../assets/image 2.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";

const Offers = ({ handleHomepage }) => {
  const [formData, setFormData] = useState({
    banner1: "",
    banner1Title: "",
    banner1Description: "",
    banner1Link: "",
    banner2: "",
    banner2Title: "",
    banner2Description: "",
    banner2Content: "",
    buttonLink1: "",
    banner3: "",
    banner3Title: "",
    banner3Description: "",
    banner3Content: "",
    buttonLink2: "",
    enableButton: false,
    enableCoupon: false,
    code: "",
    additionalDiscount: "",
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
      console.log(bannerkey, width, height);
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
    if (formData.banner3 === "" || formData.banner3 === null) {
      newerrors.banner3 = "Banner 3 required";
      has = true;
    }
    if (formData.banner1Title === "" || formData.banner1Title === null) {
      newerrors.banner1Title = "Banner title required";
      has = true;
    }
    if (formData.banner2Title === "" || formData.banner2Title === null) {
      newerrors.banner2Title = "Banner title required";
      has = true;
    }
    if (formData.banner3Title === "" || formData.banner3Title === null) {
      newerrors.banner3Title = "Banner title required";
      has = true;
    }
    if (
      formData.banner1Description === "" ||
      formData.banner1Description === null
    ) {
      newerrors.banner1Description = "Banner description required";
      has = true;
    }

    if (
      formData.banner2Description === "" ||
      formData.banner2Description === null
    ) {
      newerrors.banner2Description = "Banner description required";
      has = true;
    }
    if (
      formData.banner3Description === "" ||
      formData.banner3Description === null
    ) {
      newerrors.banner3Description = "Banner description required";
      has = true;
    }

    if (formData.banner1Link === "" || formData.banner1Link === null) {
      newerrors.banner1Link = "Banner description required";
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

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full md:h-full md:px-8 px-2 space-y-6"
      >
        {/* Banner 1 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 619px X 578px.</p>
                  <p className="md:mt-4 mt-2">
                    You can edit the Banner title, Description and Call to
                    action in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 12.png"} alt="banner1" />
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
                width={619}
                height={578}
                onImageSelect={handleImageSelect}
              />
              {formData.banner1 && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.banner1)}
                  alt="Image Preview"
                />
              )}
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
                id="banner_title"
                placeholder="Luxe Abundance"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner1Title"
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
                placeholder="15% DISCOUNT ON ALL THE DIAMOND RINGS"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner1Description"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_link"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Link
                <RequiredSymbol />
                {errors.banner1Link && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner1Link}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="banner_link"
                placeholder="https://www.figma.com/design/Bi3Cq4u4JLjcGSXi2"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner1Link"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label
                  htmlFor="coupon"
                  className="md:text-[18px] text-[16px] gilroy-medium"
                >
                  Enable Coupon
                </label>
                <Switch
                  checked={formData.enableTimer}
                  onChange={() => handleSwitchChange("enableCoupon")}
                  aria-label="Enable Coupon"
                />
              </div>
              <div className="w-full md:flex md:gap-4 gap-2 space-y-4 md:space-y-0">
                <div className="w-full space-y-2">
                  <label
                    htmlFor="code"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    Code
                  </label>
                  <Input
                    type="text"
                    id="code"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="code"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full space-y-2">
                  <label
                    htmlFor="add_disc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex justify-between"
                  >
                    Additional Discount
                    <Switch defaultSelected aria-label="Automatic updates" />
                  </label>
                  <Input
                    type="text"
                    id="add_disc"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="additionalDiscount"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner 2 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-[320px] rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center mt-10">
            <div className="w-full">
              <h2 className="lg:text-[22px] text-[18px] font-semibold">
                Guidelines
              </h2>
              <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                <p>The Following Banner Dimensions are 619px X 284px.</p>
                <p className="lg:my-3 my-2">
                  You can edit the Banner title, Description and Call to action
                  in the edit section.
                </p>
              </div>
            </div>
            <div>
              <img src={"/images/image 2.png"} alt="banner2" />
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
                {errors.banner2 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="banner2"
                label="banner image"
                accept={`images/*`}
                width={619}
                height={578}
                onImageSelect={handleImageSelect}
              />
              {formData.banner2 && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.banner2)}
                  alt="Image Preview"
                />
              )}
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
                placeholder="Gemstone name"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner2Title"
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
                placeholder="Gemstone type"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner2Description"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label htmlFor="timer" className="text-[18px] gilroy-medium">
                  Enable Button
                </label>
                <Switch
                  checked={formData.enableTimer}
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
                name="banner2Content"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="button_link1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Button Link
              </label>
              <Input
                type="text"
                id="button_link1"
                placeholder=""
                variant="bordered"
                size="lg"
                radius="sm"
                name="buttonLink1"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-full">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 619px X 284px</p>
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
                htmlFor="banner3"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 3
                <RequiredSymbol />
                {errors.banner3 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner3}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="banner3"
                label="banner image"
                accept={`images/*`}
                width={619}
                height={578}
                onImageSelect={handleImageSelect}
              />
              {formData.banner3 && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.banner3)}
                  alt="Image Preview"
                />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title2"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
                {errors.banner3Title && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner3Title}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="banner_title2"
                placeholder="Gemstone name"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner3Title"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc2"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
                {errors.banner3Description && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner3Description}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="banner_desc2"
                placeholder="Gomstone type"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner3Description"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label htmlFor="timer" className="text-[18px] gilroy-medium">
                  Enable Button
                </label>
                <Switch
                  checked={formData.enableTimer}
                  onChange={() => handleSwitchChange("enableButton")}
                  aria-label="Enable Button"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="btn_content1"
                className="md:text-[18px] text-[16px] gilroy-medium"
              >
                Banner Content
              </label>
              <Input
                type="text"
                id="btn_content1"
                variant="bordered"
                size="lg"
                radius="sm"
                name="banner3Content"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="button_link2"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Button Link
              </label>
              <Input
                type="text"
                id="button_link2"
                placeholder=""
                variant="bordered"
                size="lg"
                radius="sm"
                name="buttonLink2"
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

export default Offers;
