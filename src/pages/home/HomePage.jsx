import ThinkSection from "./components/ThinkSections";
import { useModalActions } from "../../context/LoginModalProvider";
import { useAiPosts, useFetchThinksList } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { getStorage, removeStorage } from "../../utils/helpers";
import { useSearchActions } from "../../context/FormSearchProvider";
import _ from "lodash";
function HomePage() {
  const [data, apiFetch, loading] = useFetchThinksList();
  const [newCategories, setNewCategories] = useState([]);
  const [userSelectCateg, setUserSelectCateg] = useState([]);
  const [aiPosts, getAiPosts, aiLoading] = useAiPosts();
  const [allAccepted, setAllaccepted] = useState();

  const { isPosted, setIsPosted, selectCategory, userByIdData, getUserFetch } =
    useModalActions();

  const { searchResponse } = useSearchActions();

  useEffect(() => {
    getAiPosts();
  }, []);

  useEffect(() => {
    const approvals =
      aiPosts && aiPosts?.filter((post) => post.isApproval === true);
    if (aiPosts) {
      setAllaccepted(data.concat(approvals));
    }
  }, [aiPosts, data]);

  setTimeout(() => {
    removeStorage("admin");
  }, 5000);

  useEffect(() => {
    if (_.get(userByIdData, "id")) {
      const dataForUser = _.chain(allAccepted)
        .filter((d) =>
          _.get(userByIdData, "categoryIds", []).includes(
            _.get(d, "category.id")
          )
        )
        .sortBy((d) => -_.get(d, "likeCount", 0))
        .value();

      setUserSelectCateg(dataForUser);
    }
  }, [loading]);

  useEffect(() => {
    const categoryFromStorage = getStorage("selectedCategories");
    setNewCategories(categoryFromStorage);
  }, [selectCategory]);

  useEffect(() => {
    apiFetch().then(() => {
      setIsPosted(false);
    });
  }, [isPosted]);

  const sortedData = _.chain(allAccepted)
    .sortBy((d) => -_.get(d, "id", 0))
    .reject((d) =>
      _.get(userByIdData, "categoryIds", []).includes(_.get(d, "category.id"))
    )
    .value();

  const filteredCategories = _.chain(allAccepted)
    .filter((item) => _.includes(newCategories, _.get(item, "category.id")))
    .value();

  useEffect(() => {
    const userId = getStorage("userId");
    getUserFetch(userId);
  }, [loading]);

  return (
    <>
      {userSelectCateg.length > 0 &&
        searchResponse.length <= 0 &&
        filteredCategories.length <= 0 && (
          <ThinkSection
            title={"Sizin üçün"}
            items={userSelectCateg}
            loading={loading}
          />
        )}

      <ThinkSection
        title={
          <p className="text-center">{`${
            filteredCategories.length > 0
              ? "Seçdiyiniz kateqoriyalardan"
              : "Bütün fikirlər"
          }`}</p>
        }
        items={filteredCategories.length > 0 ? filteredCategories : sortedData}
        loading={loading}
      />
    </>
  );
}

export default HomePage;
