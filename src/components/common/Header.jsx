import DropdownMenu from "../ui/Dropdown";
import FormSearch from "../ui/Form/FormSearch";
import MenuActions from "../ui/MenuActions";
import { GrLogout } from "react-icons/gr";
import Logo from "./Logo";
import { useCategories } from "../../hooks/useCategories";

function Header() {
  const [categories] = useCategories(true, "checkbox");
  return (
    <header
      className=" flex items-center w-full  
    h-[113px]  top-0 z-40   justify-center sticky text-white"
    >
      <div className=" flex items-center">
        <Logo />
        <FormSearch />
      </div>
      <div className="flex space-x-[15px]  pr-14 cursor-pointer items-center">
        <DropdownMenu
          dropName={<span className="text-primaryGray">Kateqoriya</span>}
          dropDownItems={categories}
          classes={"w-[314px] max-h-[424px] overflow-x-hidden "}
        />
        <MenuActions />
        <DropdownMenu
          classes={"w-[142px] max-h-[108px]"}
          dropName={<span className="text-primaryGray">Samir N.</span>}
          profilImg={
            "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
          }
          dropDownItems={[
            {
              id: "editProfil",
              title: (
                <span className="flex items-center  hover:px-1 text-[16px] hover:border hover:border-black">
                  Dəyiş
                </span>
              ),
            },
            {
              id: "logoutProfile",
              title: (
                <div className="flex items-center  text-[16px] space-x-5 hover:border hover:border-black hover:px-1">
                  <span>Çıxış et</span>
                  <GrLogout className="w-[14px] h-[20] " />
                </div>
              ),
            },
          ]}
        />
      </div>
    </header>
  );
}

export default Header;
