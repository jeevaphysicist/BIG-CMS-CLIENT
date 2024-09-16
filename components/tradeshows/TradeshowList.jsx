import React from 'react'
import Card from './card'

const TradeshowList = ({handleAddEdit,handleType}) => {
  return (
   <div className='flex items-start justify-between flex-wrap w-[100%] py-10 gap-x-4 gap-y-10 '>
    { [1,2,3].map((item,index)=>{
        return(
         <Card handleAddEdit={handleAddEdit} handleType={handleType}  />            
        )
     })
    }
   </div>
  )
}

export default TradeshowList