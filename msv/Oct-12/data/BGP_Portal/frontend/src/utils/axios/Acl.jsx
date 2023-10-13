// import { useHistory } from "react-router-dom";
// import { createBrowserHistory } from "history";
import axios from "axios";

// export const baseUrl = "http://localhost:5050"; //! local
export const baseUrlofAcl = "http://127.0.0.1:5000"; ////! producion

const instance = axios.create();
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("monetx_token");
//   //   // console.log("token => " + token);
//   if (token) {
//     config.headers["X-Auth-Key"] = token;
//   }
//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     if (error?.response?.status === 401) {
//       localStorage.removeItem("monetx_token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("monetx_configuration");
//       createBrowserHistory().push("/");
//       window.location.reload();
//     } else {
//       return error;
//     }
//   }
// );

// //https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token

export default instance;
