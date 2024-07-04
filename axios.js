import axios from 'axios';
import globalUser from './store/user';


// const authenticatedToken = globalUser(
//     (state) => state.authenticatedToken
//   );

// axios.defaults.baseURL = "https://vaxpro.southafricanorth.cloudapp.azure.com:8001/api/";
axios.defaults.baseURL = "http://localhost:8000/api/";


axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

// axios.defaults.headers.common["Authorization"] = `Bearer ${authenticatedToken}`

export default axios;
