/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../Content/DragDropImage";
import { Button, Input, Switch, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../Content/RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";

const HowItWorks = ({ handleCustomJeweleryPage }) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    icon1: "",
    description1: "",
    icon2: "",
    description2: "",
    icon3: "",
    description3: "",
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

    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "Section Title is required";
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

    if (formData.description1 === "" || formData.description1 === null) {
      newerrors.description1 = "Icon description is required";
      has = true;
    }

    if (formData.description2 === "" || formData.description2 === null) {
      newerrors.description2 = "Icon description is required";
      has = true;
    }

    if (formData.description3 === "" || formData.description3 === null) {
      newerrors.description3 = "Icon description is required";
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
      <form onSubmit={handleSubmit} className="w-full md:h-full md:px-8 px-2">
        <div className="w-full flex flex-col sticky top-52 z-30 bg-white py-2">
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
              placeholder="How Does it Work"
              variant="bordered"
              size="md"
              radius="sm"
              name="sectionTitle"
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="w-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] py-3">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px] space-y-2">
                  <p>
                    This is a Content box that contains Icon, Description and a
                    number.
                  </p>
                  <p className="">
                    You can edit the Content Title and the icon in the edit
                    section. The Numbers would remain the same
                  </p>
                  <div className="w-full py-2 flex items-center justify-center">
                    <img
                      src={"/images/image 23.png"}
                      alt="content"
                      className="w-64"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-[52vh] overflow-y-auto no-scrollbar py-4 md:py-4">
            <div className="w-full flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
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
                        htmlFor="description1"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Description
                        <RequiredSymbol />{" "}
                        {errors.description1 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.description1}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="description1"
                        placeholder="Choose a semi-mount to complement and showcase your selected gemstone."
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="description1"
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
                        htmlFor="description2"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Description
                        <RequiredSymbol />{" "}
                        {errors.description2 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.description2}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="description2"
                        placeholder="Choose a semi-mount to complement and showcase your selected gemstone."
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="description2"
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
                        htmlFor="description3"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Description
                        <RequiredSymbol />{" "}
                        {errors.description3 && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.description3}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="description3"
                        placeholder="Choose a semi-mount to complement and showcase your selected gemstone."
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="description3"
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
            onClick={handleCustomJeweleryPage}
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

export default HowItWorks;
