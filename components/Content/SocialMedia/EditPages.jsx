/* eslint-disable react/prop-types */
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { Fragment, useState ,useEffect } from "react";
import RequiredSymbol from "../RequiredSymbol";

import { toast } from "react-toastify";
import { validateImageDimensions } from "@/lib/imageValidator";
import { FiSave } from "react-icons/fi";
import { handleCreateSocialmedia, handleUpdateSocialmedia } from "@/API/api";

const EditPages = ({ handleSocialMedias, type ,fetchData ,editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});

  useEffect(()=>{
      setFormData((prev)=>({...prev
        ,name:editData.name || ""
        ,link:editData.link || ""
      }))
  },[editData])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (
      formData.name === "" ||
      formData.name === null
    ) {
      newerrors.name = "Social Media Title is required";
      has = true;
    }
    if (formData.link === "" || formData.link === null) {
      newerrors.link = "social Media Link is required";
      has = true;
    }

    setError(newerrors);
    return has;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    let bodyData = formData

  let response ; 
  
  try {
    setLoading(true);

    if(type === 'create'){
    response = await handleCreateSocialmedia(bodyData);      
    }
    else if(type === 'edit'){
    response = await handleUpdateSocialmedia(bodyData,editData._id); 
    }
  // console.log("response",response);
  if (response.status >= 200 && response.status <= 209) {
    let data = response.data;
    toast.success(response.data.message);
    fetchData();
    handleSocialMedias();
  }
  else{
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
      <form onSubmit={handleSubmit} className="h-full w-full">
        <div className="w-full md:h-20  overflow-x-hidden no-scrollbar flex flex-col gap-2 px-4 pt-4 sticky top-0 z-30 bg-white justify-between">
          <div className="flex md:flex-row flex-col gap-4 justify-between">
            <div>
              <h2 className="font-semibold text-black md:text-[20px] text-[16px]">
              {type === "create" ? "Add New":"Edit"} Social Link
              </h2>
              <p className="text-[#4A5367] md:text-[14px] text-[12px]">
                Enter Page Contents
              </p>
            </div>
            <Tabs aria-label="Options">
              <Tab key="draft" name="Draft"></Tab>
              <Tab key="publish" name="Publish"></Tab>
            </Tabs>
          </div>
        </div>
        <div className="pt-2 no-scrollbar md:min-h-[75vh]">
          <div className="flex flex-col md:px-8 px-4 my-3 pt-2 gap-3">
            <label
              htmlFor="medianame"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Social Media Title
              <RequiredSymbol />
              {errors.name && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.name}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="medianame"
              variant="bordered"
              placeholder="Facebook"
              size="lg"
              radius="sm"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col md:px-8 px-4 my-3 pt-2 gap-3">
            <label
              htmlFor="link"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Link
              <RequiredSymbol />
              {errors.link && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.link}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="link"
              variant="bordered"
              placeholder="facebook.com"
              size="lg"
              radius="sm"
              name="link"
              value={formData.link}
              onChange={handleFormChange}
            />
          </div>
        </div>
        {/* Save and cancel buttons */}
        <div className="w-full  sticky bottom-0 py-3 bg-white z-30 flex justify-end gap-4 pr-5">
          <Button
            type="button"
            onClick={handleSocialMedias}
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
