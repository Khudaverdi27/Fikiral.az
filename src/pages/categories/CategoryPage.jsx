import { useParams } from "react-router-dom";
import ThinkSection from "../home/components/ThinkSections";
import { useFetchThinkByCategory } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useModalActions } from "../../context/LoginModalProvider";
import ErrorBoundary from "../../components/common/ErrorBoundary";

function CategoryPage() {
  const param = useParams();
  const [title, setTitle] = useState("");

  const [thinksByCategory, thinksByCategoryFetch, thinksByCategoryLoading] =
    useFetchThinkByCategory();
  const { isPosted, setIsPosted } = useModalActions();

  useEffect(() => {
    thinksByCategoryFetch(param).then(() => {
      setIsPosted(true);
    });
  }, [param]);

  useEffect(() => {
    thinksByCategoryFetch(param);
    setIsPosted(false);
  }, [isPosted]);

  useEffect(() => {
    if (thinksByCategory && thinksByCategory.length > 0) {
      thinksByCategory.find(
        (t) => t.category.slug === param.slug && setTitle(t.category.name)
      );
    }
  }, [thinksByCategory, param]);
  const sortedData = thinksByCategory.sort((a, b) => b.id - a.id);
  return (
    <>
      <ErrorBoundary>
        <ThinkSection
          title={title}
          items={sortedData}
          loading={thinksByCategoryLoading}
        />
      </ErrorBoundary>
    </>
  );
}

export default CategoryPage;
