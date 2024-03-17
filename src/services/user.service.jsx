import { userApi } from "../api/user.api";
import { get, post, put, putForEdit } from "../utils/request";

export const ServiceUserLikeAndDislikesPost = async (params = {}) => {
  const res = await post(userApi.likeAndDislikeThink, params);
  return res;
};

export const ServicePutUserSavedPosts = async (params = {}) => {
  const res = await put(userApi.userSavedPosts, params);
  return res;
};

export const ServiceGetUserById = async (id) => {
  const res = await get(userApi.userById.replace(":id", id));
  return res;
};
export const ServiceUpdateUserById = async (id, params = {}) => {
  const res = await putForEdit(userApi.userById.replace(":id", id), params);
  return res;
};

export const ServicePostLikeComments = async (params = {}) => {
  const res = await post(userApi.likeComment, params);
  return res;
};
