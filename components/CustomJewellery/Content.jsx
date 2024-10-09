/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { FiSave } from "react-icons/fi";
import RequiredSymbol from "../Content/RequiredSymbol";
import { toast } from "react-toastify";
import { handleUpdateCustomJewelry } from "@/API/api";

const Content = ({
  title,
  fetchData,
  sectionData,
  handleCustomJeweleryPage,
}) => {
  const [formData, setFormData] = useState({
    description: "",
  });

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      description: sectionData.content?.description,
    }));
  }, [sectionData]);

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;

    if (formData.description === "" || formData.description === null) {
      newerrors.description = "Description is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    console.log("Form submitted with data:", formData);

    let bodyData = {
      content: {
        description: formData.description,
      },
    };

    // console.log("body data", bodyData);
    let response;
    try {
      setLoading(true);
      response = await handleUpdateCustomJewelry(
        bodyData,
        sectionData._id,
        true
      );

      // console.log("response",response);
      if (response.status >= 200 && response.status <= 209) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
              <div className="w-[100%]">
                <h2 className="lg:text-[22px] text-[18px] font-semibold">
                  Guidelines
                </h2>
                <p className="text-black/50 font-semibold">
                  You can edit this description
                </p>
                <div className="text-[#4A5367] lg:text-[16px] text-[12px]">
                  <p>
                    In our exclusive custom jewelry experience, elevate your
                    style with the freedom to personalize every detail. Begin by
                    selecting from a stunning array of gemstones, each carrying
                    its own distinctive charm. Next, explore our meticulously
                    crafted semi-mounts, designed to seamlessly complement your
                    chosen gemstone, ensuring a match as unique as your
                    individuality. From vibrant amethysts to captivating
                    sapphires, our customization options extend to an array of
                    gemstones, enabling you to curate a piece that resonates
                    with your personal style
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="md:w-[60%] overflow-y-auto no-scrollbar mt-5 md:mt-4">
            {/* Banner */}

            <div className="flex flex-col gap-3">
              <label
                htmlFor="explore_desc"
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
                id="explore_desc"
                className="no-scrollbar"
                placeholder="In our exclusive custom jewelry experience, elevate your style with the freedom to personalize every detail. Begin by selecting from a stunning array of gemstones, each carrying its own distinctive charm. Next, explore our meticulously crafted semi-mounts, designed to seamlessly complement your chosen gemstone, ensuring a match as unique as your individuality. From vibrant amethysts to captivating 
sapphires, our customization options extend to an array of gemstones, enabling you to curate a piece 
that resonates with your personal style. Whether you're customizing rings for a special occasion or 
creating a timeless piece for everyday wear, our step-by-step process empowers you to bring your 
vision to life. Say goodbye to off-the-shelf choices and embrace the art of personalized adornment 
with our bespoke jewelry design. "
                variant="bordered"
                size="lg"
                radius="sm"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        {/* Save and cancel buttons */}
        <div className="w-full sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleCustomJeweleryPage}
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

export default Content;
