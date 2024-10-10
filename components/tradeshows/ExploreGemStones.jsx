import React, { useState, useEffect } from "react";
import TextEditor from "../Content/TextEditor";
import RequiredSymbol from "../Content/RequiredSymbol";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import { handleUpdateTradeshowAbout } from "@/API/api";
import { toast } from "react-toastify";

const ExploreGemStones = ({ handleClose ,fetchData ,sectionData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading,setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleProcedureContentChange = (content) => {
    setFormData((prev) => ({ ...prev, description: content }));
  };
 
  useEffect(()=>{
    setFormData(prev=>({...prev,
                       title:sectionData.about?.title || "",
                       description:sectionData.about?.description || ""
                }))
  },[sectionData])

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.Title === "" || formData.Title === null) {
      newerrors.Title = "Title is required";
      has = true;
    }
    if (formData.description === "" || formData.description === null) {
      newerrors.description = "Main Content  is required";
      has = true;
    }

    setErrors(newerrors);
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
        title: formData.title,
        description: formData.description
        };

// console.log("body data", bodyData);
let response ; 
try {
  setLoading(true);
  response = await handleUpdateTradeshowAbout(bodyData,sectionData._id,true); 
// console.log("response",response);
if (response.status >= 200 && response.status <= 209) {
  let data = response.data;
  toast.success(response.data.message);
  fetchData();
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
    <div>
      <div className="w-[100%] md:px-8 px-4">
        <div className="flex flex-col  my-3 pt-2 gap-3">
          <label
            htmlFor="title"
            className="text-[16px]  font-semibold flex gap-1"
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
            id="title"
            variant="bordered"
            placeholder="Meaning of Emerald Gemstone"
            size="lg"
            radius="sm"
            name="title"
            value={formData.title}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col gap-3 md:mb-8 mb-44">
          <label
            htmlFor="content"
            className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
          >
            Main Content
            <RequiredSymbol />
            {errors.description && (
              <span className="font-regular text-[12px] text-red-600">
                {errors.description}
              </span>
            )}
          </label>
          {/* Text editor */}
          <TextEditor
            value={formData.description}
            handleContentChange={handleProcedureContentChange}
          />
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full px-4 sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleClose}
            variant="bordered"
            className="font-semibold"
          >
            Back to list
          </Button>
          <Button
            color="primary"
            onClick={handleSubmit}
            className="font-semibold text-white disabled:opacity-40 disabled:cursor-wait"
            startContent={loading ? null : <FiSave size={20} />}
            isLoading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreGemStones;
