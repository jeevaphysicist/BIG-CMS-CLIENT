import React, { Fragment, useState, useEffect } from 'react'
import Card from './card'
import Loading from '../Loading'
import { Pagination } from '@nextui-org/react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

const TradeshowList = ({handleAddEdit, fetchData, handleType, handleSetEditDATA, tradeshowList, isLoading}) => {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 20; 
   const totalPages = Math.ceil(tradeshowList.length / itemsPerPage);

   const getCurrentPageData = () => {
     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     return tradeshowList.slice(startIndex, endIndex);
   };

   const handlePreviousPage = () => {
     setCurrentPage((prev) => Math.max(prev - 1, 1));
   };

   const handleNextPage = () => {
     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   };

   if(isLoading){
        return <Loading />
   }
   if(tradeshowList?.length <= 0){
    return (
         <div className="flex item-center justify-center w-[100%]">No Tradeshow List</div>
    )
   }
  return (
    <Fragment>         
      <div className='flex items-start justify-between flex-wrap w-[100%] py-10 gap-x-4 gap-y-10 '>
        { getCurrentPageData().map((item,index) => {
            return(
             <Card key={index} data={item} fetchData={fetchData} handleSetEditDATA={handleSetEditDATA} handleAddEdit={handleAddEdit} handleType={handleType}  />            
            )
         })
        }
      </div>
      <div className="flex rounded-b-[10px] border-l-1 border-r-1 border-b-1 justify-between py-2 px-2 w-[100%] items-center gap-5">
        <button
          className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <LuArrowLeft />
          Previous
        </button>
        <Pagination 
          total={totalPages}
          initialPage={1} 
          page={currentPage} 
          classNames={{
            item: "bg-transparent text-[#475467] font-medium",
            cursor: "bg-[#F9FAFB] text-[#1D2939] font-medium  ",
          }}
          onChange={(page) => setCurrentPage(page)}
        />
        <button
          className="flex active:scale-95 border-1 border-[#D0D5DD] rounded-md font-medium text-[14px] text-[#344054] items-center justify-center px-4 py-2 gap-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <LuArrowRight />
        </button>
      </div>
    </Fragment>
  )
}

export default TradeshowList