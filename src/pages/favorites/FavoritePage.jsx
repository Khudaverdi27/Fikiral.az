import { useEffect } from "react";
import { useFetchThinksList } from "../../hooks/useFetch";
import ThinkSection from "../home/components/ThinkSections";
import { useModalActions } from "../../context/LoginModalProvider";
import { getStorage } from "../../utils/helpers";

function FavoritePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const { userByIdData, getUserFetch } = useModalActions();

  const findSavedPosts = data?.filter((d) =>
    userByIdData.savedPostsIDs?.includes(d.id)
  );

  useEffect(() => {
    apiFetch();
  }, []);

  useEffect(() => {
    const userId = getStorage("userId");
    getUserFetch(userId);
  }, []);

  return (
    <>
      <ThinkSection
        title={
          findSavedPosts.length <= 0
            ? "Yadda saxladığınz fikir tapılmadı!"
            : "Yadda saxlanılanlar"
        }
        items={findSavedPosts}
        loading={loading}
      />
    </>
  );
}

export default FavoritePage;
