import Cookies from "js-cookie";

export const SetLoginCredentials = ({accessToken ,refreshToken})=>{
    Cookies.set('access_token', accessToken, { expires: 1/24 });
    Cookies.set('refresh_token', refreshToken, { expires: 7 });
    return null;
}