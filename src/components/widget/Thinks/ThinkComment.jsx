import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function ThinkComments({ comment }) {
  const [like, setLike] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(0);

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
              <figure className="size-11">
                <img
                  className="img-cover"
                  src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                  alt=""
                />
              </figure>
              <div className="mb-[-5px]">
                <h6 className="font-bold">Samir N.</h6>
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
