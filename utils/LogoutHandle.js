import Cookies from 'js-cookie';
import { LogoutHandler } from '@/app/Redux/Features/userSlice';
import { toast } from 'react-toastify';

// This function handles the logout process without using hooks.
export function performLogout(dispatch) {
    console.log('Logging out user');
    // Clear tokens
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    // Dispatch logout action
    dispatch(LogoutHandler());
    // toast.info('Session Ended !');
}
