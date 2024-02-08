import { HiOutlineBell } from "react-icons/hi2";
import { IoBookmarks, IoBookmarksOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { Badge } from "antd";
import { IconContext } from "react-icons";
import { useState } from "react";
import DropdownMenu from "../Dropdown";
import { categories } from "../Dropdown/DropDownCategories";

function MenuActions() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex gap-x-[32px] items-center justify-center">
      <IconContext.Provider
        value={{ color: "white", className: "hover:fill-[#ffff]" }}
      >
        <Badge size={"small"} count={1}>
          <button className="">
            <DropdownMenu
              dropName={<HiOutlineBell className="size-[28px] " />}
              dropDownItems={categories}
              classes={"w-[314px] max-h-[424px] overflow-x-hidden "}
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

      <button className="relative hover:bg-[#8FE4FF] hover:rounded-full  ">
        <span className="addPlusBtn">
          <GoPlus className="size-[32px] text-white " />
        </span>
      </button>
    </div>
  );
}

export default MenuActions;
