/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";

const SocialFollow = ({ handleHomepage }) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    description: "",
    thumbnail: "",
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, banner) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [banner]: file }));
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
    if (formData.thumbnail === "" || formData.thumbnail === null) {
      newerrors.thumbnail = "Thumbnail is required";
      has = true;
    }
    if (formData.description === "" || formData.description === null) {
      newerrors.description = "Description is required";
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
                <RequiredSymbol />
                {errors.sectionTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.sectionTitle}
                  </span>
                )}
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
                {errors.description && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.description}
                  </span>
                )}
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
                {errors.thumbnail && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.thumbnail}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="thumbnail"
                label="thumbnail"
                accept={`images/*`}
                width={264}
                height={264}
                onImageSelect={handleImageSelect}
              />
              {formData.thumbnail && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.thumbnail)}
                  alt="Image Preview"
                />
              )}
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

export default SocialFollow;
