import { useSelector } from "react-redux"

export const GetCurrentUserDetails = ()=>{       
       const template = useSelector(state=>state.user.template);       
       return { template };
}