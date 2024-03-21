import { categoryApi } from "../api/category.api";
import { destroy, get, post } from "../utils/request";

export const ServiceAllCategoryFetchList = async () => {
  const res = await get(categoryApi.list);
  return res;
};
export const ServiceAddCategory = async (params = {}) => {
  const res = await post(categoryApi.list, params);
  return res;
};
export const ServiceDestroyCategory = async (id) => {
  const res = await destroy(categoryApi.categoryById.replace(":id", id));
  return res;
};
