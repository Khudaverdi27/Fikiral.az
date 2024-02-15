import { useEffect } from "react";
import { useFetchThinksList } from "../../hooks/useFetch";
import ThinkSection from "./components/ThinkSections";

function HomePage() {
  const [data, apiFetch, loading] = useFetchThinksList();

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <>
      <div>
        <ThinkSection title={"Sizin üçün"} items={data} loading={loading} />
      </div>
      <div>
        <ThinkSection
          title={"Popluyar fikirlər"}
          items={data}
          loading={loading}
        />
      </div>
    </>
  );
}

export default HomePage;
