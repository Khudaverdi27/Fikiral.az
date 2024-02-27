import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { VscLink } from "react-icons/vsc";
import AddCommentModal from "../../ui/Modals/AddCommentModal";
import { useEffect, useState } from "react";
import { usePostLikeAndDislike } from "../../../hooks/useFetch";
import { getStorage } from "../../../utils/helpers";
function ThinkCardActions({
  userById,
  disabled = true,
  allComments,
  commentLoading,
  comment,
  likeCount,
  iscommentOpen,
  setIsCommentOpen,
  modalData,
  setModalData,
  openMessageModal,
  changeTime,
  postId,
}) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [count, setCount] = useState(likeCount);
  const [fetchLikeCount, loading] = usePostLikeAndDislike();
  const token = getStorage("token");
  const user = getStorage("user");

  const likeActions = () => {
    if (!like) {
      const updatedCount = dislike ? count + 2 : count + 1;
      setCount(updatedCount);
      setLike(true);
      setDislike(false);
      updateLikeCount(true);
    }
  };

  const dislikeActions = () => {
    if (!dislike) {
      const updatedCount = like ? count - 2 : count - 1;
      setCount(updatedCount);
      setDislike(true);
      setLike(false);
      updateLikeCount(false);
    }
  };

  const updateLikeCount = (isLiked) => {
    fetchLikeCount({
      userId: user.userResponse.id,
      postId,
      liked: isLiked,
    });
  };

  useEffect(() => {
    if (token.length > 0) {
      const findLikeds = userById?.likedPostsIDs;
      if (findLikeds?.includes(postId)) {
        setLike(true);
      }
    }
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      const findDislikeds = userById?.disLikedPostsIDs;
      if (findDislikeds?.includes(postId)) {
        setDislike(true);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-x-[17px] max-h-6 group">
        <button
          disabled={token.length == 0}
          onClick={() => dislikeActions(postId)}
          className="disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <AiOutlineClose
            className={`${
              dislike && "size-7 "
            } size-6 group-hover:opacity-60  hover:!opacity-100 ${
              !dislike && "hover:ml-[-4px]"
            }   text-[#292D32] hover:text-black hover:size-7`}
          />
        </button>
        <span className="text-sm font-[500] ">{count}</span>
        <button
          disabled={token.length == 0}
          onClick={() => likeActions(postId)}
          className="disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <BsFillHeartFill
            className={`${
              like && "size-7"
            } size-6 group-hover:opacity-60 hover:!opacity-100 text-[#FF0000]   hover:size-7`}
          />
        </button>
      </div>

      <div className="flex items-center  gap-x-[10px]">
        {disabled && (
          <>
            <AddCommentModal
              postId={postId}
              commentLoading={commentLoading}
              comment={comment}
              allComments={allComments}
              iscommentOpen={iscommentOpen}
              setIsCommentOpen={setIsCommentOpen}
              modalData={modalData}
              setModalData={setModalData}
              openMessageModal={openMessageModal}
              changeTime={changeTime}
            />
          </>
        )}
        <span>
          <VscLink className="size-[22px] text-[#636363] hover:text-black cursor-pointer" />
        </span>
      </div>
    </div>
  );
}

export default ThinkCardActions;
