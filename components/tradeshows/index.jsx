'use client'
import React, { Fragment, useState ,useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FiSearch } from 'react-icons/fi'
import TradeshowList from './TradeshowList'
import AddEditTradeShow from './AddEditTradeShow'
import ExploreGemStones from './ExploreGemStones'
import Faqs from './Faqs'
import { handleGetTradeshowList } from '@/API/api'
import { toast } from 'react-toastify'

const index = () => {
  const [isAddEdit,setIsAddEdit] = useState({
    status:false,
    type:"create"
  });
  const [selectSection,setSelectSection] = useState('trade-show-list');
  const [tradeshowList,setTradeshowList] = useState([]);
  const [tradeShowLoading,setTradeShowLoading] = useState(false);
  const [editData,setEditData] = useState({});

  const handleAddEdit = ()=>{
      let status = !isAddEdit.status;
      setIsAddEdit(prev=>({...prev,status:status}));
  }
  const handleType = (type)=>{
     setIsAddEdit(prev=>({...prev,type:type}));
     if(type === "create"){
       setEditData({});
     }
  }
  const handleSection = (e)=>{
        setSelectSection(e.target.value);
  }
  const handleClose = ()=>{
    setIsAddEdit(prev=>({...prev,status:false}));
  }

  useEffect(()=>{
    fetchTradeShowList();
  },[])

  const fetchTradeShowList = async()=>{
        try {
          setTradeShowLoading(true);
          const response = await handleGetTradeshowList();
          if(response.status >= 200 && response.status <= 209){
            setTradeshowList(response.data);
          }
          else{
            toast.error("Failed to fetch tradeshow list !");
            setTradeshowList([]);
          }          
        } catch (error) {
            toast.error(error.message);
            setTradeshowList([]);
        }
        finally{
            setTradeShowLoading(false);
        }
  }

  const handleSetEditDATA = (editdata)=>{
        setEditData(editdata);
  }

  return (
    <Fragment>
      {
        !isAddEdit.status ?
     <section className='w-[100%] space-y-3'>
         <div className='sticky top-0 z-20 bg-white space-y-3'>
         <div className="flex items-center justify-between px-5 pt-5 w-[100%]">
            <div className="flex flex-col items-start justify-start">
              <h1 className="flex text-[#0A1215] font-medium text-[20px]">
                Tradeshow
              </h1>
              <p className="text-[#4A5367]">Select Your Section below and Edit the respective section.</p>
            </div>
            <button
              className="bg-[#2761E5] rounded-[10px] text-white px-5 py-2 flex items-center justify-center gap-1"
              onClick={()=>{handleAddEdit();handleType('create');}}
            >
              <CiCirclePlus />
              Add New TradeShow
            </button>
          </div>
         <div className="flex items-center gap-10 justify-between px-5  w-[100%]">
           <div className='flex items-center gap-3 w-[100%]'>
             <p className='text-nowrap'>Select your Section</p>
             <select
              className="w-full py-2 rounded-[8px] border-1 border-[#D0D5DD] px-[10px] cursor-pointer"
              name=""
              id=""
              value={selectSection}
              onChange={handleSection}
              >
                <option value={'trade-show-list'}>Tradeshow listing (section 1 )</option>
                <option value={'explore-gemstones'}>Explore Gemstones (section 2 )</option>
                <option value={'faqs'}>Frequently Asked Questions (section 3 )</option>
              </select>
           </div>
           <div className="flex w-[60%] relative items-center justify-end">
           <div className=' flex relative items-center w-[100%]  '>
            <FiSearch className="absolute top-3 left-5 text-[20px] text-[#667085]" />
            <input
              type="search"
              placeholder="Search"
              className="border-1 pl-12 py-2 pr-5 w-[100%]  border-[#D0D5DD] rounded-[10px]"
            />
            </div>
          </div>
         </div>
         <div className='h-[1px] w-[100%] bg-[#D7D7D7]'/>
         </div>
         <div>
          {
            selectSection === 'trade-show-list' &&
           <TradeshowList fetchData={fetchTradeShowList} handleSetEditDATA={handleSetEditDATA} isLoading={tradeShowLoading} tradeshowList={tradeshowList} handleType={handleType} handleAddEdit={handleAddEdit} />
          }
          {
            selectSection === 'explore-gemstones' &&
           <ExploreGemStones  handleClose={handleClose} />
          }
          {
            selectSection === 'faqs' &&
           <Faqs  handleClose={handleClose} />
          }
         </div>
     </section>
     :
     <div>
         <AddEditTradeShow fetchData={fetchTradeShowList} editData={editData} handleAddEdit={handleAddEdit} type={isAddEdit.type} />
     </div>
      }
     </Fragment>
  )
}

export default index