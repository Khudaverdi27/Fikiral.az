import { useState } from "react";
import {
  ServiceGetComments,
  ServiceLikeAndDislikesPost,
  ServicePostComment,
  ServiceThinksByCategoryFetchList,
  ServiceThinksByPopularFetchList,
  ServiceThinksBySearchFetchList,
  ServiceThinksFetchList,
  ServiceThinksPost,
} from "../services/think.service";
import {
  ServiceAllCategoryFetchList,
  ServiceForUserCategoryFetchList,
} from "../services/category.service";
import {
  ServiceAuthCheckMail,
  ServiceAuthCheckUserName,
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

export const useFetchAuthCheckUserName = () => {
  const [authCheckUsername, fetch, authCheckUserNameLoading] = useFetch([]);

  const authCheckUsernameFetch = async (params = {}) => {
    fetch(ServiceAuthCheckUserName, params);
  };
  return [
    authCheckUsername || false,
    authCheckUsernameFetch,
    authCheckUserNameLoading,
  ];
};

export const useFetchAuthResgistration = () => {
  const [registerAuth, fetch, authLoading] = useFetch([]);

  const authFetch = async (params = {}) => {
    fetch(ServiceAuthRegistration, params);
  };
  return [registerAuth || [], authFetch, authLoading];
};

export const useFetchAuthLogin = () => {
  const [userLoginAuth, fetch, userLoginAuthLoading] = useFetch([]);
  const loginFetch = async (params = {}) => {
    fetch(ServiceAuthLogin, params);
  };
  return [userLoginAuth || {}, loginFetch, userLoginAuthLoading];
};

export const useFetchThinkByCategory = () => {
  const [data, fetch, loading] = useFetch([]);

  const fetchThinkBy = async (params = {}) => {
    fetch(ServiceThinksByCategoryFetchList, params);
  };

  return [data || [], fetchThinkBy, loading];
};

export const useFetchThinkBySearch = () => {
  const [data, fetch, loading] = useFetch([]);

  const searchFetch = async (params = {}) => {
    fetch(ServiceThinksBySearchFetchList, params);
  };
  return [data || [], searchFetch, loading];
};

export const useFetchThinkPopular = () => {
  const [data, fetch, loading] = useFetch([]);

  const popularFetch = async () => {
    fetch(ServiceThinksByPopularFetchList, { limit: 9 });
  };
  return [data || [], popularFetch, loading];
};

export const usePostThink = () => {
  const [data, fetch, loading] = useFetch();

  const postThink = async (params = {}) => {
    fetch(ServiceThinksPost, params);
  };

  return [data || false, postThink, loading];
};

export const useFetchSelectedCategories = () => {
  const [data, fetch, loading] = useFetch();

  const fetchSelectedCategories = async (params = {}) => {
    fetch(ServiceForUserCategoryFetchList, params);
  };
  return [data || [], fetchSelectedCategories, loading];
};

export const usePutLikeAndDislike = () => {
  const [data, fetch, loading] = useFetch();

  const fetchLikeAndDislike = async (params = {}) => {
    fetch(ServiceLikeAndDislikesPost, params);
  };
  return [fetchLikeAndDislike, loading];
};

export const useFetchCommentLists = () => {
  const [data, fetch, loading] = useFetch();

  const fetchThinkComments = async (id) => {
    fetch(ServiceGetComments, id);
  };
  return [data || [], fetchThinkComments, loading];
};

export const usePostComments = () => {
  const [data, fetch, loading] = useFetch();

  const postThinkComments = async (params = {}) => {
    fetch(ServicePostComment, params);
  };
  return [data || false, postThinkComments, loading];
};
