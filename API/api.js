import axios from "axios";
import Cookies from "js-cookie";
import { store } from "@/app/Redux/Store";
import { GetCookies } from "@/utils/GetCookies";
import { performLogout } from "@/utils/LogoutHandle";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

let formHeader = {
  "Content-Type": "multipart/form-data",
};

let rawHeader = {
  "Content-Type": "application/json",
};

// Public axios instance (no authorization)
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Public Front end axios instance (no authorization)
const publicFrontendApi = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Private axios instance (with authorization)
const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for privateApi to add access token to headers
privateApi.interceptors.request.use(
  (config) => {
    let { accessToken } = GetCookies();
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

const handleLogout = () => {
  const dispatch = store.dispatch;
  performLogout(dispatch);
};

// Response interceptor for privateApi to handle token refresh
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await refreshAccessToken();
      // console.log("refreshed",refreshed);
      if (refreshed) {
        let { accessToken } = GetCookies();
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return privateApi(originalRequest);
      } else {
        handleLogout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// Function to refresh the access token
export async function refreshAccessToken() {
  let { accessToken, refreshToken } = GetCookies();
  try {
    let formData = convertToFormData({ refresh: refreshToken });
    const response = await publicApi.post("/accounts/auth/refresh/", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.status === 200) {
      accessToken = response.data.access;
      // console.log("accessToken response",response.data);
      Cookies.set("access_token", accessToken, { expires: 1 / 24 });
      return true;
    } else {
      // console.error('Refresh token is invalid');
      return false;
    }
  } catch (error) {
    // console.error('Error refreshing token:', error);
    return false;
  }
}

// S.No 01
// Login Handler
export const handleLogin = async (data) => {
  const formData = convertToFormData(data);
  try {
    const response = await publicApi.post("/accounts/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 02
// Get Template Handler
export const handleGetTemplate = async () => {
  try {
    const response = await publicFrontendApi.get("/templates/template.json", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 03
// Get Create Edit Homepage section Handler
export const handleHomepageCreateEditSection = async (data, isForm) => {
  try {
    const response = await publicApi.post(
      "/api/homepage/create-edit-section",
      data,
      {
        headers: isForm ? formHeader : rawHeader,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 04
// Get Homepage Sections
export const handleGetHomepageSection = async (moduleSlug, sectionSlug) => {
  try {
    const response = await publicApi.get(
      `/api/homepage/section/${moduleSlug}/${sectionSlug}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

//S.NO 05
//Create Ticker
export const handleTickerCreation = async (data) => {
  try {
    const response = await publicApi.post("/api/ticker/create", data);
    return response;
  } catch (error) {
    return error;
  }
};

//S.NO 06
//Get All Tickers
export const handleGetAllTickers = async () => {
  try {
    const response = await publicApi.get("/api/ticker/tickers");
    return response;
  } catch (error) {
    return error;
  }
};

//S.NO 07
//Change ticker status
export const handleTickerStatusChange = async (id, data) => {
  try {
    const response = await publicApi.put(
      `/api/ticker/changeTickerStatus/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

//S.NO 08
//Update Ticker
export const handleTickerUpdate = async (id, data) => {
  try {
    const response = await publicApi.put(`/api/ticker/update/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 09
// Get module List
export const handleGetModuleList = async (moduleSlug) => {
  try {
    const response = await publicApi.get(`/api/homepage/module/${moduleSlug}`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 10
// Get module List
export const handleChangeModuleStatus = async (id) => {
  // console.log("id",id);
  try {
    const response = await publicApi.put(`/api/homepage/update/${id}/status`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 11
// Create Footer Content
export const handleCreateFooter = async (data) => {
  try {
    const response = await publicApi.post("/api/footer", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 12
// Update Footer Content
export const handleFooterUpdate = async (id, data) => {
  try {
    const response = await publicApi.put(`/api/footer/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 13
// Change Footer Status
export const handleFooterStatusChange = async (id, data) => {
  try {
    const response = await publicApi.patch(`/api/footer/${id}/status`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 14
// Delete Footer Content
export const handleFooterDelete = async (id) => {
  try {
    const response = await publicApi.delete(`/api/footer/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 15
// Get Footer Content List (optional, if needed)
export const handleGetFooterList = async () => {
  try {
    const response = await publicApi.get("/api/footer");
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 15
// Get Footer Content List (optional, if needed)
export const handleGetFooterCategoryList = async (category) => {
  try {
    const response = await publicApi.get(`/api/footer/category/${category}`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get sitepage List
export const handleGetSitepageList = async () => {
  try {
    const response = await publicApi.get(`/api/sitepage/list`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 17
// Create sitepage List
export const handleCreateSitepage = async (data, isformData) => {
  try {
    const response = await publicApi.post(`/api/sitepage/create`, data, {
      headers: isformData ? formHeader : rawHeader,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update sitepage List
export const handleUpdateSitepage = async (data, id, isformData) => {
  try {
    const response = await publicApi.put(`/api/sitepage/update/${id}`, data, {
      headers: isformData ? formHeader : rawHeader,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update sitepage Status
export const handleUpdateSitepageStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(
      `/api/sitepage/update/${id}/status`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 20
// Delete sitepage
export const handleDeleteSitepage = async (id) => {
  try {
    const response = await publicApi.delete(`/api/sitepage/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

//S.NO 21
//Create Policies
export const handleCreatePolicy = async (data) => {
  try {
    const response = await publicApi.post(`/api/policies/create`, data);
    return response;
  } catch (error) {
    return error;
  }
};

//S.NO 21
//Create Policies
export const handleGetAllPolicies = async () => {
  try {
    const response = await publicApi.get(`/api/policies/`);
    return response;
  } catch (error) {
    return error;
  }
};

//S.NO 22
//Change Policy Status
export const handlePolicyStatus = async (id, data) => {
  try {
    const response = await publicApi.put(
      `/api/policies/update/${id}/status`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get Guide List
export const handleGetGuides = async () => {
  try {
    const response = await publicApi.get(`/api/guide/all`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 17
// Create Guide List
export const handleCreateGuide = async (data, isformData) => {
  try {
    const response = await publicApi.post(`/api/guide/create`, data, {
      headers: isformData ? formHeader : rawHeader,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update Guide List
export const handleUpdateGuide = async (data, id, isformData) => {
  try {
    const response = await publicApi.put(`/api/guide/update/${id}`, data, {
      headers: isformData ? formHeader : rawHeader,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update Guide Status
export const handleUpdateGuideStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(
      `/api/guide/update/${id}/status`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 20
// Delete Guide
export const handleDeleteGuide = async (id) => {
  try {
    const response = await publicApi.delete(`/api/guide/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get Guide List
export const handleGetSocialMediaList = async () => {
  try {
    const response = await publicApi.get(`/api/socialmedia/list`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 17
// Create Guide List
export const handleCreateSocialmedia = async (data) => {
  try {
    const response = await publicApi.post(`/api/socialmedia/create`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update socialmedia List
export const handleUpdateSocialmedia = async (data, id) => {
  try {
    const response = await publicApi.put(`/api/socialmedia/update/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update socialmedia Status
export const handleUpdateSocialmediaStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(`/api/socialmedia/status/${id}`,data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 20
// Delete Guide
export const handleDeleteSocialmedia = async (id) => {
  try {
    const response = await publicApi.delete(`/api/socialmedia/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get Ring Size Guide List
export const handleGetRingSizeGuideList = async () => {
  try {
    const response = await publicApi.get(`/api/ringsize/list`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update Ring Size Guide 
export const handleUpdateRingSizeGuide = async (data, id) => {
  try {
    const response = await publicApi.put(`/api/ringsize/update/${id}`, data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update Ring Size Guide Status
export const handleUpdateRingSizeGuideStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(`/api/ringsize/status/${id}`,data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get Gemstone Certificatione List
export const handleGetGemstoneCertificationList = async () => {
  try {
    const response = await publicApi.get(`/api/gemstonecertification/list`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update Gemstone Certification Guide 
export const handleUpdateGemstoneCertification = async (data, id) => {
  try {
    const response = await publicApi.put(`/api/gemstonecertification/update/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update Gemstone Certification Status
export const handleUpdateGemstoneCertificationStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(`/api/gemstonecertification/status/${id}`,data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get Holiday Gift Guide List
export const handleGetHolidayGiftGuideList = async () => {
  try {
    const response = await publicApi.get(`/api/holidaygiftguide/list`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update Holiday Gift Guide Guide 
export const handleUpdateHolidayGiftGuide = async (data, id) => {
  try {
    const response = await publicApi.put(`/api/holidaygiftguide/update/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update Holiday Gift Guide Status
export const handleUpdateHolidayGiftGuideStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(`/api/holidaygiftguide/status/${id}`,data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get Shipping List
export const handleGetShippingList = async () => {
  try {
    const response = await publicApi.get(`/api/shipping/list`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 17
// Create Shipping List
export const handleCreateShipping = async (data) => {
  try {
    const response = await publicApi.post(`/api/shipping/create`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update Shipping List
export const handleUpdateShipping = async (data, id) => {
  try {
    const response = await publicApi.put(`/api/shipping/update/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update Shipping Status
export const handleUpdateShippingStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(
      `/api/shipping/status/${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 20
// Delete shipping
export const handleDeleteShipping = async (id) => {
  try {
    const response = await publicApi.delete(`/api/shipping/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 16
// Get BirthStones List
export const handleGetBirthStones = async () => {
  try {
    const response = await publicApi.get(`/api/birthstone/list`);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 17
// Create BirthStones List
export const handleCreateBirthStones = async (data, isformData) => {
  try {
    const response = await publicApi.post(`/api/birthstone/create`, data, {
      headers: isformData ? formHeader : rawHeader,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 18
// Update BirthStones List
export const handleUpdateBirthStones = async (data, id, isformData) => {
  try {
    const response = await publicApi.put(`/api/birthstone/update/${id}`, data, {
      headers: isformData ? formHeader : rawHeader,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 19
// Update BirthStones Status
export const handleUpdateBirthStonesStatus = async (data, id) => {
  try {
    const response = await publicApi.patch(`/api/birthstone/status/${id}`,data);
    return response;
  } catch (error) {
    return error;
  }
};

// S.No 20
// Delete BirthStones
export const handleDeleteBirthStones = async (id) => {
  try {
    const response = await publicApi.delete(`/api/birthstone/delete/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
