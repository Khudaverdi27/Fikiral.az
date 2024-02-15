import { createContext, useContext, useEffect } from "react";
import { useFetchThinksList } from "../hooks/useFetch";
import moment from "moment";
const FetchData = createContext();

function DataProvider({ children }) {
  const [data, apiFetch, loading] = useFetchThinksList();

  useEffect(() => {
    apiFetch();
  }, []);

  const changeTime = (apiTime) => {
    const currentDate = moment();
    const targetDate = moment(apiTime);
    const differenceInDays = currentDate.diff(targetDate, "days");
    const differenceInHours = currentDate.diff(targetDate, "hours");
    console.log(differenceInDays);
    return differenceInDays < 0
      ? `${Math.abs(differenceInDays)} gün əvvəl`
      : differenceInHours > 24
      ? `${differenceInDays} gün əvvəl`
      : `${differenceInHours} saat əvvəl`;
  };

  const datas = { data, loading, changeTime };
  return <FetchData.Provider value={datas}>{children}</FetchData.Provider>;
}

export const useFetchData = () => useContext(FetchData);
export default DataProvider;
