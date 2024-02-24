import { HiOutlineBell, HiOutlineBookmark } from "react-icons/hi2";
import { Badge } from "antd";
import { IconContext } from "react-icons";
import DropdownMenu from "../Dropdown";
import { DropNotifications } from "../Dropdown/DropNotifications";
import AddModal from "../Modals/AddModal";
import { Link, useLocation } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import DropLanguage from "../Dropdown/DropLanguage";
import { getStorage } from "../../../utils/helpers";

function MenuActions() {
  const [notifications, arr] = DropNotifications();
  const token = getStorage("token");
  const pathname = useLocation().pathname;
  return (
    <div className="flex gap-x-[25px] items-center justify-center text-primaryGray">
      {token.length !== 0 && (
        <>
          <IconContext.Provider
            value={{
              color: "#262626",
              className: `hover:stroke-black  ${
                pathname == "/favorites" && "fill-[#262626]"
              } `,
            }}
          >
            <Link to={"/favorites"}>
              <HiOutlineBookmark className="size-6 " />
            </Link>
          </IconContext.Provider>
          <Badge size={"small"} count={arr.length}>
            <button>
              <DropdownMenu
                dropName={<HiOutlineBell className="size-6" />}
                dropDownItems={notifications}
                classes={"w-[359px] max-h-[424px] overflow-x-hidden"}
              />
            </button>
          </Badge>
        </>
      )}
      <IoSunnyOutline className="size-7 shrink-0" />
      <>
        <DropLanguage />
      </>
      {token.length !== 0 && <AddModal />}
    </div>
  );
}

export default MenuActions;
