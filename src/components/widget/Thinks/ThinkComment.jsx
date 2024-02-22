import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useModalActions } from "../../../context/LoginModalProvider";

function ThinkComments({ comment }) {
  const [like, setLike] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(0);
  const { loginAuth } = useModalActions();
  const giveLikeToComment = () => {
    setLike(!like);
    setCommentLikeCount(
      !like
        ? commentLikeCount + 1
        : commentLikeCount !== 0 && commentLikeCount - 1
    );
  };

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-between ">
            <div className="flex items-center space-x-2 ">
              <figure className="size-11 ">
                {loginAuth?.userResponse?.image ? (
                  <img
                    className="img-cover"
                    src={`${loginAuth?.userResponse?.image}`}
                    alt="user"
                  />
                ) : (
                  <span className="size-full text-2xl bg-gray-300 border-gray-500 rounded-full border text-indigo-500 flex  justify-center">
                    {loginAuth?.userResponse?.userName?.charAt(0).toLowerCase()}
                  </span>
                )}
              </figure>
              <div className="mb-[-5px]">
                <h6 className="font-bold">
                  {loginAuth?.userResponse?.userName}
                </h6>
                <span className="text-sm text-[#999999]">2g</span>
              </div>
            </div>
            <button className="mb-[-5px]" onClick={giveLikeToComment}>
              {like ? (
                <BsHeartFill className="size-6 text-[#FF0000]" />
              ) : (
                <BsHeart className="size-6 " />
              )}
              <span className={`${commentLikeCount == 0 && "invisible"}`}>
                {commentLikeCount}
              </span>
            </button>
          </div>
        </div>
        <div className="py-1 pl-[50px] pr-10">
          <p className="text-wrap"> {comment}</p>
          <button className="text-sm text-[#999999]">Cavabla</button>
        </div>
      </div>

      <button className="commentLine ">
        Rəylərə bax<span className="ml-1">(0)</span>
      </button>
    </div>
  );
}

export default ThinkComments;
