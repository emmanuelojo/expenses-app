import axios, { AxiosResponse } from "axios";
import { LoginResponse, RegisterUserResponse } from "../types/authTypeResponse";

export default {
  register(data: any) {
    const url = import.meta.env.VITE_APP_API_URL;

    console.log("url: ", url);
    return axios.post(url, data) as Promise<
      AxiosResponse<RegisterUserResponse>
    >;
  },

  login(data: any) {
    const url = import.meta.env.VITE_APP_API_URL;

    console.log("url: ", url);
    return axios.post(url + "/auth/login", data) as Promise<
      AxiosResponse<LoginResponse>
    >;
  },
};
