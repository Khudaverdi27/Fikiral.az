import { authApi } from "../api/auth.api";
import { userApi } from "../api/user.api";
import { post } from "../utils/request";

export const ServiceAuthRegistration = async (params = {}) => {
  const res = await post(authApi.register, params);
  return res;
};
export const ServiceAuthCheckMail = async (params = {}) => {
  const res = await post(authApi.checkMail + params);
  return res;
};
export const ServiceAuthCheckUserName = async (params = {}) => {
  const res = await post(authApi.checkUserName + params);
  return res;
};
export const ServiceLikeAndDislikesPost = async (params = {}) => {
  console.log(params);
  const res = await post(userApi.likeAndDislikeThink, params);
  return res;
};

export const ServiceAuthLogin = async (params = {}) => {
  const res = await post(authApi.login, params);
  return res;
};
