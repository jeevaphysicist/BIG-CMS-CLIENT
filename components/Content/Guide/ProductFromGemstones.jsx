import { Fragment, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import RequiredSymbol from "../RequiredSymbol";
import DragAndDropImage from "../DragDropImage";

const ProductFromGemstones = ({ handleGuide }) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    categoryOneImage: "",
    categoryOneTitle: "",
    categoryOneButtonLink: "",
    categoryTwoImage: "",
    categoryTwoTitle: "",
    categoryTwoButtonLink: "",
    categoryThreeImage: "",
    categoryThreeTitle: "",
    categoryThreeButtonLink: "",
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
    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "Section Title required";
      has = true;
    }
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
      formData.categoryOneButtonLink === "" ||
      formData.categoryOneButtonLink === null
    ) {
      newerrors.categoryOneButtonLink = "Call to Action is required";
      has = true;
    }
    if (
      formData.categoryTwoButtonLink === "" ||
      formData.categoryTwoButtonLink === null
    ) {
      newerrors.categoryTwoButtonLink = "Call to Action is required";
      has = true;
    }
    if (
      formData.categoryThreeButtonLink === "" ||
      formData.categoryThreeButtonLink === null
    ) {
      newerrors.categoryThreeButtonLink = "Call to Action is required";
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
                  <p> The Following Image Dimensions are 233px x 256px</p>
                  <p className="md:mt-5 mt-2">
                    You can edit the Category Image and its details and Call to
                    Action.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/guidepfg.png"} alt="category" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-full overflow-y-auto no-scrollbar mt-5 md:mt-0 ">
            <div className="w-full overflow-y-auto flex flex-col gap-8">
              <div className="flex flex-col  my-3 pt-2 gap-3">
                <label
                  htmlFor="sectionTitle"
                  className="text-[16px]  font-semibold flex gap-1"
                >
                  Section Title
                  <RequiredSymbol />
                  {errors.sectionTitle && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.sectionTitle}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  minRows={4}
                  id="sectionTitle"
                  variant="bordered"
                  placeholder="EMERALD GEMSTONE PRODUCTS"
                  size="lg"
                  radius="sm"
                  name="sectionTitle"
                  onChange={handleFormChange}
                />
              </div>
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
                    {errors.categoryOneButtonLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryOneButtonLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="https://figma.com/design"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryOneButtonLink"
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
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.categoryTwoButtonLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryTwoButtonLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc1"
                    placeholder="https://figma.com/design"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryTwoButtonLink"
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
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.categoryThreeButtonLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.categoryThreeButtonLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc2"
                    placeholder="https://figma.com/design"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="categoryThreeButtonLink"
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
export default ProductFromGemstones;
