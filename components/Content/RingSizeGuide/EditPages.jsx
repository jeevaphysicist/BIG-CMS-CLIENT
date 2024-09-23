/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";

import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FiSave } from "react-icons/fi";
import DragAndDropImage from "../DragDropImage";

const EditPages = ({ handleSizeGuide }) => {
  const [formData, setFormData] = useState({
    image: "",
  });

  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState(false);

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
      newerrors.image = "Image is required";
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
                Edit Ring Size Guide
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
            <div className="w-[60%] md:px-8 px-4">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor=""
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Header Banner
                  <RequiredSymbol />{" "}
                  {errors.image && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.image}
                    </span>
                  )}
                </label>
                <DragAndDropImage
                  accept={`images/*`}
                  label="banner image"
                  id="image"
                  width={580}
                  height={465}
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
            </div>
            <div className="w-[40%] mt-10">
              <div className="border flex-col rounded-[20px] p-4 flex items-start gap-2">
                <h1 className="text-[#0A1215] font-medium text-[22px]">
                  Guidelines
                </h1>
                <h2 className="text-[16px] font-medium text-[#4A5367]">
                  The Following Pop Up image Dimensions are 580px x 465px
                </h2>

                <div className="w-[100%] h-[100%]">
                  <img
                    src="/images/image 20.png"
                    alt=""
                    className="object-cover w-[100%] h-[100%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleSizeGuide}
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
