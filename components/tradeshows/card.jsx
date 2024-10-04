import { Checkbox, Switch } from '@nextui-org/react';
import React from 'react';
import { FiEdit2 } from "react-icons/fi";
import { PiTrashBold } from "react-icons/pi";
import { HiOutlineMapPin } from "react-icons/hi2";

const Card = ({handleAddEdit,handleType}) => {
  return (
    <div className="w-[297px] xl:w-[310px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden border">
      {/* Header with Switch and Icons */}
      <div className="flex justify-between items-center p-3">
        {/* Left Side - Checkbox */}
        {/* <Checkbox /> */}
        <div/>

        {/* Right Side - Switch and Icons */}
        <div className="flex items-center space-x-3">
        <Switch size='sm' defaultSelected aria-label="Automatic updates"/>
          <div className="flex space-x-3">
            <button className="text-gray-500 text-[20px] w-5 h-5">
              <PiTrashBold />
            </button>
            <button onClick={()=>{handleAddEdit();handleType('edit')}} className="text-gray-500 text-[20px] w-5 h-5">
             <FiEdit2 />
            </button>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-[#FA0B4F] h-[115px] relative p-4 flex items-center justify-center text-center">
        <p className="text-white font-semibold text-lg">Feb 16, 2024 - Feb 18, 2024</p>
        <span className="absolute top-2 z-10 right-2 bg-white text-black text-xs font-bold px-3 py-1 rounded-[5px]">
          Wholesale & Retail
        </span>
      </div>

      {/* Location Info */}
      <div className="p-4 ">
        <h2 className="text-gray-800 text-xl font-semibold text-center">Chantilly, VA</h2>
        <p className="text-[#161618] my-3 bg-[#F8F8F8]  border py-1 border-[#D3D3D3]  text-center ">Booth #162 & 136</p>

        {/* Address */}
        <div className='flex items-start mt-5 justify-start gap-3 w-[100%]'>
         <div className='text-[20px] mt-1'>
         <HiOutlineMapPin />
         </div>
        <p className="text-gray-700 text-start">
          Dulles Expo Center (South Hall), <br />
          4320 Chantilly Shopping Center, Chantilly VA 20151
        </p>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button className="w-full bg-[#252525] text-white font-semibold py-2">
            Get show ticket
          </button>
        </div>

        {/* Promoter */}
        <p className="text-gray-600 mt-4 text-center">Promoter: Intergem</p>
      </div>

      <div className='h-[1px] w-[100%] bg-[#99999940]'/>

      {/* Footer Status */}
      <div className="flex justify-end items-center p-2 ">
        {
            true ? 
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
    </div>
  );
};

export default Card;
