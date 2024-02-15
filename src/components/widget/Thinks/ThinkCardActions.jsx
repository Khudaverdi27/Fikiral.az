import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { VscLink } from "react-icons/vsc";
import AddCommentModal from "../../ui/Modals/AddCommentModal";
import { useState } from "react";
function ThinkCardActions({ disabled = true, comment, likes, thinkId, items }) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [count, setCount] = useState(likes);

  const likeActions = () => {
    if (!like) {
      setCount((count) => (dislike ? count + 2 : count + 1));
      setLike(true);
      setDislike(false);
    }
  };

  const dislikeActions = () => {
    if (!dislike) {
      setCount((count) => (like ? count - 2 : count - 1));
      setLike(false);
      setDislike(true);
    }
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
              comment={comment}
              thinkId={thinkId}
              items={items}
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
