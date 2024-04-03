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
  const token = getStorage("token");

  return (
    <header
      className={classNames(
        {
          "flex items-center py-[25px]": !isMobile,
          "px-5 py-2  ": isMobile,
          "w-full dark:bg-[#22303c] top-0 z-40 bg-[#FDFDFF]": true,
          "justify-center": token.length > 0,
          "justify-evenly": token.length === 0,
        },
        "sticky"
      )}
    >
      <div className="flex justify-between items-center">
        <div
          className={classNames("flex", "items-center", {
            "justify-between": isMobile,
            "!ml-20": !isMobile && token.length > 0,
            "ml-[50px]": !isMobile,
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

          {!isMobile && <MenuActions />}
          {isMobile && token.length > 0 && (
            <div className="mr-4 mb-1">
              <Notifies />
            </div>
          )}
          {isMobile && <FormSearch />}
          {isMobile && <DrawerToggle loading={loading} category={category} />}
          {token.length !== 0 && !isMobile && (
            <AddModal btnContent={"İdeyanı paylaş"} />
          )}
        </div>
      </div>
      {token.length !== 0 && isMobile && (
        <div className="flex justify-end mt-4">
          <AddModal btnContent={"İdeyanı paylaş"} />
        </div>
      )}
      {token.length !== 0 ? (
        !isMobile && <DropProfile />
      ) : (
        <div className={`${!isMobile ? "mr-12" : "hidden"}`}>
          <FormRegister />
        </div>
      )}
    </header>
  );
}

export default Header;
