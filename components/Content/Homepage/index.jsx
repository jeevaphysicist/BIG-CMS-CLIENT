"use client"
import { Fragment, useEffect, useState } from "react";
import EditSections from "./EditSections";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import { handleChangeModuleStatus, handleGetModuleList } from "@/API/api";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const Index = () => {
  
  const [homePage, setHomePage] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [list,setList] = useState([]);

  const itemsClasses = {
                        table:" bg-white  ",
                        thead:"bg-white border-b-1 ",
                        tbody:"",
                        tfoot:"",
                        tc:"",
                        tr:"bg-[#F9FAFB] ",
                        th:"bg-white font-medium  ",
                        td:"bg-[#F9FAFB] font-regular border-b-1 text-[#0A1215]"
                  }
  useEffect(()=>{
    fetchList();
  },[])

  const fetchList =async ()=>{
       try {
           const response = await handleGetModuleList(`homepage`);
           if(response.status >= 200 && response.status <= 209){
            setList(response.data.data);
           }
           else{
            setList([])
           }
       } catch (error) {
        setList([])
       }
  }

 
 
  const handleHomepage = () => {
    setHomePage(!homePage);
  };

  const handleChangeStatus = async (id)=>{
        try {
          const response = await handleChangeModuleStatus(id);
          // console.log("response",response);
          if(response.status >= 200 && response.status <= 209){
            fetchList();
            toast.success(response.data.message);
           }
          else{
           toast.error(response.response.data.message);
          }
        } catch (error) {
          // console.log("error",error);
          toast.error('Internal Server Error');
        }
  }


  // console.log("list",list);

  return (
    <Fragment>
      {homePage ? (
        <div className=" p-5 no-scrollbar">
          <h2 className="font-semibold text-black text-[20px]">Homepage:</h2>
          <p className="text-[#4A5367] font-regular text-[16px] mb-8">Edit Your Homepage</p>
          {
            list?.length > 0 ?
          <div className="w-[100%] overflow-x-auto rounded-[10px] border no-scrollbar ">
          <Table radius="20px" classNames={itemsClasses} removeWrapper aria-label="Example static border collection table">
          <TableHeader className="bg-white">
            <TableColumn><span className="flex items-center justify-start gap-3">Name<IoArrowDown /></span></TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            {
              list.map((item,index)=>
              <TableRow key={`home_row_${index}`}>
              <TableCell><p className="text-nowrap">{item.moduleName}</p></TableCell>
              <TableCell><p className="text-balance w-[200px]">-</p></TableCell>
              <TableCell>
                {
                item.moduleStatus ?
                <span className="flex items-center w-[100px] -ml-2 justify-center gap-2 px-2  rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]"><span className="w-2 h-2 rounded-full bg-[#17B26A]" />Active</span>
                 :
                <span className="flex items-center w-[100px] -ml-2 justify-center gap-2 px-2  rounded-full py-1 border-2 border-[#D0D5DD] bg-[#fff]"><span className="w-2 h-2 rounded-full bg-[red]" />InActive</span>
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-5">
                <Switch 
                size="sm"
                isSelected={item.moduleStatus}
                onChange={(e) => {handleChangeStatus(item._id)}}
                 aria-label="Automatic updates"/>
                <button onClick={handleHomepage} className="text-[20px] text-[#475467]"><FiEdit2 /></button>
                </div>
              </TableCell>
            </TableRow>
              )
            }
           
          </TableBody>
          </Table>
          </div>
          :
          <Loading />
          
          }
        </div>
      ) : (
        <EditSections handleHomepage={handleHomepage} />
      )}
    </Fragment>
  );
};

export default Index;
