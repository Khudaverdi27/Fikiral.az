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
  const [loginAdmin, setLoginAdmin] = useState(false);
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
    if (userLoginAuth?.userResponse?.userName === "yenifikir") {
      setLoginAdmin(true);
    } else if (userLoginAuth.status) {
      setAuthError(true);
    } else {
      setLoginAdmin(false);
    }
  }, [userLoginAuthLoading]);

  useEffect(() => {
    if (categories) {
      categories.map((category) => getThinkBy({ slug: category.slug }));
    }
  }, [categoryLoad]);

  return (
    <>
      {loginAdmin ? (
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
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center h-screen"
        >
          <div className="space-y-3">
            <h3 className="text-center text-2xl font-semibold mb-4">
              Admin panelə xoş gəlmişsiniz!
            </h3>
            <div>
              <input
                placeholder="admin mail"
                className="loginInput"
                type="text"
                {...register("gmail", { required: true })}
                aria-invalid={errors.gmail ? "true" : "false"}
              />
              {errors.gmail?.type === "required" && (
                <p className="text-red-500 text-sm" role="alert">
                  Ad boş buraxıla bilməz
                </p>
              )}
            </div>
            <div>
              <input
                placeholder="admin şifrə"
                className="loginInput"
                type="password"
                {...register("password", {
                  required: "Şifrə boş buraxıla bilməz",
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-red-500 text-sm" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button className=" border  w-full dark:border-[#22303c]  bg-indigo-500 text-white py-2 px-4 rounded-xl">
              {userLoginAuthLoading ? "Gözləyin..." : "Daxil ol"}
            </button>
            {authError && (
              <span className="text-red-500 text-sm">Yenidən yoxlayın!</span>
            )}
          </div>
        </form>
      )}
    </>
  );
}

export default AdminPage;
