import { useState } from "react";
import AdminNavbar from "./navbar";
import CalendarPicker from "./calendar";
import StatisticsCard from "./statisticCards";
import LineChart from "./chart";
import FullCategories from "./fullCategories";
import FullUsers from "./fullUsers";
import AllPostsPending from "./pendingPosts";
import AllPosts from "./allPosts";

function RighSide({
  userLoginAuth,
  allUsers,
  allUserLoading,
  getAllUserFetch,
  categories,
  categoryLoad,
  thinks,
  thinksLoading,
  activeMenuLeft,
  getCategories,
  getThinkFetch,
}) {
  const [activeMenu, setActiveMenu] = useState(false);

  const dates = [
    { name: "Bu gün", key: "today" },
    { name: "Bu həftə", key: "week" },
    { name: "Bu ay", key: "month" },
    { name: "Bu il", key: "year" },
  ];
  const handleActiveMenu = (key) => {
    setActiveMenu(key);
  };

  return (
    <section className="w-full">
      <AdminNavbar userLoginAuth={userLoginAuth} />
      {activeMenuLeft === "main" && (
        <div className="mt-6 flex justify-between pl-7 pr-10">
          <div className="space-x-5 bg-white rounded-lg">
            {dates.map((date) => (
              <button
                key={date.key}
                onClick={() => handleActiveMenu(date.key)}
                className={`px-4 py-1 ${
                  activeMenu === date.key
                    ? "text-indigo-500 bg-white shadow-sm shadow-gray-300 rounded-lg"
                    : "text-black"
                } `}
              >
                {date.name}
              </button>
            ))}
          </div>
          <CalendarPicker />
        </div>
      )}

      {activeMenuLeft === "category" ? (
        <FullCategories
          categories={categories}
          categoryLoad={categoryLoad}
          getCategories={getCategories}
        />
      ) : activeMenuLeft === "users" ? (
        <FullUsers
          allUsers={allUsers}
          allUserLoading={allUserLoading}
          getAllUserFetch={getAllUserFetch}
        />
      ) : activeMenuLeft === "post" ? (
        <AllPostsPending />
      ) : activeMenuLeft === "allpost" ? (
        <AllPosts
          thinks={thinks}
          thinksLoading={thinksLoading}
          getThinkFetch={getThinkFetch}
        />
      ) : (
        <>
          <div className="flex w-full  justify-center">
            <StatisticsCard
              name={"İstifadəçilər"}
              count={allUsers.length}
              loading={allUserLoading}
            />
            <StatisticsCard
              name={"Kateqoriyalar"}
              count={categories.length}
              loading={categoryLoad}
            />
            <StatisticsCard
              name={"Postlar"}
              count={thinks.length}
              loading={thinksLoading}
            />
          </div>
          <LineChart chartLabels={categories} byLoad={thinksLoading} />
        </>
      )}
    </section>
  );
}

export default RighSide;
