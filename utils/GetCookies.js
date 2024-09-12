import Cookies from "js-cookie"
export const GetCookies = ()=>{
    let accessToken = Cookies.get('access_token');
    let refreshToken = Cookies.get('refresh_token');
    return { accessToken,refreshToken };
}