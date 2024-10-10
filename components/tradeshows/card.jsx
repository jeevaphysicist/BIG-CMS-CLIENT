import { Checkbox, Switch } from '@nextui-org/react';
import React ,{useState} from 'react';
import { FiEdit2 } from "react-icons/fi";
import { PiTrashBold } from "react-icons/pi";
import { HiOutlineMapPin } from "react-icons/hi2";
import AlertModel from '../AlertModal';
import { handleDeleteTradeshow, handleUpdateTradeshow, handleUpdateTradeshowStatus } from '@/API/api';
import { toast } from 'react-toastify';

const Card = ({handleAddEdit,fetchData,handleType,handleSetEditDATA,data}) => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [collectID, setCollectID] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await handleDeleteTradeshow(collectID);
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
      setOpenAlertModal(false);
    }
  };

  const UpdateStatus = async (status, id) => {
    try {
      const response = await handleUpdateTradeshowStatus(id,{ status });
      if (response.status >= 200 && response.status <= 209) {
        fetchData();
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  function formatDate(input) {
    const date = new Date(input);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="w-[297px] xl:w-[310px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden border">
      {/* Header with Switch and Icons */}
      <div className="flex justify-between items-center p-3">
        {/* Left Side - Checkbox */}
        {/* <Checkbox /> */}
        <div/>

        {/* Right Side - Switch and Icons */}
        <div className="flex items-center space-x-3">
        <Switch isSelected={data.status === "Active"} onChange={()=>{UpdateStatus(data.status,data._id)}} size='sm' aria-label="Automatic updates"/>
          <div className="flex space-x-3">
            <button onClick={() => { setCollectID(data._id); setOpenAlertModal(true); }} className="text-gray-500 text-[20px] w-5 h-5">
              <PiTrashBold />
            </button>
            <button onClick={()=>{handleSetEditDATA(data);handleAddEdit();handleType('edit')}} className="text-gray-500 text-[20px] w-5 h-5">
             <FiEdit2 />
            </button>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-[#FA0B4F] h-[115px] relative p-4 flex items-center justify-center text-center">
        <p className="text-white font-semibold text-lg">{data.show_from_date} - {data.show_to_date}</p>
        <span className="absolute top-2 z-10 right-2 bg-white text-black text-xs font-bold px-3 py-1 rounded-[5px]">
          {data.type}
        </span>
      </div>

      {/* Location Info */}
      <div className="p-4 ">
        <h2 className="text-gray-800 text-xl font-semibold text-center">{data.show_city}</h2>
        <p className="text-[#161618] my-3 bg-[#F8F8F8]  border py-1 border-[#D3D3D3]  text-center ">{data.booth_number}</p>

        {/* Address */}
        <div className='flex items-start mt-5 justify-start gap-3 w-[100%]'>
         <div className='text-[20px] mt-1'>
         <HiOutlineMapPin />
         </div>
        <p className="text-gray-700 text-start">
          {data.address}
        </p>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button className="w-full bg-[#252525] text-white font-semibold py-2">
            Get show ticket
          </button>
        </div>

        {/* Promoter */}
        <p className="text-gray-600 mt-4 text-center">Promoter: {data.show_promoter}</p>
      </div>

      <div className='h-[1px] w-[100%] bg-[#99999940]'/>

      {/* Footer Status */}
      <div className="flex justify-end items-center p-2 ">
        {
       data.status === "Active" ? 
      <div className="flex justify-end items-center py-1 px-3 border-2 rounded-full border-[#D0D5DD]">
        <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span>
        <span className="text-[#344054]">Active</span>
      </div>
      :
      <div className="flex justify-end items-center py-1 px-3 border-2 rounded-full border-[#D0D5DD]">
        <span className="bg-[#F04438] rounded-full w-2 h-2 mr-2"></span>
        <span className="text-[#344054]">Inactive</span>
      </div>
      }
      </div>
      <AlertModel
        loading={loading}
        isVisible={openAlertModal}
        modeltitle="Delete SitePage"
        message="Are you sure you want to delete this sitepage?"
        onConfirm={handleDelete}
        onCancel={() => setOpenAlertModal(false)}
      />
    </div>
  );
};

export default Card;
