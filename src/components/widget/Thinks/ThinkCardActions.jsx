import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { VscLink } from "react-icons/vsc";
import AddCommentModal from "../../ui/Modals/AddCommentModal";
import { useState } from "react";
import { usePutLikeAndDislike } from "../../../hooks/useFetch";
import { getStorage, removeStorage, saveStorage } from "../../../utils/helpers";
function ThinkCardActions({
  disabled = true,
  allComments,
  comment,
  likes,
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
  const [count, setCount] = useState(likes);
  const [fetchLikeCount, loading] = usePutLikeAndDislike();

  const likeActions = () => {
    if (!like) {
      const updatedCount = dislike ? count + 2 : count + 1;
      setCount(updatedCount);
      setLike(true);
      setDislike(false);
      updateLikeCount(updatedCount);
    }
  };

  const dislikeActions = () => {
    if (!dislike) {
      const updatedCount = like ? count - 2 : count - 1;
      setCount(updatedCount);
      setLike(false);
      setDislike(true);
      updateLikeCount(updatedCount);
    }
  };

  const updateLikeCount = async (updatedCount) => {
    await fetchLikeCount({
      likeCount: updatedCount,
      postId,
    });
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-x-[17px] max-h-6 group">
        <button onClick={dislikeActions}>
          <AiOutlineClose
            className={` ${
              like ? "size-[22px] " : "size-7 hover:ml-[0px]"
            } group-hover:opacity-60  hover:!opacity-100 hover:ml-[-6px]   text-[#292D32] hover:text-black cursor-pointer hover:size-7`}
          />
        </button>
        <span className="text-sm font-[500] ">{count}</span>
        <button onClick={likeActions}>
          <BsFillHeartFill
            className={` ${
              like ? "size-7 " : "size-[22px] "
            } group-hover:opacity-60 hover:!opacity-100 text-[#FF0000]   cursor-pointer hover:size-7`}
          />
        </button>
      </div>

      <div className="flex items-center  gap-x-[10px]">
        {disabled && (
          <>
            <AddCommentModal
              postId={postId}
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
