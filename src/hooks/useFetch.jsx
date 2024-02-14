import { useState } from "react";
import { ServiceThinksFetchList } from "../services/think.service";

const useFetch = (state = false) => {
  const [data, setData] = useState(state);
  const [loading, setLoading] = useState(false);

  const fetch = async (service, params = false, id = false) => {
    setLoading(true);
    const res = await service(params, id);
    setData(res);
    setLoading(false);
  };

  return [data, fetch, loading];
};

export const useFetchThinksList = () => {
  const [data, fetch, loading] = useFetch([]);

  const apiFetch = async () => {
    fetch(ServiceThinksFetchList);
  };

  return [data || [], apiFetch, loading];
};
