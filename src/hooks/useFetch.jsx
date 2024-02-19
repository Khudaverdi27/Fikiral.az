import { useState } from "react";
import { ServiceThinksFetchList } from "../services/think.service";
import {
  ServiceAllCategoryFetchList,
  ServiceByIdCategoryFetchList,
} from "../services/category.service";
import {
  ServiceAuthCheckMail,
  ServiceAuthLogin,
  ServiceAuthRegistration,
} from "../services/auth.service";

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
export const useFetchAllCategoryList = () => {
  const [data, fetch, loading] = useFetch([]);

  const apiFetch = async () => {
    fetch(ServiceAllCategoryFetchList);
  };

  return [data || [], apiFetch, loading];
};

export const useFetchAuthCheckMail = () => {
  const [authCheckMail, fetch, authCheckLoading] = useFetch([]);

  const authCheckFetch = async (params = {}) => {
    fetch(ServiceAuthCheckMail, params);
  };
  return [authCheckMail || false, authCheckFetch, authCheckLoading];
};

export const useFetchAuthResgistration = () => {
  const [registerAuth, fetch, authLoading] = useFetch([]);

  const authFetch = async (params = {}) => {
    fetch(ServiceAuthRegistration, params);
  };
  return [registerAuth || [], authFetch, authLoading];
};

export const useFetchAuthLogin = () => {
  const [loginAuth, fetch, authLoading] = useFetch([]);
  const loginFetch = async (params = {}) => {
    fetch(ServiceAuthLogin, params);
  };
  return [loginAuth || {}, loginFetch, authLoading];
};

export const useFetchCategoryById = () => {
  const [categoryId, fetch, categoryIdLoading] = useFetch([]);

  const categoryIdFetch = async (params = false, id) => {
    fetch(ServiceByIdCategoryFetchList, params, id);

    return [categoryId, categoryIdFetch, categoryIdLoading];
  };
};
