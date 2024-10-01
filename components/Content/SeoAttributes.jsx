import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "./RequiredSymbol";
import { toast } from "react-toastify";

const SeoAttributes = ({isLoading ,sectionData , onSubmit, handler, handleModal }) => {
  const [formData, setFormData] = useState({
    slug:"",
    title:"",
    description:"",
    tags:""
  });

  useEffect(()=>{
     setFormData(prev=>({...prev,
      slug: sectionData?.slug ||  "",
      title: sectionData?.title ||  "",
      description: sectionData?.description || "",
      tags: sectionData?.tags || ""
     }))
  },[sectionData])

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Title is required";
      has = true;
    }
    if (formData.description === "" || formData.description === null) {
      newerrors.description = "Description is required";
      has = true;
    }
    if (formData.slug === "" || formData.slug === null) {
      newerrors.slug = "Slug is required";
      has = true;
    }
    if (formData.tags === "" || formData.tags === null) {
      newerrors.tags = "Tags are required";
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
    onSubmit(formData);
    console.log("Form submitted with data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:px-8 px-4 py-4 space-y-6"
    >
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="slug"
              className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
            >
              URL Slug
              <RequiredSymbol />
              {errors.slug && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.slug}
                </span>
              )}
            </label>
            <Input
              type="text"
              id="slug"
              placeholder="URL Slug"
              variant="bordered"
              size="lg"
              radius="sm"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="title"
              className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
            >
              SEO Title
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
              placeholder="SEO Title"
              variant="bordered"
              size="lg"
              radius="sm"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="seo_desc"
              className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
            >
              SEO Description
              <RequiredSymbol />
              {errors.description && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.description}
                </span>
              )}
            </label>
            <Textarea
              type="text"
              minRows={4}
              id="seo_desc"
              variant="bordered"
              placeholder="For daily Gemstone goodness and exclusive deals. Sparkle awaits join us today!"
              size="lg"
              radius="sm"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="tags"
              className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
            >
              SEO Tags
              <RequiredSymbol />
              {errors.tags && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.tags}
                </span>
              )}
            </label>
            <Input
              type="text"
              id="tags"
              placeholder="SEO Tags"
              variant="bordered"
              size="lg"
              radius="sm"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Save and cancel buttons */}
      <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
        <Button
          type="button"
          onClick={handler}
          variant="bordered"
          className="font-semibold"
        >
          Back to list
        </Button>
        <Button
          color="primary"
          className="font-semibold disabled:opacity-40 disabled:cursor-wait text-white"
          isDisabled={isLoading}
          startContent={isLoading ?null:<FiSave size={20} />}
          type="submit"
          isLoading={isLoading}
          onClick={handleModal}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default SeoAttributes;
