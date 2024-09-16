/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";

const Categories = ({ handleHomepage }) => {
  const [formData, setFormData] = useState({
    category1: "",
    title1: "",
    callToAction1: "",
    category2: "",
    title2: "",
    callToAction2: "",
    category3: "",
    title3: "",
    callToAction3: "",
    category4: "",
    title4: "",
    callToAction4: "",
    category5: "",
    title5: "",
    callToAction5: "",
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
    if (formData.category1 === "" || formData.category1 === null) {
      newerrors.category1 = "Category 1 required";
      has = true;
    }
    if (formData.category2 === "" || formData.category2 === null) {
      newerrors.category2 = "Category 2 required";
      has = true;
    }
    if (formData.category3 === "" || formData.category3 === null) {
      newerrors.category3 = "Category 3 required";
      has = true;
    }
    if (formData.category4 === "" || formData.category4 === null) {
      newerrors.category4 = "Category 4 required";
      has = true;
    }
    if (formData.category5 === "" || formData.category5 === null) {
      newerrors.category5 = "Category 4 required";
      has = true;
    }
    if (formData.title1 === "" || formData.title1 === null) {
      newerrors.title1 = "Title is required";
      has = true;
    }
    if (formData.title2 === "" || formData.title2 === null) {
      newerrors.title2 = "Title is required";
      has = true;
    }
    if (formData.title3 === "" || formData.title3 === null) {
      newerrors.title3 = "Title is required";
      has = true;
    }
    if (formData.title4 === "" || formData.title4 === null) {
      newerrors.title4 = "Title is required";
      has = true;
    }
    if (formData.title5 === "" || formData.title5 === null) {
      newerrors.title5 = "Title is required";
      has = true;
    }
    if (formData.callToAction1 === "" || formData.callToAction1 === null) {
      newerrors.callToAction1 = "Call to Action is required";
      has = true;
    }
    if (formData.callToAction2 === "" || formData.callToAction2 === null) {
      newerrors.callToAction2 = "Call to Action is required";
      has = true;
    }
    if (formData.callToAction3 === "" || formData.callToAction3 === null) {
      newerrors.callToAction3 = "Call to Action is required";
      has = true;
    }
    if (formData.callToAction4 === "" || formData.callToAction4 === null) {
      newerrors.callToAction4 = "Call to Action is required";
      has = true;
    }
    if (formData.callToAction5 === "" || formData.callToAction5 === null) {
      newerrors.callToAction5 = "Call to Action is required";
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
                    {errors.category1 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.category1}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="category1"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                 {formData.category1 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.category1 )} alt="Image Preview" />}

                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title1 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title1}
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
                    name="Title1"
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
                    {errors.callToAction1 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.callToAction1}
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
                    name="callToAction1"
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
                    {errors.category2 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.category2}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="category2"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                 {formData.category2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.category2 )} alt="Image Preview" />}

                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title2 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title2}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_title1"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="Title2"
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
                    {errors.callToAction2 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.callToAction2}
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
                    name="callToAction2"
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
                    {errors.category3 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.category3}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="category3"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                 {formData.category3 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.category3 )} alt="Image Preview" />}

                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title3 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title3}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_title2"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="Title3"
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
                    {errors.callToAction3 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.callToAction3}
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
                    name="callToAction3"
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
                    {errors.category4 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.category4}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="category4"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                 {formData.category4 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.category4 )} alt="Image Preview" />}

                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title4 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title4}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_title3"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="Title4"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.callToAction4 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.callToAction4}
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
                    name="callToAction4"
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
                    {errors.category5 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.category5}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="category5"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                 {formData.category5 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.category5 )} alt="Image Preview" />}

                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title4"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title5 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title5}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_title4"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="Title5"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc4"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action
                    <RequiredSymbol />
                    {errors.callToAction5 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.callToAction5}
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
                    name="callToAction5"
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
export default Categories;
