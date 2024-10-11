import React ,{ Fragment } from 'react'
import Card from './card'
import Loading from '../Loading'

const TradeshowList = ({handleAddEdit,fetchData,handleType,handleSetEditDATA ,tradeshowList,isLoading}) => {
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
    { tradeshowList.map((item,index)=>{
        return(
         <Card key={index} data={item} fetchData={fetchData} handleSetEditDATA={handleSetEditDATA} handleAddEdit={handleAddEdit} handleType={handleType}  />            
        )
     })
    }
   </div>
   </Fragment>
  )
}

export default TradeshowList