/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const Categories = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState({
    category1: "",
    category2: "",
    category3: "",
    category4: "",
    category5: "",
  });

  const [formData, setFormData] = useState({
    category1: "",
    Title1: "",
    callToAction1: "",
    category2: "",
    Title2: "",
    callToAction2: "",
    category3: "",
    Title3: "",
    callToAction3: "",
    category4: "",
    Title4: "",
    callToAction4: "",
    category5: "",
    Title5: "",
    callToAction5: "",
  });

  // Handle form input changes for text fields
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image selection and store it directly in formData
  const handleImageSelect = (file, categoryKey) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview((prev) => ({ ...prev, [categoryKey]: blobUrl }));
      setFormData((prev) => ({ ...prev, [categoryKey]: file }));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  </label>
                  <DragAndDropImage
                    id="category1"
                    onImageSelect={(file) =>
                      handleImageSelect(file, "category1")
                    }
                  />
                  {imagePreview.category1 && (
                    <img src={imagePreview.category1} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
                  </label>
                  <DragAndDropImage
                    id="category2"
                    onImageSelect={(file) =>
                      handleImageSelect(file, "category2")
                    }
                  />
                  {imagePreview.category2 && (
                    <img src={imagePreview.category2} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
                  </label>
                  <DragAndDropImage
                    id="category3"
                    onImageSelect={(file) =>
                      handleImageSelect(file, "category3")
                    }
                  />
                  {imagePreview.category3 && (
                    <img src={imagePreview.category3} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
                  </label>
                  <DragAndDropImage
                    id="category4"
                    onImageSelect={(file) =>
                      handleImageSelect(file, "category4")
                    }
                  />
                  {imagePreview.category4 && (
                    <img src={imagePreview.category4} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
                  </label>
                  <DragAndDropImage
                    id="category5"
                    onImageSelect={(file) =>
                      handleImageSelect(file, "category5")
                    }
                  />
                  {imagePreview.category5 && (
                    <img src={imagePreview.category5} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title4"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
