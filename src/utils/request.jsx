import { getStorage, objectToQueryString, removeStorage } from "./helpers";

const base_URL = "https://fikiral-app.onrender.com/fikiral/v1";

const request = async (baseURL, url, method, params = false) => {
  const token = getStorage("token");

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let options = {
    method,
    headers,
  };

  if (params) {
    options.body = JSON.stringify(params);
    //post comment to thinks
    if (token.length !== 0) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(baseURL + url, options);
  if (res.ok) {
    try {
      return await res.json();
    } catch (error) {
      return { status: 200 };
    }
  } else if (res.status === 404) {
    return { status: 404 };
  } else if (res.status === 401) {
    removeStorage("token");
    removeStorage("user");
    location.reload();
    return false;
  } else if (res.status === 422) {
    const message = await res.json();
    return { status: 422, message: message };
  } else if (res.status === 409) {
    const message = await res.json();
    return { status: 409, message: message };
  } else {
    return { status: 500 };
  }
};

export const get = (url, params = false) =>
  request(
    base_URL,
    url + (params ? "?" + objectToQueryString(params) : ""),
    "GET"
  );

export const put = (url, params = false) =>
  request(
    base_URL,
    url + (params ? "?" + objectToQueryString(params) : ""),
    "PUT"
  );

export const post = (url, params) => request(base_URL, url, "POST", params);
export const destroy = (url) => request(base_URL, url, "DELETE");
