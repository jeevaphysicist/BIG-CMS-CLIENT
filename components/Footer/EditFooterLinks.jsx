/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import RequiredSymbol from "../Content/RequiredSymbol";
import { FiSave } from "react-icons/fi";

const EditFooterLinks = ({
  selectedCategory,
  handleFooterPage,
  selectedItem,
}) => {
  const [formData, setFormData] = useState({
    footerLinkName: "",
    footerLink: "",
    moduleId: null,
  });

  console.log("in footer", selectedItem);

  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedCategory) {
      setFormData((prevData) => ({
        ...prevData,
        footerCategory: selectedItem?.name,
      }));
    }
  }, [selectedItem]);

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.footerLinkName === "" || formData.footerLinkName === null) {
      newerrors.footerLinkName = "Link name is required";
      has = true;
    }
    if (formData.footerLink === "" || formData.footerLink === null) {
      newerrors.footerLink = "Link is required";
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
      <form onSubmit={handleSubmit} className="h-full w-full">
        <div className="pt-2 no-scrollbar md:min-h-[75vh]">
          <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
            <div className="w-[100%] space-y-6 md:px-8 px-4">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="category"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Link Name
                  <RequiredSymbol />{" "}
                  {errors.footerLinkName && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.footerLinkName}
                    </span>
                  )}
                </label>
                <select
                  className=" h-[46px] rounded-[8px] border-2 border-[#D0D5DD] px-[10px] cursor-pointer"
                  aria-label="Select section to edit"
                  value={selectedItem.name}
                  onChange={handleFormChange}
                  name="footerLinkName"
                  disabled={true}
                >
                  <option value="Pendant Mount">Pendant Mount</option>
                  <option value="Aquamarine Gemstone">
                    Aquamarine Gemstone
                  </option>
                  <option value="Opal Gemstone">Opal Gemstone</option>
                  <option value="diamond-gemstone">Diamond Gemstone</option>
                  <option value="garnet-gemstone">Garnet Gemstone</option>
                  <option value="emerald-gemstone">Emerald Gemstone</option>
                  <option value="sappire-gemstone">Sappire Gemstone</option>
                  <option value="topaz-gemstone">Topaz Gemstone</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="title"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Link
                  <RequiredSymbol />{" "}
                  {errors.footerLink && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.footerLink}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  minRows={4}
                  id="title"
                  variant="bordered"
                  placeholder="Rings"
                  size="lg"
                  radius="sm"
                  name="footerLink"
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleFooterPage}
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
export default EditFooterLinks;
