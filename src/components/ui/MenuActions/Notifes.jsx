import { HiOutlineBell } from "react-icons/hi2";
import { Badge } from "antd";
import DropdownMenu from "../Dropdown";
import { DropNotifications } from "../Dropdown/DropNotifications";
import { useMediaQuery } from "@uidotdev/usehooks";
function Notifies({ title }) {
  const [notifications, notifyRes] = DropNotifications();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  return (
    <Badge className="dark:text-white" size={"small"} count={notifyRes.length}>
      <button>
        {title}
        <DropdownMenu
          dropName={<HiOutlineBell className="size-6" />}
          dropDownItems={notifications}
          classes={`w-[359px] max-h-[424px] ${
            isMobile ? "!top-[60px]" : "!top-[80px]"
          } overflow-x-hidden`}
        />
      </button>
    </Badge>
  );
}

export default Notifies;
