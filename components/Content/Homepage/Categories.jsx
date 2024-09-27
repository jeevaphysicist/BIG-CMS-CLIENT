/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleHomepageCreateEditSection } from "@/API/api";
import { FormateImageURL } from "@/lib/FormateImageURL";

const Categories = ({
  handleHomepage,
  sectionData,
  fetchData,
  currentSection,
}) => {
  const [formData, setFormData] = useState({
    categoryOneImage: "",
    categoryOneTitle: "",
    categoryOneButton: "",
    categoryOneLink: "",
    categoryTwoImage: "",
    categoryTwoTitle: "",
    categoryTwoButton: "",
    categoryTwoLink: "",
    categoryThreeImage: "",
    categoryThreeTitle: "",
    categoryThreeButton: "",
    categoryThreeLink: "",
    categoryFourImage: "",
    categoryFourTitle: "",
    categoryFourButton: "",
    categoryFourLink: "",
    categoryFiveImage: "",
    categoryFiveTitle: "",
    categoryFiveButton: "",
    categoryFiveLink: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, categorykey) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [categorykey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (
      formData.categoryOneImage === "" ||
      formData.categoryOneImage === null
    ) {
      newerrors.categoryOneImage = "Category 1 required";
      has = true;
    }
    if (
      formData.categoryTwoImage === "" ||
      formData.categoryTwoImage === null
    ) {
      newerrors.categoryTwoImage = "Category 2 required";
      has = true;
    }
    if (
      formData.categoryThreeImage === "" ||
      formData.categoryThreeImage === null
    ) {
      newerrors.categoryThreeImage = "Category 3 required";
      has = true;
    }
    if (
      formData.categoryFourImage === "" ||
      formData.categoryFourImage === null
    ) {
      newerrors.categoryFourImage = "Category 4 required";
      has = true;
    }
    if (
      formData.categoryFiveImage === "" ||
      formData.categoryFiveImage === null
    ) {
      newerrors.categoryFiveImage = "Category 4 required";
      has = true;
    }
    if (
      formData.categoryOneTitle === "" ||
      formData.categoryOneTitle === null
    ) {
      newerrors.categoryOneTitle = "Title is required";
      has = true;
    }
    if (
      formData.categoryTwoTitle === "" ||
      formData.categoryTwoTitle === null
    ) {
      newerrors.categoryTwoTitle = "Title is required";
      has = true;
    }
    if (
      formData.categoryThreeTitle === "" ||
      formData.categoryThreeTitle === null
    ) {
      newerrors.categoryThreeTitle = "Title is required";
      has = true;
    }
    if (
      formData.categoryFourTitle === "" ||
      formData.categoryFourTitle === null
    ) {
      newerrors.categoryFourTitle = "Title is required";
      has = true;
    }
    if (
      formData.categoryFiveTitle === "" ||
      formData.categoryFiveTitle === null
    ) {
      newerrors.categoryFiveTitle = "Title is required";
      has = true;
    }
    if (
      formData.categoryOneButton === "" ||
      formData.categoryOneButton === null
    ) {
      newerrors.categoryOneButton = "Call to Action is required";
      has = true;
    }
    if (
      formData.categoryTwoButton === "" ||
      formData.categoryTwoButton === null
    ) {
      newerrors.categoryTwoButton = "Call to Action is required";
      has = true;
    }
    if (
      formData.categoryThreeButton === "" ||
      formData.categoryThreeButton === null
    ) {
      newerrors.categoryThreeButton = "Call to Action is required";
      has = true;
    }
    if (
      formData.categoryFourButton === "" ||
      formData.categoryFourButton === null
    ) {
      newerrors.categoryFourButton = "Call to Action is required";
      has = true;
    }
    if (
      formData.categoryFiveButton === "" ||
      formData.categoryFiveButton === null
    ) {
      newerrors.categoryFiveButton = "Call to Action is required";
      has = true;
    }
    if (formData.categoryOneLink === "" || formData.categoryOneLink === null) {
      newerrors.categoryOneLink = "Call to Action Link is required";
      has = true;
    }
    if (formData.categoryTwoLink === "" || formData.categoryTwoLink === null) {
      newerrors.categoryTwoLink = "Call to Action Link is required";
      has = true;
    }
    if (
      formData.categoryThreeLink === "" ||
      formData.categoryThreeLink === null
    ) {
      newerrors.categoryThreeLink = "Call to Action Link is required";
      has = true;
    }
    if (
      formData.categoryFourLink === "" ||
      formData.categoryFourLink === null
    ) {
      newerrors.categoryFourLink = "Call to Action Link is required";
      has = true;
    }
    if (
      formData.categoryFiveLink === "" ||
      formData.categoryFiveLink === null
    ) {
      newerrors.categoryFiveLink = "Call to Action Link is required";
      has = true;
    }
    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        categoryOneImage: sectionData.categoryOneImage || "",
        categoryOneTitle: sectionData.categoryOneTitle || "",
        categoryOneLink: sectionData.categoryOneLink || "",
        categoryTwoImage: sectionData.categoryTwoImage || "",
        categoryTwoTitle: sectionData.categoryTwoTitle || "",
        categoryTwoLink: sectionData.categoryTwoLink || "",
        categoryThreeImage: sectionData.categoryThreeImage || "",
        categoryThreeTitle: sectionData.categoryThreeTitle || "",
        categoryThreeLink: sectionData.categoryThreeLink || "",
        categoryFourImage: sectionData.categoryFourImage || "",
        categoryFourTitle: sectionData.categoryFourTitle || "",
        categoryFourLink: sectionData.categoryFourLink || "",
        categoryFiveImage: sectionData.categoryFiveImage || "",
        categoryFiveTitle: sectionData.categoryFiveTitle || "",
        categoryFiveLink: sectionData.categoryFiveLink || "",
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
      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="w-full md:px-8 px-2 h-full  md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Image Dimensions are 233px X 256px.</p>
                  <p className="md:mt-5 mt-2">
                    You can edit the Category Image and its details and call to
                    Action.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 3.png"} alt="category" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-full overflow-y-auto no-scrollbar mt-5 md:mt-0 ">
            <div className="w-full overflow-y-auto flex flex-col gap-8">
              {/* Category 1 */}
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 1
                    <RequiredSymbol />
                    {errors.categoryOneImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryOneImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="categoryOneImage"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.categoryOneImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.categoryOneImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.categoryOneTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryOneTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_title"
                    placeholder="Gemstones"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryOneTitle"
                    value={formData.categoryOneTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.categoryOneButton && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryOneButton}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="Explore"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryOneButton"
                    value={formData.categoryOneButton}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action Link
                    <RequiredSymbol />
                    {errors.categoryOneLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryOneLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="Explore"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryOneLink"
                    value={formData.categoryOneLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Category 2 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor=""
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 2
                    <RequiredSymbol />
                    {errors.categoryTwoImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryTwoImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="categoryTwoImage"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.categoryTwoImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.categoryTwoImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_categoryOneTitle"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.categoryTwoTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryTwoTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_categoryOneTitle"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryTwoTitle"
                    value={formData.categoryTwoTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.categoryTwoButton && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryTwoButton}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="Explore"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryTwoButton"
                    value={formData.categoryTwoButton}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action Link
                    <RequiredSymbol />
                    {errors.categoryTwoLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryTwoLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc1"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryTwoLink"
                    value={formData.categoryTwoLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* category 3 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor=""
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 3
                    <RequiredSymbol />
                    {errors.categoryThreeImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryThreeImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="categoryThreeImage"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.categoryThreeImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.categoryThreeImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_categoryTwoTitle"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.categoryThreeTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryThreeTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_categoryTwoTitle"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryThreeTitle"
                    value={formData.categoryThreeTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.categoryThreeButton && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryThreeButton}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="Explore"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryThreeButton"
                    value={formData.categoryThreeButton}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action Link
                    <RequiredSymbol />
                    {errors.categoryThreeLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryThreeLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc2"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryThreeLink"
                    value={formData.categoryThreeLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* category 4 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 4
                    <RequiredSymbol />
                    {errors.categoryFourImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFourImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="categoryFourImage"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.categoryFourImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.categoryFourImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_categoryThreeTitle"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.categoryFourTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFourTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_categoryThreeTitle"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryFourTitle"
                    value={formData.categoryFourTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.categoryFourButton && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFourButton}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="Explore"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryFourButton"
                    value={formData.categoryFourButton}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action Link
                    <RequiredSymbol />
                    {errors.categoryFourLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFourLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc3"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryFourLink"
                    value={formData.categoryFourLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              {/* category 5 */}

              <div className=" flex flex-col gap-4 mb-5">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 5
                    <RequiredSymbol />
                    {errors.categoryFiveImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFiveImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="categoryFiveImage"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.categoryFiveImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.categoryFiveImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_categoryFourTitle"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.categoryFiveTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFiveTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_categoryFourTitle"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryFiveTitle"
                    value={formData.categoryFiveTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.categoryFiveButton && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFiveButton}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="Explore"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryFiveButton"
                    value={formData.categoryFiveButton}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc4"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action Link
                    <RequiredSymbol />
                    {errors.categoryFiveLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryFiveLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc4"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryFiveLink"
                    value={formData.categoryFiveLink}
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
export default Categories;
