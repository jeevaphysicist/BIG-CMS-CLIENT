import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import TextEditor from "../TextEditor";
import { toast } from "react-toastify";
import { handleCreatePolicy, handleUpdatePolicy } from "@/API/api";

const GeneralInfo = ({ handlePolicies, fetchData, editData, type }) => {
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    header: "",
    content: "",
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData((prev) => ({
        ...prev,
        title: editData?.title || "",
        header: editData.about?.header || "",
        content: editData.about?.content || "",
      }));
    }
  }, [editData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setContent(content);
    setFormData((prevData) => ({ ...prevData, content: content }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Page title is required";
      has = true;
    }
    if (formData.header === "" || formData.header === null) {
      newerrors.header = "Header is required";
      has = true;
    }
    if (formData.content === "" || formData.content === null) {
      newerrors.content = "Main Content is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let validateResponse = handleVadilation();
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let bodyData = {
      title: formData.title,
      about: {
        header: formData.header,
        content: formData.content,
      },
    };

    let response;

    try {
      setLoading(true);
      if (type === "create") {
        response = await handleCreatePolicy(bodyData);
      } else if (type === "edit") {
        response = await handleUpdatePolicy(bodyData, editData._id);
      }

      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
        handlePolicies();
      }
    } catch (error) {
      toast.error(error);
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
                htmlFor="page_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Page Title
                <RequiredSymbol />
                {errors.title && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.title}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="page_title"
                placeholder="Privacy Policy"
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
                htmlFor="header"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
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
                placeholder="Privay Policy"
                variant="bordered"
                size="lg"
                radius="sm"
                name="header"
                value={formData.header}
                onChange={handleFormChange}
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
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            onClick={handlePolicies}
            type="button"
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

export default GeneralInfo;
