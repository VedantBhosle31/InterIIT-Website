import axios from "axios";
export const getAxios = (accessToken: string) => {
  
  axios.defaults.baseURL = process.env.API_URL as string;
  axios.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
  return axios;
};
