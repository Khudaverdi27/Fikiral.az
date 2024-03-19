import { useState } from "react";
import AdminNavbar from "./navbar";
import CalendarPicker from "./calendar";
import StatisticsCard from "./statisticCards";

function RighSide() {
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

  const cardData = [
    { name: "İstifadəçilər", key: "users", count: 10 },
    { name: "Kateqoriya", key: "category", count: 14 },
    { name: "Post", key: "post", count: 20 },
  ];

  return (
    <section className="w-full">
      <AdminNavbar />
      <div className="mt-6 flex justify-between pl-7 pr-10">
        <div className="space-x-5 ">
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
      <div className="flex ">
        {cardData.map((data) => (
          <StatisticsCard name={data.name} count={data.count} />
        ))}
      </div>
    </section>
  );
}

export default RighSide;
