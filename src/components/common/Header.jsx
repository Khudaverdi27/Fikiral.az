import DropdownMenu from "../ui/Dropdown";
import FormSearch from "../ui/Form/FormSearch";
import MenuActions from "../ui/MenuActions";

import Logo from "./Logo";

function Header() {
  return (
    <header className=" flex space-x-[10px] items-center w-full">
      <div className="gap-2 flex items-center">
        <Logo />
        <FormSearch />
      </div>
      <div className="flex space-x-[25px] cursor-pointer items-center w-[491px]">
        <DropdownMenu dropName={"Kateqoriya"} />
        <MenuActions />
        <DropdownMenu
          dropName={"Samir N."}
          profilImg={
            "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
          }
        />
      </div>
    </header>
  );
}

export default Header;
