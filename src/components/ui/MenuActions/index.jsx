import { HiOutlineBell } from "react-icons/hi2";
import { IoBookmarks, IoBookmarksOutline } from "react-icons/io5";
import { Badge } from "antd";
import { IconContext } from "react-icons";
import { useState } from "react";
import DropdownMenu from "../Dropdown";
import { DropNotifications } from "../Dropdown/DropNotifications";
import AddModal from "../Modals/AddModal";
import { Link } from "react-router-dom";

function MenuActions() {
  const [notifications, arr] = DropNotifications();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex gap-x-[32px] items-center justify-center">
      <IconContext.Provider
        value={{ color: "white", className: "hover:fill-[#ffff]" }}
      >
        <Badge size={"small"} count={arr.length}>
          <button className="">
            <DropdownMenu
              dropName={<HiOutlineBell className="size-[28px] " />}
              dropDownItems={notifications}
              classes={"w-[359px] max-h-[424px] overflow-x-hidden"}
            />
          </button>
        </Badge>
      </IconContext.Provider>

      <Link to={"/favorites"}>
        {isHovered ? (
          <IoBookmarks
            className="size-[24px] text-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ) : (
          <IoBookmarksOutline
            className="size-[24px] text-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        )}
      </Link>

      <AddModal />
    </div>
  );
}

export default MenuActions;
