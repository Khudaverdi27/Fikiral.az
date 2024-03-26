import { useEffect, useState } from "react";
import {
  useFetchAllCategoryList,
  useFetchThinksList,
  useFetchThinkByCategory,
  useGetActiveUsers,
} from "../../hooks/useFetch";
import LeftSide from "./leftSide";
import RighSide from "./RightSide/rightSide";
import { getStorage, removeStorage } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useModalActions } from "../../context/LoginModalProvider";

function AdminPage() {
  const [allActiveUsers, getActiveUserFetch, allActiveLoading] =
    useGetActiveUsers();
  const [categories, getCategories, categoryLoad] = useFetchAllCategoryList();
  const [thinks, getThinkFetch, thinksLoading] = useFetchThinksList();
  const [thinkbYcategory, getThinkBy, byLoad] = useFetchThinkByCategory();
  const [activeMenuLeft, setActiveMenu] = useState("main");
  const { userById, userLoading } = useModalActions();
  const navigate = useNavigate();

  useEffect(() => {
    getActiveUserFetch();
    getCategories();
    getThinkFetch();
  }, []);
  const admin = getStorage("admin");
  setTimeout(() => {
    removeStorage("admin");
  }, 60000);
  useEffect(() => {
    if (admin.length == 0) {
      removeStorage("userId");
      removeStorage("token");
      navigate("/");
    }
  }, [userById]);

  useEffect(() => {
    if (categories) {
      categories.map((category) => getThinkBy({ slug: category.slug }));
    }
  }, [categoryLoad]);

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <LeftSide
          activeMenuLeft={activeMenuLeft}
          setActiveMenu={setActiveMenu}
        />
        <RighSide
          userById={userById}
          userLoading={userLoading}
          activeMenuLeft={activeMenuLeft}
          thinkbYcategory={thinkbYcategory}
          getCategories={getCategories}
          allActiveUsers={allActiveUsers}
          allActiveLoading={allActiveLoading}
          categories={categories}
          categoryLoad={categoryLoad}
          thinks={thinks}
          thinksLoading={thinksLoading}
          getThinkFetch={getThinkFetch}
        />
      </div>
    </>
  );
}

export default AdminPage;
