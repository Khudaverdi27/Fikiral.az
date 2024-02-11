import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import { VscLink } from "react-icons/vsc";
import AddCommentModal from "../../ui/Modals/AddCommentModal";
import { useState } from "react";
function ThinkCardActions({ disabled = true }) {
  const [like, setLike] = useState(false);

  const [count, setCount] = useState(30);

  const likeActions = () => {
    setLike(true);
    setCount((count) => count + 1);
  };
  const disLikeActions = () => {
    setLike(false);
    setCount((count) => count - 1);
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-x-[17px] max-h-6 group">
        <button onClick={disLikeActions}>
          <AiOutlineClose
            className={` ${
              like ? "size-[22px] " : "size-7 hover:ml-[0px]"
            } group-hover:opacity-60  hover:!opacity-100 hover:ml-[-6px]   text-[#292D32] hover:text-black cursor-pointer hover:size-7`}
          />
        </button>
        <span className="text-[17px] font-bold ">{count}</span>
        <button onClick={likeActions}>
          <BsFillHeartFill
            className={` ${
              like ? "size-7 " : "size-[22px] "
            } group-hover:opacity-60 hover:!opacity-100 text-[#FF0000]   cursor-pointer hover:size-7`}
          />
        </button>
      </div>

      <div className="flex items-center  gap-x-[25px]">
        {disabled && (
          <>
            <AddCommentModal />
          </>
        )}
        <span>
          <VscLink className="size-[22px] text-[#5E6268] hover:text-black cursor-pointer" />
        </span>
      </div>
    </div>
  );
}

export default ThinkCardActions;
