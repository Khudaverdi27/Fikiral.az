import DropdownMenu from "../ui/Dropdown";
import FormSearch from "../ui/Form/FormSearch";
import MenuActions from "../ui/MenuActions";
import Logo from "./Logo";
import { useCategories } from "../../hooks/useCategories";
import FormRegister from "../ui/Form/FormRegister";
import {
  getStorage,
  removeLocaleStorage,
  removeStorage,
} from "../../utils/helpers";
import { Link } from "react-router-dom";
import IsConfirmModal from "../ui/Modals/IsConfirmModal";
import { useModalActions } from "../../context/LoginModalProvider";
import { useMediaQuery } from "@uidotdev/usehooks";
import DrawerToggle from "../widget/Loading/ToggleMenu/drawer";
import classNames from "classnames";
import AddModal from "../ui/Modals/AddModal";
function Header() {
  const { category, loading } = useCategories(true, "checkbox");
  const { userByIdData } = useModalActions();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const isTablet = useMediaQuery("only screen and (max-width : 768px)");
  const token = getStorage("token");
  const logoutProfile = () => {
    removeStorage("token");
    removeStorage("userId");
    removeStorage("selectedCategories");
    removeStorage("social");
    removeLocaleStorage("gmail");
    location.reload();
    location.href = "/";
  };
  return (
    <header
      className={`${
        !isMobile ? "flex items-center py-[25px]" : "px-5 py-2"
      }   w-full  dark:bg-[#22303c]  
     top-0 z-40  bg-[#FDFDFF] ${
       token.length > 0 ? "justify-center " : "justify-evenly "
     } sticky `}
    >
      <div className="flex justify-between">
        <div
          className={classNames("flex", "items-center", {
            "justify-between": isMobile,
            "ml-[50px]": !isMobile,
            "!ml-24": !isMobile && token.length > 0,
          })}
        >
          <Logo />
          {!isMobile && <FormSearch />}
        </div>
        <div className="flex space-x-2 cursor-pointer items-center relative">
          {!isMobile && (
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
          )}
          {isMobile && token.length == 0 && (
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
          )}

          <MenuActions />
          {isMobile && <FormSearch />}
          {isMobile && <DrawerToggle />}
          {token.length !== 0 && !isMobile && <AddModal />}
        </div>
      </div>
      {token.length !== 0 && isMobile && (
        <div className="flex justify-between mt-5">
          <div>
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
          </div>
          <div>
            <AddModal />
          </div>
        </div>
      )}
      {token.length !== 0 ? (
        !isMobile && (
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
        )
      ) : (
        <div className={`${!isMobile && "mr-12"}`}>
          <FormRegister />
        </div>
      )}
    </header>
  );
}

export default Header;
