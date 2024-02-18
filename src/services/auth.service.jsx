import { authApi } from "../api/auth.api";
import { get, post } from "../utils/request";

export const ServiceAuthRegistration = async (params = {}) => {
  const res = await post(authApi.register, params);
  return res;
};
export const ServiceAuthCheckMail = async (params = {}) => {
  const res = await get(authApi.checkMail, params);
  return res;
};

export const ServiceAuthLogin = async (params = {}) => {
  const res = await post(authApi.login, params);
  return res;
};
