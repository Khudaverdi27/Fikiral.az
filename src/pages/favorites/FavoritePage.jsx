import { useEffect } from "react";
import { useFetchThinksList } from "../../hooks/useFetch";
import ThinkSection from "../home/components/ThinkSections";
import { getStorage } from "../../utils/helpers";

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
      <div>
        <ThinkSection
          title={"Yadda saxlanılanlar"}
          items={findSavedPosts}
          loading={loading}
        />
      </div>
    </>
  );
}

export default FavoritePage;
