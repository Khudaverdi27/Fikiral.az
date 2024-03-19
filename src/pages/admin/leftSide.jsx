import { useState } from "react";
import Logo from "../../components/common/Logo";

function LeftSide() {
  const [activeMenu, setActiveMenu] = useState(false);
  const menus = [
    { name: "Əsas", key: "main" },
    { name: "Kateqoriya", key: "category" },
    { name: "İstifadəçilər", key: "users" },
    { name: "Post", key: "post" },
  ];
  const handleActiveMenu = (key) => {
    setActiveMenu(key);
  };
  return (
    <aside className="w-[305px] ">
      <div className="bg-[#332862] h-[76px] flex items-center justify-center">
        <Logo />
      </div>
      <div className="bg-indigo-500 space-y-8 pt-8 px-4 h-[calc(100vh_-_84px)]">
        {menus.map((menu) => (
          <button
            onClick={() => handleActiveMenu(menu.key)}
            className={`block w-full text-left px-9 ${
              activeMenu === menu.key
                ? "text-indigo-500 bg-white  py-2 rounded-lg"
                : "text-white"
            } `}
          >
            {menu.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default LeftSide;
