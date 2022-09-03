import { apiResponse } from "./apiResponseTypes";

export interface RegisterUserResponse extends apiResponse {
  data: any;
}

export interface LoginResponse extends apiResponse {
  access_token: string;
}
