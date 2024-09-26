/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import DragAndDropImage from "../DragDropImage";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { handleHomepageCreateEditSection } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";

const BirthStoneInfo = ({
  handleHomepage,
  sectionData,
  fetchData,
  currentSection,
}) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionDescription: "",
    birthStoneMonth: "",
    birthStoneImage: "",
    selectionImage: "",
    title: "",
    description: "",
    readMoreLink: "",
    productLink: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, imagekey) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [imagekey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.birthStoneImage === "" || formData.birthStoneImage === null) {
      newerrors.birthStoneImage = "BirthStone Image is required";
      has = true;
    }
    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "Section Title is required";
      has = true;
    }
    if (
      formData.sectionDescription === "" ||
      formData.sectionDescription === null
    ) {
      newerrors.sectionDescription = "Section Description is required";
      has = true;
    }
    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Title is required";
      has = true;
    }
    if (formData.description === "" || formData.title === null) {
      newerrors.description = "Description is required";
      has = true;
    }
    if (formData.selectionImage === "" || formData.selectionImage === null) {
      newerrors.selectionImage = "Selection image is required";
      has = true;
    }
    if (formData.birthStoneMonth === "" || formData.birthStoneMonth === null) {
      newerrors.birthStoneMonth = "Birthstone Month is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  useEffect(() => {
    if (sectionData) {
      setFormData({
        ...formData,
        sectionTitle: sectionData.sectionTitle || "",
        sectionDescription: sectionData.sectionDescription || "",
        birthStoneMonth: sectionData.birthStoneMonth || "",
        birthStoneImage: sectionData.birthStoneImage || "",
        selectionImage: sectionData.selectionImage || "",
        title: sectionData.title || "",
        description: sectionData.description || "",
        readMoreLink: sectionData.readMoreLink || "",
        productLink: sectionData.productLink || "",
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
      <form
        onSubmit={handleSubmit}
        className="w-full md:h-full md:px-8 px-2 space-y-6"
      >
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="section_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Section Title
                <RequiredSymbol />
                {errors.sectionTitle && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.sectionTitle}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="Know More About Your Birthstone"
                variant="bordered"
                size="lg"
                radius="sm"
                name="sectionTitle"
                value={formData.sectionTitle}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="birthStoneImage_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Section Description
                <RequiredSymbol />
                {errors.sectionDescription && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.sectionDescription}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="birthStoneImage_desc"
                placeholder="Gemstone name"
                variant="bordered"
                size="lg"
                radius="sm"
                name="sectionDescription"
                value={formData.sectionDescription}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>
                    The Following birthStoneImage Dimensions are 619px X 578px
                  </p>
                  <p className="md:mt-3 mt-2">
                    You can edit the birthStoneImage Title,Description and Call
                    to Action in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 13.png"} alt="birthstone" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
            {/* birthStoneImage */}
            <div className="w-full flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="birthStoneImage_birthStoneMonth"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Birthstone Month
                    <RequiredSymbol />
                    {errors.birthStoneMonth && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.birthStoneMonth}
                      </span>
                    )}
                  </label>
                  <select
                    type="text"
                    id="birthStoneImage_birthStoneMonth"
                    placeholder="Select Birthstone birthStoneMonth"
                    className="w-full h-[46px] rounded-[8px] border-1.5 border-[#D0D5DD] px-[10px] cursor-pointer"
                    name="birthStoneMonth"
                    value={formData.birthStoneMonth}
                    onChange={handleFormChange}
                  >
                    <option value="January">January</option>
                    <option value="Febraury">Febraury</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="January">June</option>
                    <option value="June">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Birthstone Image
                    <RequiredSymbol />
                    {errors.birthStoneImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.birthStoneImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="birthStoneImage"
                    label="birthStoneImage"
                    accept={`images/*`}
                    width={619}
                    height={578}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.birthStoneImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.birthStoneImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="icon"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Selection Image
                    <RequiredSymbol />
                    {errors.selectionImage && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.selectionImage}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="selectionImage"
                    label="selection image"
                    accept={`images/*`}
                    width={619}
                    height={578}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.selectionImage && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.selectionImage)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="birthStoneImage_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="birthStoneImage_title"
                    placeholder="Aquamarine - March"
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
                    htmlFor="birthStoneImage_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Description
                    <RequiredSymbol />
                    {errors.description && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.description}
                      </span>
                    )}
                  </label>
                  <Textarea
                    type="text"
                    id="birthStoneImage_desc"
                    placeholder="Birthstones are good"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="w-full flex md:gap-4 gap-2">
                  <div className="w-full space-y-2">
                    <label
                      htmlFor="rm_link"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Read More Link
                    </label>
                    <Input
                      type="text"
                      id="rm_link"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="readMoreLink"
                      value={formData.readMoreLink}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <label
                      htmlFor="product_link"
                      className="md:text-[18px] text-[16px] gilroy-medium"
                    >
                      Product Link
                    </label>
                    <Input
                      type="text"
                      id="product_link"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      name="productLink"
                      value={formData.productLink}
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

export default BirthStoneInfo;
