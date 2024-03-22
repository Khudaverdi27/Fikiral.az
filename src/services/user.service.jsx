import { userApi } from "../api/user.api";
import { destroy, get, post, put, putForEdit } from "../utils/request";

export const ServiceUserLikeAndDislikesPost = async (params = {}) => {
  const res = await post(userApi.likeAndDislikeThink, params);
  return res;
};

export const ServicePutUserSavedPosts = async (params = {}) => {
  const res = await put(userApi.userSavedPosts, params);
  return res;
};
export const ServiceVerifyMail = async (params) => {
  const res = await put(userApi.verifyMail.replace("params", params));
  return res;
};

export const ServiceGetAllUsers = async (id) => {
  const res = await get(userApi.allUser);
  return res;
};
export const ServiceGetUserById = async (id) => {
  const res = await get(userApi.userById.replace(":id", id));
  return res;
};
export const ServiceDeleteUserById = async (id) => {
  const res = await destroy(userApi.userById.replace(":id", id));
  return res;
};
export const ServiceBlockUserById = async (id) => {
  const res = await put(userApi.blockUser.replace(":id", id));
  return res;
};
export const ServiceUpdateUserById = async (id, params = {}) => {
  const res = await putForEdit(userApi.userById.replace(":id", id), params);
  return res;
};

export const ServiceUpdateUserPassword = async (params = {}) => {
  const res = await putForEdit(userApi.changeUserPass, params);
  return res;
};

export const ServicePostLikeComments = async (params = {}) => {
  const res = await post(userApi.likeComment, params);
  return res;
};
