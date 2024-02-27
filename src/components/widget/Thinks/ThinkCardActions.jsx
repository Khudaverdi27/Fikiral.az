import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { VscLink } from "react-icons/vsc";
import AddCommentModal from "../../ui/Modals/AddCommentModal";
import { useEffect, useState } from "react";
import { usePostLikeAndDislike } from "../../../hooks/useFetch";
import { getStorage } from "../../../utils/helpers";
function ThinkCardActions({
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
  const [like, setLike] = useState(true);
  const [dislike, setDislike] = useState(true);
  const [count, setCount] = useState(likeCount);
  const [fetchLikeCount, loading] = usePostLikeAndDislike();
  const [dislikedArray, setdisLikedArray] = useState([]);
  const [likedArray, setLikedArray] = useState([]);
  const token = getStorage("token");
  const user = getStorage("user");

  useEffect(() => {
    setdisLikedArray(user?.userResponse?.disLikedPostsIDs);
  }, []);
  useEffect(() => {
    setLikedArray(user?.userResponse?.likedPostsIDs);
  }, []);

  const findDislikeds = dislikedArray?.includes(postId);
  const findLikeds = likedArray?.includes(postId);

  const likeActions = (id) => {
    setdisLikedArray(
      user?.userResponse?.disLikedPostsIDs.filter((i) => i !== id)
    );
    if (like && !findLikeds) {
      const updatedCount = dislike ? count + 1 : count + 2;
      setCount(updatedCount);
      setLike(false);
      setDislike(true);
      updateLikeCount(true);
    }
  };

  const dislikeActions = (id) => {
    setLikedArray(user?.userResponse?.likedPostsIDs.filter((i) => i !== id));
    if (dislike && !findDislikeds) {
      const updatedCount = like ? count - 1 : count - 2;
      setCount(updatedCount);
      setDislike(false);
      setLike(true);
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
              (!dislike || findDislikeds) && "size-7 hover:ml-[0.1px]"
            } size-6 group-hover:opacity-60  hover:!opacity-100 hover:ml-[-4px]   text-[#292D32] hover:text-black hover:size-7`}
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
              (!like || findLikeds) && "size-7"
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
