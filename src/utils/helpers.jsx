export const saveStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
export const getStorage = (key) => {
  return sessionStorage.getItem(key)
    ? JSON.parse(sessionStorage.getItem(key))
    : false;
};
export const removeStorage = (key) => {
  return sessionStorage.removeItem(key);
};

export const objectToQueryString = (obj) => {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};
