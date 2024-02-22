import moment from "moment";
import forbidddens from "../forbiddenWords.json";
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

export const changeTime = (apiTime) => {
  const targetTime = moment(apiTime).subtract(-4, "hours");
  const currentTime = moment();
  const difference = moment.duration(currentTime.diff(targetTime));

  const days = difference.days();
  const hours = difference.hours();
  const minutes = difference.minutes();
  const seconds = difference.seconds();

  if (days >= 1) {
    return `${days} gün əvvəl`;
  } else if (hours >= 1) {
    return `${hours} saat əvvəl`;
  } else if (minutes >= 1) {
    return `${minutes} dəqiqə əvvəl`;
  } else {
    return `${seconds < 0 ? 0 : seconds} saniyə əvvəl`;
  }
};

export const findFuckingWords = (string) => {
  return forbidddens.some((word) => string?.toLowerCase().includes(word.name));
};
