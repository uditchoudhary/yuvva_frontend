import axios from "axios";

const authInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API,
  
});
authInstance.defaults.headers = {
  "Cache-Control": "no-cache",
};


authInstance.defaults.withCredentials = true;


const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export { authInstance, instance };
