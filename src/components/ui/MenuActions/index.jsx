import { DropNotifications } from "../Dropdown/DropNotifications";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import DropLanguage from "../Dropdown/DropLanguage";
import { getStorage } from "../../../utils/helpers";
import { useDarkMode } from "../../../context/DarkMode";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import SaveBookmark from "./saveBookmark";
import Notifies from "./Notifes";

function MenuActions() {
  const [dark, setDark] = useState(false);
  const token = getStorage("token");
  const theme = getStorage("theme");
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
          <SaveBookmark />
          <Notifies />
        </>
      )}
      <button className={`${!isMobile && "ml-2"}`} onClick={switchDarkMode}>
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
