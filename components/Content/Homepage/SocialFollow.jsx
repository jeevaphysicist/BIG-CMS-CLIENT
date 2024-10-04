/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleHomepageCreateEditSection } from "@/API/api";

const SocialFollow = ({
  handleHomepage,
  sectionData,
  fetchData,
  currentSection,
}) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionDescription: "",
    thumbnailImage: "",
    moduleId: null,
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
    if (formData.thumbnailImage === "" || formData.thumbnailImage === null) {
      newerrors.thumbnailImage = "Thumbnail is required";
      has = true;
    }
    if (
      formData.sectionDescription === "" ||
      formData.sectionDescription === null
    ) {
      newerrors.sectionDescription = "Description is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        sectionTitle: sectionData.sectionTitle || "",
        sectionDescription: sectionData.sectionDescription || "",
        thumbnailImage: sectionData.thumbnailImage || "",
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
                value={formData.sectionTitle}
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
                {errors.sectionDescription && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.sectionDescription}
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
                name="sectionDescription"
                value={formData.sectionDescription}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="icon"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Add Social Media thumbnail Images
                <RequiredSymbol />
                {errors.thumbnailImage && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.thumbnailImage}
                  </span>
                )}
              </label>
              <DragAndDropImage
                id="thumbnailImage"
                label="thumbnailImage"
                accept={`images/*`}
                multiple={true}
                width={500}
                height={500}
                onImageSelect={handleImageSelect}
              />
              {formData.thumbnailImage && (
                <img
                  className="h-[150px] mx-auto w-[150px]"
                  src={FormateImageURL(formData.thumbnailImage)}
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

export default SocialFollow;
