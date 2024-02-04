import { HiOutlineBell } from "react-icons/hi2";
import { IoBookmarksOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { Badge } from "antd";

function MenuActions() {
  return (
    <div className="flex space-x-[30px]">
      <Badge size={"small"} count={1}>
        <HiOutlineBell className="size-[24px] " />
      </Badge>
      <IoBookmarksOutline className="size-[24px] " />
      <GoPlus className="size-[24px] " />
    </div>
  );
}

export default MenuActions;
