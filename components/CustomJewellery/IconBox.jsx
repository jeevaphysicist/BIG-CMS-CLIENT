/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../Content/DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../Content/RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { handleUpdateCustomJewelry } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const IconBox = ({
  title,
  fetchData,
  sectionData,
  handleCustomJeweleryPage,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    iconOneBanner: "",
    iconOneTitle: "",
    iconTwoBanner: "",
    iconTwoTitle: "",
    iconThreeBanner: "",
    iconThreeTitle: "",
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: sectionData.iconBox?.title,
      iconOneBanner: sectionData.iconBox?.iconOneBanner,
      iconOneTitle: sectionData.iconBox?.iconOneTitle,
      iconTwoBanner: sectionData.iconBox?.iconTwoBanner,
      iconTwoTitle: sectionData.iconBox?.iconTwoTitle,
      iconThreeBanner: sectionData.iconBox?.iconThreeBanner,
      iconThreeTitle: sectionData.iconBox?.iconThreeTitle,
    }));
  }, [sectionData]);

  const handleImageSelect = async (file, width, height, iconkey) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [iconkey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;

    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Section Title is required";
      has = true;
    }
    if (formData.iconOneBanner === "" || formData.iconOneBanner === null) {
      newerrors.iconOneBanner = "Icon 1 is required";
      has = true;
    }

    if (formData.iconTwoBanner === "" || formData.iconTwoBanner === null) {
      newerrors.iconTwoBanner = "Icon 2 is required";
      has = true;
    }
    if (formData.iconThreeBanner === "" || formData.iconThreeBanner === null) {
      newerrors.iconThreeBanner = "Icon 3 is required";
      has = true;
    }

    if (formData.iconOneTitle === "" || formData.iconOneTitle === null) {
      newerrors.iconOneTitle = "Icon title is required";
      has = true;
    }

    if (formData.iconTwoTitle === "" || formData.iconTwoTitle === null) {
      newerrors.iconTwoTitle = "Icon title is required";
      has = true;
    }

    if (formData.iconThreeTitle === "" || formData.iconThreeTitle === null) {
      newerrors.iconThreeTitle = "Icon title is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    console.log("Form submitted with data:", formData);

    let bodyData = {
      title: title,
      iconBox: {
        title: formData.title,
        iconOneBanner: formData.iconOneBanner,
        iconOneTitle: formData.iconOneTitle,
        iconTwoBanner: formData.iconTwoBanner,
        iconTwoTitle: formData.iconTwoTitle,
        iconThreeBanner: formData.iconThreeBanner,
        iconThreeTitle: formData.iconThreeTitle,
      },
    };

    // console.log("body data", bodyData);
    let response;
    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);
      response = await handleUpdateCustomJewelry(
        bodyData,
        sectionData._id,
        true
      );

      // console.log("response",response);
      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="w-full md:h-full md:px-8 px-2">
        <div className="w-full flex flex-col sticky top-52 z-30 bg-white py-2">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="section_title"
              className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
            >
              Section Title
              <RequiredSymbol />{" "}
              {errors.title && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.title}
                </span>
              )}
            </label>
            <Input
              type="text"
              id="section_title"
              placeholder="Craft Your Ideal Gemstone Jewelry"
              variant="bordered"
              size="md"
              radius="sm"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="w-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] py-3">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>This is a Content box that contains Icon, Title.</p>
                  <p className=" mt-2">
                    You can edit the Content Title and the icon in the edit
                    section.
                  </p>
                  <div className="py-2 flex items-center justify-between">
                    <img src={"/images/image 22.png"} alt="content" />
                    <img src={"/images/customjewellery.svg"} alt="content" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-[52vh] overflow-y-auto no-scrollbar py-4 md:py-4">
            <div className="w-full flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
                {/* Icons form */}

                <div className="space-y-6">
                  {/* Icon 1 */}
                  <div className=" flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="icon"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Icon 1
                        <RequiredSymbol />{" "}
                        {errors.iconOneBanner && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconOneBanner}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="iconOneBanner"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.iconOneBanner && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.iconOneBanner)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="banner_title"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.iconOneTitle && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconOneTitle}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="banner_title"
                        placeholder="1. Pickup Semi-Mounts"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="iconOneTitle"
                        value={formData.iconOneTitle}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  {/* Icon 2 */}
                  <div className=" flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="icon"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Icon 2
                        <RequiredSymbol />{" "}
                        {errors.iconTwoBanner && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconTwoBanner}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="iconTwoBanner"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.iconTwoBanner && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.iconTwoBanner)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="banner_iconTwoTitle"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.iconTwoTitle && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconTwoTitle}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="banner_iconTwoTitle"
                        placeholder="2. Select Gemstone"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="iconTwoTitle"
                        value={formData.iconTwoTitle}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  {/* Icon 3 */}
                  <div className=" flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="icon"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Icon 3
                        <RequiredSymbol />{" "}
                        {errors.iconThreeBanner && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconThreeBanner}
                          </span>
                        )}
                      </label>
                      <DragAndDropImage
                        id="iconThreeBanner"
                        label="icon"
                        accept={`images/*`}
                        width={264}
                        height={264}
                        onImageSelect={handleImageSelect}
                      />
                      {formData.iconThreeBanner && (
                        <img
                          className="h-[150px] mx-auto w-[150px]"
                          src={FormateImageURL(formData.iconThreeBanner)}
                          alt="Image Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="banner_iconThreeTitle"
                        className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                      >
                        Title
                        <RequiredSymbol />{" "}
                        {errors.iconThreeTitle && (
                          <span className="font-regular text-[12px] text-red-600">
                            {errors.iconThreeTitle}
                          </span>
                        )}
                      </label>
                      <Input
                        type="text"
                        id="banner_iconThreeTitle"
                        placeholder="3. Place Order"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        name="iconThreeTitle"
                        value={formData.iconThreeTitle}
                        onChange={handleFormChange}
                      />
                    </div>
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
            onClick={handleCustomJeweleryPage}
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

export default IconBox;
