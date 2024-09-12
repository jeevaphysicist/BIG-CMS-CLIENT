/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const ContentBox = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState({
    icon1: "",
    icon2: "",
    icon3: "",
    icon4: "",
  });
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = (file, iconkey) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview((prev) => ({ ...prev, [iconkey]: blobUrl }));
      setFormData((prev) => ({ ...prev, [iconkey]: file }));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  </label>
                  <DragAndDropImage
                    id="icon1"
                    onImageSelect={(file) => handleImageSelect(file, "icon1")}
                  />
                  {imagePreview.icon1 && (
                    <img src={imagePreview.icon1} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="banner_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                  </label>
                  <Input
                    type="text"
                    id="banner_title"
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
                  </label>
                  <DragAndDropImage
                    id="icon2"
                    onImageSelect={(file) => handleImageSelect(file, "icon2")}
                  />
                  {imagePreview.icon2 && (
                    <img src={imagePreview.icon2} alt="icon image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="banner_title1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
                  </label>
                  <DragAndDropImage
                    id="icon3"
                    onImageSelect={(file) => handleImageSelect(file, "icon3")}
                  />
                  {imagePreview.icon3 && (
                    <img src={imagePreview.icon3} alt="icon image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
                  </label>
                  <DragAndDropImage
                    id="icon4"
                    onImageSelect={(file) => handleImageSelect(file, "icon4")}
                  />
                  {imagePreview.icon4 && (
                    <img src={imagePreview.icon4} alt="icon image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon_title3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
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
