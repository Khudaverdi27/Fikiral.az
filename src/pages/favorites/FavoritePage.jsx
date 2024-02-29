import { useEffect } from "react";
import { useFetchThinksList, useGetUserById } from "../../hooks/useFetch";
import ThinkSection from "../home/components/ThinkSections";
import { getStorage } from "../../utils/helpers";
import ErrorBoundary from "../../components/common/ErrorBoundary";

function FavoritePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const [userById, getUserFetch, userLoading] = useGetUserById();
  const user = getStorage("user");

  const findSavedPosts = data?.filter((d) =>
    userById.savedPostsIDs?.includes(d.id)
  );

  useEffect(() => {
    apiFetch().then(() => getUserFetch(user.userResponse.id));
  }, []);

  return (
    <>
      <ErrorBoundary>
        <ThinkSection
          title={
            findSavedPosts.length <= 0
              ? "Yadda saxladığınz fikir tapılmadı!"
              : "Yadda saxlanılanlar"
          }
          items={findSavedPosts}
          loading={loading}
        />
      </ErrorBoundary>
    </>
  );
}

export default FavoritePage;
