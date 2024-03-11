import ThinkSection from "./components/ThinkSections";
import { useModalActions } from "../../context/LoginModalProvider";
import { useFetchThinksList, useGetUserById } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { getStorage } from "../../utils/helpers";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import { useSearchActions } from "../../context/FormSearchProvider";

function HomePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const [newCategories, setNewCategories] = useState([]);
  const [userSelectCateg, setUserSelectCateg] = useState([]);
  const { isPosted, setIsPosted, selectCategory } = useModalActions();
  const [userById, getUserFetch, userLoading] = useGetUserById();
  const { searchResponse } = useSearchActions();
  const user = getStorage("user");

  useEffect(() => {
    getUserFetch(user.userResponse.id);
  }, []);

  useEffect(() => {
    if (Object.keys(userById).length !== 0) {
      const dataForUser = data
        .filter((d) => userById.categoryIds.includes(d.category.id))
        .sort((a, b) => b.likeCount - a.likeCount);
      setUserSelectCateg(dataForUser);
    }
  }, [userById, loading]);

  useEffect(() => {
    const categoryFromStorage = getStorage("selectedCategories");
    setNewCategories(categoryFromStorage);
  }, [selectCategory]);

  useEffect(() => {
    apiFetch().then(() => {
      setIsPosted(false);
    });
  }, [isPosted]);

  const sortedData = data
    ?.sort((a, b) => b.id - a.id)
    ?.filter((d) => !userById.categoryIds?.includes(d.category.id));

  const filteredCategories = data.filter((item) =>
    newCategories?.includes(item.category.id)
  );

  return (
    <>
      <ErrorBoundary>
        {userSelectCateg.length > 0 &&
          searchResponse.length <= 0 &&
          filteredCategories.length <= 0 && (
            <ThinkSection
              title={"Sizin üçün"}
              items={userSelectCateg}
              loading={loading}
            />
          )}
      </ErrorBoundary>
      <ErrorBoundary>
        <ThinkSection
          title={
            <p className="text-center">{`${
              filteredCategories.length > 0
                ? "Seçdiyiniz kateqoriyalardan"
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
