/* eslint-disable react/prop-types */
import DragAndDropImage from "@/components/Content/DragDropImage";
import RequiredSymbol from "@/components/Content/RequiredSymbol";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { Button, Input, Tab, Tabs, Textarea } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

const EditPages = ({ handleCustomJewelryPage }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    link: "",
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, image) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [image]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.image === "" || formData.image === null) {
      newerrors.image = "image is required";
      has = true;
    }
    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Submenu Title is required";
      has = true;
    }
    if (formData.link === "" || formData.link === null) {
      newerrors.link = "Page Link is required";
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

    console.log("Submitted form data", formData);
  };

  return (
    <Fragment>
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
              Edit Custom Jewelry Submenu
            </h2>
            <p className="text-[#4A5367] md:text-[14px] text-[12px]">
              View and Edit Submenu details
            </p>
          </div>
          <Tabs aria-label="Options">
            <Tab key="draft" title="Draft"></Tab>
            <Tab key="publish" title="Publish"></Tab>
          </Tabs>
        </div>
      </div>

      <section>
        <form
          onSubmit={handleSubmit}
          className="w-full md:h-full md:px-8 px-2 space-y-6"
        >
          <div className="w-full md:h-[65vh] space-y-6">
            <div className="w-full flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="section_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Submenu Title
                    <RequiredSymbol />
                    {errors.title && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="section_title"
                    placeholder="Create your own jewelry"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
              {/* Guideleines */}
              <div className="md:w-[40%] h-full md:pt-10">
                <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
                  <div className="w-[50%]">
                    <h2 className="lg:text-[22px] text-[18px] font-semibold">
                      Guidelines
                    </h2>
                    <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                      <p>
                        Upload Square image with resolution of 200 X 200. make
                        sure Gemstone touching all the corners
                      </p>
                    </div>
                  </div>
                  <div>
                    <img src={"/images/image 900.svg"} alt="content" />
                  </div>
                </div>
              </div>
              {/* Form */}
              <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
                {/* image */}
                <div className="w-full flex flex-col gap-8">
                  <div className=" flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="icon"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Add Image
                        <RequiredSymbol />
                        {errors.image && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.image}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="image"
                        label="image"
                        accept={`images/*`}
                        width={200}
                        height={200}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.image && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.image)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="page_link"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Page Link
                        <RequiredSymbol />
                        {errors.link && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.link}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="page_link"
                        placeholder="Ghttps://www.figma.com/design/Bi3Cq4"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="link"
                        value={formData.link}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save and cancel buttons */}
          <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
            <Button
              type="button"
              onClick={handleCustomJewelryPage}
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
      </section>
    </Fragment>
  );
};
export default EditPages;
