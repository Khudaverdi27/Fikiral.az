import { useEffect, useState } from "react";
import {
  useGetAllUsers,
  useFetchAllCategoryList,
  useFetchThinksList,
  useFetchThinkByCategory,
} from "../../hooks/useFetch";
import LeftSide from "./leftSide";
import RighSide from "./RightSide/rightSide";

function AdminPage() {
  const [allUsers, getAllUserFetch, allUserLoading] = useGetAllUsers();
  const [categories, getCategories, categoryLoad] = useFetchAllCategoryList();
  const [thinks, getThinkFetch, thinksLoading] = useFetchThinksList();
  const [thinkbYcategory, getThinkBy, byLoad] = useFetchThinkByCategory();

  useEffect(() => {
    getAllUserFetch();
    getCategories();
    getThinkFetch();
  }, []);

  useEffect(() => {
    if (categories) {
      categories.map((category) => getThinkBy({ slug: category.slug }));
    }
  }, [categoryLoad]);

  return (
    <div className="flex w-full overflow-hidden">
      <LeftSide />
      <RighSide
        thinkbYcategory={thinkbYcategory}
        allUsers={allUsers}
        allUserLoading={allUserLoading}
        categories={categories}
        categoryLoad={categoryLoad}
        thinks={thinks}
        thinksLoading={thinksLoading}
      />
    </div>
  );
}

export default AdminPage;
