/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import TextEditor from "../TextEditor";
import { toast } from "react-toastify";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleCreateSitepage, handleHomepageCreateEditSection, handleUpdateSitepage } from "@/API/api";

const About = ({ handleSitepage, type,  title , sectionData, fetchData, currentSection }) => {
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    header: "",
    introduction: "",
    content: "",
  });  
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProcedureContentChange = (content) => {
    setContent(content);
    setFormData((prevData) => ({ ...prevData, content }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
   
    if (formData.header === "" || formData.header === null) {
      newerrors.header = "Header is required";
      has = true;
    }
    if (formData.introduction === "" || formData.introduction === null) {
      newerrors.introduction = "Introduction is required";
      has = true;
    }
    if (formData.content === "" || formData.content === null) {
      newerrors.content = "Content is required";
      has = true;
    }
    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        header: sectionData?.about?.header || "",
        introduction: sectionData?.about?.introduction || "",
        content: sectionData?.about?.content || ""
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
          title:title,
          about:{
            header: formData.header,
            introduction: formData.introduction,
            content: formData.content,
          }
    };

    // console.log("body data", bodyData);
    let response ; 
    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);
      if(type === 'create'){
      response = await handleCreateSitepage(bodyData);      
      }
      else if(type === 'edit'){
      response = await handleUpdateSitepage(bodyData,sectionData._id); 
      }
    // console.log("response",response);
    if (response.status >= 200 && response.status <= 209) {
      let data = response.data;
      toast.success(response.data.message);
      fetchData();
      handleSitepage();
    }
    else{
      toast.error(response.response.data.message);
    }
    } catch (error) {
      toast.error(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="w-full md:px-8 px-2 space-y-6">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="header"
                className="md:text-[18px] text-[16px] font-medium flex gap-1"
              >
                Header
                <RequiredSymbol />
                {errors.header && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.header}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="header"
                placeholder="About BestInGems"
                variant="bordered"
                size="lg"
                radius="sm"
                name="header"
                value={formData.header}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="intro"
                className="md:text-[18px] text-[16px] font-medium  flex gap-1"
              >
                Introduction
                <RequiredSymbol />
                {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )}
              </label>
              <Textarea
                type="text"
                minRows={4}
                id="intro"
                variant="bordered"
                placeholder="Write Page Introduction"
                size="lg"
                radius="sm"
                name="introduction"
                value={formData.introduction}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3 md:mb-8 mb-44">
              <label
                htmlFor="content"
                className="md:text-[18px] text-[16px] font-medium flex gap-1"
              >
                Content
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

export default About;
