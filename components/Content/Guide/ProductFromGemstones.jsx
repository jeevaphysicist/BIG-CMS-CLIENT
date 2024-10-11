import { Fragment, useState,useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import RequiredSymbol from "../RequiredSymbol";
import DragAndDropImage from "../DragDropImage";
import { FormateImageURL } from "@/lib/FormateImageURL";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import { handleCreateGuide, handleUpdateGuide } from "@/API/api";

const ProductFromGemstones = ({ sectionData,type,fetchData,title, handleGuide }) => {
  const [formData, setFormData] = useState({
    title: "",
    catOneBanner: "",
    catOneTitle: "",
    catOnecallToActionLink: "",
    catOnecallToActionTitle:"",
    catTwoBanner: "",
    catTwoTitle: "",
    catTwocallToActionLink: "",
    catTwocallToActionTitle:"",
    catThreeBanner: "",
    catThreeTitle: "",
    catThreecallToActionLink: "",
    catThreecallToActionTitle:"",
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      setFormData(prev=>({...prev,
          title: sectionData.title || "",
          catOneBanner: sectionData.products?.catOneBanner || "",
          catOneTitle: sectionData.products?.catOneTitle || "",
          catOnecallToActionLink: sectionData.products?.catOnecallToActionLink || "",
          catOnecallToActionTitle:sectionData.products?.catOnecallToActionTitle || "",
          catTwoBanner: sectionData.products?.catTwoBanner || "",
          catTwoTitle: sectionData.products?.catTwoTitle || "",
          catTwocallToActionLink: sectionData.products?.catTwocallToActionLink || "",
          catTwocallToActionTitle:sectionData.products?.catTwocallToActionTitle || "",
          catThreeBanner: sectionData.products?.catThreeBanner || "",
          catThreeTitle: sectionData.products?.catThreeTitle || "",
          catThreecallToActionLink: sectionData.products?.catThreecallToActionLink || "",
          catThreecallToActionTitle:sectionData.products?.catThreecallToActionTitle || "",
      }))
  },[sectionData])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, categorykey) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [categorykey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Section Title required";
      has = true;
    }
    if (
      formData.catOneBanner === "" ||
      formData.catOneBanner === null
    ) {
      newerrors.catOneBanner = "Category 1 required";
      has = true;
    }
    if (
      formData.catTwoBanner === "" ||
      formData.catTwoBanner === null
    ) {
      newerrors.catTwoBanner = "Category 2 required";
      has = true;
    }
    if (
      formData.catThreeBanner === "" ||
      formData.catThreeBanner === null
    ) {
      newerrors.catThreeBanner = "Category 3 required";
      has = true;
    }
    if (
      formData.catOneTitle === "" ||
      formData.catOneTitle === null
    ) {
      newerrors.catOneTitle = "Title is required";
      has = true;
    }
    if (
      formData.catTwoTitle === "" ||
      formData.catTwoTitle === null
    ) {
      newerrors.catTwoTitle = "Title is required";
      has = true;
    }
    if (
      formData.catThreeTitle === "" ||
      formData.catThreeTitle === null
    ) {
      newerrors.catThreeTitle = "Title is required";
      has = true;
    }
    if (
      formData.catOnecallToActionTitle === "" ||
      formData.catOnecallToActionTitle === null
    ) {
      newerrors.catOnecallToActionTitle = "Call to Action Title is required";
      has = true;
    }
    if (
      formData.catTwocallToActionTitle === "" ||
      formData.catTwocallToActionTitle === null
    ) {
      newerrors.catTwocallToActionTitle = "Call to Action Title is required";
      has = true;
    }
    if (
      formData.catThreecallToActionTitle === "" ||
      formData.catThreecallToActionTitle === null
    ) {
      newerrors.catThreecallToActionTitle = "Call to Action Title is required";
      has = true;
    }
    if (
      formData.catOnecallToActionLink === "" ||
      formData.catOnecallToActionLink === null
    ) {
      newerrors.catOnecallToActionLink = "Call to Action Link is required";
      has = true;
    }
    if (
      formData.catTwocallToActionLink === "" ||
      formData.catTwocallToActionLink === null
    ) {
      newerrors.catTwocallToActionLink = "Call to Action Link is required";
      has = true;
    }
    if (
      formData.catThreecallToActionLink === "" ||
      formData.catThreecallToActionLink === null
    ) {
      newerrors.catThreecallToActionLink = "Call to Action Link is required";
      has = true;
    }
    setError(newerrors);
    return has;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let bodyData = {
      title:title,
      products:formData
    };

// console.log("body data", bodyData);
let response ; 
try {
  setLoading(true);
  bodyData = convertObjectToFormData(bodyData);
  if(type === 'create'){
  response = await handleCreateGuide(bodyData,true);      
  }
  else if(type === 'edit'){
  response = await handleUpdateGuide(bodyData,sectionData._id,true); 
  }
// console.log("response",response);
if (response.status >= 200 && response.status <= 209) {
  let data = response.data;
  toast.success(response.data.message);
  fetchData();
  handleGuide();
}
else{
  toast.error(response.response.data.message);
}
} catch (error) {
  toast.error(error.message);
} finally {
  setLoading(false);
}
    console.log("Form submitted with data:", formData);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="w-full md:px-8 px-2 h-full  md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p> The Following Image Dimensions are 233px x 256px</p>
                  <p className="md:mt-5 mt-2">
                    You can edit the Category Image and its details and Call to
                    Action.
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/guidepfg.png"} alt="category" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-full overflow-y-auto no-scrollbar mt-5 md:mt-0 ">
            <div className="w-full overflow-y-auto flex flex-col gap-8">
              <div className="flex flex-col  my-3 pt-2 gap-3">
                <label
                  htmlFor="title"
                  className="text-[16px]  font-semibold flex gap-1"
                >
                  Section Title
                  <RequiredSymbol />
                  {errors.title && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.title}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  minRows={4}
                  id="title"
                  variant="bordered"
                  placeholder="EMERALD GEMSTONE PRODUCTS"
                  size="lg"
                  radius="sm"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                />
              </div>
              {/* Category 1 */}
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 1
                    <RequiredSymbol />
                    {errors.catOneBanner && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catOneBanner}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="catOneBanner"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.catOneBanner && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.catOneBanner)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.catOneTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catOneTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_title"
                    placeholder="Gemstones"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catOneTitle"
                    value={formData.catOneTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_action_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action title
                    <RequiredSymbol />
                    {errors.catOnecallToActionTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catOnecallToActionTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_action_title"
                    placeholder="Explore More"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catOnecallToActionTitle"
                    value={formData.catOnecallToActionTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action link
                    <RequiredSymbol />
                    {errors.catOnecallToActionLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catOnecallToActionLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_desc"
                    placeholder="https://figma.com/design"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catOnecallToActionLink"
                    value={formData.catOnecallToActionLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Category 2 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor=""
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 2
                    <RequiredSymbol />
                    {errors.catTwoBanner && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catTwoBanner}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="catTwoBanner"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.catTwoBanner && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.catTwoBanner)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_categoryOneTitle"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.catTwoTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catTwoTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_categoryOneTitle"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catTwoTitle"
                    value={formData.catTwoTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_action_title_1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action title
                    <RequiredSymbol />
                    {errors.catTwocallToActionTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catTwocallToActionTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_action_title_1"
                    placeholder="Explore More"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catTwocallToActionTitle"
                    value={formData.catTwocallToActionTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_action_link_1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action link
                    <RequiredSymbol />
                    {errors.catTwocallToActionLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catTwocallToActionLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_action_link_1"
                    placeholder="https://figma.com/design"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catTwocallToActionLink"
                    value={formData.catTwocallToActionLink}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* category 3 */}

              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor=""
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Category 3
                    <RequiredSymbol />
                    {errors.catThreeBanner && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catThreeBanner}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="catThreeBanner"
                    label="category"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.catThreeBanner && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.catThreeBanner)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_categoryTwoTitle"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.catThreeTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catThreeTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_categoryTwoTitle"
                    placeholder="Gemstone name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catThreeTitle"
                    value={formData.catThreeTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_action_title_3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action title
                    <RequiredSymbol />
                    {errors.catThreecallToActionTitle && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catThreecallToActionTitle}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_action_title_3"
                    placeholder="Explore More"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catThreecallToActionTitle"
                    value={formData.catThreecallToActionTitle}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category_action_link_3"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Call to action link
                    <RequiredSymbol />
                    {errors.catThreecallToActionLink && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.catThreecallToActionLink}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="category_action_link_3"
                    placeholder="https://figma.com/design"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="catThreecallToActionLink"
                    value={formData.catThreecallToActionLink}
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
            onClick={handleGuide}
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
export default ProductFromGemstones;
