import axios from "axios";

axios.defaults.withCredentials = true;

const apiRequest = axios.create({
  baseURL: "https://cd4a-2804-29b8-500a-1274-e81e-e223-a60-a299.ngrok-free.app/",
  withCredentials: true,
  
});

export default apiRequest;

//https://cd4a-2804-29b8-500a-1274-e81e-e223-a60-a299.ngrok-free.app/