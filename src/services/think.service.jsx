import { thinkApi } from "../api/think.api";
import { destroy, get, post, put } from "../utils/request";

export const ServiceThinksFetchList = async () => {
  const res = await get(thinkApi.list);
  return res;
};

export const ServiceThinksByCategoryFetchList = async (params = {}) => {
  const res = await get(thinkApi.byCategory, params);
  return res;
};

export const ServiceThinksBySearchFetchList = async (params = {}) => {
  const res = await get(thinkApi.bySearch, params);
  return res;
};
export const ServiceThinksByPopularFetchList = async (params = {}) => {
  const res = await get(thinkApi.popular, params);
  return res;
};

export const ServiceThinksPost = async (params = {}) => {
  const res = await post(thinkApi.list, params);
  return res;
};

export const ServiceDeleteThinks = async (id) => {
  const res = await destroy(thinkApi.removeThink.replace(":id", id));
  return res;
};

export const ServiceLikeAndDislikesPost = async (params = {}) => {
  const res = await put(thinkApi.likeAndDislikeThink, params);
  return res;
};
export const ServiceGetComments = async (id) => {
  const res = await get(thinkApi.thinkComments.replace(":id", id));
  return res;
};

export const ServicePostComment = async (params = {}) => {
  const res = await post(thinkApi.postComments, params);
  return res;
};
