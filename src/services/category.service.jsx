import { categoryApi } from "../api/category.api";
import { get } from "../utils/request";

export const ServiceAllCategoryFetchList = async () => {
  const res = await get(categoryApi.list);
  return res;
};
export const ServiceForUserCategoryFetchList = async (params = {}) => {
  const res = await get(categoryApi.forUserCategories, params);
  return res;
};
