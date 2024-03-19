import DropdownMenu from "../ui/Dropdown";
import FormSearch from "../ui/Form/FormSearch";
import MenuActions from "../ui/MenuActions";
import Logo from "./Logo";
import { useCategories } from "../../hooks/useCategories";
import FormRegister from "../ui/Form/FormRegister";
import { getStorage, removeStorage } from "../../utils/helpers";
import { Link } from "react-router-dom";
import IsConfirmModal from "../ui/Modals/IsConfirmModal";
import { useModalActions } from "../../context/LoginModalProvider";

function Header() {
  const { category, loading } = useCategories(true, "checkbox");
  const { userByIdData } = useModalActions();
  const token = getStorage("token");
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
    location.reload();
    location.href = "/";
  };
  return (
    <header
      className={`flex items-center w-full py-[25px] dark:bg-[#22303c]  
     top-0 z-40  bg-[#FDFDFF] ${
       token.length > 0 ? "justify-center " : "justify-evenly"
     } sticky `}
    >
      <div
        className={`flex items-center ${token.length > 0 ? "ml-14" : "ml-4"}`}
      >
        <Logo />
        <FormSearch />
      </div>
      <div className="flex space-x-[15px]  cursor-pointer items-center">
        <DropdownMenu
          loading={loading}
          dropName={
            <span className="text-primaryGray hover:text-indigo-500 dark:text-white">
              Kateqoriya
            </span>
          }
          dropDownItems={category}
          classes={"w-[314px] max-h-[424px] overflow-x-hidden !top-[85px]"}
        />
        <MenuActions />

        {token.length !== 0 ? (
          <DropdownMenu
            classes={"w-[142px] max-h-[108px] !top-[85px] "}
            dropName={
              <span className="text-primaryGray dark:text-white ">
                {userByIdData?.userName?.split(" ")[0].toLowerCase()}
              </span>
            }
            profilImg={
              userByIdData?.image ||
              userByIdData?.userName?.charAt(0).toLowerCase()
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
        ) : (
          <FormRegister />
        )}
      </div>
    </header>
  );
}

export default Header;
