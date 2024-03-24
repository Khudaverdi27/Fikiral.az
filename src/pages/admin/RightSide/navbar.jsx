import FormSearch from "../../../components/ui/Form/FormSearch";
import IsConfirmModal from "../../../components/ui/Modals/IsConfirmModal";
import { removeStorage } from "../../../utils/helpers";
import DropdownMenu from "../../../components/ui/Dropdown";
import { Badge } from "antd";
import { HiOutlineBell } from "react-icons/hi2";
import { useEffect, useState } from "react";
function AdminNavbar({ userLoginAuth, inAcceptedPosts }) {
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
    removeStorage("social");
    location.reload();
    location.href = "/";
  };

  const [badgeName, setBadgeName] = useState("Boşdur");

  useEffect(() => {
    if (inAcceptedPosts.length > 0) {
      setBadgeName(`${inAcceptedPosts?.length} ədəd post istəyi daxil olub`);
    }
  }, [inAcceptedPosts]);
  return (
    <nav className="bg-white flex justify-between w-full py-4 pr-12">
      <FormSearch />
      <div className=" flex items-center space-x-6">
        <Badge size={"small"} count={inAcceptedPosts?.length}>
          <button>
            <DropdownMenu
              dropName={<HiOutlineBell className="size-6" />}
              dropDownItems={[{ name: badgeName }]}
              classes={"w-[309px] max-h-[424px] !top-[75px] overflow-x-hidden"}
            />
          </button>
        </Badge>
        <DropdownMenu
          classes={"w-[142px] max-h-[108px] !top-[70px] "}
          dropName={
            <span className="text-primaryGray dark:text-white">
              {userLoginAuth?.userResponse?.userName}
              <small className="block">Adminka</small>
            </span>
          }
          profilImg={
            userLoginAuth?.userResponse?.image ||
            userLoginAuth?.userResponse?.userName?.charAt(0).toLowerCase()
          }
          dropDownItems={[
            {
              id: "logoutProfile",
              title: (
                <IsConfirmModal
                  title={"Hesabdan çıxmaq istəyirsiz?"}
                  dangerBtn={"Çıxış"}
                  destroyBtn={"Çıxış"}
                  destroyProfile={logoutProfile}
                />
              ),
            },
          ]}
        />
      </div>
    </nav>
  );
}

export default AdminNavbar;
