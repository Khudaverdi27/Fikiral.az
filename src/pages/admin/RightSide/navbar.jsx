import FormSearch from "../../../components/ui/Form/FormSearch";
import IsConfirmModal from "../../../components/ui/Modals/IsConfirmModal";
import { removeStorage } from "../../../utils/helpers";
import DropdownMenu from "../../../components/ui/Dropdown";
import { Badge } from "antd";
import { HiOutlineBell } from "react-icons/hi2";
function AdminNavbar({ userLoginAuth }) {
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
    removeStorage("social");
    location.reload();
    location.href = "/";
  };
  return (
    <nav className="bg-white flex justify-between w-full py-4 pr-12">
      <FormSearch />
      <div className=" flex items-center space-x-6">
        <Badge className="dark:text-white" size={"small"} count={0}>
          <button>
            <DropdownMenu
              dropName={<HiOutlineBell className="size-6" />}
              dropDownItems={[{ name: "boşdur" }]}
              classes={"w-[359px] max-h-[424px] !top-[80px] overflow-x-hidden"}
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
