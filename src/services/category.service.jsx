import { categoryApi } from "../api/category.api";
import { get } from "../utils/request";

export const ServiceAllCategoryFetchList = async () => {
  const res = await get(categoryApi.list);
  return res;
};

export const ServiceByIdCategoryFetchList = async (id) => {
  const res = await get(categoryApi.byId.replace(":id", id));
  return res;
};
