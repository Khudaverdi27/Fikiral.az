import ThinkSection from "../home/components/ThinkSections";
import { useFetchData } from "../../context/FetchDataProvider";

function FavoritePage() {
  const { data, loading } = useFetchData();

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
