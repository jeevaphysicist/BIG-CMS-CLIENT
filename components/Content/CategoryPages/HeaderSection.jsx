/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { handleUpdateCategorySubCategory } from "@/API/api";

const HeaderSection = ({ handleCategoryPage, editData, fetchData ,sectionType}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   if(editData){
      setFormData({
        title: editData.header.title,
        description: editData.header.description
      });
   }
  }, [editData]);

   

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

    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Title is required";
      has = true;
    }
    if (formData.description === "" || formData.description === null) {
      newerrors.description = "Description is required";
      has = true;
    }
    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let validateResponse = handleVadilation();
      console.log("validationresponse", validateResponse);
      if (validateResponse) {
        toast.error("Please fill required details correctly !");
        return null;
      }
       const body = {
        header:formData
      }
      const response = await handleUpdateCategorySubCategory(editData._id, body);
      console.log("response", response);
      if(response.status >= 200 && response.status < 300){
        toast.success(response.data.message);
        // handleCategoryPage();
        fetchData();
      } else {
        toast.error(response.response.data.message);
      }

      // console.log("Form submitted with data:", formData);
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full md:h-full md:px-8 px-2 space-y-6 relative"
      >
        <div className="w-full md:h-full flex flex-col gap-8 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="section_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Title
                <RequiredSymbol />
                {errors.title && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.title}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="BestInGems Exquisite Gemstone Collection"
                variant="bordered"
                size="lg"
                radius="sm"
                name="title"
                value={formData.title}
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
                minRows={10}
                id="banner_desc"
                variant="bordered"
                placeholder="Indulge in the allure of timeless beauty and sophistication. Explore our curated Gemstone Collection, meticulously crafted to redefine wearable luxury. Uncover the perfect Gemstone to complement your unique style – shop now at BestInGems for an unparalleled shopping experience!"
                size="lg"
                radius="sm"
                name="description"
                onChange={handleFormChange}
                value={formData.description}
              />
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleCategoryPage}
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

export default HeaderSection;
