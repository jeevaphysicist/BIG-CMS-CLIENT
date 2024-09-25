/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";

import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FiSave } from "react-icons/fi";

const EditPages = ({ handleSocialMedias }) => {
  const [formData, setFormData] = useState({
    socialMediaTitle: "",
    socialMediaLink: "",
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

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (
      formData.socialMediaTitle === "" ||
      formData.socialMediaTitle === null
    ) {
      newerrors.socialMediaTitle = "Social Media socialMediaTitle is required";
      has = true;
    }
    if (formData.socialMediaLink === "" || formData.socialMediaLink === null) {
      newerrors.socialMediaLink = "socialMediaLink is required";
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
                Add New Social Link
              </h2>
              <p className="text-[#4A5367] md:text-[14px] text-[12px]">
                Enter Page Contents
              </p>
            </div>
            <Tabs aria-label="Options">
              <Tab key="draft" socialMediaTitle="Draft"></Tab>
              <Tab key="publish" socialMediaTitle="Publish"></Tab>
            </Tabs>
          </div>
        </div>
        <div className="pt-2 no-scrollbar md:min-h-[75vh]">
          <div className="flex flex-col md:px-8 px-4 my-3 pt-2 gap-3">
            <label
              htmlFor="mediasocialMediaTitle"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Social Media Title
              <RequiredSymbol />
              {errors.socialMediaTitle && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.socialMediaTitle}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="mediasocialMediaTitle"
              variant="bordered"
              placeholder="Facebook"
              size="lg"
              radius="sm"
              name="socialMediaTitle"
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col md:px-8 px-4 my-3 pt-2 gap-3">
            <label
              htmlFor="socialMediaLink"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Link
              <RequiredSymbol />
              {errors.socialMediaLink && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.socialMediaLink}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="socialMediaLink"
              variant="bordered"
              placeholder="facebook.com"
              size="lg"
              radius="sm"
              name="socialMediaLink"
              onChange={handleFormChange}
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
      </form>
    </Fragment>
  );
};
export default EditPages;
