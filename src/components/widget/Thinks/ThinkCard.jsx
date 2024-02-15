import { HiOutlineBookmark } from "react-icons/hi2";
import { IconContext } from "react-icons";
import { useState } from "react";
import ThinkCardActions from "./ThinkCardActions";
import { HiDotsVertical } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useModalActions } from "../../../context/LoginModalProvider";
import { getStorage } from "../../../utils/helpers";
import moment from "moment";

function ThinkCard({ thinks, children }) {
  const [bookmark, setBookmark] = useState(false);
  const { switcRegisterModal } = useModalActions();
  const token = getStorage("token");
  const changeBookmark = () => {
    if (!token) {
      switcRegisterModal();
    } else {
      setBookmark(!bookmark);
    }
  };

  const currentDate = moment();
  const targetDate = moment(thinks.publishedAt);
  const differenceInDays = currentDate.diff(targetDate, "days");
  const differenceInHours = currentDate.diff(targetDate, "hours");

  const path = useLocation().pathname;

  return (
    <div className="gutter-row">
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 items-center">
            <figure className="size-11">
              <img
                className="img-cover"
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                alt=""
              />
            </figure>
            <h6>{thinks.userName}</h6>
          </div>
          <div className="flex items-center">
            <IconContext.Provider
              value={{
                color: "#262626",
                className: `${path === "/favorites" && "fill-[#262626]"} ${
                  bookmark && "fill-[#262626]"
                } `,
              }}
            >
              <HiOutlineBookmark
                onClick={changeBookmark}
                className={`size-5  cursor-pointer `}
              />
            </IconContext.Provider>
            <HiDotsVertical className="ml-2 size-5 cursor-pointer " />
          </div>
        </div>

        <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
          <span className="hover:bg-[#6C58BB] hover:text-white text-[#808080] py-[2px] px-1 rounded-[4px] cursor-pointer">
            {thinks.category}
          </span>
          <span className="text-[#808080] relative  before:content-[''] before:absolute before:left-[-15px] before:top-[7px] before:size-1 before:rounded-full before:bg-primaryGray">
            {differenceInDays < 0
              ? `${differenceInDays} gün əvvəl`
              : `${differenceInHours} saat əvvəl`}
          </span>
        </div>
        <p className="text-[16px] ">{thinks.content}</p>
      </div>
      <ThinkCardActions
        comment={thinks.commentsCount}
        likes={thinks.likes}
        disabled={true}
      />
      {children}
    </div>
  );
}

export default ThinkCard;
