import { Button, Input, Switch, Tab, Tabs } from "@nextui-org/react";
import React, { useState ,useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { RiSettings5Fill } from "react-icons/ri";
import RequiredSymbol from "../Content/RequiredSymbol";
import { FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import { handleCreateTradeshow, handleUpdateTradeshow } from "@/API/api";

const AddEditTradeShow = ({editData, fetchData, type, handleAddEdit }) => {
  const [formData, setFormData] = useState({
    show_city: "",
    show_promoter: "",
    show_from_date: "",
    show_to_date: "",
    address: "",
    type: "",
    booth_number: "",
    status: "Inactive",
  });
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
        setFormData((prev)=>({...prev,
          show_city: editData.show_city ||  "",
          show_promoter: editData.show_promoter || "",
          show_from_date: editData.show_from_date || "",
          show_to_date: editData.show_to_date || "",
          address: editData.address || "",
          type: editData.type || "",
          booth_number: editData.booth_number || "",
          status: editData.status || "Inactive",
        }))
  },[])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    // console.log("field",e.target.checked);
    setFormData((prevData) => ({
      ...prevData,
      status: e.target.checked ? "Active":"Inactive" ,
    }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.show_city === "" || formData.show_city === null) {
      newerrors.show_city = "City is required";
      has = true;
    }
    if (formData.show_promoter === "" || formData.show_promoter === null) {
      newerrors.show_promoter = "Promoter is required";
      has = true;
    }
    if (formData.show_from_date === "" || formData.show_from_date === null) {
      newerrors.show_from_date = "From date is required";
      has = true;
    }
    if (formData.show_to_date === "" || formData.show_to_date === null) {
      newerrors.show_to_date = "To date is required";
      has = true;
    }
    if (formData.address === "" || formData.address === null) {
      newerrors.address = "Address is required";
      has = true;
    }
    if (formData.type === "" || formData.type === null) {
      newerrors.type = "Type is required";
      has = true;
    }
    if (formData.booth_number === "" || formData.booth_number === null) {
      newerrors.booth_number = "booth_number is required";
      has = true;
    }
    if (formData.status === "" || formData.status === null) {
      newerrors.status = "booth_number is required";
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

    let response ; 
    try {
      setLoading(true);
      if(type === 'create'){
      response = await handleCreateTradeshow(formData);      
      }
      else if(type === 'edit'){
      response = await handleUpdateTradeshow(formData,editData._id); 
      }
    // console.log("response",response);
    if (response.status >= 200 && response.status <= 209) {
      let data = response.data;
      toast.success(response.data.message);
      fetchData();
      handleAddEdit();
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
    <form onSubmit={handleSubmit} className="relative">
      <div className=" bg-white space-y-3">
        <div className="flex items-center justify-between px-5 pt-5 w-[100%]">
          <div className="flex flex-col items-start justify-start">
            <h1 className="flex text-[#0A1215] md:items-end gap-3 font-medium text-[20px]">
              {type === "create" ? "Add new" : "Edit"} Tradeshow Listing{" "}
              <span className="h-5 w-5 text-[14px] bg-[#E5E5E5] rounded-md flex items-center justify-center bg-[]">
                <RiSettings5Fill />
              </span>
            </h1>
            <p className="text-[#4A5367]">
              Seamlessly {type === "create" ? "Add new" : "Edit"} Tradeshow
            </p>
          </div>
          <Tabs aria-label="Options">
            <Tab key="draft" title="Draft"></Tab>
            <Tab key="publish" title="Publish"></Tab>
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col px-5 pb-5 gap-5 items-center w-[100%] justify-center">
        <div className="flex flex-col md:flex-row w-[100%] gap-5 items-center justify-between">
          <div className="flex flex-col  mt-3 pt-2 gap-3 w-[100%]">
            <label
              htmlFor="show_city"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Show City
              <RequiredSymbol />
              {errors.show_city && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.show_city}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="show_city"
              variant="bordered"
              placeholder="Chicago, IL"
              size="lg"
              radius="sm"
              name="show_city"
              className="w-[100%]"
              value={formData.show_city}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col  md:mt-3 pt-2 gap-3 w-[100%]">
            <label
              htmlFor="show_promoter"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Show Promoter
              <RequiredSymbol />
              {errors.show_promoter && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.show_promoter}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="show_promoter"
              variant="bordered"
              placeholder="Intergem"
              size="lg"
              radius="sm"
              name="show_promoter"
              className="w-[100%]"
              value={formData.show_promoter}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-[100%] gap-5 items-center justify-between">
          <div className="flex flex-col   gap-3 w-[100%]">
            <label
              htmlFor="show_from_date"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Show From Date
              <RequiredSymbol />
              {errors.show_from_date && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.show_from_date}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="show_from_date"
              variant="bordered"
              placeholder="Feb 23, 2024"
              size="lg"
              radius="sm"
              name="show_from_date"
              className="w-[100%]"
              value={formData.show_from_date}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col  gap-3 w-[100%]">
            <label
              htmlFor="show_to_date"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Show To Date
              <RequiredSymbol />
              {errors.show_to_date && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.show_to_date}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="show_to_date"
              variant="bordered"
              placeholder="Feb 25, 2024"
              size="lg"
              radius="sm"
              name="show_to_date"
              className="w-[100%]"
              value={formData.show_to_date}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="flex flex-col   gap-3 w-[100%]">
          <label
            htmlFor="address"
            className="text-[16px]  font-semibold flex gap-1"
          >
            Address
            <RequiredSymbol />
            {errors.address && (
              <span className="font-regular text-[12px] text-red-600">
                {errors.address}
              </span>
            )}
          </label>
          <Input
            type="text"
            minRows={4}
            id="address"
            variant="bordered"
            placeholder="Donald E. Stephens Convention Center, 5555 North River Road, Rosemont, IL 60018"
            size="lg"
            radius="sm"
            name="address"
            className="w-[100%]"
            value={formData.address}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col md:flex-row w-[100%] gap-5 items-center justify-between">
          <div className="flex flex-col   gap-3 w-[100%]">
            <label
              htmlFor="type"
              className="text-[16px]  font-semibold flex gap-1"
            >
              Type
              <RequiredSymbol />
              {errors.type && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.type}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="type"
              variant="bordered"
              placeholder="Wholesale & Retail"
              size="lg"
              radius="sm"
              name="type"
              className="w-[100%]"
              value={formData.type}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col  gap-3 w-[100%]">
            <label
              htmlFor="booth_number"
              className="text-[16px]  font-semibold flex gap-1"
            >
              booth_number #
              <RequiredSymbol />
              {errors.booth_number && (
                <span className="font-regular text-[12px] text-red-600">
                  {errors.booth_number}
                </span>
              )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="booth_number"
              variant="bordered"
              placeholder="booth_number #132 & 134"
              size="lg"
              radius="sm"
              name="booth_number"
              className="w-[100%]"
              value={formData.booth_number}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="flex flex-row  gap-3 w-[100%]">
          <label
            htmlFor="status"
            className="text-[16px]  font-semibold flex gap-1"
          >
            Show Ticket
            {errors.status && (
              <span className="font-regular text-[12px] text-red-600">
                {errors.status}
              </span>
            )}
          </label>
          <Switch
            isSelected={formData.status === "Active"}
            onChange={(e) => handleSwitchChange(e)}
            aria-label="Show Ticket"
          />
        </div>
      </div>
      {/* Save and cancel buttons */}
      <div className="w-full sticky bottom-0 py-3 px-5 bg-white z-30 flex justify-end gap-4">
        <Button
          type="button"
          onClick={handleAddEdit}
          variant="bordered"
          className="font-semibold"
        >
          Back to list
        </Button>
        <Button
          color="primary"
          type="submit"
          isLoading={loading}
          isDisabled={loading}
          className="font-semibold text-white"
          startContent={loading ? null : <FiSave size={20} />}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddEditTradeShow;
