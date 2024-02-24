import ThinkSection from "./components/ThinkSections";
import { useModalActions } from "../../context/LoginModalProvider";
import {
  useFetchSelectedCategories,
  useFetchThinksList,
} from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { getStorage } from "../../utils/helpers";

function HomePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const [newCategories, setNewCategories] = useState([]);

  const [selectedCategories, fetchSelected, selectLoading] =
    useFetchSelectedCategories();
  const { isPosted, setIsPosted, selectCategory } = useModalActions();

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

  const sortedData = data.sort((a, b) => b.id - a.id);

  const filteredCategories = sortedData.filter((item) =>
    newCategories?.includes(item.category.id)
  );

  return (
    <>
      {selectedCategories.length > 0 && (
        <ThinkSection
          title={"Sizin üçün"}
          items={[].concat(...selectedCategories)}
          loading={selectLoading}
        />
      )}

      <ThinkSection
        title={`${
          filteredCategories.length > 0
            ? "Seçdiyiniz kateqoriyalardan..."
            : "Bütün fikirlər"
        }`}
        items={filteredCategories.length > 0 ? filteredCategories : sortedData}
        loading={loading}
      />
    </>
  );
}

export default HomePage;
