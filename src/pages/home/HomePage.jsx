import ThinkSection from "./components/ThinkSections";
import { useModalActions } from "../../context/LoginModalProvider";
import {
  useFetchSelectedCategories,
  useFetchThinksList,
} from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { getStorage } from "../../utils/helpers";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import { useSearchActions } from "../../context/FormSearchProvider";

function HomePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const [newCategories, setNewCategories] = useState([]);
  const [selectedCategories, fetchSelected, selectLoading] =
    useFetchSelectedCategories();
  const { isPosted, setIsPosted, selectCategory } = useModalActions();
  const { searchResponse } = useSearchActions();
  const user = getStorage("user");

  useEffect(() => {
    fetchSelected({ categoryIds: user.categoryIds });
  }, []);

  useEffect(() => {
    const categoryFromStorage = getStorage("selectedCategories");
    setNewCategories(categoryFromStorage);
  }, [selectCategory]);

  useEffect(() => {
    apiFetch().then(() => {
      setIsPosted(false);
    });
  }, [isPosted]);

  const sortedData = data?.sort((a, b) => b.id - a.id);

  const filteredCategories = sortedData.filter((item) =>
    newCategories?.includes(item.category.id)
  );

  return (
    <>
      <ErrorBoundary>
        {[].concat(...selectedCategories).length > 0 &&
          searchResponse.length <= 0 && (
            <ThinkSection
              title={"Sizin üçün"}
              items={[].concat(...selectedCategories)}
              loading={selectLoading}
            />
          )}
      </ErrorBoundary>
      <ErrorBoundary>
        <ThinkSection
          title={
            <p className="text-center">{`${
              filteredCategories.length > 0
                ? "Seçdiyiniz kateqoriyalardan..."
                : searchResponse.length > 0
                ? "Axtarış nəticələri"
                : "Bütün fikirlər"
            }`}</p>
          }
          items={
            filteredCategories.length > 0 ? filteredCategories : sortedData
          }
          loading={loading}
        />
      </ErrorBoundary>
    </>
  );
}

export default HomePage;
