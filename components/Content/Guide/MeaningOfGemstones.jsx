import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import TextEditor from "../TextEditor";
import { toast } from "react-toastify";

const MeaningOfGemstones = ({ handleGuide }) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    mainContent: "",
    moduleId: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleProcedureContentChange = (content) => {
    setFormData((prevData) => ({ ...prevData, mainContent: content }));
  };

  const handleValidation = () => {
    let newerrors = {};
    let has = false;
    if (!formData.sectionTitle) {
      newerrors.sectionTitle = "Section Title Required";
      has = true;
    }
    if (!formData.mainContent) {
      newerrors.mainContent = "Main Content Required";
      has = true;
    }
    setErrors(newerrors);
    return has;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateResponse = handleValidation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }
    console.log("Form submitted with data:", formData);
    try {
      setLoading(true);
      let response;
      //  handle response
      response = { status: 200 };
      if (response.status >= 200 && response.status <= 209) {
        //Handle Success
      } else {
        toast.error("Failed to Processed");
      }
    } catch (error) {
      toast.error("Internal Error Occured");
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
              htmlFor="sectionTitle"
              className="text-[16px]  font-semibold flex gap-1"
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
              id="sectionTitle"
              variant="bordered"
              placeholder="Meaning of Emerald Gemstone"
              size="lg"
              radius="sm"
              name="sectionTitle"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  sectionTitle: e.target.value,
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
              {errors.mainContent && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.mainContent}
                </span>
              )}
            </label>
            {/* Text editor */}
            <TextEditor
              value={formData.mainContent}
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
          className="font-semibold text-white"
          startContent={<FiSave size={20} />}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default MeaningOfGemstones;
