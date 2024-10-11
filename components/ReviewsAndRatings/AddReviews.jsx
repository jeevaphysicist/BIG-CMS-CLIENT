
import { Button, Input, Switch, Tab, Tabs, Textarea } from "@nextui-org/react";
import { Fragment, useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import DragAndDropImage from "../Content/DragDropImage";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import RequiredSymbol from "../Content/RequiredSymbol";
import { handleCreateReviewAndRating, handleUpdateReviewAndRating } from "@/API/api";
import { convertObjectToFormData } from "@/utils/convertObjectToFormData";
import Media from "./Media";

const AddReviews = ({ handleReviewPage, fetchData, type, selectedReview, categories, products, subCategories, fetchGetAllCategories, fetchGetAllProducts, fetchGetAllSubCategories }) => {
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [formData, setFormData] = useState({
    customerName: "",
    category: null,
    subCategory: null,
    product: null,
    ratings: 0,
    reviewTitle: "",
    description: "",
    isVerifiedCustomer: false,
    role:"admin"
  });

  useEffect(() => {
    if (selectedReview) {
      setFormData(selectedReview);
      if (selectedReview.category && selectedReview.subCategory) {
        fetchGetAllSubCategories(selectedReview.category.categoryId);
        fetchGetAllProducts(selectedReview.category.categoryNm, selectedReview.subCategory.subCategoryDesc);
      }
    }
  }, [selectedReview])

  const [loading, setLoading] = useState(false);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchGetAllCategories();
  }, []);

  useEffect(() => {
    if (type === "edit") {
      if (formData.category) {
        fetchGetAllSubCategories(formData.category.categoryId);
      }
      if (formData.category && formData.subCategory) {
        fetchGetAllProducts(formData.category.categoryNm, formData.subCategory.subCategoryDesc);
      }
    }
  }, [type, formData.category, formData.subCategory, selectedReview])

  const handleFormChange = async (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      // console.log("category", value);
      const category = categories.find(category => category.categoryId === Number(value));
      setFormData(prevData => ({
        ...prevData,
        category: category,
        subCategory: null,
        product: null
      }));
      setAvailableProducts([]);
      await fetchGetAllSubCategories(value);
    } else if (name === "subCategory") {
      const subCategory = availableSubCategories.find(subCategory => subCategory.subCategoryId === Number(value));
      setFormData(prevData => ({
        ...prevData,
        subCategory: subCategory,
        product: null
      }));
      await fetchGetAllProducts(formData.category.categoryNm, subCategory.subCategoryDesc);
    } else if (name === "product") {
      const product = availableProducts.find(product => product._id === value);
      setFormData(prevData => ({
        ...prevData,
        product: product
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // Clear error for the field being changed
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  useEffect(() => {
    if (subCategories.length > 0) {
      setAvailableSubCategories(subCategories);
    }
  }, [subCategories]);

  useEffect(() => {
    if (products.length > 0) {
      setAvailableProducts(products);
    }
  }, [products]);

  const handleSwitchChange = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
  };

  const handleImageSelect = async (file, width, height, bannerkey) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [bannerkey]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subCategory) newErrors.subCategory = "Sub-category is required";
    if (!formData.product) newErrors.product = "Product is required";
    if (formData.ratings === 0) newErrors.ratings = "Rating is required";
    if (!formData.reviewTitle.trim()) newErrors.reviewTitle = "Review title is required";
    if (!formData.description.trim()) newErrors.description = "Review description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!handleValidation()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    try {
      setLoading(true);
      // API Call Here
     let response;
     if(type === "create"){
      response = await handleCreateReviewAndRating(formData);
     }else{
      response = await handleUpdateReviewAndRating(selectedReview._id,formData);
     }
     if(response.status >= 200 && response.status < 300){
      toast.success("Review submitted successfully!");
      handleReviewPage();
      fetchData()
     }else{
      toast.error(response.response.data.message);
     }
      // Reset form or redirect user
    } catch (error) {
      // console.error("Error submitting review:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRatingChange = (newRating) => {
    setFormData((prevData) => ({
      ...prevData,
      ratings: newRating,
    }));
    setErrors(prevErrors => ({ ...prevErrors, ratings: '' }));
  };

  console.log("selected formData", formData);

  return (
    <Fragment>
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-30 bg-white justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
              {type === "create" ? "Add New Review" : "Edit Review"}
            </h2>
            <p className="text-[#4A5367] md:text-[14px] text-[12px]">
              {type === "create" ? "Seamlessly Add New Review" : "Seamlessly Edit Review"}
            </p>
          </div>
          <Tabs aria-label="Options">
            <Tab key="draft" title="Draft"></Tab>
            <Tab key="publish" title="Publish"></Tab>
          </Tabs>
        </div>
        <div className="flex gap-[24px] h-10">
          <button
            className={`text-[16px] ${
              activeTab === "generalInfo"
                ? "border-b-3 border-[#434CE7] text-black"
                : "text-black/50"
            }  font-semibold  `}
            onClick={() => handleTabChange("generalInfo")}
          >
            General Info
          </button>
          <button
            className={`text-[16px] ${
              activeTab === "media"
                ? "border-b-3 border-[#434CE7] text-black"
                : "text-black/50"
            }  font-semibold`}
            onClick={() => handleTabChange("media")}
          >
            Media
          </button>
        </div>
      </div>
      {activeTab === "generalInfo" && (
        <form onSubmit={handleSubmit}>
          <div className="w-full md:px-4 px-2">
            <div className="w-full md:p-8 p-2 space-y-5">
              <div className="grid md:grid-cols-1 gap-y-6 gap-x-10">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="name"
                    className=" text-[16px] font-medium flex gap-1"
                  >
                    Customer Name
                    <RequiredSymbol />
                  </label>
                  <Input
                    type="text"
                    minRows={4}
                    id="name"
                    variant="bordered"
                    placeholder="Charlie"
                    size="lg"
                    radius="sm"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleFormChange}
                    isInvalid={!!errors.customerName}
                    errorMessage={errors.customerName}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category"
                    className=" text-[16px] font-medium flex gap-1"
                  >
                    Select Category
                    <RequiredSymbol />
                  </label>
                  <select
                    className={`h-[46px] rounded-[8px] border-2 ${errors.category ? 'border-red-500' : 'border-[#D0D5DD]'} px-[10px] cursor-pointer`}
                    aria-label="Select section to edit"
                    name="category"
                    onChange={handleFormChange}
                    value={formData.category ? formData.category.categoryId : ""}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryNm}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="subCategory"
                    className=" text-[16px] font-medium flex gap-1"
                  >
                    Select Sub Category
                    <RequiredSymbol />
                  </label>
                  <select
                    className={`h-[46px] rounded-[8px] border-2 ${errors.subCategory ? 'border-red-500' : 'border-[#D0D5DD]'} px-[10px] cursor-pointer`}
                    aria-label="Select section to edit"
                    name="subCategory"
                    onChange={handleFormChange}
                    value={formData.subCategory ? formData.subCategory.subCategoryId : ""}
                    disabled={!formData.category}
                  >
                    <option value="">Select a sub-category</option>
                    {availableSubCategories.map((subCategory) => (
                      <option key={subCategory.subCategoryId} value={subCategory.subCategoryId}>
                        {subCategory.subCategoryDesc}
                      </option>
                    ))}
                  </select>
                  {errors.subCategory && <p className="text-red-500 text-sm">{errors.subCategory}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-y-6 gap-x-10">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="link"
                    className=" text-[16px] font-medium flex gap-1"
                  >
                    Select Product
                    <RequiredSymbol />
                  </label>
                  <select
                    className={`h-[46px] rounded-[8px] border-2 ${errors.product ? 'border-red-500' : 'border-[#D0D5DD]'} px-[10px] cursor-pointer`}
                    aria-label="Select section to edit"
                    name="product"
                    onChange={handleFormChange}
                    value={formData.product ? formData.product._id : ""}
                    disabled={!formData.subCategory}
                  >
                    <option value="">Select a product</option>
                    {availableProducts.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.prodName}
                      </option>
                    ))}
                  </select>
                  {errors.product && <p className="text-red-500 text-sm">{errors.product}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="rating"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Add Star Rating
                  <RequiredSymbol />
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-[50px] cursor-pointer ${
                        star <= formData.ratings ? 'text-[#FA0B4F]' : 'text-gray-300'
                      }`}
                      onClick={() => handleRatingChange(star)}
                    />
                  ))}
                </div>
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="reviewTitle"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Review Title
                  <RequiredSymbol />
                </label>
                <Input
                  type="text"
                  id="reviewTitle"
                  variant="bordered"
                  placeholder="Enter review title"
                  size="lg"
                  radius="sm"
                  name="reviewTitle"
                  onChange={handleFormChange}
                  value={formData.reviewTitle}
                  isInvalid={!!errors.reviewTitle}
                  errorMessage={errors.reviewTitle}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="description"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Description
                  <RequiredSymbol />
                </label>
                <Textarea
                  type="text"
                  minRows={5}
                  id="description"
                  variant="bordered"
                  placeholder="Write your review"
                  size="lg"
                  radius="sm"
                  name="description"
                  onChange={handleFormChange}
                  value={formData.description}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                />
              </div>
              <div className="flex gap-3">
                <label
                  htmlFor="description"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Verified Customer
                </label>
                <Switch
                  isSelected={formData.isVerifiedCustomer}
                  onChange={() => handleSwitchChange("isVerifiedCustomer")}
                  aria-label="Verified Customer"
                />
              </div>
            </div>
            {/* Save and cancel buttons */}
            <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
              <Button
                type="button"
                onClick={handleReviewPage}
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
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </form>
      )}
      {activeTab === "media" && (
        <Media sectionData={selectedReview} handleReviewPage={handleReviewPage} fetchData={fetchData} type={type} />
      )}
    </Fragment>
  );
};
export default AddReviews;
