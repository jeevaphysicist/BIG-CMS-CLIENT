import { Button, Input } from "@nextui-org/react";
import React, { useState ,useEffect } from "react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import TextEditor from "../TextEditor";
import { toast } from "react-toastify";
import { handleCreateGuide, handleUpdateGuide } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const MeaningOfGemstones = ({ sectionData,type,fetchData,title, handleGuide }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      setFormData((prev)=>({
            ...prev,
            title:sectionData.meaning.title,
            content:sectionData.meaning.content
      }))
  },[sectionData])

  const handleProcedureContentChange = (content) => {
    setFormData((prevData) => ({ ...prevData, content: content }));
  };

  const handleValidation = () => {
    let newerrors = {};
    let has = false;
    if (!formData.title) {
      newerrors.title = "Section Title Required";
      has = true;
    }
    if (!formData.content) {
      newerrors.content = "Main Content Required";
      has = true;
    }
    setErrors(newerrors);
    return has;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let validateResponse = handleValidation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }
    console.log("Form submitted with data:", formData);
    let bodyData = {
      title:title,
      meaning:{
        title: formData.title,
        content: formData.content
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
      <div className="flex items-start my-5 justify-between w-[100%] lg:flex-row flex-col ">
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
              {errors.content && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.content}
                </span>
              )}
            </label>
            {/* Text editor */}
            <TextEditor
              value={formData.content}
              handleContentChange={handleProcedureContentChange}
            />
          </div>
        </div>
      </div>
      {/* Save and cancel buttons */}
      <div className="w-full px-4 sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
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
          isLoading={loading}
          isDisabled={loading}
          className="font-semibold text-white"
          startContent={loading ? null : <FiSave size={20} />}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default MeaningOfGemstones;
