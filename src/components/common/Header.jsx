import DropdownMenu from "../ui/Dropdown";
import FormSearch from "../ui/Form/FormSearch";
import MenuActions from "../ui/MenuActions";
import { GrLogout } from "react-icons/gr";
import Logo from "./Logo";
import { categories } from "../ui/Dropdown/DropDownCategories";

function Header() {
  return (
    <header
      className=" flex space-x-[10px] items-center w-full  
    h-[113px]  top-0 z-40 backdrop-brightness-40  justify-center sticky text-white"
    >
      <div className=" flex items-center">
        <Logo />
        <FormSearch />
      </div>
      <div className="flex space-x-[20px]  pr-14 cursor-pointer items-center">
        <DropdownMenu
          dropName={"Kateqoriya"}
          dropDownItems={categories}
          classes={"w-[314px] max-h-[424px] overflow-x-hidden "}
        />
        <MenuActions />
        <DropdownMenu
          classes={"w-[189px] "}
          dropName={"Samir N."}
          profilImg={
            "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
          }
          dropDownItems={[
            { title: "Dəyiş" },
            { title: "Çıxış et", icon: <GrLogout /> },
          ]}
        />
      </div>
    </header>
  );
}

export default Header;
