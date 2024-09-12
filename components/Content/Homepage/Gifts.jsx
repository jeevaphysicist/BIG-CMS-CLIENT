/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import ImageUpload from "../ImageUpload";
import { Button, Input } from "@nextui-org/react";
import giftImg from "../../../assets/image 11.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const Gifts = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Fragment>
      <section className="w-full md:h-full">
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
                <img src={'/images/image 11.png'} alt="category" />
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
                  </label>
                  <ImageUpload onImageSelect={handleImageSelect} />
                  {imagePreview && (
                    <img src={imagePreview} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_title"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                  </label>
                  <Input
                    type="text"
                    id="gifts_title"
                    placeholder="Valentine Gifts"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_desc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Redirection Link
                    <RequiredSymbol />
                  </label>
                  <Input
                    type="text"
                    id="gifts_desc"
                    placeholder="https://www.figma.com/design/rE0NmfCUn82V6d2h4V6ATC/BIG-Fin?node-id=884-24014&t=UmVz2Vtl3xwTE8gn-1"
                    variant="bordered"
                    size="lg"
                    radius="sm"
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
                  </label>
                  <ImageUpload onImageSelect={handleImageSelect} />
                  {imagePreview && (
                    <img src={imagePreview} alt="banner image" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_title1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Title
                    <RequiredSymbol />
                  </label>
                  <Input
                    type="text"
                    id="gifts_title1"
                    placeholder="Valentine Gifts"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="gifts_desc1"
                    className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
                  >
                    Redirection Link
                    <RequiredSymbol />
                  </label>
                  <Input
                    type="text"
                    id="gifts_desc1"
                    placeholder="https://www.figma.com/design/rE0NmfCUn82V6d2h4V6ATC/BIG-Fin?node-id=884-24014&t=UmVz2Vtl3xwTE8gn-1"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            onClick={handleHomepage}
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
            Save
          </Button>
        </div>
      </section>
    </Fragment>
  );
};
export default Gifts;
