import { HiOutlineBookmark } from "react-icons/hi2";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import ThinkCardActions from "./ThinkCardActions";
import { HiDotsVertical } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useModalActions } from "../../../context/LoginModalProvider";
import { changeTime, getStorage } from "../../../utils/helpers";
import {
  useDeleteThink,
  useFetchCommentLists,
  usePutSavedPosts,
} from "../../../hooks/useFetch";

function ThinkCard({ thinks, children, items }) {
  const [bookmark, setBookmark] = useState(false);
  const { switcRegisterModal, isCommented, setIsCommented } = useModalActions();
  const [iscommentOpen, setIsCommentOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [allComments, fetchComments, commentLoading] = useFetchCommentLists();
  const [deletedThink, fetcDelete, deleteLoading] = useDeleteThink();
  const [savedResponse, saveFetch, saveLoading] = usePutSavedPosts();
  const token = getStorage("token");

  const sendToSaveds = () => {
    if (token.length == 0) {
      switcRegisterModal();
    } else {
      setBookmark(!bookmark);

      saveFetch({
        userId: thinks?.user?.id,
        postId: thinks?.id,
        isSaved: bookmark,
      });
    }
  };

  const openMessageModal = () => {
    setIsCommentOpen(true);
    const findData = items.find((i) => i.id === thinks.id);
    setModalData(findData);
    fetchComments(thinks.id);
  };

  useEffect(() => {
    if (iscommentOpen && isCommented) {
      fetchComments(thinks.id);
    }
  }, [isCommented]);

  useEffect(() => {
    if (isCommented && iscommentOpen) {
      fetchComments(thinks.id).then(() => {
        setIsCommented(false);
      });
    }
  }, [isCommented]);

  const path = useLocation().pathname;

  const destroyThink = () => {
    fetcDelete(thinks.id);
  };

  return (
    <div className="gutter-row">
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 items-center">
            <figure className="size-11 ">
              {thinks?.user?.image ? (
                <img
                  className="img-cover"
                  src={`${thinks?.user?.image}`}
                  alt="user"
                />
              ) : (
                <span className="size-full text-2xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex  justify-center">
                  {thinks?.user?.userName?.charAt(0).toLowerCase()}
                </span>
              )}
            </figure>
            <h6>{thinks?.user?.userName}</h6>
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
              <button onClick={sendToSaveds}>
                <HiOutlineBookmark className={`size-5  `} />
              </button>
            </IconContext.Provider>
            <button onClick={destroyThink}>
              <HiDotsVertical className="ml-2 size-5 " />
            </button>
          </div>
        </div>

        <div className="text-xs border-b-[1px] pb-2 space-x-4 border-[#DBDBDB] flex items-center">
          <Link
            onClick={() => setIsCommentOpen(false)}
            to={`/categories/${thinks.category.slug}`}
            className="hover:bg-[#6C58BB] hover:text-white text-[#808080] py-[2px] px-1 rounded-[4px]"
          >
            {thinks.category.name.split(" ").slice(0, 3).join(" ")}
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
        allComments={allComments}
        likeCount={thinks.likeCount}
        postId={thinks.id}
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
