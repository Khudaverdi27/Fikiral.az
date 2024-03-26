import Logo from "../../components/common/Logo";

function LeftSide({ activeMenuLeft, setActiveMenu }) {
  const menus = [
    { name: "Dashboard", key: "main" },
    { name: "Kateqoriya", key: "category" },
    { name: "Bütün istifadəçilər", key: "users" },
    { name: "Bütün postlar", key: "allpost" },
    { name: "Post istəkləri", key: "post" },
  ];
  const handleActiveMenu = (key) => {
    setActiveMenu(key);
  };

  return (
    <aside className="min-w-[250px] min-h-screen font-roboto">
      <div className="bg-[#332862] h-[76px] flex items-center justify-center">
        <Logo />
      </div>
      <div className="bg-indigo-500 space-y-8 pt-8 px-4 h-full ">
        {menus.map((menu) => (
          <button
            key={menu.key}
            onClick={() => handleActiveMenu(menu.key)}
            className={`block w-full text-left px-9 py-2 ${
              activeMenuLeft === menu.key
                ? "text-indigo-500 bg-white   rounded-lg"
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
