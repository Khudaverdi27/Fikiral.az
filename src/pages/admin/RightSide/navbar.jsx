import { Link } from "react-router-dom";
import FormSearch from "../../../components/ui/Form/FormSearch";
import { useModalActions } from "../../../context/LoginModalProvider";
import IsConfirmModal from "../../../components/ui/Modals/IsConfirmModal";
import { removeStorage } from "../../../utils/helpers";
import DropdownMenu from "../../../components/ui/Dropdown";
import { DropNotifications } from "../../../components/ui/Dropdown/DropNotifications";
import { Badge } from "antd";
import { HiOutlineBell } from "react-icons/hi2";
function AdminNavbar() {
  const { userByIdData } = useModalActions();
  // const [notifications, notifyRes] = DropNotifications();
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
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
              dropDownItems={notifications}
              classes={"w-[359px] max-h-[424px] !top-[80px] overflow-x-hidden"}
            />
          </button>
        </Badge>
        <DropdownMenu
          classes={"w-[142px] max-h-[108px] !top-[70px] "}
          dropName={
            <span className="text-primaryGray dark:text-white">
              Pərvin Sucayeva{/* {userByIdData?.userName? */}
              <small className="block">Adminka</small>
            </span>
          }
          profilImg={
            userByIdData?.image ||
            userByIdData?.userName?.charAt(0).toLowerCase() ||
            "P"
          }
          dropDownItems={[
            {
              id: "editProfil",
              title: (
                <Link
                  to={"/edit-my-profile"}
                  className="flex items-center dark:text-white  text-base "
                >
                  Redaktə et
                </Link>
              ),
            },
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
