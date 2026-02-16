import axios from "axios";
import toast from "react-hot-toast";
import { loaderRef } from "../utils/loaderRef";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000
});

/* ===============================
   REQUEST INTERCEPTOR
=============================== */
api.interceptors.request.use(config => {
  loaderRef.current?.showLoader();
  return config;
});

/* ===============================
   RESPONSE INTERCEPTOR
=============================== */
api.interceptors.response.use(
  response => {
    loaderRef.current?.hideLoader();
    return response;
  },

  error => {
    loaderRef.current?.hideLoader();

    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message ||
        "Something went wrong. Please try again.";

      switch (status) {
        case 400:
          toast.error(message);
          break;

        case 401:
          toast.error("Session expired. Please login again.");
          window.location.href = "/login";
          break;

        case 403:
          toast.error("You are not authorized.");
          break;

        case 404:
          toast.error("Requested resource not found.");
          break;

        case 413:
          toast.error("File too large.");
          break;

        case 500:
          toast.error("Server error. Try again later.");
          break;

        default:
          toast.error(message);
      }
    }
    else if (error.request) {
      toast.error("Network error. Check internet connection.");
    }
    else {
      toast.error("Unexpected error occurred.");
      console.error("Unknown Axios Error:", error);
    }

    return Promise.reject(error);
  }
);

export default api;
