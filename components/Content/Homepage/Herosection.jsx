/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import ImageUpload from "../ImageUpload";
import { Button, Input, Switch } from "@nextui-org/react";
import banner2 from "../../../assets/image 2.png";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";

const Herosection = ({ handleHomepage }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData,setFormData]= useState({
         
  });

  const handleChange = (e)=>{
       let  {name,value} = e.target.value; 
  }

  const handleImageSelect = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };


  return (
    <Fragment>
      <section className="w-full md:px-8 px-2 space-y-6">
        {/* Banner 1 */}
        <div className="w-[100%] md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex  items-center gap-4 sticky">
              <div className="w-[60%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 318px X 548px</p>
                  <p className="md:mt-5 mt-2">
                    You can edit the Banner title, Description and Call to
                    action in the edit section.
                  </p>
                </div>
              </div>
              <div>
                <img src={'/images/image 1.png'} alt="banner1" />
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
              <ImageUpload
                onImageSelect={handleImageSelect}
                label="Banner Image"
              />
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
                placeholder="Engagement Rings"
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
                placeholder="Start the journey toward finding your perfect ring"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="timer"
                  className="md:text-[18px] text-[16px] gilroy-medium"
                >
                  Enable Timer
                </label>
                <Switch defaultSelected aria-label="Automatic updates" />
              </div>
              <div className="w-full flex justify-between md:gap-4 gap-2">
                <div className="grid gap-2">
                  <label
                    htmlFor="days"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    Days
                  </label>
                  <Input
                    type="text"
                    id="banner_desc"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="days"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    Hours
                  </label>
                  <Input
                    type="text"
                    id="banner_desc"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="days"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    Minutes
                  </label>
                  <Input
                    type="text"
                    id="banner_desc"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="days"
                    className="md:text-[18px] text-[16px] gilroy-medium"
                  >
                    Seconds
                  </label>
                  <Input
                    type="text"
                    id="banner_desc"
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
        <div className="w-full md:flex md:flex-row-reverse gap-8">
          <div className="md:w-[40%] h-full py-5 md:pt-10">
            <div className="rounded-[12px] border-2 p-2 md:p-4 flex flex-col items-center gap-4 sticky">
              <div className="w-full">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>The Following Banner Dimensions are 1122px X 318px</p>
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
                htmlFor=""
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Banner 2
                <RequiredSymbol />
              </label>
              <ImageUpload
                onImageSelect={handleImageSelect}
                label="Banner Image"
              />
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
                placeholder="Valentines Day"
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
                placeholder="Enjoy the added benefit of obtaining free shipping within United"
                variant="bordered"
                size="lg"
                radius="sm"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
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

export default Herosection;
