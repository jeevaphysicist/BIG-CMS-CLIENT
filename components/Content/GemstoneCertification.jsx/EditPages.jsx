/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";

import { toast } from "react-toastify";
import { FiSave } from "react-icons/fi";
import TextEditor from "../TextEditor";

const EditPages = ({ handleGemstoneCertification }) => {
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    mainContent: "",
    moduleId: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setContent(content);
    setFormData((prevData) => ({ ...prevData, mainContent: content }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Title is required";
      has = true;
    }
    if (formData.mainContent === "" || formData.mainContent === null) {
      newerrors.mainContent = "Content is required";
      has = true;
    }
    setError(newerrors);
    return has;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }
    // API Call Here
    console.log("Form submitted with data:", formData);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="h-full w-full">
        <div className="w-full md:h-20  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
          <div className="flex md:flex-row flex-col gap-4 justify-between">
            <div>
              <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
                Edit Gemstone Certification
              </h2>
              <p className="text-[#4A5367] md:text-[14px] text-[12px]">
                Enter Page Contents
              </p>
            </div>
            <Tabs aria-label="Options">
              <Tab key="draft" title="Draft"></Tab>
              <Tab key="publish" title="Publish"></Tab>
            </Tabs>
          </div>
        </div>
        <div className="pt-2 no-scrollbar md:min-h-[75vh]">
          <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
            <div className="w-[100%] md:px-8 px-4 space-y-6">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="title"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Title
                  <RequiredSymbol />{" "}
                  {errors.title && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.title}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  minRows={4}
                  id="title"
                  variant="bordered"
                  placeholder=" Gemstone Certification"
                  size="lg"
                  radius="sm"
                  name="title"
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="main_content"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Main Content
                  <RequiredSymbol />{" "}
                  {errors.mainContent && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.mainContent}
                    </span>
                  )}
                </label>
                <TextEditor
                  value={formData.mainContent}
                  handleContentChange={handleProcedureContentChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleGemstoneCertification}
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
    </Fragment>
  );
};
export default EditPages;
