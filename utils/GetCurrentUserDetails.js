import { useSelector } from "react-redux"

export const GetCurrentUserDetails = ()=>{
       const profile = useSelector(state=>state.user.user);       
       return { profile };
}