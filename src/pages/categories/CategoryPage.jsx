import { useParams } from "react-router-dom";
import ThinkSection from "../home/components/ThinkSections";
import { useFetchThinkByCategory } from "../../hooks/useFetch";
import { useEffect, useState } from "react";

function CategoryPage() {
  const param = useParams();
  const [title, setTitle] = useState("");

  const [thinksByCategory, thinksByCategoryFetch, thinksByCategoryLoading] =
    useFetchThinkByCategory();

  useEffect(() => {
    thinksByCategoryFetch(param);
  }, [param]);

  useEffect(() => {
    if (thinksByCategory && thinksByCategory.length > 0) {
      thinksByCategory.find(
        (t) => t.category.slug === param.slug && setTitle(t.category.name)
      );
    }
  }, [thinksByCategory, param]);

  return (
    <>
      <div>
        <ThinkSection
          title={title}
          items={thinksByCategory}
          loading={thinksByCategoryLoading}
        />
      </div>
    </>
  );
}

export default CategoryPage;
