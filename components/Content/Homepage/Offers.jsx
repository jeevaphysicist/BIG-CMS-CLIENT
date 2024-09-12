/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import ImageUpload from "../ImageUpload";
import { Button, Input, Switch } from "@nextui-org/react";
import banner1 from "../../../assets/image 12.png";
import banner2 from "../../../assets/image 2.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const Offers = ({ handleHomepage }) => {
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
      <section className="w-full md:h-full md:px-8 px-2 space-y-6">
        {/* Banner 1 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 619px X 578px.</p>
                  <p className="md:mt-4 mt-2">
                    You can edit the Banner title, Description and Call to
                    action in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={'/images/image 12.png'} alt="banner1" />
              </div>
            </div>
          </div>
          <div className="md:w-[60%] flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor=""
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 1
                <RequiredSymbol />
              </label>
              <ImageUpload onImageSelect={handleImageSelect} />
              {imagePreview && <img src={imagePreview} alt="banner image" />}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_title"
                placeholder="Luxe Abundance"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_desc"
                placeholder="15% DISCOUNT ON ALL THE DIAMOND RINGS"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_link"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Link
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_link"
                placeholder="https://www.figma.com/design/Bi3Cq4u4JLjcGSXi2"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label
                  htmlFor="coupon"
                  className="md:text-[18px] text-[16px] gilroy-medium"
                >
                  Enable Coupon
                </label>
                <Switch defaultSelected aria-label="Automatic updates" />
              </div>
              <div className="w-full md:flex md:gap-4 gap-2 space-y-4 md:space-y-0">
                <div className="w-full space-y-2">
                  <label
                    htmlFor="code"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    Code
                  </label>
                  <Input
                    type="text"
                    id="code"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
                <div className="w-full space-y-2">
                  <label
                    htmlFor="add_disc"
                    className="md:text-[18px] text-[16px] gilroy-medium flex justify-between"
                  >
                    Additional Discount
                    <Switch defaultSelected aria-label="Automatic updates" />
                  </label>
                  <Input
                    type="text"
                    id="add_disc"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner 2 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-[320px] rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center mt-10">
            <div className="w-full">
              <h2 className="lg:text-[22px] text-[18px] font-semibold">
                Guidelines
              </h2>
              <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                <p>The Following Banner Dimensions are 619px X 284px.</p>
                <p className="lg:my-3 my-2">
                  You can edit the Banner title, Description and Call to action
                  in the edit section.
                </p>
              </div>
            </div>
            <div>
              <img src={'/images/image 2.png'} alt="banner2" />
            </div>
          </div>
          <div className="md:w-[60%] flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor=""
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 2
                <RequiredSymbol />
              </label>
              <ImageUpload onImageSelect={handleImageSelect} />
              {imagePreview && <img src={imagePreview} alt="banner image" />}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_title1"
                placeholder="Gemstone name"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_desc1"
                placeholder="Gemstone type"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label htmlFor="timer" className="text-[18px] gilroy-medium">
                  Enable Button
                </label>
                <Switch defaultSelected aria-label="Automatic updates" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="btn_content"
                className="md:text-[18px] text-[16px] gilroy-medium"
              >
                Banner Content
              </label>
              <Input
                type="text"
                id="btn_content"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="button_link1"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Button Link
              </label>
              <Input
                type="text"
                id="button_link1"
                placeholder=""
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex items-center gap-4 sticky">
              <div className="w-full">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 619px X 284px</p>
                  <p className="lg:my-3 my-2">
                    You can edit the Banner title, Description and Call to
                    action in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={'/images/image 2.png'} alt="banner2" />
              </div>
            </div>
          </div>
          <div className="md:w-[60%] flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner3"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 3
                <RequiredSymbol />
              </label>
              <ImageUpload onImageSelect={handleImageSelect} />
              {imagePreview && <img src={imagePreview} alt="banner image" />}
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_title2"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Title
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_title2"
                placeholder="Gemstone name"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc2"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner Description
                <RequiredSymbol />
              </label>
              <Input
                type="text"
                id="banner_desc2"
                placeholder="Gomstone type"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3">
                <label htmlFor="timer" className="text-[18px] gilroy-medium">
                  Enable Button
                </label>
                <Switch defaultSelected aria-label="Automatic updates" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="btn_content1"
                className="md:text-[18px] text-[16px] gilroy-medium"
              >
                Banner Content
              </label>
              <Input
                type="text"
                id="btn_content1"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="button_link2"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Button Link
              </label>
              <Input
                type="text"
                id="button_link2"
                placeholder=""
                variant="bordered"
                size="lg"
                radius="sm"
              />
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

export default Offers;
