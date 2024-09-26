/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import giftImg from "../../../assets/image 11.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { handleHomepageCreateEditSection } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const Gifts = ({ handleHomepage, sectionData, fetchData, currentSection }) => {
  const [formData, setFormData] = useState({
    giftOneImage: "",
    giftOneTitle: "",
    giftOneLink: "",
    giftTwoImage: "",
    giftTwoTitle: "",
    giftTwoLink: "",
    giftThreeTitle: "",
    giftThreeImage: "",
    giftThreeLink: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, giftkey) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [giftkey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.giftOneImage === "" || formData.giftOneImage === null) {
      newerrors.giftOneImage = "Gift 1 is required";
      has = true;
    }
    if (formData.giftTwoImage === "" || formData.giftTwoImage === null) {
      newerrors.giftTwoImage = "Gift 2 is required";
      has = true;
    }
    if (formData.giftThreeImage === "" || formData.giftThreeImage === null) {
      newerrors.giftThreeImage = "Gift 3 is required";
      has = true;
    }
    if (formData.giftOneTitle === "" || formData.giftOneTitle === null) {
      newerrors.giftOneTitle = "Title is required";
      has = true;
    }
    if (formData.giftTwoTitle === "" || formData.giftTwoTitle === null) {
      newerrors.giftTwoTitle = "Title is required";
      has = true;
    }
    if (formData.giftThreeTitle === "" || formData.giftThreeTitle === null) {
      newerrors.giftThreeTitle = "Title is required";
      has = true;
    }
    if (formData.giftOneLink === "" || formData.giftOneLink === null) {
      newerrors.giftOneLink = "Redirection Link is required";
      has = true;
    }
    if (formData.giftTwoLink === "" || formData.giftTwoLink === null) {
      newerrors.giftTwoLink = "Redirection Link is required";
      has = true;
    }
    if (formData.giftThreeLink === "" || formData.giftThreeLink === null) {
      newerrors.giftThreeLink = "Redirection Link is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        giftOneImage: sectionData.giftOneImage || "",
        giftOneTitle: sectionData.giftOneTitle || "",
        giftOneLink: sectionData.giftOneLink || "",
        giftTwoImage: sectionData.giftTwoImage || "",
        giftTwoTitle: sectionData.giftTwoTitle || "",
        giftTwoLink: sectionData.giftTwoLink || "",
        giftThreeTitle: sectionData.giftThreeTitle || "",
        giftThreeImage: sectionData.giftThreeImage || "",
        giftThreeLink: sectionData.giftThreeLink || "",
        moduleId: sectionData.moduleId || null,
      });
    }
  }, [sectionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let bodyData = {
      contents: formData,
      moduleSlug: currentSection.moduleSlug,
      moduleName: currentSection.moduleName,
      sectionSlug: currentSection.sectionSlug,
      sectionName: currentSection.sectionName,
      pageName: currentSection.moduleName,
      pageSlug: currentSection.moduleSlug,
    };

    try {
      setLoading(true);
      bodyData = convertObjectToFormData(bodyData);
      const response = await handleHomepageCreateEditSection(bodyData);
      if (response.status >= 200 && response.status <= 209) {
        let data = response.data;
        toast.success(response.data.message);
        fetchData();
      }
    } catch (error) {
      toast.error(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="w-full md:h-full">
        <div className="w-full md:px-8 px-2 md:h-full  md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] md:h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>
                    This is a Content box that contains Icon, Title and a short
                    Description.
                  </p>
                  <p className="md:mt-4 mt-2">
                    You can edit the Content title, Description and the icon in
                    the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 11.png"} alt="category" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-full overflow-y-auto no-scrollbar mt-5 md:mt-0 ">
            <div className="w-full overflow-y-auto flex flex-col gap-8 my-4">
              {/* Gifts 1 */}
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="Gift"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Gift 1
                    <RequiredSymbol />
                    {errors.giftOneImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftOneImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="giftOneImage"
                    label="gift"
                    accept={`images/*`}
                    width={487}
                    height={410}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.giftOneImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.giftOneImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.giftOneTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftOneTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="gifts_title"
                    placeholder="Valentine Gifts"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="giftOneTitle"
                    value={formData.giftOneTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Redirection Link
                    <RequiredSymbol />
                    {errors.giftOneLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftOneLink}
                      </span>
                    )}{" "}
                  </label>
                  <Input
                    type="text"
                    id="gifts_desc"
                    placeholder="https://www.figma.com/design/rE0NmfCUn82V6d2h4V6ATC/BIG-Fin?node-id=884-24014&t=UmVz2Vtl3xwTE8gn-1"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="giftOneLink"
                    value={formData.giftOneLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Gifts 2 */}
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="giftOneImage"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Gift 2
                    <RequiredSymbol />
                    {errors.giftTwoImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftTwoImage}
                      </span>
                    )}{" "}
                  </label>
                  <DragAndDropImage
                    id="giftTwoImage"
                    label="gift"
                    accept={`images/*`}
                    width={487}
                    height={410}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.giftTwoImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.giftTwoImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_giftOneTitle"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.giftTwoTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftTwoTitle}
                      </span>
                    )}{" "}
                  </label>
                  <Input
                    type="text"
                    id="gifts_giftOneTitle"
                    placeholder="Valentine Gifts"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="giftTwoTitle"
                    value={formData.giftTwoTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_desc1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Redirection Link
                    <RequiredSymbol />
                    {errors.giftTwoLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftTwoLink}
                      </span>
                    )}{" "}
                  </label>
                  <Input
                    type="text"
                    id="gifts_desc1"
                    placeholder="https://www.figma.com/design/rE0NmfCUn82V6d2h4V6ATC/BIG-Fin?node-id=884-24014&t=UmVz2Vtl3xwTE8gn-1"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="giftTwoLink"
                    value={formData.giftTwoLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              {/* Gifts 3 */}
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="Gift"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Gift 3
                    <RequiredSymbol />
                    {errors.giftThreeImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftThreeImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="giftThreeImage"
                    label="gift"
                    accept={`images/*`}
                    width={487}
                    height={410}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.giftThreeImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.giftThreeImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.giftThreeTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftThreeTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="gifts_title"
                    placeholder="Valentine Gifts"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="giftThreeTitle"
                    value={formData.giftThreeTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Redirection Link
                    <RequiredSymbol />
                    {errors.giftThreeLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.giftThreeLink}
                      </span>
                    )}{" "}
                  </label>
                  <Input
                    type="text"
                    id="gifts_desc"
                    placeholder="https://www.figma.com/design/rE0NmfCUn82V6d2h4V6ATC/BIG-Fin?node-id=884-24014&t=UmVz2Vtl3xwTE8gn-1"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="giftThreeLink"
                    value={formData.giftThreeLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleHomepage}
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
export default Gifts;
