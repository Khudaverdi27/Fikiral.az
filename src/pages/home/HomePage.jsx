import { useEffect } from "react";
import { useFetchThinksList } from "../../hooks/useFetch";

import ThinkSection from "./components/ThinkSections";
import { useFetchData } from "../../context/FetchDataProvider";

function HomePage() {
  const { data, loading } = useFetchData();

  return (
    <>
      <ThinkSection title={"Sizin üçün"} items={data} loading={loading} />

      <ThinkSection
        title={"Popluyar fikirlər"}
        items={data}
        loading={loading}
      />
    </>
  );
}

export default HomePage;
