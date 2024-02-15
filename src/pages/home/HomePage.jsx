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
      <ThinkSection title={"Sizin üçün"} items={data} loading={loading} />

      <ThinkSection
        title={
          loading ? (
            <span className="text-white">Popluyar fikirlər</span>
          ) : (
            "Popluyar fikirlər"
          )
        }
        items={data}
        loading={false}
      />
    </>
  );
}

export default HomePage;
