/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input } from "@nextui-org/react";
import giftImg from "../../../assets/image 11.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";

const Gifts = ({ handleHomepage }) => {
  const [formData, setFormData] = useState({
    gift1: "",
    title1: "",
    redirectionLink1: "",
    gift2: "",
    title2: "",
    redirectionLink2: "",
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
    if (formData.gift1 === "" || formData.gift1 === null) {
      newerrors.gift1 = "Gift 1 is required";
      has = true;
    }
    if (formData.gift2 === "" || formData.gift2 === null) {
      newerrors.gift2 = "Gift 2 is required";
      has = true;
    }
    if (formData.title1 === "" || formData.title1 === null) {
      newerrors.title1 = "Title is required";
      has = true;
    }
    if (formData.title2 === "" || formData.title2 === null) {
      newerrors.title2 = "Title is required";
      has = true;
    }
    if (
      formData.redirectionLink1 === "" ||
      formData.redirectionLink1 === null
    ) {
      newerrors.redirectionLink1 = "Redirection Link is required";
      has = true;
    }
    if (
      formData.redirectionLink2 === "" ||
      formData.redirectionLink2 === null
    ) {
      newerrors.redirectionLink2 = "Redirection Link is required";
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
                    {errors.gift1 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.gift1}
                      </span>
                    )}
                  </label>
                  <DragAndDropImage
                    id="gift1"
                    label="gift"
                    accept={`images/*`}
                    width={487}
                    height={410}
                    onImageSelect={handleImageSelect}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title1 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title1}
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
                    name="title1"
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
                    {errors.redirectionLink1 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.redirectionLink1}
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
                    name="redirectionLink1"
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* Gifts 2 */}
              <div className=" flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gift1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Gift 2
                    <RequiredSymbol />
                    {errors.gift2 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.gift2}
                      </span>
                    )}{" "}
                  </label>
                  <DragAndDropImage
                    id="gift2"
                    label="gift"
                    accept={`images/*`}
                    width={487}
                    height={410}
                    onImageSelect={handleImageSelect}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_title1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                    {errors.title2 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.title2}
                      </span>
                    )}{" "}
                  </label>
                  <Input
                    type="text"
                    id="gifts_title1"
                    placeholder="Valentine Gifts"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    name="title2"
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
                    {errors.redirectionLink2 && (
                      <span className="font-regular text-[12px] text-red-600">
                        {errors.redirectionLink2}
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
                    name="redirectionLink2"
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
export default Gifts;
