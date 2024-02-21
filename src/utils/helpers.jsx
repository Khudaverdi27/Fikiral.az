import moment from "moment";

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

export const ignoreKeyPressAsDomainLength = (e) => {
  const value = e.target.value;
  const piece = value.includes(".") && value.split(".").pop();
  const isDeleteKey = e.key === "Delete" || e.key === "Backspace";
  if (piece.length >= 3 && !isDeleteKey) {
    e.preventDefault();
  }
};

export const changeTime = (apiTime) => {
  const currentDate = moment();
  const targetDate = moment(apiTime);
  const differenceInDays = currentDate.diff(targetDate, "days");
  const differenceInHours = currentDate.diff(targetDate, "hours");

  return differenceInDays < 0
    ? `${Math.abs(differenceInDays)} gün əvvəl`
    : differenceInHours > 24
    ? `${differenceInDays} gün əvvəl`
    : `${differenceInHours} saat əvvəl`;
};
