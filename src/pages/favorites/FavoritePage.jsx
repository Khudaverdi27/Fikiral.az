import { useEffect } from "react";
import { useFetchThinksList } from "../../hooks/useFetch";
import ThinkSection from "../home/components/ThinkSections";
import { getStorage } from "../../utils/helpers";
import ErrorBoundary from "../../components/common/ErrorBoundary";

function FavoritePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const user = getStorage("user");
  const userSavedPosts = user?.userResponse?.savedPostsIDs;

  const findSavedPosts = data?.filter((d) => userSavedPosts?.includes(d));

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <>
      <ErrorBoundary>
        <ThinkSection
          title={"Yadda saxlanılanlar"}
          items={findSavedPosts}
          loading={loading}
        />
      </ErrorBoundary>
    </>
  );
}

export default FavoritePage;
