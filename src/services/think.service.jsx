import { thinkApi } from "../api/think.api";
import {
  aiPost,
  destroy,
  destroyAiPost,
  get,
  patch,
  post,
  put,
} from "../utils/request";

export const ServiceThinksFetchList = async () => {
  const res = await get(thinkApi.list);
  return res;
};
export const ServiceInAcceptedThinksList = async () => {
  const res = await get(thinkApi.listInAccepted);
  return res;
};
export const ServiceGetAiPosts = async () => {
  const res = await aiPost("sentences");
  return res;
};

export const ServicePatchAiPosts = async (id, params = {}) => {
  const res = await patch(`posts/${id}`, params);
  return res;
};

export const ServiceDeleteAiPosts = async (id) => {
  const res = await destroyAiPost(`posts/${id}`);
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
  const res = await post(thinkApi.postThink, params);
  return res;
};
export const ServiceThinksEdit = async (params = {}) => {
  const res = await put(thinkApi.postThink, params);
  return res;
};

export const ServiceDeleteThinks = async (id) => {
  const res = await destroy(thinkApi.removeThink.replace(":id", id));
  return res;
};
export const ServiceAcceptThinks = async (id) => {
  const res = await put(thinkApi.acceptPost.replace(":id", id));
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
