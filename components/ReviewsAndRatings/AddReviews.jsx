/* eslint-disable react/prop-types */
import { Button, Input, Switch, Tab, Tabs, Textarea } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import DragAndDropImage from "../Content/DragDropImage";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const AddReviews = ({ handleReviewPage }) => {
  const [activeTab, setActiveTab] = useState("generalInfo");
  const [modalActiveTab, setModalActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    customerName: "",
    category: "",
    product: "",
    rating: "",
    title: "",
    descripiton: "",
    verifiedCustomer: false,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !prevData[field],
    }));
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSeoSubmit = (formData) => {
    console.log("Submitting data for Sitepages", formData);
  };

  return (
    <Fragment>
      <div className="w-full md:h-28  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 border-b-1.5 sticky top-0 z-30 bg-white justify-between">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
              Add New Review
            </h2>
            <p className="text-[#4A5367] md:text-[14px] text-[12px]">
              Seamlessly Add New Review
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
        <section>
          <div className="w-full md:px-4 px-2">
            <div className="w-full md:p-8 p-2 space-y-5">
              <div className="grid md:grid-cols-2 gap-y-6 gap-x-10">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="name"
                    className=" text-[16px] font-medium flex gap-1"
                  >
                    Customer Name
                  </label>
                  <Input
                    type="text"
                    minRows={4}
                    id="name"
                    variant="bordered"
                    placeholder="Charlie"
                    size="lg"
                    radius="sm"
                    name="name"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="category"
                    className=" text-[16px] font-medium flex gap-1"
                  >
                    Select Category
                  </label>
                  <select
                    className=" h-[46px] rounded-[8px] border-2 border-[#D0D5DD] px-[10px] cursor-pointer"
                    aria-label="Select section to edit"
                  >
                    <option value="company">Company</option>
                    <option value="policies">Policies</option>
                    <option value="gemstones">Gemstones</option>
                    <option value="jewellery">Jewellery</option>
                    <option value="dropsBeads">Drops & Beads</option>
                    <option value="gifts">Gifts</option>
                    <option value="semiMounts">Semi-Mounts</option>
                    <option value="guide">Guide</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="link"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Select Product
                </label>
                <select
                  className=" h-[46px] rounded-[8px] border-2 border-[#D0D5DD] px-[10px] cursor-pointer"
                  aria-label="Select section to edit"
                >
                  <option value="company">Company</option>
                  <option value="policies">Policies</option>
                  <option value="gemstones">Gemstones</option>
                  <option value="jewellery">Jewellery</option>
                  <option value="dropsBeads">Drops & Beads</option>
                  <option value="gifts">Gifts</option>
                  <option value="semiMounts">Semi-Mounts</option>
                  <option value="guide">Guide</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="rating"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Add Star Rating
                </label>
                <div className="flex gap-3">
                  <FaStar className="text-[24px] text-[#FA0B4F]" />
                  <FaStar className="text-[24px] text-[#FA0B4F]" />
                  <FaStar className="text-[24px] text-[#FA0B4F]" />
                  <FaStar className="text-[24px] text-[#FA0B4F]" />
                  <FaStar className="text-[24px] text-[#FA0B4F]" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="title"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Review Title
                </label>
                <Input
                  type="text"
                  id="title"
                  variant="bordered"
                  placeholder="Hero banner"
                  size="lg"
                  radius="sm"
                  name="title"
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="description"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Description
                </label>
                <Textarea
                  type="text"
                  minRows={5}
                  id="description"
                  variant="bordered"
                  placeholder="Write Page Introduction"
                  size="lg"
                  radius="sm"
                  name="description"
                  onChange={handleFormChange}
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
                  checked={formData.verifiedCustomer}
                  onChange={() => handleSwitchChange("verifiedCustomer")}
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
              >
                Save
              </Button>
            </div>
          </div>
        </section>
      )}
      {activeTab === "media" && (
        <form
          onSubmit={handleSubmit}
          className="w-full md:px-8 px-4 py-8  space-y-6"
        >
          <div className="w-full min-h-[60vh] flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <DragAndDropImage
                id="media"
                label="media"
                accept={`images/*`}
                width={487}
                height={410}
                onImageSelect={handleImageSelect}
              />
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="file"
                  className="md:text-[18px] text-[14px] gilroy-medium flex gap-1"
                >
                  Uploaded Files
                </label>
              </div>
            </div>
          </div>

          {/* Save and cancel buttons */}
          <div className="w-full sticky bottom-0 py-3 bg-white z-20 flex justify-end gap-4">
            <Button
              onClick={handleReviewPage}
              variant="bordered"
              className="font-semibold"
            >
              Back to list
            </Button>
            <Button
              color="primary"
              className="font-semibold text-white"
              startContent={<FiSave size={20} />}
            >
              Save New Page
            </Button>
          </div>
        </form>
      )}
    </Fragment>
  );
};
export default AddReviews;
