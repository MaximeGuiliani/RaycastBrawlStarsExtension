import axios from "axios";


const baseURL = "https://api.brawlstars.com/v1/players/";

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
    // const navigate = useNavigate();
    // navigate('/');
    if (!error.response) return Promise.reject(error);
    const status = error.response.status;
    if (status === 500  || status === 403 || status === 400 ) {
      return Promise.reject(error.response.data); 
    }
    if (status === 404) {
      //window.location.href = "/404";
      return Promise.reject(error); 
    }
    if (status === 401) {
      // tokenService.removeToken();
      // window.location.href = "/login";
       return Promise.reject(error.response.data); 

    }
    return Promise.reject(error);
  }
);



AxiosPure.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("AXIOS ERROR INTERCEPT---->", error);
    // const navigate = useNavigate();
    // navigate('/');
    if (!error.response) return Promise.reject(error);
    const status = error.response.status;
    if ( status === 400 ) {
      return Promise.reject(error.response.data); 
    }

    return Promise.reject(error);
  }
);

export default Axios;
