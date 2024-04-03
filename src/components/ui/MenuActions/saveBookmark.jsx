import { IconContext } from "react-icons";
import { HiOutlineBookmark } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
function SaveBookmark({ title }) {
  const pathname = useLocation().pathname;
  return (
    <IconContext.Provider
      value={{
        color: "#262626",
        className: `hover:stroke-black  ${
          pathname == "/favorites" && "fill-[#262626] dark:fill-white"
        } `,
      }}
    >
      <Link className="flex items-center space-x-3" to={"/favorites"}>
        {title} <HiOutlineBookmark className="size-6 dark:!text-white" />
      </Link>
    </IconContext.Provider>
  );
}

export default SaveBookmark;
