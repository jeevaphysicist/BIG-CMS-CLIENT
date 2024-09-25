'use client';

import { GetCookies } from '@/utils/GetCookies';
import { useEffect } from 'react';
import { refreshAccessToken } from '@/API/api';
import { performLogout } from '@/utils/LogoutHandle';
import { store } from '../Redux/Store';

// const handleLogout = () => {
//     const dispatch = store.dispatch; 
//     performLogout(dispatch); 
// };

export const PageLoadProvider = ({ children }) => {
  useEffect(() => {
    // Function to be called on page load
    const handlePageLoad = async () => {
        let {refreshToken} = GetCookies();
        if(refreshToken){
            const refreshed = await refreshAccessToken(); 
            if (!refreshed) {             
                // handleLogout();
            }
        }
      return null;
    };
    handlePageLoad(); 
  }, []);

  return children;
};
