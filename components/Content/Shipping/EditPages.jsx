/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState } from "react";
import RequiredSymbol from "../RequiredSymbol";

import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FiSave } from "react-icons/fi";
import DragAndDropImage from "../DragDropImage";
import TextEditor from "../TextEditor";

const EditPages = ({ handleShipping }) => {
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

  return (
    <Fragment>
      <section className="h-full w-full">
        <div className="w-full md:h-20  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
          <div className="flex md:flex-row flex-col gap-4 justify-between">
            <div>
              <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
                Edit Shipping Method
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
                  {/* {errors.banner2 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2}
                  </span>
                )} */}
                </label>
                <Input
                  type="text"
                  minRows={4}
                  id="title"
                  variant="bordered"
                  placeholder="Holiday gift guide"
                  size="lg"
                  radius="sm"
                  name="title"
                  // onChange={handleFormChange}
                />
                {/* {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />} */}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="main_content"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Main Content
                  <RequiredSymbol />{" "}
                  {/* {errors.banner2 && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.banner2}
                  </span>
                )} */}
                </label>
                <TextEditor />
                {/* {formData.banner2 && <img className="h-[150px] mx-auto w-[150px]" src={FormateImageURL(formData.banner2 )} alt="Image Preview" />} */}
              </div>
            </div>
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleShipping}
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
