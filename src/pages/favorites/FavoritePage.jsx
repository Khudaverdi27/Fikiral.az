import { useEffect } from "react";
import { useFetchThinksList, useGetUserById } from "../../hooks/useFetch";
import ThinkSection from "../home/components/ThinkSections";
import { getStorage } from "../../utils/helpers";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import { useModalActions } from "../../context/LoginModalProvider";

function FavoritePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const { userByIdData } = useModalActions();

  const findSavedPosts = data?.filter((d) =>
    userByIdData.savedPostsIDs?.includes(d.id)
  );

  useEffect(() => {
    apiFetch();
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
