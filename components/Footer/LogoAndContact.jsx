/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../Content/DragDropImage";
import { Button, Input } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../Content/RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";

const LogoAndContact = ({ handleHomepage }) => {
  const [formData, setFormData] = useState({
    logo: "",
    phoneNumberOne: "",
    phoneNumberTwo: "",
    email: "",
    location: "",
    fax: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageSelect = async (file, width, height, logo) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [logo]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.logo === "" || formData.logo === null) {
      newerrors.logo = "Logo is required";
      has = true;
    }
    if (formData.phoneNumberOne === "" || formData.phoneNumberOne === null) {
      newerrors.phoneNumberOne = "Phone Number 1 is required";
      has = true;
    }
    if (formData.phoneNumberTwo === "" || formData.phoneNumberTwo === null) {
      newerrors.phoneNumberTwo = "Phone Number 2 is required";
      has = true;
    }
    if (formData.email === "" || formData.email === null) {
      newerrors.email = "Email is required";
      has = true;
    }
    if (formData.location === "" || formData.location === null) {
      newerrors.location = "Location required";
      has = true;
    }
    if (formData.fax === "" || formData.fax === null) {
      newerrors.fax = "Fax is required";
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
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full md:px-8 px-2 md:flex md:flex-row-reverse gap-6">
          {/* Guideleines */}
          <div className="md:w-[40%] h-full pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p className="md:mt-5 mt-2">
                    You can edit the Logo and Contact Details
                  </p>
                </div>
              </div>
              <div>
                <img src={"/images/image 24.png"} alt="logo" />
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] h-full overflow-y-auto no-scrollbar mt-5 md:mt-0 ">
            <div className="w-full overflow-y-auto flex flex-col gap-8">
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="logo"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Logo
                    <RequiredSymbol />
                    {errors.logo && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.logo}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="logo"
                    label="logo"
                    accept={`images/*`}
                    width={233}
                    height={256}
                    onImageSelect={handleImageSelect}
                  />
                  {formData.logo && (
                    <img
                      className="h-[150px] mx-auto w-[150px]"
                      src={FormateImageURL(formData.logo)}
                      alt="Image Preview"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="phoneNo1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Phone Number 1
                    <RequiredSymbol />
                    {errors.phoneNumberOne && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.phoneNumberOne}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="phoneNo1"
                    placeholder="614-742-7466"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="phoneNumberOne"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="phoneNo2"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Phone Number 2
                    <RequiredSymbol />
                    {errors.phoneNumberTwo && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.phoneNumberTwo}
                      </span>
                    )}
                  </label>
                  <Input
                    type="text"
                    id="phoneNo2"
                    placeholder="614-742-7480"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="phoneNumberTwo"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Email
                    <RequiredSymbol />
                    {errors.email && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.email}
                      </span>
                    )}
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Bestingems@gmail.com"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="email"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="location"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Location
                    <RequiredSymbol />
                    {errors.location && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.location}
                      </span>
                    )}
                  </label>
                  <Input
                    type="location"
                    id="location"
                    placeholder="6742 Perimeter Loop Rd # 307 Dublin OH 43017"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="location"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="fax"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Fax
                    <RequiredSymbol />
                    {errors.fax && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.fax}
                      </span>
                    )}
                  </label>
                  <Input
                    type="fax"
                    id="fax"
                    placeholder="1-800-398-4892"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="fax"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 pr-0 md:pr-4 py-3 z-30 flex justify-end gap-4">
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

export default LogoAndContact;
