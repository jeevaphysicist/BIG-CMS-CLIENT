import { validateImageDimensions } from "@/lib/imageValidator";
import { useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { Button } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";

const Media = ({
  handleSitepage,
  sectionData,
  fetchData,
  currentSection,
  handler,
}) => {
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    media: "",
  });

  const handleImageSelect = async (file, width, height, media) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [media]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;

    if (formData.media === "" || formData.media === null) {
      newerrors.media = "Image is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        media: sectionData.media || "",
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
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full md:px-8 px-4 py-8  space-y-6"
      >
        <div className="w-full min-h-[60vh] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <DragAndDropImage
              id="media"
              label="media"
              accept={`images/*`}
              width={487}
              height={410}
              onImageSelect={handleImageSelect}
            />
            {formData.media && (
              <img
                className=" mx-auto w-[150px]"
                src={FormateImageURL(formData.media)}
                alt="Image Preview"
              />
            )}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="file"
                className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
              >
                Uploaded Files
              </label>
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-20 flex justify-end gap-4">
          <Button
            onClick={handleSitepage}
            variant="bordered"
            className="font-semibold"
          >
            Back to list
          </Button>
          <Button
            color="primary"
            className="font-semibold text-white"
            startContent={<FiSave size={20} />}
            onClick={handler}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Media;
