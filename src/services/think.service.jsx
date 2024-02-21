import { thinkApi } from "../api/think.api";
import { get } from "../utils/request";

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
