import { Button, Input, Switch, Tab, Tabs } from '@nextui-org/react';
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { RiSettings5Fill } from 'react-icons/ri';
import RequiredSymbol from '../Content/RequiredSymbol';
import { FiSave } from 'react-icons/fi';

const AddEditTradeShow = ({type,handleAddEdit}) => {
  return (
    <div className='relative'>
         <div className=' bg-white space-y-3'>
         <div className="flex items-center justify-between px-5 pt-5 w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] items-end gap-3 font-medium text-[20px]">
               {type === "create" ? "Add new":"Edit"} Tradeshow Listing <span className='h-5 w-5 text-[14px] bg-[#E5E5E5] rounded-md flex items-center justify-center bg-[]'><RiSettings5Fill /></span>
              </h1>
              <p className="text-[#4A5367]">Seamlessly {type === "create" ? "Add new":"Edit"} Tradeshow</p>
            </div>
            <Tabs aria-label="Options">
              <Tab key="draft" title="Draft"></Tab>
              <Tab key="publish" title="Publish"></Tab>
            </Tabs>
          </div>   
         </div>
         <div className='flex flex-col px-5 gap-5 items-center w-[100%] justify-center'>
            <div className='flex flex-col md:flex-row w-[100%] gap-5 items-center justify-between'>
               
                <div className="flex flex-col  my-3 pt-2 gap-3 w-[100%]">
                <label
                    htmlFor="showCity"
                    className="text-[16px]  font-semibold flex gap-1"
                >
                Show City
                <RequiredSymbol />
                {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
              </label>
              <Input
                type="text"
                minRows={4}
                id="showCity"
                variant="bordered"
                placeholder="Chicago, IL"
                size="lg"
                radius="sm"
                name="showCity"
                className='w-[100%]'
                // onChange={handleFormChange}
              />
                </div>
                <div className="flex flex-col  my-3 pt-2 gap-3 w-[100%]">
                <label
                    htmlFor="showPromoter"
                    className="text-[16px]  font-semibold flex gap-1"
                >
                Show Promoter
                <RequiredSymbol />
                {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
              </label>
              <Input
                type="text"
                minRows={4}
                id="showPromoter"
                variant="bordered"
                placeholder="Intergem"
                size="lg"
                radius="sm"
                name="showPromoter"
                className='w-[100%]'
                // onChange={handleFormChange}
              />
                </div>                
            </div>
            <div className='flex flex-col md:flex-row w-[100%] gap-5 items-center justify-between'>
               
                <div className="flex flex-col   gap-3 w-[100%]">
                <label
                    htmlFor="showFromDate"
                    className="text-[16px]  font-semibold flex gap-1"
                >
                Show From Date
                <RequiredSymbol />
                {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
              </label>
              <Input
                type="text"
                minRows={4}
                id="showFromDate"
                variant="bordered"
                placeholder="Feb 23, 2024"
                size="lg"
                radius="sm"
                name="showFromDate"
                className='w-[100%]'
                // onChange={handleFormChange}
              />
                </div>
                <div className="flex flex-col  gap-3 w-[100%]">
                <label
                    htmlFor="showToDate"
                    className="text-[16px]  font-semibold flex gap-1"
                >
                Show To Date
                <RequiredSymbol />
                {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
              </label>
              <Input
                type="text"
                minRows={4}
                id="showToDate"
                variant="bordered"
                placeholder="Feb 25, 2024"
                size="lg"
                radius="sm"
                name="showToDate"
                className='w-[100%]'
                // onChange={handleFormChange}
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
                {/* {errors.introduction && (
                  <span className="font-regular text-[12px] text-red-600">
                    {errors.introduction}
                  </span>
                )} */}
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
                className='w-[100%]'
                // onChange={handleFormChange}
              />
                </div>
                <div className='flex flex-col md:flex-row w-[100%] gap-5 items-center justify-between'>
               
               <div className="flex flex-col   gap-3 w-[100%]">
               <label
                   htmlFor="type"
                   className="text-[16px]  font-semibold flex gap-1"
               >
               Type
               <RequiredSymbol />
               {/* {errors.introduction && (
                 <span className="font-regular text-[12px] text-red-600">
                   {errors.introduction}
                 </span>
               )} */}
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
               className='w-[100%]'
               // onChange={handleFormChange}
             />
               </div>
               <div className="flex flex-col  gap-3 w-[100%]">
               <label
                   htmlFor="booth"
                   className="text-[16px]  font-semibold flex gap-1"
               >
              Booth #
               <RequiredSymbol />
               {/* {errors.introduction && (
                 <span className="font-regular text-[12px] text-red-600">
                   {errors.introduction}
                 </span>
               )} */}
             </label>
             <Input
               type="text"
               minRows={4}
               id="booth"
               variant="bordered"
               placeholder="Booth #132 & 134"
               size="lg"
               radius="sm"
               name="booth"
               className='w-[100%]'
               // onChange={handleFormChange}
             />
               </div>                
           </div>
           <div className="flex flex-row  gap-3 w-[100%]">
               <label
                   htmlFor="showTicket"
                   className="text-[16px]  font-semibold flex gap-1"
               >
              Show Ticket
               {/* {errors.introduction && (
                 <span className="font-regular text-[12px] text-red-600">
                   {errors.introduction}
                 </span>
               )} */}
             </label>
             <Switch id='showTicket' defaultSelected size='sm' />
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
            className="font-semibold text-white"
            startContent={<FiSave size={20} />}
          >
            Save
          </Button>
        </div>
    </div>
  )
}

export default AddEditTradeShow