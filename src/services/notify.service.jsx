import { notfications } from "../api/notifcations.api";
import { get, post } from "../utils/request";

export const ServicePostNotify = async (params = {}) => {
  const res = await post(notfications.notifies, params);
  return res;
};

export const ServiceGetNotify = async (id) => {
  const res = await get(notfications.notifiesByUserId.replace(":id", id));
  return res;
};
