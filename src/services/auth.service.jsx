import { authApi } from "../api/auth.api";
import { post } from "../utils/request";

export const ServiceAuthRegistration = async (params = {}) => {
  const res = await post(authApi.register, params);
  return res;
};
