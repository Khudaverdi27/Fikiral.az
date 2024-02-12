import { HiOutlineBell, HiOutlineBookmark } from "react-icons/hi2";
import { HiBookmark } from "react-icons/hi2";
import { Badge } from "antd";
import { IconContext } from "react-icons";
import { useState } from "react";
import DropdownMenu from "../Dropdown";
import { DropNotifications } from "../Dropdown/DropNotifications";
import AddModal from "../Modals/AddModal";
import { Link } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import DropLanguage from "../Dropdown/DropLanguage";
import { getStorage } from "../../../utils/helpers";

function MenuActions() {
  const [notifications, arr] = DropNotifications();

  const token = getStorage("token");

  return (
    <div className="flex gap-x-[25px] items-center justify-center text-primaryGray">
      {token && (
        <IconContext.Provider
          value={{ color: "#262626", className: "hover:fill-[#262626]" }}
        >
          <Badge size={"small"} count={arr.length}>
            <button className="">
              <DropdownMenu
                dropName={<HiOutlineBell className="size-7 " />}
                dropDownItems={notifications}
                classes={"w-[359px] max-h-[424px] overflow-x-hidden"}
              />
            </button>
          </Badge>

          <Link to={"/favorites"}>
            <HiOutlineBookmark className="size-6 text-primaryGray" />
          </Link>
        </IconContext.Provider>
      )}
      <IoSunnyOutline className="size-7 shrink-0" />
      <>
        <DropLanguage />
      </>
      {token && <AddModal />}
    </div>
  );
}

export default MenuActions;
