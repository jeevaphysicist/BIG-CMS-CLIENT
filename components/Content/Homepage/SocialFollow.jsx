/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const SocialFollow = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    sectionTitle: "",
    description: "",
    thumbnail: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
      setFormData((prevData) => ({
        ...prevData,
        banner: blobUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="Follow Us On Social Media"
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
                <RequiredSymbol />
              </label>
              <Textarea
                type="text"
                minRows={3}
                id="banner_desc"
                variant="bordered"
                placeholder="For daily Gemstone goodness and exclusive deals. Sparkle awaits join us today!"
                size="lg"
                radius="sm"
                name="description"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="icon"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Add Social Media Thumbnail Images
                <RequiredSymbol />
              </label>
              <DragAndDropImage
                id="thumbnail"
                onImageSelect={(file) => handleImageSelect(file)}
              />
              {imagePreview && <img src={imagePreview} alt="thumbnail image" />}
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

export default SocialFollow;
