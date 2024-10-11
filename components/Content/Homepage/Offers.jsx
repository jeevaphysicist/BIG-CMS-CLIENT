import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Switch } from "@nextui-org/react";
import bannerOneImage from "../../../assets/image 12.png";
import bannerTwoImage from "../../../assets/image 2.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { handleHomepageCreateEditSection } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const Offers = ({ handleHomepage, sectionData, fetchData, currentSection }) => {
  const [formData, setFormData] = useState({
    bannerOneImage: "",
    bannerOneTitle: "",
    bannerOneDescription: "",
    bannerOneLink: "",
    bannerOneCouponStatus: false,
    bannerOneCouponCode: "",
    bannerOneAdditionalDiscount: "",
    bannerOneAdditionalDiscountButttonStatus: false,
    bannerTwoImage: "",
    bannerTwoTitle: "",
    bannerTwoDescription: "",
    bannerTwoButtonStatus: false,
    bannerTwoButtonContent: "",
    bannerTwoButtonLink: "",
    bannerThreeImage: "",
    bannerThreeTitle: "",
    bannerThreeDescription: "",
    bannerThreeButtonStatus: false,
    bannerThreeButtonContent: "",
    bannerThreeButtonLink: "",
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
      [field]: prevData[field] == "Inactive" ? "Active" : "Inactive",
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
    if (formData.bannerOneImage === "" || formData.bannerOneImage === null) {
      newerrors.bannerOneImage = "Banner 1 required";
      has = true;
    }
    if (formData.bannerTwoImage === "" || formData.bannerTwoImage === null) {
      newerrors.bannerTwoImage = "Banner 2 required";
      has = true;
    }
    if (
      formData.bannerThreeImage === "" ||
      formData.bannerThreeImage === null
    ) {
      newerrors.bannerThreeImage = "Banner 3 required";
      has = true;
    }
    if (formData.bannerOneTitle === "" || formData.bannerOneTitle === null) {
      newerrors.bannerOneTitle = "Banner title required";
      has = true;
    }
    if (formData.bannerTwoTitle === "" || formData.bannerTwoTitle === null) {
      newerrors.bannerTwoTitle = "Banner title required";
      has = true;
    }
    if (
      formData.bannerThreeTitle === "" ||
      formData.bannerThreeTitle === null
    ) {
      newerrors.bannerThreeTitle = "Banner title required";
      has = true;
    }
    if (
      formData.bannerOneDescription === "" ||
      formData.bannerOneDescription === null
    ) {
      newerrors.bannerOneDescription = "Banner description required";
      has = true;
    }

    if (
      formData.bannerTwoDescription === "" ||
      formData.bannerTwoDescription === null
    ) {
      newerrors.bannerTwoDescription = "Banner description required";
      has = true;
    }
    if (
      formData.bannerThreeDescription === "" ||
      formData.bannerThreeDescription === null
    ) {
      newerrors.bannerThreeDescription = "Banner description required";
      has = true;
    }

    if (formData.bannerOneLink === "" || formData.bannerOneLink === null) {
      newerrors.bannerOneLink = "Banner description required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        bannerOneImage: sectionData.bannerOneImage || "",
        bannerOneTitle: sectionData.bannerOneTitle || "",
        bannerOneDescription: sectionData.bannerOneDescription || "",
        bannerOneLink: sectionData.bannerOneLink || "",
        bannerOneCouponStatus: sectionData.bannerOneCouponStatus || false,
        bannerOneCouponCode: sectionData.bannerOneCouponCode || "",
        bannerOneAdditionalDiscount:
          sectionData.bannerOneAdditionalDiscount || "",
        bannerOneAdditionalDiscountButttonStatus:
          sectionData.bannerOneAdditionalDiscountButttonStatus || false,
        bannerTwoImage: sectionData.bannerTwoImage || "",
        bannerTwoTitle: sectionData.bannerTwoTitle || "",
        bannerTwoDescription: sectionData.bannerTwoDescription || "",
        bannerTwoButtonStatus: sectionData.bannerTwoButtonStatus || false,
        bannerTwoButtonContent: sectionData.bannerTwoButtonContent || "",
        bannerTwoButtonLink: sectionData.bannerTwoButtonLink || "",
        bannerThreeImage: sectionData.bannerThreeImage || "",
        bannerThreeTitle: sectionData.bannerThreeTitle || "",
        bannerThreeDescription: sectionData.bannerThreeDescription || "",
        bannerThreeButtonStatus: sectionData.bannerThreeButtonStatus || false,
        bannerThreeButtonContent: sectionData.bannerThreeButtonContent || "",
        bannerThreeButtonLink: sectionData.bannerThreeButtonLink || "",
        moduleId: sectionData.moduleId || null,
      });
    }
  }, [sectionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let bodyData = {
      contents: formData,
      moduleSlug: currentSection.moduleSlug,
      moduleName: currentSection.moduleName,
      sectionSlug: currentSection.sectionSlug,
      sectionName: currentSection.sectionName,
      pageName: currentSection.moduleName,
      pageSlug: currentSection.moduleSlug,
    };

    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);
      const response = await handleHomepageCreateEditSection(bodyData,true);
      if (response.status >= 200 && response.status <= 209) {
        let data = response.data;
        toast.success(response.data.message);
        fetchData();
      }
    } catch (error) {
      toast.error(response.data.message);
    } finally {
      setLoading(false);
    }
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
                <img src={"/images/image 12.png"} alt="bannerOneImage" />
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
                {errors.bannerOneImage && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerOneImage}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="bannerOneImage"
                label="banner image"
                accept={`images/*`}
                width={619}
                height={578}
                onImageSelect={handleImageSelect}
              />
              {formData.bannerOneImage && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.bannerOneImage)}
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
                {errors.bannerOneTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerOneTitle}
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
                name="bannerOneTitle"
                value={formData.bannerOneTitle}
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
                {errors.bannerOneDescription && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerOneDescription}
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
                name="bannerOneDescription"
                value={formData.bannerOneDescription}
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
                {errors.bannerOneLink && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerOneLink}
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
                name="bannerOneLink"
                value={formData.bannerOneLink}
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
                  isSelected={formData.bannerOneCouponStatus === "Active"}
                  value={formData.bannerOneCouponStatus}
                  onChange={() => handleSwitchChange("bannerOneCouponStatus")}
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
                    name="bannerOneCouponCode"
                    value={formData.bannerOneCouponCode}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full space-y-2">
                  <label
                    htmlFor="add_disc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex justify-between"
                  >
                    Additional Discount
                    <Switch
                      isSelected={
                        formData.bannerOneAdditionalDiscountButttonStatus ===
                        "Active"
                      }
                      value={formData.bannerOneAdditionalDiscountButttonStatus}
                      onChange={() =>
                        handleSwitchChange(
                          "bannerOneAdditionalDiscountButttonStatus"
                        )
                      }
                      aria-label="Enable Additional Discount"
                    />
                  </label>
                  <Input
                    type="text"
                    id="add_disc"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="bannerOneAdditionalDiscount"
                    value={formData.bannerOneAdditionalDiscount}
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
              <img src={"/images/image 2.png"} alt="bannerTwoImage" />
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
                {errors.bannerTwoImage && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerTwoImage}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="bannerTwoImage"
                label="banner image"
                accept={`images/*`}
                width={619}
                height={578}
                onImageSelect={handleImageSelect}
              />
              {formData.bannerTwoImage && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.bannerTwoImage)}
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
                {errors.bannerTwoTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerTwoTitle}
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
                name="bannerTwoTitle"
                value={formData.bannerTwoTitle}
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
                {errors.bannerTwoDescription && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerTwoDescription}
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
                name="bannerTwoDescription"
                value={formData.bannerTwoDescription}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label htmlFor="timer" className="text-[18px] gilroy-medium">
                  Enable Button
                </label>
                <Switch
                  isSelected={formData.bannerTwoButtonStatus === "Active"}
                  value={formData.bannerTwoButtonStatus}
                  onChange={() => handleSwitchChange("bannerTwoButtonStatus")}
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
                name="bannerTwoButtonContent"
                value={formData.bannerTwoButtonContent}
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
                name="bannerTwoButtonLink"
                value={formData.bannerTwoButtonLink}
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
                <img src={"/images/image 2.png"} alt="bannerTwoImage" />
              </div>
            </div>
          </div>
          <div className="md:w-[60%] flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="bannerThreeImage"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 3
                <RequiredSymbol />
                {errors.bannerThreeImage && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerThreeImage}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="bannerThreeImage"
                label="banner image"
                accept={`images/*`}
                width={619}
                height={578}
                onImageSelect={handleImageSelect}
              />
              {formData.bannerThreeImage && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.bannerThreeImage)}
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
                {errors.bannerThreeTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerThreeTitle}
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
                name="bannerThreeTitle"
                value={formData.bannerThreeTitle}
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
                {errors.bannerThreeDescription && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.bannerThreeDescription}
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
                name="bannerThreeDescription"
                value={formData.bannerThreeDescription}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label htmlFor="timer" className="text-[18px] gilroy-medium">
                  Enable Button
                </label>
                <Switch
                  isSelected={formData.bannerThreeButtonStatus === "Active"}
                  value={formData.bannerThreeButtonStatus}
                  onChange={() => handleSwitchChange("bannerThreeButtonStatus")}
                  aria-label="Enable Button"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="btn_content1"
                className="md:text-[18px] text-[16px] gilroy-medium"
              >
                Button Content
              </label>
              <Input
                type="text"
                id="btn_content1"
                variant="bordered"
                size="lg"
                radius="sm"
                name="bannerThreeButtonContent"
                value={formData.bannerThreeButtonContent}
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
                name="bannerThreeButtonLink"
                value={formData.bannerThreeButtonLink}
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
            className="font-semibold text-white disabled:opacity-40 disabled:cursor-wait"
            startContent={loading ? null : <FiSave size={20} />}
            isLoading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Offers;
