/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import RequiredSymbol from "../Content/RequiredSymbol";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { handleCreateFooter, handleFooterUpdate } from "@/API/api";

const Editlinks = ({
  selectedCategory,
  handleFooterPage,
  selectedItem,
  type,
  fetchData,
  categoryName
}) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
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

  useEffect(()=>{
    setFormData(prev=>({...prev,
      title: selectedItem?.contents?.title,
      link: selectedItem?.contents?.link,
    }))
  },[selectedItem])

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.title === "" || formData.title === null) {
      newerrors.title = "Link name is required";
      has = true;
    }
    if (formData.link === "" || formData.link === null) {
      newerrors.link = "Link is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }
    try {
      setLoading(true);
      let bodyData = {
           category:selectedCategory,
           name:categoryName,
           contents:{
               title:formData.title,
               link:formData.link
           }
      }
      let response;
      if(type === 'create'){
        response = await handleCreateFooter(bodyData);
      }
      else if(type === 'edit'){
        response = await handleFooterUpdate(selectedItem._id,bodyData); 
      }
     if(response.status>=200 && response.status <= 209){
      fetchData();
      handleFooterPage();
      toast.success(response.data.message || "Save Successfully")
     }
     else{
      toast.error(response.data.data.message);
     }
    } catch (error) {
      toast.error("Failed to Process!");
    }

    // API Call Here

    // console.log("Form submitted with data:", formData);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="h-full w-full">
        <div className="pt-2 no-scrollbar md:min-h-[75vh]">
          <div className="flex items-start lg:pr-5  my-5 justify-between w-[100%] lg:flex-row flex-col ">
            <div className="w-[100%] space-y-6 md:px-8 px-4">
            <div className="flex flex-col gap-3">
                <label
                  htmlFor="title"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Name
                  <RequiredSymbol />{" "}
                  {errors.title && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.title}
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
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="title"
                  className=" text-[16px] font-medium flex gap-1"
                >
                  Link
                  <RequiredSymbol />{" "}
                  {errors.link && (
                    <span className="font-regular text-[12px] text-red-600">
                      {errors.link}
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  minRows={4}
                  id="title"
                  variant="bordered"
                  placeholder="/Rings"
                  size="lg"
                  radius="sm"
                  name="link"
                  value={formData.link}
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
export default Editlinks;
