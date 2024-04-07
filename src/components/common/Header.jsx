import DropdownMenu from "../ui/Dropdown";
import FormSearch from "../ui/Form/FormSearch";
import MenuActions from "../ui/MenuActions";
import Logo from "./Logo";
import { useCategories } from "../../hooks/useCategories";
import FormRegister from "../ui/Form/FormRegister";
import { getStorage } from "../../utils/helpers";
import { useMediaQuery } from "@uidotdev/usehooks";
import classNames from "classnames";
import AddModal from "../ui/Modals/AddModal";
import DrawerToggle from "../widget/ToggleMenu/drawer";
import Notifies from "../ui/MenuActions/Notifes";
import DropProfile from "../ui/Dropdown/DropProfile";
function Header() {
  const { category, loading } = useCategories(true, "checkbox");
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const isTablet = useMediaQuery("only screen and (max-width : 768px)");
  const isLaptop = useMediaQuery("only screen and (max-width : 1115px)");
  const token = getStorage("token");

  return (
    <header
      className={classNames(
        {
          "flex items-center py-[25px]": !isMobile && !isTablet && !isLaptop,
          " py-1  ": isMobile,
          "px-3 pt-2": isLaptop,
          "w-full dark:bg-[#22303c] top-0 z-40 bg-[#FDFDFF] ": true,
          "justify-center": token.length > 0,
          "justify-evenly": token.length === 0,
        },
        "sticky"
      )}
    >
      <div
        className={`flex justify-between items-center ${
          isTablet && !isMobile && "px-3"
        }`}
      >
        <div
          className={classNames("flex", "items-center", {
            "justify-between": isMobile,
            "!ml-20": !isMobile && !isTablet && !isLaptop && token.length > 0,
            "ml-[50px]": !isMobile && !isTablet && !isLaptop,
          })}
        >
          <Logo />
          {!isMobile && !isTablet && <FormSearch />}
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
              classes={`w-[314px] max-h-[424px] overflow-x-hidden ${
                isTablet || isLaptop ? "!top-[46px]" : "!top-[85px]"
              }`}
            />
          )}

          {!isMobile && <MenuActions />}
          {isMobile && token.length !== 0 && (
            <div className="mr-4 mb-1">
              <Notifies />
            </div>
          )}
          {isMobile && <FormSearch />}
          {isMobile && <DrawerToggle loading={loading} category={category} />}
          {token.length !== 0 && !isMobile && !isTablet && !isLaptop && (
            <AddModal />
          )}
        </div>
      </div>
      {token.length !== 0 && (isMobile || isTablet) && <AddModal />}

      {token.length !== 0 ? (
        !isMobile &&
        !isTablet && (
          <div className="flex  items-center justify-between mt-3">
            <DropProfile top={isLaptop && "!top-[110px]"} />
            {isLaptop && <AddModal />}
          </div>
        )
      ) : (
        <div
          className={`${
            !isMobile && !isTablet
              ? `flex justify-end ${isLaptop ? " mt-2" : "mr-12"}`
              : "hidden"
          }`}
        >
          <FormRegister />
        </div>
      )}

      {token.length === 0 && isMobile && <FormRegister />}
      {isTablet && !isMobile && (
        <div className="flex w-full items-center justify-between mt-5">
          <FormSearch />
          {token.length === 0 ? (
            <FormRegister />
          ) : (
            <DropProfile top={"!top-[115px]"} />
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
