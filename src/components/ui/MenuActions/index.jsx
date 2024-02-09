import { HiOutlineBell } from "react-icons/hi2";
import { IoBookmarks, IoBookmarksOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { Badge } from "antd";
import { IconContext } from "react-icons";
import { useState } from "react";
import DropdownMenu from "../Dropdown";
import { notifcations } from "../Dropdown/DropDownCategories";
import AddModal from "../Modal";

function MenuActions() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex gap-x-[32px] items-center justify-center">
      <IconContext.Provider
        value={{ color: "white", className: "hover:fill-[#ffff]" }}
      >
        <Badge size={"small"} count={notifcations.length}>
          <button className="">
            <DropdownMenu
              dropName={<HiOutlineBell className="size-[28px] " />}
              dropDownItems={notifcations}
              classes={"w-[359px] max-h-[424px] overflow-x-hidden"}
            />
          </button>
        </Badge>
      </IconContext.Provider>

      <button>
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
      </button>

      <AddModal />
    </div>
  );
}

export default MenuActions;
