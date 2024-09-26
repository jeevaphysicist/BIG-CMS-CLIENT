/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Switch, Textarea } from "@nextui-org/react";
import customImg from "../../../assets/image 16.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { handleHomepageCreateEditSection } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const CustomJewellery = ({
  handleHomepage,
  sectionData,
  fetchData,
  currentSection,
}) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionDescription: "",
    sectionBanner: "",
    bannerIconStatus: "",
    iconOneImage: false,
    iconOneTitle: "",
    iconTwoImage: "",
    iconTwoTitle: "",
    iconThreeImage: "",
    iconThreeTitle: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSwitchChange = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field] == "Inactive" ? "Active" : "Inactive",
    }));
  };

  const handleImageSelect = async (file, width, height, iconkey) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [iconkey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;

    if (formData.sectionBanner === "" || formData.sectionBanner === null) {
      newerrors.sectionBanner = "Banner is required";
      has = true;
    }
    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "Section Title is required";
      has = true;
    }
    if (
      formData.sectionDescription === "" ||
      formData.sectionDescription === null
    ) {
      newerrors.sectionDescription = "Description is required";
      has = true;
    }
    if (formData.iconOneImage === "" || formData.iconOneImage === null) {
      newerrors.iconOneImage = "Icon 1 is required";
      has = true;
    }

    if (formData.iconTwoImage === "" || formData.iconTwoImage === null) {
      newerrors.iconTwoImage = "Icon 2 is required";
      has = true;
    }
    if (formData.iconThreeImage === "" || formData.iconThreeImage === null) {
      newerrors.iconThreeImage = "Icon 3 is required";
      has = true;
    }

    if (formData.iconOneTitle === "" || formData.iconOneTitle === null) {
      newerrors.iconOneTitle = "Icon title is required";
      has = true;
    }

    if (formData.iconTwoTitle === "" || formData.iconTwoTitle === null) {
      newerrors.iconTwoTitle = "Icon title is required";
      has = true;
    }

    if (formData.iconThreeTitle === "" || formData.iconThreeTitle === null) {
      newerrors.iconThreeTitle = "Icon title is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        sectionTitle: sectionData.sectionTitle || "",
        sectionDescription: sectionData.sectionDescription || "",
        sectionBanner: sectionData.sectionBanner || "",
        bannerIconStatus: sectionData.bannerIconStatus || "",
        iconOneImage: sectionData.iconOneImage || false,
        iconOneTitle: sectionData.iconOneTitle || "",
        iconTwoImage: sectionData.iconTwoImage || "",
        iconTwoTitle: sectionData.iconTwoTitle || "",
        iconThreeImage: sectionData.iconThreeImage || "",
        iconThreeTitle: sectionData.iconThreeTitle || "",
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
      const response = await handleHomepageCreateEditSection(bodyData);
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
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="section_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Section Title
                <RequiredSymbol />{" "}
                {errors.sectionTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.sectionTitle}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="Create Your Custom Jwellery"
                variant="bordered"
                size="lg"
                radius="sm"
                name="sectionTitle"
                value={formData.sectionTitle}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="sectionBanner_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Description
                <RequiredSymbol />{" "}
                {errors.sectionDescription && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.sectionDescription}
                  </span>
                )}
              </label>
              <Textarea
                type="text"
                id="sectionBanner_desc"
                placeholder="Dive into our 'Custom Gemstone Jewelry' section, where your unique vision takes center stage. Design personalized masterpieces that tell your story, blending style and sentiment in every handpicked Gemstone"
                variant="bordered"
                size="lg"
                radius="sm"
                name="sectionDescription"
                value={formData.sectionDescription}
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
                    sectionDescription.
                  </p>
                  <p className="md:mt-5 mt-2">
                    You can edit the Content Title, sectionDescription and the
                    icon in the edit section.
                  </p>
                  <h2 className="text-[18px] font-semibold py-2 text-start">
                    sectionBanner
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
            {/* sectionBanner */}
            <div className="w-full flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Section Banner
                    <RequiredSymbol />{" "}
                    {errors.sectionBanner && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.sectionBanner}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="sectionBanner"
                    label="sectionBanner"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.sectionBanner && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.sectionBanner)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="icons" className="text-[18px] gilroy-medium">
                    Enable Icons
                  </label>
                  <Switch
                    isSelected={formData.bannerIconStatus === "Active"}
                    value={formData.bannerIconStatus}
                    onChange={() => handleSwitchChange("bannerIconStatus")}
                    aria-label="Enable Icons"
                  />
                </div>
                {/* Icons form */}

                <div className="space-y-6">
                  {/* Icon 1 */}
                  <div className=" flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="icon"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Icon 1
                        <RequiredSymbol />{" "}
                        {errors.iconOneImage && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconOneImage}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="iconOneImage"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.iconOneImage && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.iconOneImage)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="sectionBanner_title"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.iconOneTitle && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconOneTitle}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="sectionBanner_title"
                        placeholder="Select Gemstone"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="iconOneTitle"
                        value={formData.iconOneTitle}
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
                        <RequiredSymbol />{" "}
                        {errors.iconTwoImage && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconTwoImage}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="iconTwoImage"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.iconTwoImage && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.iconTwoImage)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="sectionBanner_iconTwoTitle"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.iconTwoTitle && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconTwoTitle}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="sectionBanner_iconTwoTitle"
                        placeholder="Pick Semi-mount"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="iconTwoTitle"
                        value={formData.iconTwoTitle}
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
                        <RequiredSymbol />{" "}
                        {errors.iconThreeImage && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconThreeImage}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="iconThreeImage"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.iconThreeImage && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.iconThreeImage)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="sectionBanner_iconThreeTitle"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.iconThreeTitle && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconThreeTitle}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="sectionBanner_iconThreeTitle"
                        placeholder="Place Order"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="iconThreeTitle"
                        value={formData.iconThreeTitle}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
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

export default CustomJewellery;
