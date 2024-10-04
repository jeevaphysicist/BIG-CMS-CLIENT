/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { Button, Input, SelectSection, Textarea } from "@nextui-org/react";
import updates from "../../../assets/updates.svg";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import DragAndDropImage from "../DragDropImage";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { validateImageDimensions } from "@/lib/imageValidator";
import { convertObjectToFormData, convertToFormData } from "@/utils/convertObjectToFormData";
import {
  handleCreateSitepage,
  handleGetHomepageSection,
  handleHomepageCreateEditSection,
  handleUpdateSitepage,
} from "@/API/api";

const Offers = ({ handleSitepage,type, title, sectionData, fetchData, currentSection }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    banner: "",
    callToAction: ""
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, bannerImage) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [bannerImage]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.bannerImage === "" || formData.bannerImage === null) {
      newerrors.bannerImage = "Banner is required";
      has = true;
    }
    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "Section Title is required";
      has = true;
    }
    if (formData.buttonTitle === "" || formData.buttonTitle === null) {
      newerrors.buttonTitle = "Call to action title is required";
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
        title: sectionData?.offers?.title || "",
        description: sectionData?.offers?.description || "",
        banner: sectionData?.offers?.banner || "",
        callToAction: sectionData?.offers?.callToAction || ""
      });
    }
  }, [sectionData]);

  // console.log("sectiondata",sectionData);
  // console.log("formData",formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let bodyData = {
      title:title,
      offers: formData,     
    };
    let response ;
    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);
      if(type === 'create'){
      response = await handleCreateSitepage(bodyData,true);      
      }
      else if(type === 'edit'){
      response = await handleUpdateSitepage(bodyData,sectionData._id,true); 
      }
      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
        handleSitepage();
      }
      else{
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error("Internal server error");
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
                {errors.title && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.title}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="Unlock Exclusive Savings and Updates"
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
                htmlFor="bannerImage_desc"
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
                id="bannerImage_desc"
                placeholder="Subscribe now to 'Unlock Exclusive Savings and Updates.' Be the first to enjoy discounts and stay updated on our latest Gemstone arrivals, ensuring you never miss out on the allure of exclusive offers"
                variant="bordered"
                size="lg"
                radius="sm"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>Upload Square image with resolution of 264 x 264</p>
                </div>
              </div>
              <div>
                <img src={"/images/updates.svg"} alt="content" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
            {/* bannerImage */}
            <div className="w-full flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Banner
                    <RequiredSymbol />
                    {errors.banner && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.banner}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="banner"
                    label="banner"
                    accept={`images/*`}
                    width={264}
                    height={264}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.banner && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.banner)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="bannerImage_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action title
                    <RequiredSymbol />
                    {errors.callToAction && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.callToAction}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    minRows={4}
                    id="bannerImage_desc"
                    placeholder="Subscribe"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="callToAction"
                    value={formData.callToAction}
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
            onClick={handleSitepage}
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
export default Offers;
