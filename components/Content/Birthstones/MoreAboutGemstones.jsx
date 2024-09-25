import React, { useState } from "react";
import RequiredSymbol from "../RequiredSymbol";
import { Button } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import TextEditor from "../TextEditor";
import { toast } from "react-toastify";

const MoreAboutGemstones = ({ handleBirthStones }) => {
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    sectionContent: "",
    moduleId: null,
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setContent(content);
    setFormData((prevData) => ({ ...prevData, sectionContent: content }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.sectionContent === "" || formData.sectionContent === null) {
      newerrors.sectionContent = "Section Content is required";
      has = true;
    }
    setError(newerrors);
    return has;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    // API Call Here

    console.log("Form submitted with data:", formData);
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
              {errors.sectionContent && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.sectionContent}
                </span>
              )}
            </label>
            <TextEditor
              value={content}
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
          startContent={<FiSave size={20} />}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default MoreAboutGemstones;
