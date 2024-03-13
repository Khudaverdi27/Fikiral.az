import { useState } from "react";
import { changeTime, getStorage } from "../../../utils/helpers";
import { usePostLikeComments } from "../../../hooks/useFetch";
import ThinkReplyComment from "./ThinkReplyComment";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

function ThinkComments({ comment, inputRef }) {
  const [like, setLike] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(comment.likeCount);
  const [likeCommentRes, likeCommentFetch, loading] = usePostLikeComments();
  const user = getStorage("user");
  const token = getStorage("token");

  const giveLikeToComment = () => {
    const dataForPost = {};
    console.log(comment);
    setLike(!like);
    setCommentLikeCount(
      !like
        ? commentLikeCount + 1
        : commentLikeCount !== 0 && commentLikeCount - 1
    );
    (dataForPost.userId = user.userResponse.id),
      (dataForPost.commentId = comment.id),
      (dataForPost.liked = !like),
      likeCommentFetch(dataForPost);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const showCommentReply = () => {
    setShowReply(!showReply);
  };

  return (
    <div>
      <div>
        <div>
          <div className="flex justify-between ">
            <div className="flex items-center space-x-2 ">
              <figure className="size-11 ">
                {comment?.user?.image ? (
                  <img
                    className="img-cover rounded-full"
                    src={`${comment?.user?.image}`}
                    alt="user"
                  />
                ) : (
                  <span className="size-full text-2xl bg-gray-300  rounded-full border text-indigo-500 flex  justify-center">
                    {comment?.user?.userName?.charAt(0).toLowerCase()}
                  </span>
                )}
              </figure>
              <div className="mb-[-5px]">
                <h6 className="font-bold">
                  {comment?.user?.userName.split(" ")[0].toLowerCase()}
                </h6>
                <span className="text-xs text-[#999999]">
                  {changeTime(comment.publishedAt)}
                </span>
              </div>
            </div>
            <button
              disabled={token.length == 0}
              className="mb-[-5px] disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={giveLikeToComment}
            >
              {like ? (
                <AiFillLike className="size-7 text-indigo-500" />
              ) : (
                <AiOutlineLike className="size-7 text-gray-500" />
              )}
              <span className={`${commentLikeCount == 0 && "invisible"}`}>
                {commentLikeCount}
              </span>
            </button>
          </div>
        </div>
        <div className="py-1 pl-[50px] pr-10">
          <p className="text-wrap"> {comment.content}</p>
          <button onClick={focusInput} className="text-sm text-[#999999]">
            Cavabla
          </button>
        </div>
      </div>

      <button onClick={showCommentReply} className="commentLine ">
        Rəylərə bax<span className="ml-1">(0)</span>
      </button>
      {showReply && <ThinkReplyComment />}
    </div>
  );
}

export default ThinkComments;
