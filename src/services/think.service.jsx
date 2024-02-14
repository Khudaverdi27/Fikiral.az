import { get } from "../utils/request";

export const ServiceThinksFetchList = async (params = {}) => {
  const res = await get(thinkApi.list, params);
  return res;
};
