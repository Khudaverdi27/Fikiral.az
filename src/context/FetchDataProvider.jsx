import { createContext, useContext, useEffect } from "react";
import { useFetchThinksList } from "../hooks/useFetch";
import moment from "moment";
import { useParams } from "react-router-dom";
const FetchData = createContext();

function DataProvider({ children }) {
  const [data, apiFetch, loading] = useFetchThinksList();

  useEffect(() => {
    apiFetch();
  }, []);

  const datas = { data, loading };
  return <FetchData.Provider value={datas}>{children}</FetchData.Provider>;
}

export const useFetchData = () => useContext(FetchData);
export default DataProvider;
