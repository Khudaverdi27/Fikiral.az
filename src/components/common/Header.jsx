import DropdownMenu from "../ui/Dropdown";
import FormSearch from "../ui/Form/FormSearch";
import MenuActions from "../ui/MenuActions";
import { GrLogout } from "react-icons/gr";
import Logo from "./Logo";
import { useCategories } from "../../hooks/useCategories";
import FormRegister from "../ui/Form/FormRegister";
import { getStorage, removeStorage } from "../../utils/helpers";
import { Link } from "react-router-dom";

function Header() {
  const { category, loading } = useCategories(true, "checkbox");
  const token = getStorage("token");
  const user = getStorage("user");
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("user");
    removeStorage("selectedCategories");
    location.reload();
    location.href = "/";
  };

  return (
    <header
      className={`flex items-center w-full py-[25px]   
     top-0 z-40  bg-[#FDFDFF] ${
       token.length > 0 ? "justify-center " : "justify-evenly"
     } sticky text-white`}
    >
      <div
        className={`flex items-center ${token.length > 0 ? "ml-14" : "ml-4"}`}
      >
        <Logo />
        <FormSearch />
      </div>
      <div className="flex space-x-[15px]  cursor-pointer items-center">
        <DropdownMenu
          dropName={
            <Link
              to={token.length !== 0 ? "/home" : "/"}
              className="text-primaryGray hover:text-indigo-500 "
            >
              Kateqoriya
            </Link>
          }
          dropDownItems={category}
          classes={"w-[314px] max-h-[424px] overflow-x-hidden "}
        />
        <MenuActions />
        {token.length !== 0 ? (
          <DropdownMenu
            classes={"w-[142px] max-h-[108px]"}
            loading={loading}
            dropName={
              <span className="text-primaryGray">
                {user?.userResponse?.userName}
              </span>
            }
            profilImg={
              user?.userResponse?.image
                ? user.userResponse?.image
                : user?.userResponse?.userName?.charAt(0).toLowerCase()
            }
            dropDownItems={[
              {
                id: "editProfil",
                title: (
                  <Link
                    to={"/edit-my-profile"}
                    className="flex items-center  hover:px-1 text-[16px] hover:border hover:border-black"
                  >
                    Dəyiş
                  </Link>
                ),
              },
              {
                id: "logoutProfile",
                title: (
                  <button
                    onClick={logoutProfile}
                    className="flex items-center  text-[16px] space-x-5 hover:border hover:border-black hover:px-1"
                  >
                    <span>Çıxış et</span>
                    <GrLogout className="w-[14px] h-[20] " />
                  </button>
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
