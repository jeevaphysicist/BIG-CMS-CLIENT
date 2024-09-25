/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import testimonialImg from "../../../assets/image 15.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";

const Testimonials = ({ handleHomepage }) => {
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionDescription: "",
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
      newerrors.sectionTitle = "Title is required";
      has = true;
    }
    if (
      formData.sectionDescription === "" ||
      formData.sectionDescription === null
    ) {
      newerrors.sectionDescription = "Description is required";
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
                    To Edit the Product Carousel Details, Go to Reviews and
                    Ratings.
                  </p>
                  <Button color="primary" className="mt-5">
                    Manage Reviews
                  </Button>
                </div>
              </div>
              <div>
                <img src={"/images/image 15.png"} alt="testimonial" />
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
                  placeholder="2500+ Happy Customers"
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  name="sectionTitle"
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
                <Textarea
                  type="text"
                  id="explore_desc"
                  placeholder="Discover why our clients trust us to deliver Quality, Beauty, and Satisfaction with every purchase."
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  name="sectionDescription"
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

export default Testimonials;
