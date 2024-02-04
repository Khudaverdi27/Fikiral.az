import { HiOutlineBell } from "react-icons/hi2";
import { IoBookmarksOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

function MenuActions() {
  return (
    <div className="flex space-x-[30px]">
      <HiOutlineBell className="size-[24px] " />
      <IoBookmarksOutline className="size-[24px] " />
      <GoPlus className="size-[24px] " />
    </div>
  );
}

export default MenuActions;
