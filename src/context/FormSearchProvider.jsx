import { createContext, useContext, useEffect, useState } from "react";
import { useFetchThinkBySearch } from "../hooks/useFetch";
import { io } from "socket.io-client";

const socket = io("/", { reconnection: true });

const FormSearch = createContext();

function SearchProvider({ children }) {
  const [text, setText] = useState("");
  const [openSrch, setOpenSrch] = useState(false);
  const [searchResponse, fetchSearchResponse, loadings, setData] =
    useFetchThinkBySearch();

  const onSearch = (e) => {
    if (e.target.value.length > 2) {
      setText(e.target.value);
    } else {
      setOpenSrch(false);
      setData([]);
    }
  };
  useEffect(() => {
    if (text !== "") {
      fetchSearchResponse({ content: text.trim() });
      setOpenSrch(true);
    } else {
      setOpenSrch(false);
      setData([]);
    }
  }, [text]);

  useEffect(() => {
    console.log(socket);
  }, []);

  const actions = {
    onSearch,
    searchResponse,
    loadings,
    setOpenSrch,
    openSrch,
  };

  return <FormSearch.Provider value={actions}>{children}</FormSearch.Provider>;
}

export const useSearchActions = () => useContext(FormSearch);
export default SearchProvider;
