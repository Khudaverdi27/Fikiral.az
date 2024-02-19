import ThinkSection from "../home/components/ThinkSections";
import { useFetchData } from "../../context/FetchDataProvider";

function CategoryPage() {
  return (
    <>
      <div>
        <ThinkSection title={"Categoriya"} items={data} loading={loading} />
      </div>
    </>
  );
}

export default CategoryPage;
