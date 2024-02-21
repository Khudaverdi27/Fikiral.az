import { HiOutlineBookmark } from "react-icons/hi2";
import { IconContext } from "react-icons";
import { useState } from "react";
import ThinkCardActions from "./ThinkCardActions";
import { HiDotsVertical } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useModalActions } from "../../../context/LoginModalProvider";
import { changeTime, getStorage } from "../../../utils/helpers";
import { useFetchData } from "../../../context/FetchDataProvider";

function ThinkCard({ thinks, children }) {
  const [bookmark, setBookmark] = useState(false);
  const { switcRegisterModal } = useModalActions();
  const { data } = useFetchData();
  const [iscommentOpen, setIsCommentOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const token = getStorage("token");
  const changeBookmark = () => {
    if (!token) {
      switcRegisterModal();
    } else {
      setBookmark(!bookmark);
    }
  };

  const openMessageModal = () => {
    setIsCommentOpen(true);
    const findData = data.find((i) => i.id === thinks.id);
    setModalData(findData);
  };

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
            <h6>{thinks.userResponse.userName}</h6>
          </div>
          <div className="flex items-center cursor-pointer">
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
                className={`size-5  `}
              />
            </IconContext.Provider>
            <HiDotsVertical className="ml-2 size-5 " />
          </div>
        </div>

        <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
          <Link
            to={`/categories/${thinks.category.slug}`}
            className="hover:bg-[#6C58BB] hover:text-white text-[#808080] py-[2px] px-1 rounded-[4px]"
          >
            {thinks.category.name}
          </Link>
          <span className="dotForTime">{changeTime(thinks.publishedAt)}</span>
        </div>
        <p
          onClick={openMessageModal}
          className="text-[16px] line-clamp-5 cursor-pointer"
        >
          {thinks.content}
        </p>
      </div>
      <ThinkCardActions
        comment={thinks.commentsCount}
        likes={thinks.likes}
        disabled={true}
        iscommentOpen={iscommentOpen}
        setIsCommentOpen={setIsCommentOpen}
        modalData={modalData}
        setModalData={setModalData}
        openMessageModal={openMessageModal}
        changeTime={changeTime(thinks.publishedAt)}
      />
      {children}
    </div>
  );
}

export default ThinkCard;
