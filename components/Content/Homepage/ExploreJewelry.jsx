import { Fragment, useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleHomepageCreateEditSection } from "@/API/api";

const ExploreJewelry = ({
  handleHomepage,
  sectionData,
  fetchData,
  currentSection,
}) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionDescription: "",
    buttonName: "",
    buttonLink: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.sectionTitle === "" || formData.sectionTitle === null) {
      newerrors.sectionTitle = "sectionTitle is required";
      has = true;
    }
    if (
      formData.sectionDescription === "" ||
      formData.sectionDescription === null
    ) {
      newerrors.sectionDescription = "sectionDescription is required";
      has = true;
    }
    if (formData.buttonName === "" || formData.buttonName === null) {
      newerrors.buttonName = "Call to action is required";
      has = true;
    }
    if (formData.buttonLink === "" || formData.buttonLink === null) {
      newerrors.buttonLink = "Call to action link is required";
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
        buttonName: sectionData.buttonName || "",
        buttonLink: sectionData.buttonLink || "",
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
        <div className="w-full h-full md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>
                    To Edit the Product Carousel Details, Go to PIM Product
                    Management
                  </p>
                  <Button color="primary" className="mt-5">
                    Manage Products
                  </Button>
                </div>
              </div>
              <div>
                <img src={"/images/image 7.png"} alt="content" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-0">
            {/* Banner */}
            <div className="w-full flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="sec_sectionTitle"
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
                  id="sec_sectionTitle"
                  placeholder="Explore Gemstone Jewelry Collection"
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
                  htmlFor="explore_desc"
                  className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                >
                  Description
                  <RequiredSymbol />
                  {errors.sectionDescription && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.sectionDescription}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  id="explore_desc"
                  placeholder="Our latest additions in the Gemstone Jewelry, showcasing"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  name="sectionDescription"
                  value={formData.sectionDescription}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="action_desc"
                  className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                >
                  Call to Action
                  <RequiredSymbol />
                  {errors.buttonName && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.buttonName}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  id="action_desc"
                  placeholder="Explore All Jewelry"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  name="buttonName"
                  value={formData.buttonName}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="action_link"
                  className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                >
                  Call to Action Link
                  <RequiredSymbol />
                  {errors.buttonLink && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.buttonLink}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  id="action_link"
                  placeholder="https://www.figma.com/desig"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  name="buttonLink"
                  value={formData.buttonLink}
                  onChange={handleFormChange}
                />
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
export default ExploreJewelry;
