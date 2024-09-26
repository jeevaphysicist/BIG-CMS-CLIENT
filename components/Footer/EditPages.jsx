/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import RequiredSymbol from "../Content/RequiredSymbol";

import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FiSave } from "react-icons/fi";

const EditPages = ({ handleFooterPage, selectedCategory }) => {
  const [formData, setFormData] = useState({
    footerCategory: "",
    footerItemTitle: "",
    footerItemLink: "",
    footerItemCorrespondingPage: "",
    moduleId: null,
  });

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
        footerCategory: selectedCategory,
      }));
    }
  }, [selectedCategory]);

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.footerCategory === "" || formData.footerCategory === null) {
      newerrors.footerCategory = "Footer Category is required";
      has = true;
    }
    if (formData.footerItemTitle === "" || formData.footerItemTitle === null) {
      newerrors.footerItemTitle = "Footer Title is required";
      has = true;
    }
    if (formData.footerItemLink === "" || formData.footerItemLink === null) {
      newerrors.footerItemLink = "Footer Link is required";
      has = true;
    }
    if (
      formData.footerItemCorrespondingPage === "" ||
      formData.footerItemCorrespondingPage === null
    ) {
      newerrors.footerItemCorrespondingPage = "Corresponding Page is required";
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
        <div className="w-full md:h-20  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
          <div className="flex md:flex-row flex-col gap-4 justify-between">
            <div>
              <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
                Add New Footer Item
              </h2>
              <p className="text-[#4A5367] md:text-[14px] text-[12px]">
                Seamlessly Add New Footer Item
              </p>
            </div>
            <Tabs aria-label="Options">
              <Tab key="draft" title="Draft"></Tab>
              <Tab key="publish" title="Publish"></Tab>
            </Tabs>
          </div>
        </div>
        <div className="pt-2 no-scrollbar md:min-h-[75vh]">
          <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
            <div className="w-[100%] grid md:grid-cols-2 gap-y-6 gap-x-10 md:px-8 px-4">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="category"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Select Footer Category
                  <RequiredSymbol />{" "}
                  {errors.footerCategory && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.footerCategory}
                    </span>
                  )}
                </label>
                <select
                  className=" h-[46px] rounded-[8px] border-2 border-[#D0D5DD] px-[10px] cursor-pointer"
                  aria-label="Select section to edit"
                  value={formData.footerCategory}
                  onChange={handleFormChange}
                  name="footerCategory"
                  disabled={true}
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
                  htmlFor="title"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Footer Item Title
                  <RequiredSymbol />{" "}
                  {errors.footerItemTitle && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.footerItemTitle}
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
                  name="footerItemTitle"
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="link"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Link
                  <RequiredSymbol />{" "}
                  {errors.footerItemLink && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.footerItemLink}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  id="link"
                  variant="bordered"
                  placeholder="bit.ly/1213"
                  size="lg"
                  radius="sm"
                  name="footerItemLink"
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="page"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Corresponding Page
                  <RequiredSymbol />{" "}
                  {errors.footerItemCorrespondingPage && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.footerItemCorrespondingPage}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  id="page"
                  variant="bordered"
                  placeholder="Rings"
                  size="lg"
                  radius="sm"
                  name="footerItemCorrespondingPage"
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
export default EditPages;
