"use client";
import { useState , useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

import ResponsiveTable from "./ResponsiveTable";
import { ErrorBoundary } from "@/components/Layout/ErrorBoundary";
import EditModal from "@/components/EditModal";
import RequiredSymbol from "../RequiredSymbol";
import { Input } from "@nextui-org/react";
import { handleCreateShipping, handleGetShippingList, handleUpdateShipping } from "@/API/api";
import { toast } from "react-toastify";

const initialData = [
  {
    id: "1",
    method: "USPS First Class (No Insurance, Only Tracking)",
    cost: "Free",
    status: "Active",
  },
  {
    id: "2",
    method: "USPS First Class Insured Mail (Insurance and Tracking)",
    cost: "$6.00",
    status: "Active",
  },
  {
    id: "3",
    method: "USPS Priority Mail",
    cost: "$8.00",
    status: "Active",
  },
  {
    id: "4",
    method: "USPS Express Mail",
    cost: "$22.00",
    status: "Active",
  },
  {
    id: "5",
    method: "USPS International First Class Mail",
    cost: "$10.00",
    status: "Active",
  },
  {
    id: "6",
    method: "USPS First Class Insured Mail (Insurance and Tracking)",
    cost: "$6.00",
    status: "Active",
  },
  {
    id: "7",
    method: "USPS Priority Mail",
    cost: "$8.00",
    status: "Active",
  },
  {
    id: "8",
    method: "USPS Express Mail",
    cost: "$22.00",
    status: "Active",
  },
  {
    id: "9",
    method: "USPS International First Class Mail",
    cost: "$10.00",
    status: "Active",
  },

  // ... more data
];

const Index = () => {
  const [isTable, setIsTable] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [formData,setFormData] = useState({
                                    method:"",
                                    cost:"",
                                    })
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectEditData, setSelectEditData] = useState({});
  const [shippingList, setShippingList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [type, setType] = useState('create');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading,setLoading] = useState(false);
  
  const itemsClasses = {
    table: " bg-white  ",
    thead: "bg-white border ",
    tbody: "border",
    tfoot: "",
    tr: "",
    th: "bg-white font-medium w-[100px]  rounded-t-[10px]",
    td: "bg-[#F9FAFB] font-regular text-[#0A1215]",
  };

  const handleShippingModal = () => {
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGuide = () => {
    setIsTable(!isTable);
    let status = !isTable;
    if (status === false) {
      setSelectEditData({});
    }
  };

  const handleType = (value) => {
    setType(value);
    if(value === "create"){
      setFormData((prev)=>({...prev,
                              method:"",
                              cost:""
                            }))
    }
  };

  useEffect(() => {
    fetchShippingList();
  }, []);

  useEffect(() => {
    // If in edit mode, set the selected data for editing
    if (type === 'edit') {
      setSelectEditData(shippingList.find(item => item._id === selectEditData._id));
    }
  }, [shippingList]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(shippingList);
    } else {
      const filtered = shippingList.filter((item) =>
        item.method.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, shippingList]);

  // console.log("shiiping",shippingList);
  // console.log("filter data",filteredData);

  const fetchShippingList = async () => {
    try {
      const response = await handleGetShippingList();
      if (response.status >= 200 && response.status <= 209) {
        setShippingList(response.data);
        setFilteredData(response.data); 
      } else {
        setShippingList([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetEditData = (editdata) => {
    setSelectEditData(editdata);
    setFormData((prev)=>({...prev,
                          method:editdata.method,
                          cost:editdata.cost
                        }))
  };

  const handleVadilation = () => {
    let newerrors = {};
    let has = false;
    if (formData.method === "" || formData.method === null) {
      newerrors.method = "method is required";
      has = true;
    }
    if (formData.cost === "" || formData.cost === null) {
      newerrors.cost = "Cost is required";
      has = true;
    }

    setErrors(newerrors);
    return has;
  };

  const handleSubmit = async () => {   
    let validateResponse = handleVadilation();
    // console.log("validationresponse", validateResponse);
    if (validateResponse) {
      toast.error("Please fill required details correctly !");
      return null;
    }

    // console.log("Form submitted with data:", formData);
    let bodyData = formData;

// console.log("body data", bodyData);
let response ; 
try {
  setLoading(true);
  
  if(type === 'create'){
  response = await handleCreateShipping(bodyData);      
  }
  else if(type === 'edit'){
  response = await handleUpdateShipping(bodyData,selectEditData._id); 
  }
// console.log("response",response);
if (response.status >= 200 && response.status <= 209) {
  let data = response.data;
  toast.success(response.data.message);
  fetchShippingList();
}
else{
  toast.error(response.response.data.message);
}
} catch (error) {
  toast.error(error.message);
} finally {
  setLoading(false);
  setIsModalOpen(false);
}
  };

  return (
    <div className="w-[100%]">
      <div className="w-[100%] p-5">
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-col items-start justify-start">
            <h1 className="flex text-[#0A1215] font-medium text-[20px]">
              Shipping Method
            </h1>
            <p className="text-[#4A5367]">Edit Shipping Method</p>
          </div>
          <button
            className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
            onClick={()=>{
              handleShippingModal();
              handleType('create');
            }
            }
          >
            <CiCirclePlus />
            Add New Shipping Method
          </button>
        </div>
        <div className="flex mt-5 relative items-center justify-start">
          <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
          <input
              type="search"
              placeholder="Search by title"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="border-2 pl-12 py-2 pr-5  border-[#D0D5DD] rounded-[10px]"
            />
        </div>
        <div className="w-[100%] mt-8 overflow-x-auto no-scrollbar ">
          <ResponsiveTable
            fetchData={fetchShippingList}
            handleSetEditData={handleSetEditData}              
            initialData={filteredData}
            searchQuery={searchQuery}
            handleType={handleType}
            handleShippingModal={handleShippingModal}
          />
        </div>
      </div>
      <EditModal
        loading={loading}
        onSubmit={handleSubmit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modaltitle="Add New Shipping Method"
        subtitle="Seamlessly Add shipping Method"
        buttonname="Save"
      >
        <div className="w-[100%] px-6 py-4 space-y-4">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="method"
              className=" text-[16px] font-medium flex gap-1"
            >
              Method
              <RequiredSymbol />{" "}
              {errors.method && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.method}
                  </span>
                )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="method"
              variant="bordered"
              placeholder="USPS First Class (No Insurance, only Tracking)"
              size="md"
              radius="sm"
              name="method"
              value={formData.method}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="cost"
              className=" text-[16px] font-medium flex gap-1"
            >
              Cost
              <RequiredSymbol />{" "}
              {errors.cost && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.cost}
                  </span>
                )}
            </label>
            <Input
              type="text"
              minRows={4}
              id="cost"
              variant="bordered"
              placeholder="Free"
              size="md"
              radius="sm"
              name="cost"
              value={formData.cost}
              onChange={handleFormChange}
            />
          </div>
        </div>
      </EditModal>
    </div>
  );
};

export default Index;
