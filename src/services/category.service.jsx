import { categoryApi } from "../api/category.api";
import { get } from "../utils/request";

export const ServiceAllCategoryFetchList = async () => {
  const res = await get(categoryApi.list);
  return res;
};
