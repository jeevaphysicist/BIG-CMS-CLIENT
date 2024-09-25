/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import DragAndDropImage from "../DragDropImage";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../RequiredSymbol";
import { validateImageDimensions } from "@/lib/imageValidator";
import { toast } from "react-toastify";
import { FormateImageURL } from "@/lib/FormateImageURL";

const ContentBox = ({ handleCategoryPage }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    moduleId: null,
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelect = async (file, width, height, banner) => {
    try {
      await validateImageDimensions(file, width, height);
      if (file) {
        setFormData((prevData) => ({ ...prevData, [banner]: file }));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;

    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Title is required";
      has = true;
    }
    if (formData.description === "" || formData.description === null) {
      newerrors.description = "Description is required";
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
        className="w-full md:h-full md:px-8 px-2 space-y-6 relative"
      >
        <div className="w-full md:h-full flex flex-col gap-8 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="section_title"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Title
                <RequiredSymbol />
                {errors.title && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.title}
                  </span>
                )}
              </label>
              <Input
                type="text"
                id="section_title"
                placeholder="Buy the Gemstones Collection now"
                variant="bordered"
                size="lg"
                radius="sm"
                name="title"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="banner_desc"
                className="md:text-[18px] text-[16px] gilroy-medium flex gap-1"
              >
                Description
                <RequiredSymbol />
                {errors.description && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.description}
                  </span>
                )}
              </label>
              <Textarea
                type="text"
                minRows={10}
                id="banner_desc"
                variant="bordered"
                placeholder="Welcome to a world where elegance meets allure, where every piece tells a story of timeless beauty – welcome to our Gemstone Collection at BestInGems! Immerse yourself in the captivating glow of nature's treasures, each Gemstone handpicked to adorn you with a touch of sophistication and a dash of mystique. In the vast landscape of online Jewelry shopping, BestInGems stands as a beacon of Quality and Craftsmanship, offering a curated spectrum of colors and designs that redefine wearable luxury. Whether you seek the timeless allure of Diamonds or the Vibrant Hues of Sapphires, you'll find an exquisite piece that resonates with your style. At BestInGems, we take pride in our commitment to excellence. Each Gemstone undergoes meticulous inspection to meet our stringent standards for brilliance, clarity, and color. Our expert craftsmen transform these precious stones into exquisite Jewelry, ensuring every piece reflects the impeccable quality synonymous with the BestInGems brand. Beyond their aesthetic appeal, our Gemstones hold deep symbolic meanings. From the Pure Brilliance of Diamonds to the protective embrace of Emeralds, each stone carries a unique significance. Buy Gemstone online not just as an accessory but as a personalized expression of your values and aspirations. Who says luxury is reserved for special occasions? Our Gemstone Collection seamlessly blends glamor with everyday wearability. Elevate your daily style effortlessly – from understated elegance to bold statements, there's a Gemstone waiting to complement your unique flair. Looking for the Best Gemstones to add to your collection? Look no further than BestInGems! We offer a wide selection of loose Gemstones for sale, all available to buy online with just a few clicks. Our online Gemstone store is the perfect place to find High-Quality Natural Gemstones online. We carry a variety of Gemstone types, including Rubies, Sapphires, Emeralds, Diamonds, and more. Whether you're a seasoned collector or just starting out, we have something for everyone. Buying Gemstones online has never been easier. Our website is designed to be user-friendly and easy to navigate, so you can quickly find the Gemstones you're looking for. Plus, we offer competitive prices and fast shipping, so you can get your Gemstone delivered right to your doorstep in no time. Discover the perfect Gemstone to accompany you on life's remarkable Journey. unlock the extraordinary and shop the Gemstone Collection now at BestInGems!"
                size="lg"
                radius="sm"
                name="description"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleCategoryPage}
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

export default ContentBox;
