/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";

const ContentBox = ({ handleHomepage }) => {
  const [formData, setFormData] = useState({
    icon1: "",
    icon1Title: "",
    icon1Description: "",
    icon2: "",
    icon2Title: "",
    icon2Description: "",
    icon3: "",
    icon3Title: "",
    icon3Description: "",
    icon4: "",
    icon4Title: "",
    icon4Description: "",
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
    if (formData.icon1 === "" || formData.icon1 === null) {
      newerrors.icon1 = "Icon 1 required";
      has = true;
    }
    if (formData.icon2 === "" || formData.icon2 === null) {
      newerrors.icon2 = "Icon 2 required";
      has = true;
    }
    if (formData.icon3 === "" || formData.icon3 === null) {
      newerrors.icon3 = "Icon 3 required";
      has = true;
    }
    if (formData.icon4 === "" || formData.icon4 === null) {
      newerrors.icon4 = "Icon 4 required";
      has = true;
    }
    if (formData.icon1Title === "" || formData.icon1Title === null) {
      newerrors.icon1Title = "Icon title required";
      has = true;
    }
    if (
      formData.icon1Description === "" ||
      formData.icon1Description === null
    ) {
      newerrors.icon1Description = "Icon description required";
      has = true;
    }
    if (formData.icon2Title === "" || formData.icon2Title === null) {
      newerrors.icon2Title = "Icon title required";
      has = true;
    }
    if (
      formData.icon2Description === "" ||
      formData.icon2Description === null
    ) {
      newerrors.icon2Description = "Icon description required";
      has = true;
    }
    if (formData.icon3Title === "" || formData.icon3Title === null) {
      newerrors.icon3Title = "Icon title required";
      has = true;
    }
    if (
      formData.icon3Description === "" ||
      formData.icon3Description === null
    ) {
      newerrors.icon3Description = "Icon description required";
      has = true;
    }
    if (formData.icon4Title === "" || formData.icon4Title === null) {
      newerrors.icon4Title = "Icon title required";
      has = true;
    }
    if (
      formData.icon4Description === "" ||
      formData.icon4Description === null
    ) {
      newerrors.icon4Description = "Icon description required";
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
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />{" "}
                    {errors.icon1Title && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon1Title}
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
                    name="icon1Title"
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
                    {errors.icon1Description && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon1Description}
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
                    name="icon1Description"
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
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="banner_title1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />{" "}
                    {errors.icon2Title && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon2Title}
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
                    name="icon2Title"
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
                    {errors.icon2Description && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon2Description}
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
                    name="icon2Description"
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
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />{" "}
                    {errors.icon3Title && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon3Title}
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
                    name="icon3Title"
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
                    {errors.icon3Description && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon3Description}
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
                    name="icon3Description"
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
                    {errors.icon4 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon4}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="icon4"
                    label="icon"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />{" "}
                    {errors.icon4Title && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon4Title}
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
                    name="icon4Title"
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
                    {errors.icon4Description && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.icon4Description}
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
                    name="icon4Description"
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

export default ContentBox;
