import { AiOutlineDislike } from "react-icons/ai";
import { VscLink } from "react-icons/vsc";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import AddCommentModal from "../../ui/Modals/AddCommentModal";
import { useEffect, useState } from "react";
import { usePostLikeAndDislike, usePostNotify } from "../../../hooks/useFetch";
import { getStorage, objectToQueryString } from "../../../utils/helpers";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

function ThinkCardActions({
  thkinksUserId,
  thinksContent,
  items,
  userByIdData,
  disabled = true,
  allComments,
  commentLoading,
  comment,
  likeCount,
  isCommentOpen,
  setIsCommentOpen,
  modalData,
  setModalData,
  openMessageModal,
  sendToSaveds,
  bookmark,
  changeTime,
  postId,
}) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [count, setCount] = useState(likeCount);
  const [fetchLikeCount, loading] = usePostLikeAndDislike();
  const [postNotifyFetch] = usePostNotify();
  const [copied, setCopied] = useState(false);
  const token = getStorage("token");

  const likeActions = (postIds) => {
    if (!like) {
      const updatedCount = dislike ? count + 2 : count + 1;
      setCount(updatedCount);
      setLike(true);
      setDislike(false);
      updateLikeCount(true);
      postNotifyFetch({
        postId: postIds,
        postOwnerId: thkinksUserId,
        actionOwnerId: userByIdData.id,
        action: "like",
      });
    }
  };

  const dislikeActions = (postIds) => {
    if (!dislike) {
      const updatedCount = like ? count - 2 : count - 1;
      setCount(updatedCount);
      setDislike(true);
      setLike(false);
      updateLikeCount(false);
      postNotifyFetch({
        postId: postIds,
        postOwnerId: thkinksUserId,
        actionOwnerId: userByIdData.id,
        action: "dislike",
      });
    }
  };

  const updateLikeCount = (isLiked) => {
    fetchLikeCount({
      userId: userByIdData.id,
      postId,
      liked: isLiked,
    });
  };

  useEffect(() => {
    if (token.length > 0) {
      const findLikeds = userByIdData?.likedPostsIDs;
      const findDislikeds = userByIdData?.disLikedPostsIDs;

      if (findLikeds?.includes(postId)) {
        setLike(true);
      }

      if (findDislikeds?.includes(postId)) {
        setDislike(true);
      }
    }
  }, [items]);

  const handleCopy = (text) => {
    setCopied(true);
    const obj = { content: text };
    const params = objectToQueryString(obj);
    const path = location.href.split("/").slice(0, 3).join("/");
    navigator.clipboard.writeText(`${path}/think/${params}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-x-[17px] max-h-6 group">
        <button
          disabled={token.length == 0}
          onClick={() => dislikeActions(postId)}
          className="disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {!dislike ? (
            <AiOutlineDislike
              className={`${
                !dislike && "hover:ml-[-4px]"
              } size-7 group-hover:opacity-60 hover:!opacity-100 
              text-gray-500 hover:size-8`}
            />
          ) : (
            <AiFillDislike
              className={`${
                dislike && "hover:ml-[-4px]"
              } size-7 group-hover:opacity-60 hover:!opacity-100 text-gray-500 hover:size-8`}
            />
          )}
        </button>
        <span className="text-sm font-[500] dark:text-white">{count}</span>
        <button
          disabled={token.length == 0}
          onClick={() => likeActions(postId)}
          className="disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {!like ? (
            <AiOutlineLike
              className={`size-7 group-hover:opacity-60 hover:!opacity-100 text-gray-500  hover:size-8`}
            />
          ) : (
            <AiFillLike
              className={` size-7 group-hover:opacity-60 hover:!opacity-100 text-indigo-500  hover:size-8`}
            />
          )}
        </button>
      </div>

      <div className="flex items-center  gap-x-[10px]">
        {disabled && (
          <>
            <AddCommentModal
              postNotifyFetch={postNotifyFetch}
              userByIdData={userByIdData}
              bookmark={bookmark}
              sendToSaveds={sendToSaveds}
              postId={postId}
              commentLoading={commentLoading}
              comment={comment}
              allComments={allComments}
              isCommentOpen={isCommentOpen}
              setIsCommentOpen={setIsCommentOpen}
              modalData={modalData}
              setModalData={setModalData}
              openMessageModal={openMessageModal}
              changeTime={changeTime}
            />
          </>
        )}
        {thkinksUserId && (
          <button onClick={() => handleCopy(thinksContent)}>
            {copied ? (
              <MdOutlineLibraryAddCheck className="size-[22px] text-green-500 " />
            ) : (
              <VscLink className="size-[22px] text-[#636363] hover:text-black" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default ThinkCardActions;
