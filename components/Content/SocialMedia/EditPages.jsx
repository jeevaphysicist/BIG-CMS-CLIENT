/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";

import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FiSave } from "react-icons/fi";

const EditPages = ({ handleSocialMedias }) => {
  const [formData, setFormData] = useState({
    media: "",
  });

  const [loading, setLoading] = useState(false);

  const handleImageSelect = async (file, width, height, media) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [media]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.media === "" || formData.media === null) {
      newerrors.media = "Image is required";
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

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModalTab = (tab) => {
    setModalActiveTab(tab);
  };

  const handleSeoSubmit = (formData) => {
    console.log("Submitting data for Sitepages", formData);
  };

  return (
    <Fragment>
      <section className="h-full w-full">
        <div className="w-full md:h-20  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
          <div className="flex md:flex-row flex-col gap-4 justify-between">
            <div>
              <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
                Add New Social Link
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
          <div className="flex flex-col md:px-8 px-4 my-3 pt-2 gap-3">
            <label
              htmlFor="mediaTitle"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Social Media Title
              <RequiredSymbol />
              {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
            </label>
            <Input
              type="text"
              minRows={4}
              id="mediaTitle"
              variant="bordered"
              placeholder="Facebook"
              size="lg"
              radius="sm"
              name="mediaTitle"
              // onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col md:px-8 px-4 my-3 pt-2 gap-3">
            <label
              htmlFor="link"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Link
              <RequiredSymbol />
              {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
            </label>
            <Input
              type="text"
              minRows={4}
              id="link"
              variant="bordered"
              placeholder="facebook.com"
              size="lg"
              radius="sm"
              name="link"
              // onChange={handleFormChange}
            />
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleSocialMedias}
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
      </section>
    </Fragment>
  );
};
export default EditPages;
