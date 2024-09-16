/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Switch, Textarea } from "@nextui-org/react";
import customImg from "../../../assets/image 16.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";

const CustomJewellery = ({ handleHomepage }) => {
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

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

    if (formData.banner === "" || formData.banner === null) {
      newerrors.banner = "Banner is required";
      has = true;
    }
    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "Section Title is required";
      has = true;
    }
    if (formData.description === "" || formData.description === null) {
      newerrors.description = "Description is required";
      has = true;
    }
    if (formData.icon1 === "" || formData.icon1 === null) {
      newerrors.icon1 = "Icon 1 is required";
      has = true;
    }

    if (formData.icon2 === "" || formData.icon2 === null) {
      newerrors.icon2 = "Icon 2 is required";
      has = true;
    }
    if (formData.icon3 === "" || formData.icon3 === null) {
      newerrors.icon3 = "Icon 3 is required";
      has = true;
    }

    if (formData.title1 === "" || formData.title1 === null) {
      newerrors.title1 = "Icon title is required";
      has = true;
    }

    if (formData.title2 === "" || formData.title2 === null) {
      newerrors.title2 = "Icon title is required";
      has = true;
    }

    if (formData.title3 === "" || formData.title3 === null) {
      newerrors.title3 = "Icon title is required";
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
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Description
                <RequiredSymbol />{" "}
                {errors.description && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.description}
                  </span>
                )}
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
                    <RequiredSymbol />{" "}
                    {errors.banner && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.banner}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="banner"
                    label="banner"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.banner && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.banner)}
                      alt="Image Preview"
                    />
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
                        {errors.icon1 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.icon1}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="icon1"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.icon1 && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.icon1)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="banner_title"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.title1 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.title1}
                          </span>
                        )}
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
                        <RequiredSymbol />{" "}
                        {errors.icon2 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.icon2}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="icon2"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.icon2 && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.icon2)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="banner_title2"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.title2 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.title2}
                          </span>
                        )}
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
                        <RequiredSymbol />{" "}
                        {errors.icon3 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.icon3}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="icon3"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.icon3 && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.icon3)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="banner_title3"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.title3 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.title3}
                          </span>
                        )}
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
