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
