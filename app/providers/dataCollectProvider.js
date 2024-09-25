'use client';

import { GetCookies } from '@/utils/GetCookies';
import { useEffect } from 'react';
import { handleGetTemplate } from "@/API/api";
import { useDispatch } from "react-redux";
import {  UpdateTemplatesHandler } from "@/app/Redux/Features/userSlice";

export const DataCollectProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchTemplates();    
  }, []);

  const fetchTemplates = async ()=>{
      try {
          const response = await handleGetTemplate();
          if(response.status >= 200 && response.status <= 209){
            let data = response.data;
            dispatch(UpdateTemplatesHandler(data));
          }          
          // console.log("response",response);
      } catch (error) {
        //  console.log("error",error);
      }
  }


  return children;
};
