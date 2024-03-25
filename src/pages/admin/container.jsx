import { useEffect, useState } from "react";
import {
  useFetchAllCategoryList,
  useFetchThinksList,
  useFetchThinkByCategory,
  useFetchAuthLogin,
  useGetActiveUsers,
} from "../../hooks/useFetch";
import LeftSide from "./leftSide";
import RighSide from "./RightSide/rightSide";
import { useForm } from "react-hook-form";

function AdminPage() {
  const [allActiveUsers, getActiveUserFetch, allActiveLoading] =
    useGetActiveUsers();
  const [categories, getCategories, categoryLoad] = useFetchAllCategoryList();
  const [thinks, getThinkFetch, thinksLoading] = useFetchThinksList();
  const [thinkbYcategory, getThinkBy, byLoad] = useFetchThinkByCategory();
  const [activeMenuLeft, setActiveMenu] = useState("main");
  const [userLoginAuth, loginFetch, userLoginAuthLoading] = useFetchAuthLogin();
  const [authError, setAuthError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => loginFetch(data);

  useEffect(() => {
    getActiveUserFetch();
    getCategories();
    getThinkFetch();
  }, []);

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
          userLoginAuth={userLoginAuth}
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
