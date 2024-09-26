/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleHomepageCreateEditSection } from "@/API/api";

const ContentBox = ({
  handleHomepage,
  sectionData,
  fetchData,
  currentSection,
}) => {
  const [formData, setFormData] = useState({
    iconOne: "",
    iconOneTitle: "",
    iconOneDescription: "",
    iconTwo: "",
    iconTwoTitle: "",
    iconTwoDescription: "",
    iconThree: "",
    iconThreeTitle: "",
    iconThreeDescription: "",
    iconFour: "",
    iconFourTitle: "",
    iconFourDescription: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // console.log("content box current", currentSection);

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
    if (formData.iconOne === "" || formData.iconOne === null) {
      newerrors.iconOne = "Icon 1 required";
      has = true;
    }
    if (formData.iconTwo === "" || formData.iconTwo === null) {
      newerrors.iconTwo = "Icon 2 required";
      has = true;
    }
    if (formData.iconThree === "" || formData.iconThree === null) {
      newerrors.iconThree = "Icon 3 required";
      has = true;
    }
    if (formData.iconFour === "" || formData.iconFour === null) {
      newerrors.iconFour = "Icon 4 required";
      has = true;
    }
    if (formData.iconOneTitle === "" || formData.iconOneTitle === null) {
      newerrors.iconOneTitle = "Icon title required";
      has = true;
    }
    if (
      formData.iconOneDescription === "" ||
      formData.iconOneDescription === null
    ) {
      newerrors.iconOneDescription = "Icon description required";
      has = true;
    }
    if (formData.iconTwoTitle === "" || formData.iconTwoTitle === null) {
      newerrors.iconTwoTitle = "Icon title required";
      has = true;
    }
    if (
      formData.iconTwoDescription === "" ||
      formData.iconTwoDescription === null
    ) {
      newerrors.iconTwoDescription = "Icon description required";
      has = true;
    }
    if (formData.iconThreeTitle === "" || formData.iconThreeTitle === null) {
      newerrors.iconThreeTitle = "Icon title required";
      has = true;
    }
    if (
      formData.iconThreeDescription === "" ||
      formData.iconThreeDescription === null
    ) {
      newerrors.iconThreeDescription = "Icon description required";
      has = true;
    }
    if (formData.iconFourTitle === "" || formData.iconFourTitle === null) {
      newerrors.iconFourTitle = "Icon title required";
      has = true;
    }
    if (
      formData.iconFourDescription === "" ||
      formData.iconFourDescription === null
    ) {
      newerrors.iconFourDescription = "Icon description required";
      has = true;
    }
    setError(newerrors);
    return has;
  };

  useEffect(() => {
    console.log("section Data", sectionData);
    if (sectionData) {
      setFormData({
        ...formData,
        iconOne: sectionData.iconOne || "",
        iconOneTitle: sectionData.iconOneTitle || "",
        iconOneDescription: sectionData.iconOneDescription || "",
        iconTwo: sectionData.iconTwo || "",
        iconTwoTitle: sectionData.iconTwoTitle || "",
        iconTwoDescription: sectionData.iconTwoDescription || "",
        iconThree: sectionData.iconThree || "",
        iconThreeTitle: sectionData.iconThreeTitle || "",
        iconThreeDescription: sectionData.iconThreeDescription || "",
        iconFour: sectionData.iconFour || "",
        iconFourTitle: sectionData.iconFourTitle || "",
        iconFourDescription: sectionData.iconFourDescription || "",
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
      moduleSlug: "homepage",
      moduleName: "HomePage",
      sectionSlug: currentSection.sectionSlug,
      sectionName: "ContentBox",
      pageName: "Homepage",
      pageSlug: "homepage",
    };
    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);
      const response = await handleHomepageCreateEditSection(bodyData);
      if (response.status >= 200 && response.status <= 209) {
        let data = response.data;
        // console.log("returm data", data);
        toast.success(response.data.message);
        fetchData();
      }
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="w-full md:h-[65vh]">
        <div className="w-full md:px-8  px-2  h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full sticky">
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
                    You can edit the Content title, Description and the icon in
                    the edit section.
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <img
                  src={"/images/image 4.png"}
                  alt="content"
                  className="w-[55%]"
                />
                <img
                  src={"/images/content2.svg"}
                  alt="content2"
                  className="w-[35%]"
                />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-full overflow-y-auto no-scrollbar mt-5 md:mt-0">
            <div className="w-full overflow-y-auto flex flex-col gap-8">
              {/* Icon 1 */}
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Icon 1
                    <RequiredSymbol />
                    {errors.iconOne && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconOne}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="iconOne"
                    label="icon"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.iconOne && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.iconOne)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title"
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
                    id="icon_title"
                    placeholder="Engagement Rings"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconOneTitle"
                    value={formData.iconOneTitle}
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
                    {errors.iconOneDescription && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconOneDescription}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="banner_desc"
                    placeholder="Start the journey toward finding your perfect ring"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconOneDescription"
                    value={formData.iconOneDescription}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Icon 2 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor=""
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Icon 2
                    <RequiredSymbol />
                    {errors.iconTwo && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconTwo}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="iconTwo"
                    label="icon"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.iconTwo && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.iconTwo)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="banner_title1"
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
                    id="banner_title1"
                    placeholder="Valentines Day"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconTwoTitle"
                    value={formData.iconTwoTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="banner_desc1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Description
                    <RequiredSymbol />
                    {errors.iconTwoDescription && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconTwoDescription}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="banner_desc1"
                    placeholder="Enjoy the added benefit of obtaining free shipping within United"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconTwoDescription"
                    value={formData.iconTwoDescription}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Icon 3 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor=""
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Icon 3
                    <RequiredSymbol />
                    {errors.iconThree && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconThree}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="iconThree"
                    label="icon"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.iconThree && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.iconThree)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title2"
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
                    id="icon_title2"
                    placeholder="Valentines Day"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconThreeTitle"
                    value={formData.iconThreeTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_desc2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Description
                    <RequiredSymbol />
                    {errors.iconThreeDescription && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconThreeDescription}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="icon_desc2"
                    placeholder="Enjoy the added benefit of obtaining free shipping within United"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconThreeDescription"
                    value={formData.iconThreeDescription}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Icon 4 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Icon 4
                    <RequiredSymbol />
                    {errors.iconFour && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconFour}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="iconFour"
                    label="icon"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.iconFour && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.iconFour)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />{" "}
                    {errors.iconFourTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconFourTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="icon_title3"
                    placeholder="Valentines Day"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconFourTitle"
                    value={formData.iconFourTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_desc3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Description
                    <RequiredSymbol />
                    {errors.iconFourDescription && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.iconFourDescription}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="icon_desc3"
                    placeholder="Enjoy the added benefit of obtaining free shipping within United"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="iconFourDescription"
                    value={formData.iconFourDescription}
                    onChange={handleFormChange}
                  />
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

export default ContentBox;
