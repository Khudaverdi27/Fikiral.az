import { useEffect } from "react";
import { useFetchThinkBySearch } from "../../hooks/useFetch";
import ThinkSection from "../home/components/ThinkSections";

function ThinkFromClipboard() {
  const [searchResponse, fetchSearchResponse, loadings, setData] =
    useFetchThinkBySearch();
  const url = location.href;
  const queryString = url.split("=")[1];
  const paramsToObj = { content: decodeURIComponent(queryString) };

  useEffect(() => {
    fetchSearchResponse(paramsToObj);
  }, []);

  return (
    <ThinkSection
      title={"Fikirlər"}
      items={searchResponse}
      loading={loadings}
    />
  );
}

export default ThinkFromClipboard;
