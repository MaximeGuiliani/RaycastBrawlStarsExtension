import axios from "axios";


const baseURL = "https://api.brawlstars.com/v1/";

export const AxiosPure = axios.create({ baseURL });
const Axios = axios.create({ baseURL });

Axios.interceptors.request.use((request) => {
  return request;
});



Axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("AXIOS ERROR INTERCEPT---->", error);
    if (!error.response) return Promise.reject(error);
    return Promise.reject(error);
  }
);



AxiosPure.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("AXIOS ERROR INTERCEPT---->", error);
    if (!error.response) return Promise.reject(error);
    return Promise.reject(error);
  }
);

export default Axios;
