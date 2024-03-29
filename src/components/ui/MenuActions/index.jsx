import { HiOutlineBell, HiOutlineBookmark } from "react-icons/hi2";
import { Badge } from "antd";
import { IconContext } from "react-icons";
import DropdownMenu from "../Dropdown";
import { DropNotifications } from "../Dropdown/DropNotifications";
import AddModal from "../Modals/AddModal";
import { Link, useLocation } from "react-router-dom";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import DropLanguage from "../Dropdown/DropLanguage";
import { getStorage } from "../../../utils/helpers";
import { useDarkMode } from "../../../context/DarkMode";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

function MenuActions() {
  const [notifications, notifyRes] = DropNotifications();
  const [dark, setDark] = useState(false);
  const token = getStorage("token");
  const theme = getStorage("theme");
  const pathname = useLocation().pathname;
  const { handleChange } = useDarkMode();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const switchDarkMode = () => {
    handleChange();
    theme.length > 0 ? setDark(false) : setDark(true);
  };

  useEffect(() => {
    theme.length > 0 ? setDark(true) : setDark(false);
  }, [theme]);

  return (
    <div className="flex gap-x-[25px] items-center justify-center text-primaryGray">
      {token.length !== 0 && !isMobile && (
        <>
          <IconContext.Provider
            value={{
              color: "#262626",
              className: `hover:stroke-black  ${
                pathname == "/favorites" && "fill-[#262626] dark:fill-white"
              } `,
            }}
          >
            <Link to={"/favorites"}>
              <HiOutlineBookmark className="size-6 dark:!text-white" />
            </Link>
          </IconContext.Provider>
          <Badge
            className="dark:text-white"
            size={"small"}
            count={notifyRes.length}
          >
            <button>
              <DropdownMenu
                dropName={<HiOutlineBell className="size-6" />}
                dropDownItems={notifications}
                classes={
                  "w-[359px] max-h-[424px] !top-[80px] overflow-x-hidden"
                }
              />
            </button>
          </Badge>
        </>
      )}
      <button
        className={`${isMobile ? "mr-8" : "ml-2"}`}
        onClick={switchDarkMode}
      >
        {dark ? (
          <IoMoon className="size-6 shrink-0 dark:text-gray-300" />
        ) : (
          <IoSunnyOutline className="size-7 shrink-0 " />
        )}
      </button>

      <>{!isMobile && <DropLanguage />}</>
    </div>
  );
}

export default MenuActions;
