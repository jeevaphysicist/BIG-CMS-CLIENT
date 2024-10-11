import React, { useState ,useEffect } from "react";
import RequiredSymbol from "../RequiredSymbol";
import { Button, Input } from "@nextui-org/react";
import DragAndDropImage from "../DragDropImage";
import { FiSave } from "react-icons/fi";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleCreateGuide, handleUpdateGuide } from "@/API/api";

const ContentSection = ({ sectionData,type,fetchData,title, handleGuide }) => {
  const [formData, setFormData] = useState({
    banner: "",
    bannerTitle: ""
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setFormData((prev)=>({...prev,
      banner:sectionData.content?.banner || "",
      bannerTitle:sectionData.content?.bannerTitle || ""
    }))
},[sectionData])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    if (formData.banner === "" || formData.banner === null) {
      newerrors.banner = "Banner is required";
      has = true;
    }
    if (formData.bannerTitle === "" || formData.bannerTitle === null) {
      newerrors.bannerTitle = "Banner title is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    // console.log("Form submitted with data:", formData);
    let bodyData = {
      title:title,
      content:{
        banner: formData.banner,
        bannerTitle: formData.bannerTitle
      }
};

// console.log("body data", bodyData);
let response ; 
try {
  setLoading(true);
  bodyData = convertObjectToFormData(bodyData);
  if(type === 'create'){
  response = await handleCreateGuide(bodyData,true);      
  }
  else if(type === 'edit'){
  response = await handleUpdateGuide(bodyData,sectionData._id,true); 
  }
// console.log("response",response);
if (response.status >= 200 && response.status <= 209) {
  let data = response.data;
  toast.success(response.data.message);
  fetchData();
  handleGuide();
}
else{
  toast.error(response.response.data.message);
}
} catch (error) {
  toast.error(error.message);
} finally {
  setLoading(false);
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
        <div className="w-[100%] md:px-8 px-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="" className=" text-[16px] font-medium flex gap-1">
              Banner
              <RequiredSymbol />{" "}
              {errors.banner && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.banner}
                </span>
              )}
            </label>
            <DragAndDropImage
              accept={`images/*`}
              label="banner image"
              id="banner"
              width={487}
              height={410}
              onImageSelect={handleImageSelect}
            />
            {formData.banner && (
              <img
                className="h-[150px] mx-auto object-cover w-[100%]"
                src={FormateImageURL(formData.banner)}
                alt="Image Preview"
              />
            )}
          </div>
          <div className="flex flex-col  my-3 pt-2 gap-3">
            <label
              htmlFor="banner-title"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Banner Title
              <RequiredSymbol />
              {errors.bannerTitle && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.bannerTitle}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="banner-title"
              variant="bordered"
              placeholder="Craft Your Unique Jewelry Ensemble with the Elegance of Emeralds."
              size="lg"
              radius="sm"
              name="bannerTitle"
              value={formData.bannerTitle}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="w-[100%] mt-10">
          <div className="border flex-col rounded-[20px] p-4 flex items-start gap-2">
            <h1 className="text-[#0A1215] font-medium text-[22px]">
              Guidelines
            </h1>
            <h2 className="text-[16px] font-medium text-[#4A5367]">
              The Following Image Dimensions are 487px x 410px
            </h2>
            <h2 className="text-[16px] font-medium text-[#4A5367]">
              You can edit the Banner Image and its details.
            </h2>
            <div className="w-[100%] h-[100%]">
              <img
                src="/images/image 19.png"
                alt=""
                className="object-cover w-[100%] h-[100%]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Save and cancel buttons */}
      <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
        <Button
          type="button"
          onClick={handleGuide}
          variant="bordered"
          className="font-semibold"
        >
          Back to list
        </Button>
        <Button
          color="primary"
          type="submit"
          className="font-semibold text-white"
          isLoading={loading}
          isDisabled={loading}
          startContent={loading ?null : <FiSave size={20} />}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ContentSection;
