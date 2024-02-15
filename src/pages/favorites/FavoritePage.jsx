import { useEffect } from "react";
import { useFetchThinksList } from "../../hooks/useFetch";
import ThinkSection from "../home/components/ThinkSections";

function FavoritePage() {
  const [data, apiFetch, loading] = useFetchThinksList();

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <>
      <div>
        <ThinkSection
          title={"Yadda saxlanılanlar"}
          items={data}
          loading={loading}
        />
      </div>
    </>
  );
}

export default FavoritePage;
