import { notfications } from "../api/notifcations.api";
import { destroy, get, post } from "../utils/request";

export const ServicePostNotify = async (params = {}) => {
  const res = await post(notfications.notifies, params);
  return res;
};

export const ServiceGetNotify = async (id) => {
  const res = await get(notfications.notifiesByUserId.replace(":id", id));
  return res;
};
export const ServiceDeleteNotify = async (id) => {
  const res = await destroy(notfications.notifiesByUserId.replace(":id", id));
  return res;
};
