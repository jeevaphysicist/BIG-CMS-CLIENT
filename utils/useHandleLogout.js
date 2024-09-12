import { LogoutHandler } from '../Redux/Features/userSlice';
import Cookies from 'js-cookie'; 
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export function useHandleLogout() {
    const dispatch = useDispatch();
    const handleLogout = () => {
            console.log('Logging out user');
            // Clear tokens
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            // Dispatch logout action
            dispatch(LogoutHandler());
            toast.info('Session Ended !');
            };

    return handleLogout;
}
