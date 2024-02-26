import { userApi } from "../api/user.api";
import { post, put } from "../utils/request";

export const ServiceUserLikeAndDislikesPost = async (params = {}) => {
  const res = await post(userApi.likeAndDislikeThink, params);
  return res;
};

export const ServicePutUserSavedPosts = async (params = {}) => {
  const res = await put(userApi.userSavedPosts, params);
  return res;
};
