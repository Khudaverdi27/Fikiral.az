import ThinkSection from "./components/ThinkSections";
import { useModalActions } from "../../context/LoginModalProvider";
import {
  useFetchSelectedCategories,
  useFetchThinksList,
} from "../../hooks/useFetch";
import { useEffect, useState } from "react";

function HomePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const [selectedCategories, fetchSelected, selectLoading] =
    useFetchSelectedCategories();

  const { loginAuth } = useModalActions();

  useEffect(() => {
    fetchSelected({ categoryIds: loginAuth.categoryIds });
  }, [loading]);

  console.log([].concat(...selectedCategories));

  useEffect(() => {
    apiFetch();
  }, []);
  const sortedData = data.sort((a, b) => b.id - a.id);
  return (
    <>
      {selectedCategories.length > 0 && (
        <ThinkSection
          title={"Sizin üçün"}
          items={
            selectedCategories.length > 0
              ? [].concat(...selectedCategories)
              : []
          }
          loading={selectLoading}
        />
      )}

      <ThinkSection
        title={"Bütün fikirlər"}
        items={sortedData}
        loading={loading}
      />
    </>
  );
}

export default HomePage;
