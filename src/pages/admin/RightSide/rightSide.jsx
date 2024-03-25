import { useEffect, useState } from "react";
import AdminNavbar from "./navbar";
import CalendarPicker from "./calendar";
import StatisticsCard from "./statisticCards";
import LineChart from "./chart";
import FullCategories from "./fullCategories";
import FullUsers from "./fullUsers";
import AllPostsPending from "./pendingPosts";
import AllPosts from "./allPosts";
import { useFetchInAcceptedThinks } from "../../../hooks/useFetch";

function RighSide({
  allActiveUsers,
  allActiveLoading,
  categories,
  categoryLoad,
  thinks,
  thinksLoading,
  activeMenuLeft,
  getCategories,
  getThinkFetch,
}) {
  const [activeMenu, setActiveMenu] = useState(false);
  const [inAcceptedPosts, fetchInAccepted, loading] =
    useFetchInAcceptedThinks();
  const dates = [
    { name: "Bu gün", key: "today" },
    { name: "Bu həftə", key: "week" },
    { name: "Bu ay", key: "month" },
    { name: "Bu il", key: "year" },
  ];
  const handleActiveMenu = (key) => {
    setActiveMenu(key);
  };
  useEffect(() => {
    fetchInAccepted();
  }, []);

  return (
    <section className="w-full">
      <AdminNavbar inAcceptedPosts={inAcceptedPosts} />
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
        <FullUsers />
      ) : activeMenuLeft === "post" ? (
        <AllPostsPending
          inAcceptedPosts={inAcceptedPosts}
          fetchInAccepted={fetchInAccepted}
          loading={loading}
        />
      ) : activeMenuLeft === "allpost" ? (
        <AllPosts
          thinks={thinks}
          thinksLoading={thinksLoading}
          getThinkFetch={getThinkFetch}
        />
      ) : (
        <>
          <div className="flex space-x-5 mt-10 justify-center">
            <StatisticsCard
              name={"Aktiv istifadəçilər"}
              count={allActiveUsers.length}
              loading={allActiveLoading}
              increase={"2,5"}
            />
            <StatisticsCard
              name={"Kateqoriyalar"}
              count={categories.length}
              loading={categoryLoad}
              increase={"0"}
            />
            <StatisticsCard
              name={"Postlar"}
              count={thinks.length}
              loading={thinksLoading}
              increase={"5"}
            />
          </div>
          <LineChart chartLabels={categories} byLoad={thinksLoading} />
        </>
      )}
    </section>
  );
}

export default RighSide;
