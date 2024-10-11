import React, { useState,useEffect } from "react";
import RequiredSymbol from "../RequiredSymbol";
import { Button } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import TextEditor from "../TextEditor";
import { toast } from "react-toastify";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleCreateBirthStones, handleUpdateBirthStones } from "@/API/api";

const Introduction = ({ sectionData,type,fetchData,title,handleBirthStones }) => {
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    content: ""
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);


useEffect(()=>{
    setFormData((prev)=>({
     ...prev,
     content: sectionData.introduction?.content
    }))
 },[sectionData])

  const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setContent(content);
    setFormData((prevData) => ({ ...prevData, content: content }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.content === "" || formData.content === null) {
      newerrors.content = "Section Content is required";
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

    let bodyData = {
      title:title,
      introduction:{
        content: formData.content
      }
};

// console.log("body data", bodyData);
let response ; 
try {
  setLoading(true);
  bodyData = convertObjectToFormData(bodyData);
  if(type === 'create'){
  response = await handleCreateBirthStones(bodyData,true);      
  }
  else if(type === 'edit'){
  response = await handleUpdateBirthStones(bodyData,sectionData._id,true); 
  }
// console.log("response",response);
if (response.status >= 200 && response.status <= 209) {
  let data = response.data;
  toast.success(response.data.message);
  fetchData();
  // handleBirthStones();
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
          <div className="flex flex-col  my-3 pt-2 gap-3">
            <label
              htmlFor="intro"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Section Content
              <RequiredSymbol />
              {errors.content && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.content}
                </span>
              )}
            </label>
            <TextEditor
              value={formData.content}
              handleContentChange={handleProcedureContentChange}
            />
          </div>
        </div>
      </div>
      {/* Save and cancel buttons */}
      <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
        <Button
          type="button"
          onClick={handleBirthStones}
          variant="bordered"
          className="font-semibold"
        >
          Back to list
        </Button>
        <Button
          color="primary"
          type="submit"
          className="font-semibold text-white"
          startContent={loading ? null : <FiSave size={20} />}
          isLoading={loading}
          disabled={loading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default Introduction;
