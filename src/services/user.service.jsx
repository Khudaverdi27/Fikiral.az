import { userApi } from "../api/user.api";
import { get, post, put } from "../utils/request";

export const ServiceUserLikeAndDislikesPost = async (params = {}) => {
  const res = await post(userApi.likeAndDislikeThink, params);
  return res;
};

export const ServicePutUserSavedPosts = async (params = {}) => {
  const res = await put(userApi.userSavedPosts, params);
  return res;
};

export const ServiceGetUserById = async (id) => {
  const res = await get(userApi.getUserById.replace(":id", id));
  return res;
};
