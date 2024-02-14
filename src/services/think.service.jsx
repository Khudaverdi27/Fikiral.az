import { thinkApi } from "../api/think.api";
import { get } from "../utils/request";

export const ServiceThinksFetchList = async () => {
  const res = await get(thinkApi.list);
  return res;
};
